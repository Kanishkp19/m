import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { usePortfolioData } from "./hooks/usePortfolioData";

import Navbar    from "./components/Navbar.jsx";
import Hero      from "./components/Hero.jsx";
import About     from "./components/About.jsx";
import Services  from "./components/Services.jsx";
import Projects  from "./components/Projects.jsx";
import Process   from "./components/Process.jsx";
import Skills    from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Contact   from "./components/Contact.jsx";
import Footer    from "./components/Footer.jsx";

import AdminLogin, { adminSignOut } from "./admin/AdminLogin.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";

import "./styles/global.css";

export default function App() {
  const { data, loading, saving, saveProgress, save } = usePortfolioData();

  const [authed, setAuthed]         = useState(false);
  const [showLogin, setShowLogin]   = useState(false);
  const [showAdmin, setShowAdmin]   = useState(false);

  // ── Listen to Firebase auth state ─────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      if (!user) setShowAdmin(false);
    });
    return unsub;
  }, []);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openAdmin = () => {
    if (authed) setShowAdmin(true);
    else setShowLogin(true);
  };

  const onLoginSuccess = () => {
    setShowLogin(false);
    setShowAdmin(true);
  };

  const handleSignOut = async () => {
    await adminSignOut();
    setShowAdmin(false);
  };

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
    <>
      <Navbar
        data={data}
        onEditClick={openAdmin}
        onResumeDownload={handleResumeDownload}
        scrollTo={scrollTo}
      />

      <Hero    data={data} onResumeDownload={handleResumeDownload} />
      <About   data={data} onResumeDownload={handleResumeDownload} />
      <Services  data={data} />
      <Projects  data={data} />
      <Process   data={data} />
      <Skills    data={data} />
      <Experience data={data} />
      <Contact data={data} onResumeDownload={handleResumeDownload} />
      <Footer  data={data} scrollTo={scrollTo} />

      {/* Floating edit button */}
      <button
        onClick={openAdmin}
        title="Edit site"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 400, background: "#0d7377", color: "#fff", border: "none", borderRadius: "50%", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, boxShadow: "0 4px 20px rgba(13,115,119,0.4)", transition: "transform 0.2s,box-shadow 0.2s" }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,115,119,0.55)"; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,115,119,0.4)"; }}
      >
        ✏️
      </button>

      {/* Modals */}
      {showLogin && (
        <AdminLogin
          onSuccess={onLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}
      {showAdmin && (
        <AdminPanel
          data={data}
          onSave={save}
          onClose={() => setShowAdmin(false)}
          saving={saving}
          saveProgress={saveProgress}
          onSignOut={handleSignOut}
        />
      )}
    </>
  );
}
