import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Studyo",
  description:
    "Read Studyo's privacy policy. Learn how we handle your data, cookies, and analytics. We never upload your files.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 16, 2026";

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
            <span style={{ color: "#374151" }}>Privacy Policy</span>
          </nav>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#6b7280",
              fontSize: "0.95rem",
            }}
          >
            Last updated: {lastUpdated}
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
            maxWidth: "800px",
            margin: "0 auto",
            background: "white",
            padding: "2rem",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <Section title="1. Introduction">
            <p>
              Welcome to Studyo ("we", "our", "us"). We are committed to
              protecting your privacy. This Privacy Policy explains how we
              handle information when you use our website and tools at{" "}
              <strong>studyo.com</strong> (the "Service").
            </p>
            <p>
              By using Studyo, you agree to this Privacy Policy. If you do not
              agree, please do not use our Service.
            </p>
          </Section>

          <Section title="2. Your Files Never Leave Your Device">
            <p>
              <strong>This is the most important thing to know:</strong> All
              tools on Studyo (PDF merge, PDF compress, image compressor, word
              counter, citation generator, GPA calculator) run entirely in your
              browser. Your files are <strong>never uploaded</strong> to our
              servers, never stored, and never shared with any third party.
            </p>
            <p>
              Even after you close the tab, we have no copy of your files. This
              is by design — privacy is at the core of Studyo.
            </p>
          </Section>

          <Section title="3. Information We Collect">
            <p>We collect minimal information to run the Service:</p>
            <ul>
              <li>
                <strong>Local Storage:</strong> Some tools (like GPA Calculator)
                save your data in your browser's local storage for convenience.
                This data stays on your device and is not sent to us. You can
                clear it anytime via the "Reset" button or your browser
                settings.
              </li>
              <li>
                <strong>Contact Form:</strong> If you contact us via our Contact
                page, your email app opens with your message. We receive it only
                if you send it — and use it only to reply to you.
              </li>
              <li>
                <strong>Analytics:</strong> We use Google Analytics 4 to
                understand how visitors use our site (page views, session
                duration, device type). This data is anonymized and does not
                identify you personally.
              </li>
            </ul>
          </Section>

          <Section title="4. Cookies and Tracking">
            <p>
              Studyo uses cookies and similar technologies for:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> To measure traffic and
                improve user experience.
              </li>
              <li>
                <strong>Google AdSense:</strong> To display relevant ads. Google
                may use cookies to show personalized ads based on your browsing
                history. You can opt out via{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  Google Ads Settings
                </a>
                .
              </li>
            </ul>
            <p>
              You can disable cookies in your browser settings. However, some
              parts of the Service may not work properly without them.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We use the following third-party services:</p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> For traffic analysis.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google AdSense:</strong> For displaying ads.{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  Ad Policies
                </a>
              </li>
              <li>
                <strong>Vercel:</strong> For hosting.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Section>

          <Section title="6. Children's Privacy">
            <p>
              Studyo is not intended for children under 13. We do not knowingly
              collect personal information from children. If you believe a child
              has provided us information, please contact us and we will delete
              it.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete any personal data we hold.</li>
              <li>Opt out of analytics and personalized ads.</li>
              <li>Clear your local storage data anytime.</li>
              <li>
                Contact us at{" "}
                <a
                  href="mailto:hassankhosa2122@gmail.com"
                  style={{ color: "#2563eb" }}
                >
                  hassankhosa2122@gmail.com
                </a>{" "}
                with any privacy concerns.
              </li>
            </ul>
          </Section>

          <Section title="8. Data Security">
            <p>
              Since we don't collect or store your files, there's nothing to
              breach. The only data we handle (analytics and contact messages)
              is protected using industry-standard security practices.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The "Last
              updated" date at the top will reflect any changes. Continued use
              of Studyo after changes means you accept the updated policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a
                  href="mailto:hassankhosa2122@gmail.com"
                  style={{ color: "#2563eb" }}
                >
                  hassankhosa2122@gmail.com
                </a>
              </li>
              <li>
                Contact page:{" "}
                <Link href="/contact" style={{ color: "#2563eb" }}>
                  /contact
                </Link>
              </li>
            </ul>
          </Section>

          <p
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#f9fafb",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              color: "#6b7280",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            By using Studyo, you acknowledge that you have read and understood
            this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "1.75rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: "bold",
          color: "#111827",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "#374151",
          lineHeight: 1.75,
          fontSize: "0.95rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {children}
      </div>
      <style>{`
        section ul {
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          list-style: disc;
        }
      `}</style>
    </section>
  );
}