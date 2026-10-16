"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filhaal mailto use kar rahe hain (Phase 2 mein backend se handle karenge)
    const mailtoLink = `mailto:hassankhosa2122@gmail.com?subject=${encodeURIComponent(
      subject || "Studyo Contact"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
  };

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
            <span style={{ color: "#374151" }}>Contact</span>
          </nav>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Contact Us
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
            Have a question, feedback, or want to suggest a new tool? We'd love
            to hear from you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="page-container"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              You can reach out directly via email or phone. We usually reply
              within 24-48 hours.
            </p>

            {/* Email Card */}
            <a
              href="mailto:hassankhosa2122@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "white",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                marginBottom: "0.75rem",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#dbeafe",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                📧
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </div>
                <div
                  style={{
                    color: "#111827",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    wordBreak: "break-all",
                  }}
                >
                  hassankhosa2122@gmail.com
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+923324129829"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "white",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                marginBottom: "0.75rem",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#dcfce7",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                📞
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Phone
                </div>
                <div
                  style={{
                    color: "#111827",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  0332 4129829
                </div>
              </div>
            </a>

            {/* Developer Card */}
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Developer
              </div>
              <div
                style={{
                  color: "#111827",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Masood ul Hassan
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.85rem",
                  marginTop: "0.25rem",
                }}
              >
                Software Engineering, University of Gujrat
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Send a Message
            </h2>

            {submitted ? (
              <div
                style={{
                  padding: "2rem",
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  ✅
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#166534",
                    marginBottom: "0.5rem",
                  }}
                >
                  Thank you!
                </h3>
                <p style={{ color: "#166534", fontSize: "0.9rem" }}>
                  Your email app should have opened. If not, email us directly
                  at{" "}
                  <a
                    href="mailto:hassankhosa2122@gmail.com"
                    style={{ color: "#16a34a", fontWeight: 600 }}
                  >
                    hassankhosa2122@gmail.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    background: "white",
                    color: "#166534",
                    border: "1px solid #86efac",
                    borderRadius: "0.5rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "1.5rem",
                  background: "white",
                  borderRadius: "0.75rem",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What is this about?"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      fontSize: "0.95rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                  }}
                >
                  Send Message
                </button>

                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    lineHeight: 1.5,
                  }}
                >
                  Note: This will open your default email app with the message
                  pre-filled. We'll receive it at{" "}
                  <strong>hassankhosa2122@gmail.com</strong>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}