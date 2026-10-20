"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    title: "100% Free",
    description: "No hidden charges, no premium walls. Every tool is completely free to use.",
    icon: "💰",
    color: "#dcfce7",
  },
  {
    title: "No Signup Required",
    description: "Open any tool and start using it immediately. No account, no email, no hassle.",
    icon: "🚫",
    color: "#fee2e2",
  },
  {
    title: "Your Files Stay Private",
    description: "Most tools run in your browser. For server-based tools, your files are deleted instantly.",
    icon: "🔒",
    color: "#dbeafe",
  },
  {
    title: "Fast & Mobile-Friendly",
    description: "Built for speed. Works perfectly on mobile, tablet, and desktop — everywhere.",
    icon: "⚡",
    color: "#fef9c3",
  },
];

export default function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "4rem 0", background: "#0f172a", overflow: "hidden" }}>
      <div className="page-container">
        
        {/* Section Header */}
        <div 
          className={`scroll-animate-header ${isVisible ? "is-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.2rem)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.5px" }}>
            Why Studyo?
          </h2>
          <p style={{ marginTop: "0.5rem", color: "#94a3b8", fontSize: "0.95rem" }}>
            Built by students, for students. Here&apos;s what makes us different.
          </p>
        </div>

        {/* Grid */}
        <div className="reasons-grid-custom">
          {reasons.map((reason, index) => {
            const animationClass = index % 2 === 0 ? "slide-from-left" : "slide-from-right";
            
            return (
              <div
                key={reason.title}
                className={`premium-card group scroll-animate-card ${animationClass} ${isVisible ? "is-visible" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.25rem", /* Same padding as ToolsGrid */
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "0.75rem", 
                  position: "relative",
                  overflow: "hidden",
                  transitionDelay: isVisible ? `${index * 0.05}s` : "0s",
                }}
              >
                <div className="card-glow"></div>

                <div
                  className="tool-icon"
                  style={{
                    width: "36px", /* Same size as ToolsGrid */
                    height: "36px",
                    borderRadius: "0.5rem",
                    background: reason.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem", 
                    marginBottom: "0.75rem",
                  }}
                >
                  {reason.icon}
                </div>
                
                <h3
                  className="tool-title"
                  style={{
                    fontSize: "1rem", /* Same size as ToolsGrid */
                    fontWeight: 700,
                    color: "#f8fafc",
                    marginBottom: "0.25rem",
                  }}
                >
                  {reason.title}
                </h3>
                
                <p
                  style={{
                    fontSize: "0.8rem", /* Same size as ToolsGrid */
                    color: "#94a3b8",
                    lineHeight: 1.4,
                    flexGrow: 1,
                  }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Custom Grid for Compact Boxes (Exactly like ToolsGrid) */
        .reasons-grid-custom {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .reasons-grid-custom { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .reasons-grid-custom { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } 
        }
        @media (min-width: 1280px) {
          .reasons-grid-custom { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        }

        /* Header Animation */
        .scroll-animate-header {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .scroll-animate-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Cards Base Animation */
        .scroll-animate-card {
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: transform, opacity;
        }

        /* Side Animations */
        .slide-from-left { transform: translateX(-40px) scale(0.95); }
        .slide-from-right { transform: translateX(40px) scale(0.95); }

        .scroll-animate-card.is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Hover Effects */
        .premium-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(6, 182, 212, 0.5) !important;
          box-shadow: 0 15px 30px -10px rgba(6, 182, 212, 0.2) !important;
        }

        .card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .premium-card:hover .card-glow {
          opacity: 1;
        }

        .premium-card:hover .tool-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .premium-card:hover .tool-title {
          color: #06b6d4 !important;
        }
      `}</style>
    </section>
  );
}