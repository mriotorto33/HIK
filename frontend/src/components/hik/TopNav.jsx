import { Link as RouterLink } from "react-router-dom";
import { Link as LinkIcon, ArrowLeft } from "lucide-react";

const LOGO_URL =
  "/logo-nav-alt.png";

export const TopNav = () => {
  return (
    <header
      data-testid="top-nav"
      className="fixed top-0 left-0 right-0 h-20 z-40 glass-panel-strong border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center gap-5">
        <RouterLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity text-zinc-400 hover:text-white" title="Back to main site">
          <ArrowLeft className="w-5 h-5" />
          <img
            src={LOGO_URL}
            alt="HIK — Human Is Kind"
            className="h-11 sm:h-[52px] lg:h-14 w-auto select-none"
            draggable={false}
          />
        </RouterLink>
        <div className="hidden md:flex flex-col justify-center pl-4 border-l border-white/10 h-10">
          <div
            data-testid="app-title"
            className="font-display text-[18px] sm:text-[20px] font-bold tracking-[-0.01em] text-zinc-50 leading-none"
          >
            Core Governance
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 mt-1.5">
            Zero-Trust Console
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div
          data-testid="kmir-engine-badge"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 pulse-dot" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium tracking-wide">
            KMIR Engine:{" "}
            <span className="text-emerald-200 font-semibold">Active</span>
          </span>
        </div>

        <div
          data-testid="besu-blockchain-badge"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300"
        >
          <LinkIcon className="w-3 h-3" strokeWidth={2.2} />
          <span className="text-[11px] font-medium tracking-wide">
            Besu Blockchain:{" "}
            <span className="text-orange-200 font-semibold">Synced</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
