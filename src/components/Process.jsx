const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function Process({ data }) {
  return (
    <section id="process" style={{ padding: "100px 40px", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 14, color: mid, marginBottom: 20 }}>How it works</p>
        <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,3.8vw,52px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 64, whiteSpace: "pre-line" }}>
          {data.process.heading}
        </h2>
        <div
          className="step-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(data.process.steps.length, 3)}, 1fr)`, gap: 24 }}
        >
          {data.process.steps.map((s, i) => (
            <div key={i} className="step-card">
              <div style={{ fontSize: 14, fontWeight: 700, color: teal, marginBottom: 20, letterSpacing: "0.04em" }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 14, color: dark }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: mid, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
