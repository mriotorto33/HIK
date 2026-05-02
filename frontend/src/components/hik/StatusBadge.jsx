export const StatusBadge = ({ status }) => {
  const cfg = {
    BLOCKED: {
      cls: "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(255,51,51,0.15)]",
      dot: "bg-red-500",
    },
    ALLOWED: {
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
      dot: "bg-emerald-500",
    },
    ALERT: {
      cls: "bg-orange-500/10 text-orange-300 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.15)]",
      dot: "bg-orange-400",
    },
  }[status] || {
    cls: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
    dot: "bg-zinc-400",
  };

  return (
    <span
      data-testid={`status-badge-${status.toLowerCase()}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border text-mono tracking-[0.15em] ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} pulse-dot`} />
      [{status}]
    </span>
  );
};

export default StatusBadge;
