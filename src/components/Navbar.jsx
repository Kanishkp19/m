import { useState, useEffect } from "react";

const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function Navbar({ data, onEditClick, onResumeDownload, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label: "Projects", id: "projects" },
    { label: "About me", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
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
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid #f3f4f6" : "none",
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
          <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg,#0d7377,#14a085)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {data.about.photo
              ? <img src={data.about.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>MP</span>}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: dark, lineHeight: 1.2 }}>{data.about.name}</div>
            <div style={{ fontSize: 12, color: mid }}>{data.about.location}</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desk-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navItems.map((n) => (
            <button key={n.id} className="nav-lnk" onClick={() => handleNav(n.id)}>{n.label}</button>
          ))}
          {data.resume?.file && (
            <button onClick={onResumeDownload} className="dl-btn" style={{ padding: "8px 18px", fontSize: 13 }}>
              📄 Resume
            </button>
          )}
          <button
            onClick={onEditClick}
            style={{ display: "flex", alignItems: "center", gap: 7, background: teal, color: "#fff", border: "none", borderRadius: 24, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = "0.87"; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            ✏️ Edit
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: dark }}
        >
          ☰
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 499, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 22, right: 24, background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>✕</button>
          {navItems.map((n) => (
            <button
              key={n.id} onClick={() => handleNav(n.id)}
              style={{ background: "none", border: "none", fontSize: 22, fontWeight: 500, cursor: "pointer", color: dark, fontFamily: "inherit" }}
            >
              {n.label}
            </button>
          ))}
          {data.resume?.file && (
            <button onClick={() => { onResumeDownload(); setMenuOpen(false); }} className="dl-btn">📄 Download Resume</button>
          )}
          <button
            onClick={() => { onEditClick(); setMenuOpen(false); }}
            style={{ background: teal, color: "#fff", border: "none", borderRadius: 24, padding: "12px 28px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            ✏️ Edit Site
          </button>
        </div>
      )}
    </>
  );
}
