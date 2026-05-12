export default function Hero({ data, onResumeDownload }) {
  return (
    <section
      id="hero"
      style={{
        height: "100vh", minHeight: 600,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#8fa8c8 0%,#9a8ec8 18%,#b08ec4 32%,#c49ab8 48%,#b49ac4 62%,#8fa8c8 78%,#9ab0cc 100%)", animation: "heroIn 1.4s ease both" }} />

      {/* Blobs */}
      <div style={{ position: "absolute", top: "8%", left: "8%", width: "42%", height: "42%", borderRadius: "50%", background: "radial-gradient(circle,rgba(200,170,220,0.65) 0%,transparent 68%)", filter: "blur(45px)" }} />
      <div style={{ position: "absolute", bottom: "12%", right: "8%", width: "38%", height: "38%", borderRadius: "50%", background: "radial-gradient(circle,rgba(148,128,200,0.6) 0%,transparent 68%)", filter: "blur(55px)" }} />
      <div style={{ position: "absolute", top: "45%", left: "40%", width: "32%", height: "32%", borderRadius: "50%", background: "radial-gradient(circle,rgba(210,185,225,0.45) 0%,transparent 70%)", filter: "blur(38px)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 5%", animation: "fadeUp 1s ease 0.5s both", opacity: 0 }}>
        <p style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "rgba(255,255,255,0.72)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, fontWeight: 400 }}>
          Senior UI/UX Designer
        </p>
        <h1 style={{ fontSize: "clamp(28px,5vw,68px)", fontWeight: 300, color: "#fff", lineHeight: 1.3, maxWidth: 800, margin: "0 auto", letterSpacing: "-0.01em" }}>
          {data.hero.tagline}
        </h1>
        {data.resume?.file && (
          <div style={{ marginTop: 40 }}>
            <button
              onClick={onResumeDownload}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
            >
              📄 Download Resume
            </button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeUp 1s ease 1.4s both", opacity: 0 }}>
        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.45)" }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Scroll</span>
      </div>
    </section>
  );
}
