const dark = "#111111";
const mid = "#6b7280";

export default function Projects({ data }) {
  return (
    <section id="projects" style={{ padding: "100px 40px", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 14, color: mid, marginBottom: 20 }}>Portfolio</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4vw,54px)", fontWeight: 700, marginBottom: 64 }}>
          {data.projects.heading}
        </h2>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {data.projects.items.map((p, i) => (
            <div key={i} className="proj-card" style={{ cursor: "pointer" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 18 }}>
                {p.image ? (
                  <img
                    className="proj-img"
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    className="proj-img"
                    style={{ width: "100%", aspectRatio: "16/10", background: p.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <div style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", borderRadius: 14, padding: "16px 24px", textAlign: "center" }}>
                      <div style={{ fontSize: 26, marginBottom: 6 }}>🖥️</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 500, letterSpacing: "0.06em" }}>CASE STUDY</div>
                    </div>
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: dark, marginBottom: 5 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: mid }}>{p.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
