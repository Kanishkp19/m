const dark = "#111111";

export default function Footer({ data, scrollTo }) {
  return (
    <footer style={{ background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#9ca3af", padding: "22px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#ffffff" }}>
        {data.about.name}
      </div>
      <div style={{ fontSize: 12 }}>Crafted with care · {new Date().getFullYear()}</div>
      <button
        onClick={() => scrollTo("hero")}
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 16px", fontSize: 12, color: "#ffffff", cursor: "pointer", fontFamily: "inherit" }}
      >
        ↑ Top
      </button>
    </footer>
  );
}
