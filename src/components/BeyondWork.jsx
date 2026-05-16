import React from 'react';

export default function BeyondWork() {
  // We'll assume the user will place images in /public/beyond-work/
  // with names like 1.jpg, 2.jpg, etc.
  // For now, we'll provide a list of 10 placeholders that the user can fill.
  const images = [
    '/beyond-work/1.jpeg',
    '/beyond-work/2.jpeg',
    '/beyond-work/3.jpeg',
    '/beyond-work/4.jpeg',
    '/beyond-work/5.jpeg',
    '/beyond-work/6.jpeg',
    '/beyond-work/7.jpeg',
    '/beyond-work/8.jpeg',
    '/beyond-work/9.jpeg',
    '/beyond-work/10.jpeg',
    '/beyond-work/11.jpeg',
    '/beyond-work/12.jpeg',   
    '/beyond-work/13.jpeg',
    '/beyond-work/14.jpeg',
    '/beyond-work/15.jpeg',
    '/beyond-work/16.jpeg',   
    '/beyond-work/17.jpeg',
    '/beyond-work/18.jpeg',
    '/beyond-work/19.jpeg',
    '/beyond-work/20.jpeg',   
          
    

  ];

  // Doubling the images for a seamless marquee effect
  const marqueeImages1 = [...images.slice(0, 10), ...images.slice(0, 10)];
  const marqueeImages2 = [...images.slice(10), ...images.slice(10)];

  return (
    <section id="beyond-work" style={{ padding: "100px 0", background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", marginBottom: 56 }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: "clamp(28px, 3.8vw, 52px)", 
          fontWeight: 700, 
          color: "#ffffff",
          marginBottom: 16
        }}>
          Beyond work
        </h2>
        <p style={{ 
          fontSize: "clamp(16px, 1.2vw, 18px)", 
          color: "#9ca3af", 
          maxWidth: 600,
          lineHeight: 1.6
        }}>
          When I’m not designing interfaces, I capture life through my lens. 
          Here’s a glimpse of the world from my perspective.
        </p>
      </div>

      {/* Row 1: Moving Left */}
      <div className="marquee-wrap" style={{ cursor: "grab", marginBottom: 24, overflow: "hidden" }}>
        <div className="marquee-track" style={{ 
          display: "flex", 
          gap: 24, 
          padding: "10px 0", 
          paddingRight: 24, 
          width: "max-content" 
        }}>
          {marqueeImages1.map((src, idx) => (
            <div 
              key={idx} 
              style={{ 
                flexShrink: 0, 
                width: "clamp(250px, 25vw, 400px)", 
                height: "clamp(180px, 18vw, 300px)", 
                borderRadius: 20, 
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                backgroundColor: "#f9fafb" 
              }}
            >
              <img 
                src={src} 
                alt={`Beyond Work Row 1 ${idx + 1}`}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  e.target.parentElement.innerHTML = '<span style="color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Image</span>';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moving Right */}
      <div className="marquee-wrap" style={{ cursor: "grab", overflow: "hidden" }}>
        <div className="marquee-track-rev" style={{ 
          display: "flex", 
          gap: 24, 
          padding: "10px 0", 
          paddingRight: 24, 
          width: "max-content" 
        }}>
          {marqueeImages2.map((src, idx) => (
            <div 
              key={idx} 
              style={{ 
                flexShrink: 0, 
                width: "clamp(250px, 25vw, 400px)", 
                height: "clamp(180px, 18vw, 300px)", 
                borderRadius: 20, 
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                backgroundColor: "#f9fafb" 
              }}
            >
              <img 
                src={src} 
                alt={`Beyond Work Row 2 ${idx + 1}`}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  e.target.parentElement.innerHTML = '<span style="color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Image</span>';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #beyond-work .marquee-track {
          animation: marquee 45s linear infinite;
        }
        #beyond-work .marquee-track-rev {
          animation: marquee 45s linear infinite reverse;
        }
        #beyond-work .marquee-wrap:hover .marquee-track,
        #beyond-work .marquee-wrap:hover .marquee-track-rev {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
