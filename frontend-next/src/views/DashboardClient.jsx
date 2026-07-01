'use client';

import { useEffect, useState } from "react";
import { ShieldAlert, FileWarning, Link as LinkIcon, Gauge } from "lucide-react";
import Background from "@/components/hik/Background";
import TopNav from "@/components/hik/TopNav";
import KpiCard from "@/components/hik/KpiCard";
import IncidentChart from "@/components/hik/IncidentChart";
import RiskyEntitiesLeaderboard from "@/components/hik/RiskyEntitiesLeaderboard";
import EventFeed from "@/components/hik/EventFeed";
import AuditSlideOver from "@/components/hik/AuditSlideOver";
import { fetchKpis, fetchTrends, fetchEntities, fetchEvents } from "@/lib/api";

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-zinc-800/60 rounded-md ${className}`}
  />
);

export default function DashboardClient() {
  const [kpis, setKpis] = useState(null);
  const [trends, setTrends] = useState([]);
  const [entities, setEntities] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [k, t, en, ev] = await Promise.all([
          fetchKpis(),
          fetchTrends(),
          fetchEntities(),
          fetchEvents(25),
        ]);
        if (!mounted) return;
        setKpis(k);
        setTrends(t);
        setEntities(en);
        setEvents(ev);
      } catch (e) {
        console.error("Failed to load dashboard", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelect = (ev) => {
    setSelectedEvent(ev);
    setOpen(true);
  };

  return (
    <div className="relative min-h-screen text-zinc-100">
      <Background />
      <TopNav />

      <main
        data-testid="dashboard-main"
        className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16"
      >
        <section
          data-testid="kpi-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 fade-up"
        >
          {loading || !kpis ? (
            <>
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
            </>
          ) : (
            <>
              <KpiCard
                testId="kpi-total-interceptions"
                label="Total Interceptions · 24h"
                value={kpis.total_interceptions_24h.toLocaleString()}
                subValue="BLOCKED + ALERT events"
                delta={kpis.total_interceptions_delta}
                icon={ShieldAlert}
                accent="red"
              />
              <KpiCard
                testId="kpi-top-violated"
                label="Top Violated Rule"
                value={kpis.top_violated_rule}
                subValue={`${kpis.top_violated_rule_count} interceptions`}
                icon={FileWarning}
                accent="cyan"
              />
              <KpiCard
                testId="kpi-on-chain"
                label="On-Chain Anchors"
                value={kpis.on_chain_anchors.toLocaleString()}
                subValue="Anchored on Besu + IPFS"
                delta={kpis.on_chain_anchors_delta}
                icon={LinkIcon}
                accent="violet"
              />
              <KpiCard
                testId="kpi-trust-score"
                label="Global Trust Score"
                value={`${kpis.global_trust_score}/100`}
                subValue="HIK confidence index"
                delta={kpis.global_trust_score_delta}
                icon={Gauge}
                accent="emerald"
              />
            </>
          )}
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 fade-up">
          <div className="lg:col-span-2">
            {loading ? (
              <Skeleton className="h-[420px] rounded-2xl" />
            ) : (
              <IncidentChart data={trends} />
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton className="h-[420px] rounded-2xl" />
            ) : (
              <RiskyEntitiesLeaderboard entities={entities} />
            )}
          </div>
        </section>

        <section className="mt-6 fade-up">
          {loading ? (
            <Skeleton className="h-[420px] rounded-2xl" />
          ) : (
            <EventFeed
              initialEvents={events}
              onSelect={handleSelect}
              selectedId={selectedEvent?.id}
            />
          )}
        </section>
      </main>

      <AuditSlideOver
        event={selectedEvent}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
