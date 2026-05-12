const teal = "#0d7377";

export default function Skills({ data }) {
  return (
    <section id="skills" style={{ padding: "100px 40px", background: "#fafafa", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, marginBottom: 52 }}>
          {data.skills.heading}
        </h2>
        <div
          className="skill-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(data.skills.categories.length, 3)}, 1fr)`, gap: 40 }}
        >
          {data.skills.categories.map((cat, ci) => (
            <div key={ci}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: teal, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16, paddingBottom: 12, borderBottom: "1.5px solid #e5e7eb" }}>
                {cat.name}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((sk, si) => (
                  <span key={si} className="skill-tag">{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
