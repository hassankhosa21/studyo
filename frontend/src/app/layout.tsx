import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Studyo - Free Student Tools",
  description:
    "Free online tools for students: PDF merge, PDF compress, image compressor, citation generator, word counter, and GPA/CGPA calculator.",
  keywords: [
    "pdf merge",
    "pdf compress",
    "image compressor",
    "citation generator",
    "word counter",
    "gpa calculator",
    "cgpa calculator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}