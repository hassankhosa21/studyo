import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - Studyo",
  description:
    "Read Studyo's Terms of Use. Rules for using our free tools, disclaimers, and user responsibilities.",
};

export default function TermsPage() {
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
            <span style={{ color: "#374151" }}>Terms of Use</span>
          </nav>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Terms of Use
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
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using Studyo ("the Service"), you agree to be
              bound by these Terms of Use. If you do not agree, please do not
              use the Service.
            </p>
            <p>
              Studyo is operated by Masood ul Hassan, a student at the
              University of Gujrat, Pakistan.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Studyo provides free, browser-based tools for students, including
              but not limited to:
            </p>
            <ul>
              <li>PDF Merge</li>
              <li>PDF Compress</li>
              <li>Image Compressor</li>
              <li>Citation Generator</li>
              <li>Word Counter</li>
              <li>GPA / CGPA Calculator</li>
            </ul>
            <p>
              All tools are provided "as is" and "as available". We may add,
              modify, or remove tools at any time without notice.
            </p>
          </Section>

          <Section title="3. No Affiliation with Universities or HEC">
            <p>
              Studyo is <strong>not affiliated with, endorsed by, or
              associated with</strong> the Higher Education Commission (HEC) of
              Pakistan, the University of Gujrat (UOG), or any other university
              or educational institution.
            </p>
            <p>
              University names and grading scales are referenced for educational
              purposes only. All trademarks belong to their respective owners.
            </p>
          </Section>

          <Section title="4. Accuracy and Disclaimers">
            <p>
              <strong>GPA / CGPA Calculator:</strong> The GPA calculator
              provides estimates based on publicly available grading scales. The
              official result is always determined by your university. Always
              verify with your university's official notification.
            </p>
            <p>
              <strong>Citation Generator:</strong> We follow official style
              guide rules (APA, MLA, IEEE, Harvard) carefully, but citation
              formats can vary. Always double-check with your professor's
              requirements.
            </p>
            <p>
              <strong>Other Tools:</strong> PDF merge, compression, and image
              compression results may vary depending on your browser, device,
              and file content. We make no guarantees about output quality.
            </p>
            <p>
              <strong>No Warranty:</strong> The Service is provided without any
              warranty, express or implied. We do not guarantee that the Service
              will be error-free, uninterrupted, or meet your specific
              requirements.
            </p>
          </Section>

          <Section title="5. Your Responsibilities">
            <p>By using Studyo, you agree that you will NOT:</p>
            <ul>
              <li>
                Use the Service for any illegal or unauthorized purpose.
              </li>
              <li>
                Attempt to reverse-engineer, scrape, or copy our tools without
                permission.
              </li>
              <li>
                Upload or process content that you do not have the right to use.
              </li>
              <li>
                Use the Service to harm, harass, or violate the rights of
                others.
              </li>
              <li>
                Attempt to disrupt or overload our servers or infrastructure.
              </li>
              <li>
                Remove or alter any copyright notices or branding.
              </li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on Studyo — including but not limited to the design,
              code, text, graphics, and logos — is owned by Masood ul Hassan
              unless otherwise stated. You may not copy, modify, distribute, or
              sell any part of Studyo without written permission.
            </p>
            <p>
              You retain all rights to the files you process using our tools.
              We claim no ownership over your content.
            </p>
          </Section>

          <Section title="7. Third-Party Links and Ads">
            <p>
              Studyo may contain links to third-party websites and display ads
              (including from Google AdSense). We are not responsible for the
              content, privacy practices, or accuracy of any third-party site.
            </p>
            <p>
              Your interactions with advertisers are solely between you and the
              advertiser.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Studyo and its operator
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              Service — including but not limited to loss of data, loss of
              marks, or academic consequences.
            </p>
          </Section>

          <Section title="9. Privacy">
            <p>
              Your use of Studyo is also governed by our{" "}
              <Link href="/privacy-policy" style={{ color: "#2563eb" }}>
                Privacy Policy
              </Link>
              . Key point: your files never leave your device.
            </p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>
              We may update these Terms of Use at any time. The "Last updated"
              date at the top will reflect changes. Continued use of Studyo
              after changes means you accept the updated terms.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              We reserve the right to block or restrict access to Studyo for any
              user who violates these Terms, at our sole discretion, without
              prior notice.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms are governed by the laws of Pakistan. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of
              Gujrat, Punjab, Pakistan.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              For questions about these Terms, contact us at:
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
            By using Studyo, you acknowledge that you have read, understood, and
            agree to these Terms of Use.
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