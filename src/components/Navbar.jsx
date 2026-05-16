import { useState, useEffect } from "react";

const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function Navbar({ data, onResumeDownload, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label: "About me", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Beyond work", id: "beyond-work" },
    { label: "Contact us", id: "contact" },
  ];

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: scrolled ? "rgba(10,10,13,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "all 0.3s ease",
          padding: "0 40px", height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Logo / name */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {data.about.photo
              ? <img src={data.about.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>MP</span>}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", lineHeight: 1.2 }}>{data.about.name}</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{data.about.location}</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desk-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {navItems.map((n) => (
            <button key={n.id} className="nav-lnk" onClick={() => handleNav(n.id)}>{n.label}</button>
          ))}
          <a
            href="/resume.pdf"
            download="Mansi_Pandey_Resume.pdf"
            style={{
              padding: "10px 24px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#0b0b0d",
              backgroundColor: "#ffffff",
              borderRadius: "100px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255,255,255,0.2)";
            }}
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#ffffff" }}
        >
          ☰
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 499, background: "#0b0b0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 22, right: 24, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#ffffff" }}>✕</button>
          {navItems.map((n) => (
            <button
              key={n.id} onClick={() => handleNav(n.id)}
              style={{ background: "none", border: "none", fontSize: 22, fontWeight: 500, cursor: "pointer", color: "#ffffff", fontFamily: "inherit" }}
            >
              {n.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download="Mansi_Pandey_Resume.pdf"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "20px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#0b0b0d",
              backgroundColor: "#ffffff",
              borderRadius: "100px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Download Resume
          </a>
        </div>
      )}
    </>
  );
}
