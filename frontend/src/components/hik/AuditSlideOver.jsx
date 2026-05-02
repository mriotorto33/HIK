import { useEffect } from "react";
import {
  X,
  ShieldCheck,
  Copy,
  ExternalLink,
  FileCode2,
  Cpu,
  Hash,
  FileCheck2,
} from "lucide-react";
import StatusBadge from "@/components/hik/StatusBadge";
import { toast } from "sonner";
import { API } from "@/lib/api";

const shortHash = (h, start = 10, end = 8) => {
  if (!h) return "";
  return h.length > start + end + 3 ? `${h.slice(0, start)}…${h.slice(-end)}` : h;
};

const copyToClipboard = (value, label) => {
  try {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`, {
      description: shortHash(value, 14, 10),
    });
  } catch {
    toast.error("Clipboard unavailable");
  }
};

const Row = ({ label, children, testId }) => (
  <div data-testid={testId} className="space-y-1.5">
    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
      {label}
    </div>
    <div>{children}</div>
  </div>
);

export const AuditSlideOver = ({ event, open, onClose }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !event) return null;

  const { context, raw_payload, ipfs_cid, tx_hash, block_number } = event;
  const explorerUrl = `https://explorer.hik-besu.local/tx/${tx_hash}`;

  return (
    <>
      <div
        data-testid="slide-over-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 fade-up"
        aria-hidden="true"
      />
      <aside
        data-testid="audit-slide-over"
        className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md lg:max-w-lg z-50 glass-panel-strong border-l border-white/10 slide-in-right overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass-panel-strong border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-orange-500/30 bg-orange-500/10">
              <ShieldCheck className="w-4 h-4 text-orange-300" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-zinc-50 tracking-tight">
                Cryptographic Audit Trail
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-0.5">
                Forensic evidence · anchored
              </div>
            </div>
          </div>
          <button
            data-testid="close-slide-over"
            onClick={onClose}
            className="w-9 h-9 rounded-md border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-white/25 transition-all flex items-center justify-center"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status={event.status} />
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                severity · {event.severity}
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 text-mono">
              {new Date(event.timestamp).toISOString().replace("T", " ").slice(0, 19)} UTC
            </div>
          </div>

          {/* Event Context */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                Event Context
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Row label="Who" testId="ctx-who">
                <div className="text-mono text-xs text-cyan-300">
                  {context.who}
                </div>
              </Row>
              <Row label="What" testId="ctx-what">
                <div className="text-sm text-zinc-200 leading-relaxed">
                  {context.what}
                </div>
              </Row>
              <Row label="Why (KMIR Rule)" testId="ctx-why">
                <div className="text-mono text-xs text-orange-300">
                  {context.why}
                </div>
              </Row>
              <div className="grid grid-cols-2 gap-3">
                <Row label="Origin IP" testId="ctx-origin">
                  <div className="text-mono text-xs text-zinc-300">
                    {context.origin_ip}
                  </div>
                </Row>
                <Row label="Confidence" testId="ctx-confidence">
                  <div className="text-mono text-xs text-emerald-300">
                    {(context.confidence * 100).toFixed(2)}%
                  </div>
                </Row>
              </div>
              <Row label="Destination" testId="ctx-destination">
                <div className="text-mono text-[11px] text-zinc-400 break-all">
                  {context.destination}
                </div>
              </Row>
            </div>
          </section>

          {/* LLM Input — Raw human-readable text */}
          {event.input_text && (
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-3.5 h-3.5 text-violet-400" />
                <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                  LLM Input · Human Readable
                </h4>
              </div>
              <div
                data-testid="llm-input-block"
                className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4"
              >
                <div className="text-sm text-zinc-200 leading-relaxed italic">
                  "{event.input_text}"
                </div>
              </div>
            </section>
          )}

          {/* Sacred Trace — Chain state */}
          {event.sacred_trace && (
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                  Sacred Trace™ · Atomic Chain
                </h4>
              </div>
              <div
                data-testid="sacred-trace-block"
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Chain Tip
                    </div>
                    <div className="text-mono text-[11px] text-emerald-300 mt-0.5 break-all">
                      {shortHash(event.sacred_trace.chain_tip, 12, 8)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Chain Depth
                    </div>
                    <div className="text-mono text-xs text-zinc-200 mt-0.5">
                      {event.sacred_trace.chain_depth?.toLocaleString() || "—"}
                    </div>
                  </div>
                </div>
                {event.sacred_trace.input_hash && (
                  <div className="pt-2 border-t border-emerald-500/15">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Input Hash (SHA-256)
                    </div>
                    <div className="text-mono text-[10px] text-zinc-400 mt-0.5 break-all">
                      {event.sacred_trace.input_hash}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Raw JSON Payload */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-3.5 h-3.5 text-orange-400" />
                <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                  Raw JSON Payload
                </h4>
              </div>
              <button
                data-testid="copy-payload-btn"
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(raw_payload, null, 2),
                    "Payload"
                  )
                }
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Copy className="w-3 h-3" /> copy
              </button>
            </div>
            <pre
              data-testid="raw-json-payload"
              className="text-mono text-[11px] leading-relaxed bg-black/50 border border-white/5 rounded-lg p-4 overflow-x-auto text-zinc-300 max-h-64 overflow-y-auto"
            >
              {JSON.stringify(raw_payload, null, 2)}
            </pre>
          </section>

          {/* Storage Verification (IPFS) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                Storage Verification · IPFS
              </h4>
            </div>
            <div
              data-testid="ipfs-cid-block"
              className="group flex items-center justify-between gap-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-400 mb-1">
                  IPFS CID
                </div>
                <div className="text-mono text-[11px] text-zinc-200 truncate">
                  {ipfs_cid}
                </div>
              </div>
              <button
                data-testid="copy-ipfs-btn"
                onClick={() => copyToClipboard(ipfs_cid, "IPFS CID")}
                className="shrink-0 w-8 h-8 rounded-md border border-white/10 text-zinc-400 hover:text-cyan-200 hover:border-cyan-500/40 transition-all flex items-center justify-center"
                aria-label="Copy IPFS CID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* On-Chain Verification */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-[0.22em]">
                On-Chain Verification · Besu
              </h4>
            </div>
            <div
              data-testid="tx-hash-block"
              className="rounded-lg border border-orange-500/25 bg-orange-500/5 p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-orange-400 mb-1">
                    Transaction Hash
                  </div>
                  <div className="text-mono text-[12px] text-zinc-100 break-all">
                    {shortHash(tx_hash, 12, 10)}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] uppercase tracking-[0.18em] shrink-0">
                  <ShieldCheck className="w-3 h-3" /> verified
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-orange-500/20">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    Block
                  </div>
                  <div className="text-mono text-xs text-zinc-200 mt-0.5">
                    #{block_number.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    Network
                  </div>
                  <div className="text-mono text-xs text-zinc-200 mt-0.5">
                    Besu · privnet
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                data-testid="evidence-pack-btn"
                href={`${API}/events/${event.id}/evidence.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  toast.success("Evidence Pack generated", {
                    description: "Signed PDF · HMAC-SHA256",
                  })
                }
                className="group flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400/70 transition-all text-[12px] font-medium tracking-wide"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                Download Evidence Pack
              </a>
              <a
                data-testid="explorer-btn"
                href={explorerUrl}
                onClick={(e) => {
                  e.preventDefault();
                  toast("Explorer deeplink", {
                    description: explorerUrl,
                  });
                }}
                className="group flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-orange-500/40 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20 hover:border-orange-400/70 transition-all text-[12px] font-medium tracking-wide"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Explorer
              </a>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default AuditSlideOver;
