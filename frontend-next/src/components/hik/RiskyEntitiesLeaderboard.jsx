'use client';

import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";

const riskColor = (score) => {
  if (score >= 85) return "from-red-500 to-orange-400";
  if (score >= 70) return "from-orange-500 to-amber-400";
  return "from-amber-500 to-yellow-300";
};

const riskTextColor = (score) => {
  if (score >= 85) return "text-red-400";
  if (score >= 70) return "text-orange-400";
  return "text-amber-300";
};

export const RiskyEntitiesLeaderboard = ({ entities }) => {
  return (
    <div
      data-testid="risky-entities-leaderboard"
      className="glass-panel rounded-2xl p-5 sm:p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
            Top Risky Entities
          </h3>
          <p className="text-[11px] text-zinc-500 mt-1 tracking-wide">
            Agents ranked by KMIR risk vector
          </p>
        </div>
        <AlertTriangle className="w-4 h-4 text-orange-400" strokeWidth={1.8} />
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3">
        {entities.map((e, idx) => (
          <Link
            href={`/dashboard/agent/${encodeURIComponent(e.name)}`}
            key={e.id}
            data-testid={`risky-entity-${idx}`}
            className="group block rounded-lg -mx-2 px-2 py-2 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-zinc-600 text-mono w-5">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="text-mono text-[11px] text-zinc-200 group-hover:text-cyan-300 transition-colors truncate">
                    {e.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                    {e.category} · {e.region} · {e.violations_24h} events
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-mono text-xs font-semibold tabular-nums ${riskTextColor(
                    e.risk_score
                  )}`}
                >
                  {e.risk_score}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
            <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${riskColor(
                  e.risk_score
                )} rounded-full transition-all duration-700`}
                style={{
                  width: `${e.risk_score}%`,
                  boxShadow:
                    e.risk_score >= 85
                      ? "0 0 10px rgba(255,51,51,0.45)"
                      : "none",
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RiskyEntitiesLeaderboard;

