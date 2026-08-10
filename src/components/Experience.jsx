import ScrollStack, { ScrollStackItem } from "./ui/ScrollStack";

const teal = "rgba(255,255,255,0.8)";
const dark = "#ffffff";
const mid = "#9ca3af";

export default function Experience({ data }) {
  return (
    <section
      id="experience"
      style={{
        padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)",
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px,3vw,40px)",
            fontWeight: 700,
            color: dark,
            marginBottom: 32
          }}
        >
          {data.experience.heading}
        </h2>

        <ScrollStack
          useWindowScroll={true}
          itemDistance={80}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.88}
          blurAmount={2}
        >
          {data.experience.items.map((exp, i) => (
            <ScrollStackItem key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(16px, 2vw, 20px)",
                      fontWeight: 700,
                      color: dark,
                      marginBottom: 6
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: teal,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <span>{exp.company}</span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ color: mid }}>{exp.location}</span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "6px 16px",
                    borderRadius: 20,
                    whiteSpace: "nowrap"
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  color: mid,
                  lineHeight: 1.75
                }}
              >
                {exp.desc}
              </p>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

