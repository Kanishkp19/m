const dark = "#ffffff";
const mid = "#9ca3af";

export default function Projects({ data }) {
  return (
    <section id="projects" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)", background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 14, color: mid, marginBottom: 20 }}>Portfolio</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,54px)", fontWeight: 700, color: dark, marginBottom: 64 }}>
          {data.projects.heading}
        </h2>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {data.projects.items.map((p, i) => {
            const cardContent = (
              <div className="proj-card" style={{ cursor: p.link ? "pointer" : "default" }}>
                <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 18, border: "1px solid rgba(255,255,255,0.05)" }}>
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
                      <div style={{ background: "rgba(0,0,0,0.18)", backdropFilter: "blur(10px)", borderRadius: 14, padding: "16px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize: 26, marginBottom: 6 }}>🖥️</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 500, letterSpacing: "0.06em" }}>CASE STUDY</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3 style={{ fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 600, color: dark, marginBottom: 5 }}>
                  {p.title}
                  {p.link && <span style={{ fontSize: 14, marginLeft: 8, color: "rgba(255,255,255,0.5)" }}>↗</span>}
                </h3>
                <p style={{ fontSize: 13, color: mid }}>{p.subtitle}</p>
              </div>
            );

            return p.link ? (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                {cardContent}
              </a>
            ) : (
              <div key={i}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
