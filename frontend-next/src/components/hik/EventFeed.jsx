'use client';

import { useEffect, useRef, useState, useMemo } from "react";
import { ShieldCheck, Activity, Search, Download, Filter, X } from "lucide-react";
import { fetchEvents, simulateEvent, csvExportUrl, wsEventsUrl } from "@/lib/api";
import StatusBadge from "@/components/hik/StatusBadge";

const formatTime = (iso) => {
  try {
    return new Date(iso).toISOString().slice(11, 19);
  } catch {
    return iso;
  }
};

const STATUS_OPTIONS = ["ALL", "BLOCKED", "ALERT", "ALLOWED"];
const SEVERITY_OPTIONS = ["all", "critical", "high", "medium", "low"];

const useDebounced = (value, delay = 300) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

export const EventFeed = ({ initialEvents, onSelect, selectedId }) => {
  const [events, setEvents] = useState(initialEvents || []);
  const [flashId, setFlashId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [severity, setSeverity] = useState("all");
  const [streamMode, setStreamMode] = useState("connecting");
  const debouncedSearch = useDebounced(search, 300);
  const wsRef = useRef(null);
  const pollRef = useRef(null);
  const filtersActive = useMemo(
    () =>
      debouncedSearch !== "" || status !== "ALL" || severity !== "all",
    [debouncedSearch, status, severity]
  );

  // Fetch events whenever filters change
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchEvents({
          limit: 30,
          status,
          severity,
          search: debouncedSearch || undefined,
        });
        if (alive) setEvents(data);
      } catch (e) {
        // keep existing
      }
    })();
    return () => {
      alive = false;
    };
  }, [debouncedSearch, status, severity]);

  // Live stream via WebSocket with polling fallback
  useEffect(() => {
    let cancelled = false;

    const applyIncoming = (ev) => {
      setEvents((prev) => {
        // Skip inserts that don't match active filters
        const matchesStatus = status === "ALL" || ev.status === status;
        const matchesSev = severity === "all" || ev.severity === severity;
        const term = (debouncedSearch || "").toLowerCase();
        const matchesSearch =
          !term ||
          ev.entity_id.toLowerCase().includes(term) ||
          ev.action_intent.toLowerCase().includes(term) ||
          ev.kmir_rule.toLowerCase().includes(term);
        if (!matchesStatus || !matchesSev || !matchesSearch) return prev;
        const next = [ev, ...prev.filter((x) => x.id !== ev.id)].slice(0, 30);
        return next;
      });
      setFlashId(ev.id);
      setTimeout(() => setFlashId(null), 1800);
    };

    const startPolling = () => {
      if (pollRef.current) return;
      setStreamMode("polling");
      pollRef.current = setInterval(async () => {
        try {
          const ev = await simulateEvent();
          if (!cancelled) applyIncoming(ev);
        } catch {
          /* silent */
        }
      }, 4500);
    };

    const startWs = () => {
      try {
        const ws = new WebSocket(wsEventsUrl());
        wsRef.current = ws;
        ws.onopen = () => {
          if (!cancelled) setStreamMode("live");
        };
        ws.onmessage = (msg) => {
          if (cancelled) return;
          try {
            applyIncoming(JSON.parse(msg.data));
          } catch {
            /* ignore */
          }
        };
        ws.onerror = () => {
          try {
            ws.close();
          } catch {
            /* ignore */
          }
        };
        ws.onclose = () => {
          if (!cancelled && !pollRef.current) startPolling();
        };
      } catch {
        startPolling();
      }
    };

    startWs();

    return () => {
      cancelled = true;
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          /* ignore */
        }
        wsRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
    // Intentionally stable: stream is one-shot. Filters are applied via applyIncoming closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, severity, debouncedSearch]);

  const handleExport = () => {
    const url = csvExportUrl({
      status,
      severity,
      search: debouncedSearch || undefined,
      limit: 1000,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setSeverity("all");
  };

  const streamDot = {
    live: { color: "bg-emerald-400", label: "LIVE · WS" },
    polling: { color: "bg-cyan-400", label: "LIVE · POLL" },
    connecting: { color: "bg-amber-400", label: "CONNECTING" },
  }[streamMode];

  return (
    <div
      data-testid="event-feed"
      className="glass-panel rounded-2xl p-0 overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/5 flex-wrap">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" strokeWidth={1.8} />
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
            Live Event Feed
          </h3>
          <span className="ml-2 text-[10px] text-zinc-500 uppercase tracking-[0.22em]">
            Cryptographic audit stream
          </span>
        </div>
        <div
          data-testid="live-indicator"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-300"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${streamDot.color} opacity-60 pulse-dot`}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${streamDot.color}`} />
          </span>
          {streamDot.label}
        </div>
      </div>

      {/* Toolbar */}
      <div
        data-testid="event-feed-toolbar"
        className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 border-b border-white/5 flex-wrap"
      >
        <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              data-testid="event-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entity, intent, rule..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-zinc-900/80 border border-white/10 text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all text-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-zinc-500" />
          <select
            data-testid="event-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-zinc-900/80 border border-white/10 rounded-md px-2.5 py-1.5 text-[11px] text-zinc-200 text-mono uppercase tracking-wider focus:outline-none focus:border-orange-500/50"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            data-testid="event-severity-filter"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="bg-zinc-900/80 border border-white/10 rounded-md px-2.5 py-1.5 text-[11px] text-zinc-200 text-mono uppercase tracking-wider focus:outline-none focus:border-orange-500/50"
          >
            {SEVERITY_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {filtersActive && (
            <button
              data-testid="clear-filters-btn"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-white/25 transition-all text-[10px] uppercase tracking-wider"
            >
              <X className="w-3 h-3" /> clear
            </button>
          )}
        </div>

        <button
          data-testid="export-csv-btn"
          onClick={handleExport}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-all text-[11px] uppercase tracking-wider font-medium"
        >
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5">
              <th className="text-left font-medium px-5 sm:px-6 py-3 w-[110px]">Timestamp</th>
              <th className="text-left font-medium px-3 py-3">Entity ID</th>
              <th className="text-left font-medium px-3 py-3">Action Intent</th>
              <th className="text-left font-medium px-3 py-3 w-[220px]">KMIR Rule</th>
              <th className="text-left font-medium px-3 py-3 w-[120px]">Status</th>
              <th className="text-right font-medium px-5 sm:px-6 py-3 w-[90px]">Verify</th>
            </tr>
          </thead>
          <tbody className="text-mono">
            {events.map((e) => {
              const isSelected = selectedId === e.id;
              return (
                <tr
                  key={e.id}
                  data-testid={`event-row-${e.id}`}
                  onClick={() => onSelect(e)}
                  className={`cursor-pointer border-b border-white/5 transition-colors group ${
                    isSelected ? "bg-orange-500/5" : "hover:bg-white/[0.025]"
                  } ${flashId === e.id ? "row-flash" : ""}`}
                >
                  <td className="px-5 sm:px-6 py-3 text-[11px] text-zinc-500 whitespace-nowrap">
                    {formatTime(e.timestamp)}
                  </td>
                  <td className="px-3 py-3 text-[11px] text-cyan-300 whitespace-nowrap">
                    {e.entity_id}
                  </td>
                  <td className="px-3 py-3 max-w-[320px]">
                    <div className="text-[11px] text-zinc-300 truncate">
                      {e.input_text || e.action_intent}
                    </div>
                    {e.cascade_layer && (
                      <span className="inline-block mt-1 text-[9px] uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded px-1.5 py-0.5">
                        {e.cascade_layer}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-[10px] text-orange-300 whitespace-nowrap">
                    {e.kmir_rule}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-5 sm:px-6 py-3 text-right">
                    <button
                      data-testid={`verify-btn-${e.id}`}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        onSelect(e);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white/10 bg-zinc-900/60 text-orange-300 hover:text-orange-200 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all"
                      title="Verify on-chain"
                      aria-label="Verify on-chain"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-xs text-zinc-500"
                  data-testid="event-feed-empty"
                >
                  {filtersActive
                    ? "No events match current filters."
                    : "Awaiting events from KMIR engine..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventFeed;

