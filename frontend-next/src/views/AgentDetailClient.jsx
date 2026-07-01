'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  AlertOctagon,
  Gauge,
  Bot,
  ShieldCheck,
} from "lucide-react";
import Background from "@/components/hik/Background";
import TopNav from "@/components/hik/TopNav";
import StatusBadge from "@/components/hik/StatusBadge";
import AuditSlideOver from "@/components/hik/AuditSlideOver";
import KpiCard from "@/components/hik/KpiCard";
import { fetchAgent } from "@/lib/api";

const formatTime = (iso) => {
  try {
    return new Date(iso).toISOString().replace("T", " ").slice(0, 19);
  } catch {
    return iso;
  }
};

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-zinc-800/60 rounded-md ${className}`} />
);

export default function AgentDetailClient() {
  const params = useParams();
  const agentId = params?.agentId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!agentId) return;
    let alive = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const d = await fetchAgent(agentId, 100);
        if (alive) setData(d);
      } catch (e) {
        if (alive)
          setError(
            e?.response?.status === 404
              ? "No events recorded for this agent."
              : "Failed to load agent detail."
          );
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [agentId]);

  const handleSelect = (ev) => {
    setSelected(ev);
    setOpen(true);
  };

  const maxRuleCount = data?.top_rules?.[0]?.count || 1;

  return (
    <div className="relative min-h-screen text-zinc-100">
      <Background />
      <TopNav />

      <main
        data-testid="agent-detail-main"
        className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16"
      >
        <Link
          href="/"
          data-testid="back-to-dashboard"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-zinc-500 hover:text-zinc-200 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to governance console
        </Link>

        <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-6 flex items-start justify-between gap-4 flex-wrap fade-up">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-orange-500/30 bg-orange-500/10 shrink-0">
              <Bot className="w-5 h-5 text-orange-300" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.28em] text-orange-400 mb-1">
                Agent Forensic Profile
              </div>
              <h1
                data-testid="agent-entity-id"
                className="text-mono text-lg sm:text-xl font-semibold text-zinc-50 tracking-tight break-all"
              >
                {agentId}
              </h1>
              {data && (
                <div className="flex items-center gap-3 mt-2 flex-wrap text-[11px] text-zinc-500">
                  <span className="text-mono uppercase tracking-wider">{data.category}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-mono uppercase tracking-wider">{data.region}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-mono">first seen {formatTime(data.first_seen)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
        ) : error ? (
          <div data-testid="agent-error" className="glass-panel rounded-2xl p-8 text-center text-zinc-400">{error}</div>
        ) : (
          <>
            <section data-testid="agent-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 fade-up">
              <KpiCard testId="agent-kpi-risk" label="Agent Risk Score" value={`${data.risk_score}/100`} subValue="KMIR composite" icon={Gauge} accent={data.risk_score >= 70 ? "red" : "emerald"} />
              <KpiCard testId="agent-kpi-blocked" label="Blocked Actions" value={data.blocked.toLocaleString()} subValue="DLP interceptions" icon={ShieldAlert} accent="red" />
              <KpiCard testId="agent-kpi-alerts" label="Compliance Alerts" value={data.alerts.toLocaleString()} subValue="policy warnings" icon={AlertOctagon} accent="violet" />
              <KpiCard testId="agent-kpi-allowed" label="Allowed Actions" value={data.allowed.toLocaleString()} subValue={`of ${data.total_events} total`} icon={CheckCircle2} accent="emerald" />
            </section>

            <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 fade-up">
              <div data-testid="agent-top-rules" className="glass-panel rounded-2xl p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-zinc-100 tracking-tight mb-1">Top Violated Rules</h3>
                <p className="text-[11px] text-zinc-500 tracking-wide mb-4">Across BLOCKED + ALERT events</p>
                <div className="space-y-3">
                  {data.top_rules.length === 0 && <div className="text-xs text-zinc-500">No rule violations recorded.</div>}
                  {data.top_rules.map((r, i) => (
                    <div key={r.rule} data-testid={`rule-row-${i}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-mono text-[11px] text-orange-300 truncate">{r.rule}</div>
                        <div className="text-mono text-xs text-zinc-300">{r.count}</div>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-cyan-400 rounded-full" style={{ width: `${Math.max(4, (r.count / maxRuleCount) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div data-testid="agent-timeline" className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" strokeWidth={1.8} />
                    <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">Violation Timeline</h3>
                    <span className="ml-2 text-[10px] text-zinc-500 uppercase tracking-[0.22em]">{data.timeline.length} events</span>
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="sticky top-0 bg-zinc-950/80 backdrop-blur-xl">
                      <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5">
                        <th className="text-left font-medium px-5 sm:px-6 py-3 w-[120px]">Timestamp</th>
                        <th className="text-left font-medium px-3 py-3">Action Intent</th>
                        <th className="text-left font-medium px-3 py-3 w-[200px]">KMIR Rule</th>
                        <th className="text-left font-medium px-3 py-3 w-[110px]">Status</th>
                        <th className="text-right font-medium px-5 sm:px-6 py-3 w-[70px]">Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-mono">
                      {data.timeline.map((e) => (
                        <tr key={e.id} data-testid={`timeline-row-${e.id}`} onClick={() => handleSelect(e)} className="cursor-pointer border-b border-white/5 hover:bg-white/[0.025] transition-colors">
                          <td className="px-5 sm:px-6 py-3 text-[11px] text-zinc-500 whitespace-nowrap">{formatTime(e.timestamp)}</td>
                          <td className="px-3 py-3 text-[11px] text-zinc-300 max-w-[280px] truncate">{e.action_intent}</td>
                          <td className="px-3 py-3 text-[10px] text-orange-300 whitespace-nowrap">{e.kmir_rule}</td>
                          <td className="px-3 py-3"><StatusBadge status={e.status} /></td>
                          <td className="px-5 sm:px-6 py-3 text-right"><span className="text-[10px] uppercase tracking-[0.18em] text-cyan-400">Inspect</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <AuditSlideOver event={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
