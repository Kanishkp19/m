const teal = "#0d7377";
const dark = "#111111";
const mid = "#6b7280";

export default function About({ data, onResumeDownload }) {
  return (
    <section id="about" style={{ padding: "110px 40px", background: "#fff" }}>
      <div
        className="two-col"
        style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
      >
        {/* Left: text */}
        <div>
          <div style={{ display: "inline-block", border: "1px solid #e5e7eb", borderRadius: 20, padding: "5px 16px", fontSize: 13, color: mid, marginBottom: 36 }}>About</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 32, whiteSpace: "pre-line", color: dark }}>
            {data.about.heading}
          </h2>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
            {[
              ["📷", data.about.instagram, "Instagram"],
              ["🐦", data.about.twitter, "Twitter"],
              ["🎨", data.about.dribbble, "Dribbble"],
              ["💼", data.about.linkedin, "LinkedIn"],
            ].map(([icon, href, label]) => (
              <a
                key={label} href={href || "#"} title={label}
                target="_blank" rel="noreferrer"
                style={{ width: 38, height: 38, border: "1px solid #e5e7eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, textDecoration: "none", transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = teal; e.currentTarget.style.background = "#f0fdf9"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "transparent"; }}
              >
                {icon}
              </a>
            ))}
          </div>

          <p style={{ fontSize: 16, color: mid, lineHeight: 1.85, marginBottom: 44 }}>{data.about.bio}</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {data.about.stats.map((s, i) => (
              <div key={i} style={{ background: "#f9fafb", borderRadius: 14, padding: "18px 24px", flex: 1, minWidth: 110 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: dark, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: mid, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {data.resume?.file && (
            <div style={{ marginTop: 28 }}>
              <button onClick={onResumeDownload} className="dl-btn">📄 Download My Resume</button>
            </div>
          )}
        </div>

        {/* Right: photo */}
        <div>
          <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", background: "linear-gradient(145deg,#e8eef5 0%,#dde4ee 40%,#e0daea 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {data.about.photo
              ? <img src={data.about.photo} alt={data.about.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              : (
                <>
                  <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#0d7377,#14a085)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", fontWeight: 700, marginBottom: 14 }}>MP</div>
                  <div style={{ fontSize: 13, color: "#b0b8c8" }}>Upload your photo in admin panel</div>
                </>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
