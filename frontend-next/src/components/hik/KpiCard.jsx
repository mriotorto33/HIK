'use client';

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const KpiCard = ({
  testId,
  label,
  value,
  subValue,
  delta,
  icon: Icon,
  accent = "violet",
}) => {
  const accentColors = {
    red: {
      glow: "before:bg-red-500/10",
      text: "text-red-400",
      ring: "group-hover:border-red-500/40",
    },
    emerald: {
      glow: "before:bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "group-hover:border-emerald-500/40",
    },
    violet: {
      glow: "before:bg-orange-500/10",
      text: "text-orange-400",
      ring: "group-hover:border-orange-500/40",
    },
    cyan: {
      glow: "before:bg-cyan-500/10",
      text: "text-cyan-400",
      ring: "group-hover:border-cyan-500/40",
    },
  }[accent];

  const deltaNum = typeof delta === "number" ? delta : null;
  const DeltaIcon =
    deltaNum === null
      ? Minus
      : deltaNum >= 0
        ? TrendingUp
        : TrendingDown;
  const deltaColor =
    deltaNum === null
      ? "text-zinc-500"
      : deltaNum >= 0
        ? "text-emerald-400"
        : "text-red-400";

  return (
    <div
      data-testid={testId}
      className={`group relative glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-300 border border-white/10 ${accentColors.ring} overflow-hidden before:content-[''] before:absolute before:-top-20 before:-right-20 before:w-56 before:h-56 before:rounded-full before:blur-3xl before:opacity-40 ${accentColors.glow}`}
    >
      <div className="relative flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-medium">
          {label}
        </span>
        {Icon && (
          <Icon
            className={`w-4 h-4 ${accentColors.text}`}
            strokeWidth={1.8}
          />
        )}
      </div>

      <div className="relative mt-5">
        <div
          data-testid={`${testId}-value`}
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-50"
        >
          {value}
        </div>
        {subValue && (
          <div className="text-xs text-zinc-500 mt-1.5 truncate">
            {subValue}
          </div>
        )}
      </div>

      {deltaNum !== null && (
        <div className="relative mt-4 flex items-center gap-1.5">
          <DeltaIcon className={`w-3.5 h-3.5 ${deltaColor}`} strokeWidth={2} />
          <span className={`text-xs font-medium ${deltaColor}`}>
            {deltaNum >= 0 ? "+" : ""}
            {deltaNum}%
          </span>
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider ml-1">
            vs 24h
          </span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;

