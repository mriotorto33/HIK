import axios from "axios";

// Always use a relative path — nginx proxies /api/ to the backend.
// This works from any domain (humaniskind.com, hik.artificialmente.uy, Cloud Run URL)
// without any CORS issues.
export const API = "/api";

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

const buildQuery = (params = {}) => {
  const u = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "" || v === "ALL" || v === "all") return;
    u.append(k, v);
  });
  const s = u.toString();
  return s ? `?${s}` : "";
};

export const fetchKpis = () => api.get("/kpis").then((r) => r.data);
export const fetchTrends = () => api.get("/incident-trends").then((r) => r.data);
export const fetchEntities = () => api.get("/risky-entities").then((r) => r.data);
export const fetchEvents = (opts = {}) => {
  const { limit = 25, status, severity, search } = opts;
  return api.get(`/events${buildQuery({ limit, status, severity, search })}`).then((r) => r.data);
};
export const fetchEventById = (id) => api.get(`/events/${id}`).then((r) => r.data);
export const simulateEvent = () => api.post("/events/simulate").then((r) => r.data);
export const fetchAgent = (entityId, limit = 100) =>
  api.get(`/agents/${encodeURIComponent(entityId)}?limit=${limit}`).then((r) => r.data);

export const csvExportUrl = (opts = {}) => {
  const { status, severity, search, limit = 1000 } = opts;
  return `${API}/events/export.csv${buildQuery({ status, severity, search, limit })}`;
};

export const wsEventsUrl = () => {
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  return `${proto}://${window.location.host}/api/events/stream`;
};
