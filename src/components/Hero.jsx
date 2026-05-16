import React from 'react';
import { BackgroundGradientAnimation } from './BackgroundGradientAnimation';

export default function Hero({ data, onResumeDownload }) {
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: 600,
        position: "relative",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Aceternity Background Gradient Animation */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <BackgroundGradientAnimation />
      </div>

      {/* Content Restored */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 5%", animation: "fadeUp 1s ease 0.5s both", opacity: 0 }}>
        <p style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "rgba(255,255,255,0.72)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, fontWeight: 400 }}>
          Senior UI/UX Designer
        </p>
        <h1 style={{ fontSize: "clamp(28px,5vw,68px)", fontWeight: 300, color: "#fff", lineHeight: 1.3, maxWidth: 800, margin: "0 auto", letterSpacing: "-0.01em", textShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
          {data.hero.tagline}
        </h1>
        {data.resume?.file && (
          <div style={{ marginTop: 40 }}>
            <button
              onClick={onResumeDownload}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              📄 Download Resume
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

