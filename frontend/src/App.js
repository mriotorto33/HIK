import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TechnologyPage from "./pages/TechnologyPage";
import OriginsPage from "./pages/OriginsPage";
import ManifestoPage from "./pages/ManifestoPage";
import RoadmapPage from "./pages/RoadmapPage";
import ExecutiveSummaryPage from "./pages/ExecutiveSummaryPage";
import Dashboard from "./pages/Dashboard";
import AgentDetail from "./pages/AgentDetail";

const MainLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/origins" element={<OriginsPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/executive-summary" element={<ExecutiveSummaryPage />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/agent/:agentId" element={<AgentDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
