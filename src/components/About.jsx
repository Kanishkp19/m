import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const teal = "#0d7377";

// ── Tilt card wrapper ──────────────────────────────────────────────────────
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container variants ─────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function About({ data, onResumeDownload }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const servicesRow1 = [
    "UI/UX Design", "Figma & Framer", "Design Systems", "Accessibility Design",
    "Dashboard Design", "Wireframing"
  ];
  const servicesRow2 = [
    "Prototyping", "Mobile Design", "UX Research", "Interaction Design",
    "Responsive Web", "Visual Strategy"
  ];

  const marqueeDuped1 = [...servicesRow1, ...servicesRow1, ...servicesRow1];
  const marqueeDuped2 = [...servicesRow2, ...servicesRow2, ...servicesRow2];

  return (
    <section id="about" ref={sectionRef} style={{ background: "transparent", overflow: "hidden" }}>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="about-grid two-col" style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "5fr 6fr",
        gap: "0 80px",
        alignItems: "center",
      }}>

        {/* ── LEFT: TEXT ──────────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="about-left-col"
          style={{ position: "sticky", top: 100 }}
        >
          {/* Eyebrow */}
          <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: "#374151" }} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af" }}>About Me</span>
          </motion.div>

          {/* Heading */}
          <motion.h2 variants={item} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}>
            <span style={{ color: "#9ca3af" }}>Hi, I'm</span><br />
            Mansi Pandey
          </motion.h2>

          {/* Location pill */}
          <motion.div variants={item} style={{ marginBottom: 36 }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: 13,
              color: "#f3f4f6",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e", animation: "aboutPulse 2s ease-in-out infinite" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0, position: "relative" }} />
              </span>
              {data.about.location}
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} style={{
            fontSize: "clamp(15px, 1.6vw, 17px)",
            color: "#9ca3af",
            lineHeight: 1.8,
            marginBottom: 52,
            maxWidth: 460,
          }}>
            {data.about.bio}
          </motion.p>

          {/* Glass stat cards */}
          <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 48 }}>
            {data.about.stats.map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 32px)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                minHeight: "clamp(120px, 15vw, 180px)",
              }}>
                <div style={{ position: "absolute", top: -30, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />
                <div style={{
                  height: "clamp(40px, 8vw, 64px)",
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: "clamp(38px, 7vw, 64px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#ffffff",
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    {s.value}
                  </span>
                </div>
                <div style={{
                  fontSize: "clamp(10px, 1.2vw, 12px)",
                  color: "#9ca3af",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social + Resume */}
          <motion.div variants={item} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {[
              {
                label: "LinkedIn", href: data.about.linkedin,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              },
              {
                label: "Instagram", href: data.about.instagram,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              },
            ].map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href || "#"}
                target="_blank"
                rel="noreferrer"
                title={label}
                whileHover={{ scale: 1.06, borderColor: teal }}
                style={{
                  height: 44,
                  padding: "0 22px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#f3f4f6",
                  background: "rgba(255,255,255,0.02)",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s, border-color 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "#f3f4f6"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                {icon} {label}
              </motion.a>
            ))}

            {data.resume?.file && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                onClick={onResumeDownload}
                className="dl-btn"
                style={{ height: 44, borderRadius: 100, paddingLeft: 24, paddingRight: 24, fontSize: 14 }}
              >
                ↓ Resume
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: PHOTO ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ position: "relative" }}
        >
          {/* Large decorative serif quote */}
          <div style={{
            position: "absolute",
            top: -40,
            left: -10,
            fontFamily: "'Playfair Display', serif",
            fontSize: 220,
            lineHeight: 1,
            color: "rgba(255,255,255,0.03)",
            userSelect: "none",
            zIndex: 0,
            fontWeight: 700,
            pointerEvents: "none",
          }}>
            "
          </div>

          <TiltCard>
            {/* Glass photo frame */}
            <div style={{
              position: "relative",
              zIndex: 1,
              borderRadius: 32,
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}>
              {data.about.photo ? (
                <img
                  src={data.about.photo}
                  alt={data.about.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
              ) : (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 110, height: 110, borderRadius: "50%", background: `linear-gradient(135deg,${teal},#14a085)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", fontWeight: 700, marginBottom: 14 }}>MP</div>
                  <div style={{ fontSize: 13, color: "#b0b8c8" }}>Add photo path in defaultData.js</div>
                </div>
              )}

              {/* Floating glass caption sub-card */}
              <div style={{
                position: "absolute",
                bottom: 20,
                left: 16,
                right: 16,
                background: "rgba(20,20,25,0.6)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{data.about.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, letterSpacing: "0.04em" }}>Senior UI/UX Designer · Celebal Technologies</div>
                </div>
                {/* Active dot */}
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 4px rgba(34,197,94,0.18)", flexShrink: 0 }} />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* ── Marquee Capability Section ─────────────────────────────────── */}
      <div style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Row 1: Left to Right */}
        <div style={{ overflow: "hidden", marginBottom: 20 }}>
          <div className="about-marquee-track" style={{ gap: 0, animation: "aboutMarquee 40s linear infinite" }}>
            {marqueeDuped1.map((svc, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  padding: "0 40px",
                }}>
                  {svc}
                </span>
                <span style={{ color: teal, fontSize: 8, flexShrink: 0, opacity: 0.6 }}>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div style={{ overflow: "hidden" }}>
          <div className="about-marquee-track" style={{ gap: 0, animation: "aboutMarqueeReverse 45s linear infinite" }}>
            {marqueeDuped2.map((svc, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  padding: "0 40px",
                }}>
                  {svc}
                </span>
                <span style={{ color: teal, fontSize: 8, flexShrink: 0, opacity: 0.6 }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-marquee-track {
          display: flex;
          white-space: nowrap;
        }
        .about-grid {
          padding: clamp(80px, 12vw, 160px) clamp(20px, 5vw, 40px) clamp(60px, 8vw, 100px);
        }
        @media (max-width: 768px) {
          .about-left-col {
            position: static !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @keyframes aboutPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes aboutMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes aboutMarqueeReverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
