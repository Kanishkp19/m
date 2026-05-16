const teal = "rgba(255,255,255,0.7)";

import { WobbleCard } from "./ui/wobble-card";
import ToolsGrid from "./ToolsGrid";

export default function Skills({ data }) {
  const categories = data.skills.categories;

  // Colors mapping to the screenshot vibes (Pink, Purple/Blue, Deep Blue)
  const cardColors = [
    "linear-gradient(135deg, #A83279, #D36A96)", // Pinkish
    "linear-gradient(135deg, #4A55A2, #7895CB)", // Purpleish/Blue
    "linear-gradient(135deg, #1C3879, #607EAA)", // Deep Blue
  ];

  return (
    <section id="skills" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)", background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: "#ffffff", marginBottom: 52 }}>
          {data.skills.heading}
        </h2>

        <div className="wobble-grid">
          {/* Card 1: UX Skills (Spans 2 columns if screen is wide enough) */}
          <div className="wobble-card-1">
            <WobbleCard containerStyle={{ background: cardColors[0], height: "100%", minHeight: "300px" }}>
              <div style={{ maxWidth: "400px" }}>
                <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "600", marginBottom: "16px", lineHeight: "1.2" }}>
                  {categories[0].name}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {categories[0].items.map((sk, si) => (
                    <span key={si} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "6px 14px", borderRadius: "8px", fontSize: "14px", backdropFilter: "blur(4px)" }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </WobbleCard>
          </div>

          {/* Card 2: Visual Design (Spans 1 column) */}
          <div className="wobble-card-2">
            <WobbleCard containerStyle={{ background: cardColors[1], height: "100%", minHeight: "300px" }}>
              <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "600", marginBottom: "16px", lineHeight: "1.2" }}>
                {categories[1].name}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {categories[1].items.map((sk, si) => (
                  <span key={si} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "6px 14px", borderRadius: "8px", fontSize: "14px", backdropFilter: "blur(4px)" }}>
                    {sk}
                  </span>
                ))}
              </div>
            </WobbleCard>
          </div>

          {/* Card 3: Tools (Spans full width) */}
          <div className="wobble-card-3">
            <WobbleCard containerStyle={{ background: cardColors[2], height: "100%", minHeight: "300px" }}>
              <div style={{ width: "100%" }}>
                <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "600", marginBottom: "16px", lineHeight: "1.2" }}>
                  {categories[2].name}
                </h2>
                <ToolsGrid />
              </div>
            </WobbleCard>
          </div>
        </div>

      </div>
    </section>
  );
}
