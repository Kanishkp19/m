const teal = "rgba(255,255,255,0.7)";
const dark = "#ffffff";
const mid = "#9ca3af";

export default function Contact({ data, onResumeDownload }) {
  return (
    <section id="contact" style={{ padding: "100px 40px", background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, color: dark, marginBottom: 14 }}>
          {data.contact.heading}
        </h2>
        <p style={{ fontSize: 16, color: mid, marginBottom: 48 }}>{data.contact.subheading}</p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <a
            href={`mailto:${data.contact.email}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            ✉️ Email Me
          </a>
          <a
            href={data.contact.linkedin || "#"}
            target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            🔗 LinkedIn
          </a>
          {data.resume?.file && (
            <button onClick={onResumeDownload} className="dl-btn">📄 Resume</button>
          )}
        </div>

        <div style={{ fontSize: 13, color: "#9ca3af" }}>{data.contact.phone}</div>
      </div>
    </section>
  );
}
