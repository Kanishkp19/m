const dark = "#111111";

export default function Footer({ data, scrollTo }) {
  return (
    <footer style={{ background: dark, color: "#6b7280", padding: "22px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#fff" }}>
        {data.about.name}
      </div>
      <div style={{ fontSize: 12 }}>Crafted with care · {new Date().getFullYear()}</div>
      <button
        onClick={() => scrollTo("hero")}
        style={{ background: "#222", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, color: "#9ca3af", cursor: "pointer", fontFamily: "inherit" }}
      >
        ↑ Top
      </button>
    </footer>
  );
}
