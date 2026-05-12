const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function Experience({ data }) {
  return (
    <section id="experience" style={{ padding: "100px 40px", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, marginBottom: 52 }}>
          {data.experience.heading}
        </h2>

        <div style={{ position: "relative", paddingLeft: 30 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 0, top: 10, bottom: 0, width: 1.5, background: "linear-gradient(to bottom,#0d7377,#e5e7eb)" }} />

          {data.experience.items.map((exp, i) => (
            <div
              key={i}
              className="tl-item"
              style={{ position: "relative", paddingBottom: i < data.experience.items.length - 1 ? 36 : 0 }}
            >
              {/* Dot */}
              <div style={{ position: "absolute", left: -37, top: 22, width: 14, height: 14, borderRadius: "50%", background: i === 0 ? teal : "#fff", border: `2px solid ${teal}` }} />

              <div className="tl-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: dark, marginBottom: 3 }}>{exp.role}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: teal }}>{exp.company} · {exp.location}</div>
                  </div>
                  <span style={{ fontSize: 11, color: mid, background: "#f3f4f6", padding: "4px 12px", borderRadius: 10, whiteSpace: "nowrap" }}>
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
