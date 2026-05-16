const teal = "rgba(255,255,255,0.8)";
const dark = "#ffffff";
const mid = "#9ca3af";

export default function Experience({ data }) {
  return (
    <section id="experience" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)", background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: dark, marginBottom: 52 }}>
          {data.experience.heading}
        </h2>

        <div style={{ position: "relative", paddingLeft: "clamp(20px,4vw,30px)" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 0, top: 10, bottom: 0, width: 1.5, background: "linear-gradient(to bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.1))" }} />

          {data.experience.items.map((exp, i) => (
            <div
              key={i}
              className="tl-item"
              style={{ position: "relative", paddingBottom: i < data.experience.items.length - 1 ? 36 : 0 }}
            >
              {/* Dot */}
              <div style={{ position: "absolute", left: "clamp(-31px,-4.5vw,-31px)", top: 22, width: 14, height: 14, borderRadius: "50%", background: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)", border: `2px solid rgba(255,255,255,0.3)` }} />

              <div className="tl-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 600, color: dark, marginBottom: 3 }}>{exp.role}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: teal }}>{exp.company} · {exp.location}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 10, whiteSpace: "nowrap" }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: mid, lineHeight: 1.8 }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
