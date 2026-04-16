import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TechnologyPage from "./pages/TechnologyPage";
import OriginsPage from "./pages/OriginsPage";
import ManifestoPage from "./pages/ManifestoPage";
import RoadmapPage from "./pages/RoadmapPage";
import ExecutiveSummaryPage from "./pages/ExecutiveSummaryPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/origins" element={<OriginsPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/executive-summary" element={<ExecutiveSummaryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
