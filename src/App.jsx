import { usePortfolioData } from "./hooks/usePortfolioData";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import ChemicalBurnBackground from "./components/ChemicalBurnBackground.jsx";

import Projects from "./components/Projects.jsx";
import Process from "./components/Process.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import BeyondWork from "./components/BeyondWork.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import "./styles/global.css";

export default function App() {
  const { data, loading } = usePortfolioData();

  // ── Navigation helpers ────────────────────────────────────────────────────
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // ── Resume download ───────────────────────────────────────────────────────
  const handleResumeDownload = () => {
    if (!data.resume?.file) return;
    const a = document.createElement("a");
    a.href = data.resume.file;
    a.download = data.resume.filename || "Mansi_Pandey_Resume.pdf";
    a.click();
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", color: "#6b7280" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#0d7377", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <div style={{ fontSize: 14 }}>Loading portfolio…</div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <ChemicalBurnBackground>
      <Navbar
        data={data}
        onResumeDownload={handleResumeDownload}
        scrollTo={scrollTo}
      />

      <Hero data={data} onResumeDownload={handleResumeDownload} />
      <About data={data} onResumeDownload={handleResumeDownload} />

      <Projects data={data} />
      <Process data={data} />
      <Skills data={data} />
      <Experience data={data} />
      <BeyondWork />
      <Contact data={data} onResumeDownload={handleResumeDownload} />
      <Footer data={data} scrollTo={scrollTo} />
    </ChemicalBurnBackground>
  );
}
