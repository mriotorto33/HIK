from fastapi import FastAPI, APIRouter, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.responses import StreamingResponse, Response
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import io
import csv
import hmac
import json
import html as _html
import asyncio
import logging
import random
import hashlib
from collections import Counter
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URI = os.environ.get("MONGO_URI") or os.environ.get("MONGO_URL")
if MONGO_URI:
    from motor.motor_asyncio import AsyncIOMotorClient
    import certifi
    # Pass credentials separately so pymongo never URL-decodes the password
    # (the % chars in the password cause double-decode SSL failures when embedded in the URI)
    import re
    _m = re.match(r'mongodb\+srv://([^:]+):([^@]+)@(.+)', MONGO_URI)
    if _m:
        _user, _raw_pass, _host = _m.group(1), _m.group(2), _m.group(3)
        # Undo the %25 encoding we added for the shell — motor wants the literal % char
        _password = _raw_pass.replace('%25', '%')
        client = AsyncIOMotorClient(
            f'mongodb+srv://{_host}',
            username=_user,
            password=_password,
            tlsCAFile=certifi.where(),
        )
    else:
        client = AsyncIOMotorClient(MONGO_URI, tlsCAFile=certifi.where())
else:
    from mongomock_motor import AsyncMongoMockClient
    client = AsyncMongoMockClient()

_db_name = os.environ.get('DB_NAME', 'hik_dashboard')
db = client[_db_name]

# Key used to sign evidence-pack PDFs. Rotate in production.
EVIDENCE_SIGNING_KEY = os.environ.get(
    'EVIDENCE_SIGNING_KEY', 'hik-demo-signing-key-rotate-in-prod'
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


async def _ensure_indexes():
    """Create TTL + lookup indexes once on startup.

    TTL is keyed on ``expires_at``. Documents without this field are never
    removed (historical seed stays). Only live-stream / simulated events get
    the field set, so they age out after 2 hours to keep the collection
    bounded in long-running demos.
    """
    try:
        await db.hik_events.create_index(
            "expires_at", expireAfterSeconds=0, name="hik_events_ttl"
        )
        await db.hik_events.create_index([("timestamp", -1)], name="hik_events_ts_desc")
        await db.hik_events.create_index("entity_id", name="hik_events_entity")
    except Exception as e:
        logger.warning(f"Index create failed: {e}")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        await _ensure_indexes()
        await _seed_if_empty()
    except Exception as e:
        logger.error(f"Startup error: {e}")
    yield
    client.close()


app = FastAPI(title="HIK Zero-Trust Governance API", lifespan=lifespan)
api_router = APIRouter(prefix="/api")


# =====================
# Models
# =====================
class KPIs(BaseModel):
    model_config = ConfigDict(extra="ignore")
    total_interceptions_24h: int
    total_interceptions_delta: float
    top_violated_rule: str
    top_violated_rule_count: int
    on_chain_anchors: int
    on_chain_anchors_delta: float
    global_trust_score: int
    global_trust_score_delta: float


class TrendPoint(BaseModel):
    time: str
    dlp_blocks: int
    compliance_alerts: int
    allowed_actions: int


class RiskyEntity(BaseModel):
    id: str
    name: str
    region: str
    risk_score: int
    violations_24h: int
    category: str


class AuditEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    timestamp: str
    entity_id: str
    action_intent: str
    kmir_rule: str
    status: str  # BLOCKED | ALLOWED | ALERT
    severity: str  # critical | high | medium | low
    ipfs_cid: str
    tx_hash: str
    block_number: int
    context: Dict[str, Any]
    raw_payload: Dict[str, Any]
    # Real sidecar fields (optional — populated when Go sidecar writes events)
    input_text: Optional[str] = None
    output_text: Optional[str] = None
    sacred_trace: Optional[Dict[str, Any]] = None
    cascade_layer: Optional[str] = None
    confidence: Optional[float] = None


# =====================
# Mock data generators
# =====================
REGIONS = ["LATAM", "EMEA", "APAC", "NA", "SEA"]
AGENT_PREFIXES = [
    "Agent-Procurement",
    "Agent-Freight",
    "Agent-CustomsBroker",
    "Agent-Warehouse",
    "Agent-CarrierBidder",
    "Agent-InventoryOps",
    "Agent-ReverseLogistics",
    "Agent-LastMile",
    "Agent-RoutePlanner",
    "Agent-DemandForecast",
]
ACTION_INTENTS = [
    "Transmit supplier rate card to external endpoint",
    "Modify carrier bid below floor price",
    "Export shipment manifest to unauthorized S3 bucket",
    "Override customs HS-code classification",
    "Issue purchase order exceeding daily budget cap",
    "Approve duplicate invoice payment",
    "Reroute high-value shipment outside geofence",
    "Query PII from driver roster",
    "Disable temperature telemetry on cold-chain",
    "Push firmware to unverified IoT device",
    "Invoke cross-border transfer without KYC",
    "Modify immutable audit log entry",
    "Share freight forwarder credentials via email",
    "Delegate approval authority to external agent",
    "Bypass dual-control on contract amendment",
]
KMIR_RULES = [
    "SUP-CONF-014 Supplier Rate Leakage",
    "FIN-BUD-003 Daily Budget Breach",
    "DLP-PII-022 Driver PII Exfiltration",
    "COMP-CUST-007 HS-Code Manipulation",
    "SEC-GEO-011 Geofence Violation",
    "GOV-SOD-001 Segregation of Duties",
    "DLP-CRED-019 Credential Exposure",
    "COMP-KYC-005 KYC Bypass",
    "SEC-IOT-013 Unsigned Firmware Push",
    "GOV-AUDIT-002 Immutable Log Tamper",
    "FIN-DUP-008 Duplicate Payment",
    "SUP-BID-015 Below-Floor Bidding",
]
SEVERITIES_BY_STATUS = {
    "BLOCKED": ["critical", "high"],
    "ALERT": ["high", "medium"],
    "ALLOWED": ["low"],
}
STATUS_DIST = ["BLOCKED"] * 55 + ["ALLOWED"] * 35 + ["ALERT"] * 10


def _rand_hash(prefix: str = "0x", length: int = 64) -> str:
    h = hashlib.sha256(uuid.uuid4().bytes).hexdigest()
    return f"{prefix}{h[:length]}"


def _rand_ipfs_cid() -> str:
    h = hashlib.sha256(uuid.uuid4().bytes).hexdigest()
    # typical CID v0 starts with Qm, 46 chars
    return "Qm" + h[:44]


def _random_entity_id() -> str:
    return f"{random.choice(AGENT_PREFIXES)}-{random.choice(REGIONS)}-{random.randint(100, 999)}"


def _generate_event(ts: Optional[datetime] = None) -> dict:
    if ts is None:
        ts = datetime.now(timezone.utc)
    status = random.choice(STATUS_DIST)
    severity = random.choice(SEVERITIES_BY_STATUS[status])
    entity_id = _random_entity_id()
    intent = random.choice(ACTION_INTENTS)
    rule = random.choice(KMIR_RULES)
    eid = str(uuid.uuid4())
    cid = f"ipfs://{_rand_ipfs_cid()}"
    tx_hash = _rand_hash("0x", 64)
    block_number = 18_420_000 + random.randint(0, 95_000)

    context = {
        "who": entity_id,
        "what": intent,
        "why": rule,
        "origin_ip": f"10.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(1,254)}",
        "destination": random.choice([
            "s3://external-partner-bucket/exfil",
            "https://api.third-party-broker.io/v2/rates",
            "sftp://unverified-host.net:22",
            "internal://customs-gateway",
            "https://erp.internal.hik/approvals",
        ]),
        "confidence": round(random.uniform(0.72, 0.998), 4),
        "risk_vector": random.choice(["data-exfiltration", "financial-fraud", "compliance-breach", "privilege-escalation", "supply-chain-tamper"]),
    }

    raw_payload = {
        "event_id": eid,
        "schema": "hik.kmir.v2",
        "agent": {
            "id": entity_id,
            "model": random.choice(["llm-orchestrator/4.2", "llm-orchestrator/4.1", "planner-gpt-5/pro", "swarm-routing/2.0"]),
            "session": str(uuid.uuid4()),
        },
        "intent": {
            "action": intent,
            "target": context["destination"],
            "confidence": context["confidence"],
        },
        "policy": {
            "rule_id": rule.split(" ")[0],
            "rule_name": rule,
            "decision": status,
            "severity": severity,
        },
        "anchors": {
            "ipfs_cid": cid,
            "tx_hash": tx_hash,
            "block_number": block_number,
            "chain": "hyperledger-besu",
        },
        "timestamp": ts.isoformat(),
    }

    return {
        "id": eid,
        "timestamp": ts.isoformat(),
        "entity_id": entity_id,
        "action_intent": intent,
        "kmir_rule": rule,
        "status": status,
        "severity": severity,
        "ipfs_cid": cid,
        "tx_hash": tx_hash,
        "block_number": block_number,
        "context": context,
        "raw_payload": raw_payload,
    }


def _generate_trend_points(hours: int = 24) -> List[dict]:
    now = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    points = []
    for i in range(hours, -1, -1):
        t = now - timedelta(hours=i)
        # Create a wave pattern with daily variation
        base = 30 + int(20 * abs((i % 12) - 6))
        dlp = base + random.randint(10, 55)
        comp = max(5, base // 2 + random.randint(-5, 25))
        allowed = base * 2 + random.randint(30, 90)
        points.append({
            "time": t.strftime("%H:%M"),
            "iso": t.isoformat(),
            "dlp_blocks": dlp,
            "compliance_alerts": comp,
            "allowed_actions": allowed,
        })
    return points


def _generate_risky_entities() -> List[dict]:
    seeds = [
        ("Agent-Procurement-LATAM-042", "LATAM", "Procurement"),
        ("Agent-CarrierBidder-EMEA-118", "EMEA", "Bidding"),
        ("Agent-Freight-APAC-209", "APAC", "Freight"),
        ("Agent-CustomsBroker-NA-077", "NA", "Customs"),
        ("Agent-Warehouse-SEA-331", "SEA", "Warehouse"),
        ("Agent-LastMile-LATAM-504", "LATAM", "LastMile"),
        ("Agent-DemandForecast-EMEA-088", "EMEA", "Forecast"),
        ("Agent-RoutePlanner-APAC-162", "APAC", "Routing"),
    ]
    out = []
    for (name, region, cat) in seeds:
        out.append({
            "id": str(uuid.uuid4()),
            "name": name,
            "region": region,
            "risk_score": random.randint(58, 97),
            "violations_24h": random.randint(12, 180),
            "category": cat,
        })
    out.sort(key=lambda x: x["risk_score"], reverse=True)
    return out


async def _seed_if_empty():
    events_count = await db.hik_events.count_documents({})
    if events_count == 0:
        logger.info("Seeding HIK Zero-Trust mock database...")
        # Use _generate_risky_entities() only to get a pool of named agents.
        # We no longer persist hik_entities — the /api/risky-entities endpoint
        # derives the leaderboard from hik_events aggregation dynamically.
        entities = _generate_risky_entities()
        risky_names = [e["name"] for e in entities]

        # Generate 200 historical events spread across last 24h.
        # Force ~65% of events to use entity_ids from the risky-entities pool
        # so the "click a risky entity → timeline" flow surfaces real data.
        now = datetime.now(timezone.utc)
        bulk = []
        for i in range(200):
            minutes_ago = random.randint(1, 24 * 60)
            ts = now - timedelta(minutes=minutes_ago)
            ev = _generate_event(ts)
            if random.random() < 0.65:
                forced_id = random.choice(risky_names)
                ev["entity_id"] = forced_id
                ev["context"]["who"] = forced_id
                ev["raw_payload"]["agent"]["id"] = forced_id
            bulk.append(ev)
        bulk.sort(key=lambda e: e["timestamp"], reverse=True)
        await db.hik_events.insert_many(bulk)

        trends = _generate_trend_points(24)
        await db.hik_trends.delete_many({})
        await db.hik_trends.insert_many(trends)
        logger.info("Seed complete.")


# =====================
# Routes
# =====================
@api_router.get("/")
async def root():
    return {"service": "HIK Zero-Trust Governance", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"kmir_engine": "active", "besu_blockchain": "synced", "ipfs_gateway": "online"}


@api_router.get("/kpis", response_model=KPIs)
async def get_kpis():
    total_blocked = await db.hik_events.count_documents({"status": "BLOCKED"})
    total_alert = await db.hik_events.count_documents({"status": "ALERT"})
    total_interceptions = total_blocked + total_alert

    # Determine top violated rule
    pipeline = [
        {"$match": {"status": {"$in": ["BLOCKED", "ALERT"]}}},
        {"$group": {"_id": "$kmir_rule", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 1},
    ]
    top_rule_doc = await db.hik_events.aggregate(pipeline).to_list(1)
    if top_rule_doc:
        top_rule_name = top_rule_doc[0]["_id"]
        top_rule_count = top_rule_doc[0]["count"]
    else:
        top_rule_name = "Supplier Rate Leakage"
        top_rule_count = 0

    # Simplify rule name (strip code prefix)
    top_rule_pretty = " ".join(top_rule_name.split(" ")[1:]) if " " in top_rule_name else top_rule_name

    on_chain = await db.hik_events.count_documents({"tx_hash": {"$exists": True, "$ne": ""}})

    return KPIs(
        total_interceptions_24h=total_interceptions,
        total_interceptions_delta=round(random.uniform(8.2, 24.8), 1),
        top_violated_rule=top_rule_pretty or "Supplier Rate Leakage",
        top_violated_rule_count=top_rule_count,
        on_chain_anchors=on_chain,
        on_chain_anchors_delta=round(random.uniform(1.1, 5.4), 1),
        global_trust_score=random.randint(82, 89),
        global_trust_score_delta=round(random.uniform(-2.0, 3.6), 1),
    )


@api_router.get("/incident-trends", response_model=List[TrendPoint])
async def get_incident_trends():
    try:
        points = await db.hik_trends.find({}, {"_id": 0}).to_list(200)
    except Exception:
        points = []
    # If DB is empty or unreachable, generate fresh trend data on the fly
    if not points:
        points = _generate_trend_points(24)
    points.sort(key=lambda p: p.get("iso", p.get("time", "")))
    return [TrendPoint(**{k: p[k] for k in ("time", "dlp_blocks", "compliance_alerts", "allowed_actions")}) for p in points]


@api_router.get("/risky-entities", response_model=List[RiskyEntity])
async def get_risky_entities():
    """Derive risky entity leaderboard dynamically from hik_events.
    Falls back to generated seed data if DB is empty or unreachable."""
    try:
        pipeline = [
            {"$group": {
                "_id": "$entity_id",
                "total": {"$sum": 1},
                "blocked": {"$sum": {"$cond": [{"$eq": ["$status", "BLOCKED"]}, 1, 0]}},
                "alerts": {"$sum": {"$cond": [{"$eq": ["$status", "ALERT"]}, 1, 0]}},
            }},
            {"$sort": {"blocked": -1, "alerts": -1}},
            {"$limit": 10},
        ]
        rows = await db.hik_events.aggregate(pipeline).to_list(10)
    except Exception:
        rows = []

    if rows:
        result = []
        for r in rows:
            eid = r["_id"]
            parts = eid.split("-")
            category = parts[1] if len(parts) > 1 else "Unknown"
            region = parts[2] if len(parts) > 2 else "Unknown"
            risk_raw = (r["blocked"] * 1.0 + r["alerts"] * 0.6) / max(r["total"], 1)
            risk_score = min(99, max(30, int(risk_raw * 100) + 20))
            result.append(RiskyEntity(
                id=eid,
                name=eid,
                region=region,
                risk_score=risk_score,
                violations_24h=r["blocked"] + r["alerts"],
                category=category,
            ))
        return result

    # Fallback: return generated entities so the UI is never blank
    return [RiskyEntity(**e) for e in _generate_risky_entities()]


def _build_events_query(
    status: Optional[str] = None,
    severity: Optional[str] = None,
    search: Optional[str] = None,
) -> dict:
    q: dict = {}
    if status and status.upper() != "ALL":
        q["status"] = status.upper()
    if severity and severity.lower() != "all":
        q["severity"] = severity.lower()
    if search:
        regex = {"$regex": search, "$options": "i"}
        q["$or"] = [
            {"entity_id": regex},
            {"action_intent": regex},
            {"kmir_rule": regex},
        ]
    return q


@api_router.get("/events", response_model=List[AuditEvent])
async def get_events(
    limit: int = 25,
    status: Optional[str] = None,
    severity: Optional[str] = None,
    search: Optional[str] = Query(None, description="Substring match on entity_id, action_intent, kmir_rule"),
):
    limit = max(1, min(limit, 200))
    q = _build_events_query(status=status, severity=severity, search=search)
    docs = await db.hik_events.find(q, {"_id": 0}).sort("timestamp", -1).to_list(limit)
    return [AuditEvent(**d) for d in docs]


@api_router.get("/events/export.csv")
async def export_events_csv(
    status: Optional[str] = None,
    severity: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 1000,
):
    limit = max(1, min(limit, 5000))
    q = _build_events_query(status=status, severity=severity, search=search)
    docs = await db.hik_events.find(q, {"_id": 0}).sort("timestamp", -1).to_list(limit)

    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow([
        "timestamp", "entity_id", "action_intent", "kmir_rule",
        "status", "severity", "ipfs_cid", "tx_hash", "block_number",
    ])
    for d in docs:
        writer.writerow([
            d.get("timestamp", ""),
            d.get("entity_id", ""),
            d.get("action_intent", ""),
            d.get("kmir_rule", ""),
            d.get("status", ""),
            d.get("severity", ""),
            d.get("ipfs_cid", ""),
            d.get("tx_hash", ""),
            d.get("block_number", ""),
        ])
    buf.seek(0)
    filename = f"hik_events_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}.csv"
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@api_router.get("/events/{event_id}", response_model=AuditEvent)
async def get_event(event_id: str):
    doc = await db.hik_events.find_one({"id": event_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Event not found")
    return AuditEvent(**doc)


@api_router.post("/events/simulate", response_model=AuditEvent)
async def simulate_event():
    """Generate a new live event, persist it, and return it.
    Used by the frontend as a polling fallback when WebSocket is unavailable."""
    event = _generate_event()
    doc = event.copy()
    doc["expires_at"] = datetime.now(timezone.utc) + timedelta(hours=2)
    await db.hik_events.insert_one(doc)
    return AuditEvent(**event)


@api_router.get("/agents/{entity_id}")
async def get_agent(entity_id: str, limit: int = 100):
    limit = max(1, min(limit, 500))
    docs = await db.hik_events.find({"entity_id": entity_id}, {"_id": 0}).sort("timestamp", -1).to_list(limit)
    if not docs:
        raise HTTPException(status_code=404, detail="Agent has no recorded events")

    total = len(docs)
    blocked = sum(1 for d in docs if d["status"] == "BLOCKED")
    allowed = sum(1 for d in docs if d["status"] == "ALLOWED")
    alerts = sum(1 for d in docs if d["status"] == "ALERT")
    # Risk score: weight blocked heavier than alerts
    risk_raw = (blocked * 1.0 + alerts * 0.6) / max(total, 1)
    risk_score = min(99, max(5, int(risk_raw * 100) + 12))

    rule_counts = Counter(d["kmir_rule"] for d in docs if d["status"] in ("BLOCKED", "ALERT"))
    top_rules = [{"rule": r, "count": c} for r, c in rule_counts.most_common(5)]

    parts = entity_id.split("-")
    category = parts[1] if len(parts) > 1 else "Unknown"
    region = parts[2] if len(parts) > 2 else "Unknown"

    first_seen = docs[-1]["timestamp"] if docs else None
    last_seen = docs[0]["timestamp"] if docs else None

    return {
        "entity_id": entity_id,
        "category": category,
        "region": region,
        "total_events": total,
        "blocked": blocked,
        "allowed": allowed,
        "alerts": alerts,
        "risk_score": risk_score,
        "top_rules": top_rules,
        "first_seen": first_seen,
        "last_seen": last_seen,
        "timeline": docs,
    }


@api_router.websocket("/events/stream")
async def events_stream(websocket: WebSocket):
    """Push a fresh generated event every ~4s. Persists to Mongo with a 2h TTL so
    the dashboard history stays consistent while keeping storage bounded."""
    await websocket.accept()
    try:
        while True:
            await asyncio.sleep(4)
            event = _generate_event()
            doc = event.copy()
            doc["expires_at"] = datetime.now(timezone.utc) + timedelta(hours=2)
            await db.hik_events.insert_one(doc)
            await websocket.send_json(event)
    except WebSocketDisconnect:
        return
    except Exception as e:
        logger.info(f"WS stream closed: {e}")
        try:
            await websocket.close()
        except Exception:
            pass


@api_router.post("/admin/reseed")
async def reseed():
    await db.hik_events.delete_many({})
    await db.hik_trends.delete_many({})
    await _seed_if_empty()
    return {"status": "reseeded"}


# =====================
# Evidence Pack (signed PDF)
# =====================
def _generate_evidence_pdf(event: dict) -> bytes:
    """Render a cryptographically signed Evidence Pack PDF for a given event.

    The signature is an HMAC-SHA256 of (event_id|tx_hash|content_digest|signed_at)
    using EVIDENCE_SIGNING_KEY. The key_id ``hik-evidence-v1`` is embedded so
    auditors know which key to use for verification.
    """
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=letter,
        leftMargin=54, rightMargin=54,
        topMargin=54, bottomMargin=54,
        title=f"HIK Evidence Pack · {event['id'][:8]}",
        author="Human Is Kind",
    )
    styles = getSampleStyleSheet()
    hik_orange = colors.HexColor("#FF7A00")
    muted = colors.HexColor("#71717a")
    dark = colors.HexColor("#18181b")

    h_title = ParagraphStyle(
        "hik_title", parent=styles["Title"], fontName="Helvetica-Bold",
        fontSize=22, textColor=dark, spaceAfter=2, leading=26,
    )
    h_sub = ParagraphStyle(
        "hik_sub", parent=styles["Normal"], fontName="Helvetica",
        fontSize=9, textColor=muted, spaceAfter=4,
    )
    h_section = ParagraphStyle(
        "hik_section", parent=styles["Heading2"], fontName="Helvetica-Bold",
        fontSize=10, textColor=hik_orange, spaceBefore=18, spaceAfter=8, leading=12,
    )

    ctx = event.get("context", {})
    summary = [
        ["Event ID", event.get("id", "")],
        ["Timestamp (UTC)", event.get("timestamp", "")],
        ["Decision", f"{event.get('status','')} · {str(event.get('severity','')).upper()}"],
        ["Entity ID", event.get("entity_id", "")],
        ["Action Intent", event.get("action_intent", "")],
        ["KMIR Rule", event.get("kmir_rule", "")],
        ["Origin IP", ctx.get("origin_ip", "n/a")],
        ["Destination", ctx.get("destination", "n/a")],
        ["Confidence", f"{round(ctx.get('confidence', 0) * 100, 2)}%"],
        ["Risk Vector", ctx.get("risk_vector", "n/a")],
    ]
    anchors = [
        ["IPFS CID", event.get("ipfs_cid", "")],
        ["Besu Tx Hash", event.get("tx_hash", "")],
        ["Block Number", f"#{event.get('block_number', 0):,}"],
        ["Chain", "Hyperledger Besu · privnet"],
    ]

    # Signature
    payload_json = json.dumps(event.get("raw_payload", {}), indent=2)
    content_digest = hashlib.sha256(payload_json.encode("utf-8")).hexdigest()
    signed_at = datetime.now(timezone.utc).isoformat()
    sig_input = f"{event.get('id','')}|{event.get('tx_hash','')}|{content_digest}|{signed_at}"
    signature = hmac.new(
        EVIDENCE_SIGNING_KEY.encode("utf-8"),
        sig_input.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    sig_block = [
        ["Signed at (UTC)", signed_at],
        ["Content digest", content_digest],
        ["Signature", signature],
        ["Key ID", "hik-evidence-v1"],
        ["Algorithm", "HMAC-SHA256"],
    ]

    def _table(data, highlight=False, dark_bg=False):
        t = Table(data, colWidths=[1.6 * inch, 5.0 * inch])
        style = [
            ("FONT", (0, 0), (-1, -1), "Helvetica", 9),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
        if dark_bg:
            style += [
                ("BACKGROUND", (0, 0), (-1, -1), dark),
                ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#a1a1aa")),
                ("TEXTCOLOR", (1, 0), (1, -1), colors.HexColor("#fafafa")),
                ("FONT", (1, 0), (1, -1), "Courier", 7),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#27272a")),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#27272a")),
            ]
        elif highlight:
            style += [
                ("TEXTCOLOR", (0, 0), (0, -1), muted),
                ("FONT", (1, 0), (1, -1), "Courier", 8),
                ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#fff7ed"), colors.white]),
                ("BOX", (0, 0), (-1, -1), 0.5, hik_orange),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#fed7aa")),
            ]
        else:
            style += [
                ("TEXTCOLOR", (0, 0), (0, -1), muted),
                ("FONT", (1, 0), (1, -1), "Helvetica-Bold", 9),
                ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#f9f9fb"), colors.white]),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#e4e4e7")),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e4e4e7")),
            ]
        t.setStyle(TableStyle(style))
        return t

    story = [
        Paragraph("HIK · EVIDENCE PACK", h_title),
        Paragraph(
            "Cryptographically anchored forensic record · Human Is Kind™ — "
            "The AI advises. HIK authorizes.",
            h_sub,
        ),
        Spacer(1, 10),
        Paragraph("EVENT CONTEXT", h_section),
        _table(summary),
        Paragraph("STORAGE &amp; ON-CHAIN ANCHORS", h_section),
        _table(anchors, highlight=True),
        Paragraph("RAW JSON PAYLOAD", h_section),
    ]
    escaped = (
        _html.escape(payload_json)
        .replace(" ", "&nbsp;")
        .replace("\n", "<br/>")
    )
    story.append(Paragraph(
        f"<font face='Courier' size='7' color='#27272a'>{escaped}</font>",
        ParagraphStyle(
            "json", parent=styles["Normal"], leading=9, leftIndent=6,
            borderColor=colors.HexColor("#e4e4e7"), borderWidth=0.5, borderPadding=10,
            backColor=colors.HexColor("#fafafa"),
        ),
    ))
    story.append(Paragraph("CRYPTOGRAPHIC SIGNATURE · HMAC-SHA256", h_section))
    story.append(_table(sig_block, dark_bg=True))
    story.append(Spacer(1, 16))
    story.append(Paragraph(
        "<font size='7' color='#71717a'>This document is a cryptographically signed forensic record of an HIK KMIR "
        "interception. The signature can be independently verified by recomputing "
        "HMAC-SHA256(key, event_id|tx_hash|content_digest|signed_at). IPFS and Besu anchors "
        "provide a second, public verification layer. Human Is Kind™</font>",
        styles["Normal"],
    ))

    doc.build(story)
    return buf.getvalue()


@api_router.get("/events/{event_id}/evidence.pdf")
async def download_evidence_pdf(event_id: str):
    ev = await db.hik_events.find_one({"id": event_id}, {"_id": 0})
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    pdf_bytes = _generate_evidence_pdf(ev)
    filename = f"HIK_Evidence_{event_id[:8]}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
