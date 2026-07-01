'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-panel-strong rounded-lg px-3 py-2.5 text-xs">
      <div className="text-mono text-zinc-500 text-[10px] uppercase tracking-wider mb-2">
        {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          className="flex items-center gap-2 py-0.5"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-zinc-400 capitalize">
            {p.name.replace(/_/g, " ")}
          </span>
          <span className="ml-auto text-mono text-zinc-100 font-medium">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const LegendDot = ({ color, label, testId }) => (
  <div
    data-testid={testId}
    className="flex items-center gap-2 text-[11px] text-zinc-400"
  >
    <span
      className="w-2.5 h-2.5 rounded-[3px]"
      style={{
        background: color,
        boxShadow: `0 0 10px ${color}55`,
      }}
    />
    <span className="tracking-wide">{label}</span>
  </div>
);

export const IncidentChart = ({ data }) => {
  return (
    <div
      data-testid="incident-chart"
      className="glass-panel rounded-2xl p-5 sm:p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
            Incident Trends
          </h3>
          <p className="text-[11px] text-zinc-500 mt-1 tracking-wide">
            Realtime interceptions stream · last 24h
          </p>
        </div>
        <div className="flex items-center gap-4">
          <LegendDot
            testId="legend-dlp"
            color="#ff3333"
            label="DLP Blocks"
          />
          <LegendDot
            testId="legend-compliance"
            color="#ff7a00"
            label="Compliance Alerts"
          />
          <LegendDot
            testId="legend-allowed"
            color="#10b981"
            label="Allowed Actions"
          />
        </div>
      </div>

      <div className="flex-1 min-h-[280px] sm:min-h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gDlp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3333" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#ff3333" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gCompliance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff7a00" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#ff7a00" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gAllowed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tick={{ fill: "#71717a", fontFamily: "JetBrains Mono, monospace" }}
            />
            <YAxis
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#71717a", fontFamily: "JetBrains Mono, monospace" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="allowed_actions"
              name="Allowed Actions"
              stackId="1"
              stroke="#10b981"
              strokeWidth={1.5}
              fill="url(#gAllowed)"
            />
            <Area
              type="monotone"
              dataKey="compliance_alerts"
              name="Compliance Alerts"
              stackId="1"
              stroke="#ff7a00"
              strokeWidth={1.5}
              fill="url(#gCompliance)"
            />
            <Area
              type="monotone"
              dataKey="dlp_blocks"
              name="DLP Blocks"
              stackId="1"
              stroke="#ff3333"
              strokeWidth={1.5}
              fill="url(#gDlp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentChart;

