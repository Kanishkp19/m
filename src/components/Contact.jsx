const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function Contact({ data, onResumeDownload }) {
  return (
    <section id="contact" style={{ padding: "100px 40px", background: "#fafafa", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, marginBottom: 14 }}>
          {data.contact.heading}
        </h2>
        <p style={{ fontSize: 16, color: mid, marginBottom: 48 }}>{data.contact.subheading}</p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <a
            href={`mailto:${data.contact.email}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark, color: "#fff", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            ✉️ Email Me
          </a>
          <a
            href={data.contact.linkedin || "#"}
            target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: dark, border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = teal; e.currentTarget.style.color = teal; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = dark; }}
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
