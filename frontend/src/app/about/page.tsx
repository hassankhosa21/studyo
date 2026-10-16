import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Studyo",
  description:
    "Studyo is a free online platform offering PDF tools, image compression, citation generator, word counter, and GPA calculator for students.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div
          className="page-container"
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <nav
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/" style={{ color: "#6b7280", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "#374151" }}>About</span>
          </nav>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            About Studyo
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#4b5563",
              fontSize: "1.05rem",
              maxWidth: "720px",
              lineHeight: 1.6,
            }}
          >
            Free tools for students, built by a student.
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="page-container"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Story */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Our Story
            </h2>
            <p style={{ color: "#374151", lineHeight: 1.8, marginBottom: "1rem" }}>
              Studyo was born out of a simple frustration: students waste hours
              jumping between different websites for basic tasks — merging PDFs,
              compressing images, generating citations, calculating GPA. Most of
              these sites are cluttered with ads, force signups, or upload your
              files to unknown servers.
            </p>
            <p style={{ color: "#374151", lineHeight: 1.8 }}>
              Studyo is different. Every tool runs entirely in your browser —
              your files never leave your device. No signups. No hidden charges.
              Just fast, clean, privacy-first tools that work.
            </p>
          </section>

          {/* Mission */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Our Mission
            </h2>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                "Provide free, fast, and privacy-focused tools for students.",
                "Make GPA calculation accurate with university-wise presets.",
                "Keep every tool 100% browser-based — no file uploads.",
                "Support Pakistani students first, then expand globally.",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "#374151", lineHeight: 1.7 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Developer */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              About the Developer
            </h2>
            <div
              style={{
                padding: "1.5rem",
                background: "white",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                Masood ul Hassan
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  marginBottom: "0.75rem",
                }}
              >
                Software Engineering Student, University of Gujrat
              </p>
              <p style={{ color: "#374151", lineHeight: 1.7 }}>
                Studyo is a passion project built during my studies. I wanted to
                create tools that I and my fellow students actually needed —
                fast, ad-light, and privacy-respecting. If you have feedback,
                suggestions, or want to collaborate, feel free to{" "}
                <Link
                  href="/contact"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          </section>

          {/* CTA */}
          <section
            style={{
              padding: "2rem",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              borderRadius: "0.75rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              Explore our tools
            </h2>
            <p
              style={{
                color: "#dbeafe",
                marginBottom: "1.25rem",
                fontSize: "0.95rem",
              }}
            >
              Six free tools. No signup. No uploads.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "0.625rem 1.5rem",
                background: "white",
                color: "#1d4ed8",
                fontWeight: 600,
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Go to Home →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}