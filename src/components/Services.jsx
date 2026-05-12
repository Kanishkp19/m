const mid = "#6b7280";

export default function Services({ data }) {
  return (
    <section style={{ padding: "100px 0", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
      <p style={{ textAlign: "center", fontSize: 14, color: mid, marginBottom: 20, letterSpacing: "0.02em" }}>What I do</p>
      <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,3.8vw,52px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 56, padding: "0 40px", whiteSpace: "pre-line" }}>
        {data.services.heading}
      </h2>

      <div className="marquee-wrap" style={{ marginBottom: 14 }}>
        <div className="marquee-track">
          {[...data.services.items, ...data.services.items].map((s, i) => (
            <div key={i} className="svc-pill">{s.icon} {s.label}</div>
          ))}
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track-rev">
          {[...data.services.items, ...data.services.items].map((s, i) => (
            <div key={i} className="svc-pill">{s.icon} {s.label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
