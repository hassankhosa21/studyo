// ============================================
// Studyo: Citation Formatters
// ============================================
// APA 7, MLA 9, IEEE, Harvard ke liye formatters.
// ============================================

import type {
  CitationData,
  CitationStyle,
  Author,
  WebsiteData,
  BookData,
  JournalData,
} from "./types";

// ============================================
// Helpers
// ============================================

/**
 * Authors ko APA style mein format karta hai.
 * Format: LastName, F. M., & LastName, F. M.
 */
function formatAuthorsAPA(authors: Author[]): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) {
    const a = authors[0];
    return `${a.lastName}, ${getInitials(a.firstName)}`;
  }
  const formatted = authors.map(
    (a) => `${a.lastName}, ${getInitials(a.firstName)}`
  );
  if (authors.length === 2) {
    return `${formatted[0]}, & ${formatted[1]}`;
  }
  // 3+ authors: list first 19, then ellipsis, then last
  if (authors.length > 20) {
    const first19 = formatted.slice(0, 19).join(", ");
    const last = formatted[formatted.length - 1];
    return `${first19}, ... ${last}`;
  }
  const allButLast = formatted.slice(0, -1).join(", ");
  const last = formatted[formatted.length - 1];
  return `${allButLast}, & ${last}`;
}

/**
 * Authors ko MLA style mein format karta hai.
 * Format: LastName, FirstName, and FirstName LastName.
 */
function formatAuthorsMLA(authors: Author[]): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) {
    const a = authors[0];
    return `${a.lastName}, ${a.firstName}`;
  }
  if (authors.length === 2) {
    const first = authors[0];
    const second = authors[1];
    return `${first.lastName}, ${first.firstName}, and ${second.firstName} ${second.lastName}`;
  }
  const first = authors[0];
  return `${first.lastName}, ${first.firstName}, et al`;
}

/**
 * Authors ko IEEE style mein format karta hai.
 * Format: F. M. LastName, F. M. LastName, and F. M. LastName
 */
function formatAuthorsIEEE(authors: Author[]): string {
  if (authors.length === 0) return "";
  const formatted = authors.map(
    (a) => `${getInitials(a.firstName)} ${a.lastName}`
  );
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
  const allButLast = formatted.slice(0, -1).join(", ");
  const last = formatted[formatted.length - 1];
  return `${allButLast}, and ${last}`;
}

/**
 * Authors ko Harvard style mein format karta hai.
 * Format: LastName, F.M., LastName, F.M. and LastName, F.M.
 */
function formatAuthorsHarvard(authors: Author[]): string {
  if (authors.length === 0) return "";
  const formatted = authors.map(
    (a) => `${a.lastName}, ${getInitials(a.firstName)}`
  );
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
  const allButLast = formatted.slice(0, -1).join(", ");
  const last = formatted[formatted.length - 1];
  return `${allButLast} and ${last}`;
}

/**
 * First name se initials nikalta hai.
 * "Muhammad Ali" → "M. A."
 */
function getInitials(firstName: string): string {
  if (!firstName) return "";
  return firstName
    .trim()
    .split(/\s+/)
    .map((name) => `${name.charAt(0).toUpperCase()}.`)
    .join(" ");
}

/**
 * Access date ko format karta hai.
 * "2026-10-16" → "October 16, 2026"
 */
function formatAccessDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ============================================
// APA 7 Formatters
// ============================================

function formatAPAStyle(data: CitationData): string {
  const authors = formatAuthorsAPA(data.authors);
  const year = data.year ? `(${data.year}).` : "(n.d.).";
  const accessDate = formatAccessDate(data.accessDate);

  if (data.sourceType === "website") {
    const d = data as WebsiteData;
    const parts = [
      authors ? `${authors}.` : "",
      year,
      `${d.title}.`,
      d.siteName ? `${d.siteName}.` : "",
      d.url ? d.url : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "book") {
    const d = data as BookData;
    const parts = [
      authors ? `${authors}.` : "",
      year,
      `${d.title}${d.edition ? ` (${d.edition} ed.)` : ""}.`,
      `${d.publisher}.`,
      d.url ? d.url : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "journal") {
    const d = data as JournalData;
    const volumeIssue = d.volume
      ? `${d.volume}${d.issue ? `(${d.issue})` : ""}`
      : "";
    const pages = d.pages ? `, ${d.pages}` : "";
    const doi = d.doi ? ` https://doi.org/${d.doi}` : d.url ? ` ${d.url}` : "";
    const parts = [
      authors ? `${authors}.` : "",
      year,
      `${d.title}.`,
      `${d.journalName}${volumeIssue ? `, ${volumeIssue}` : ""}${pages}.`,
    ];
    return (parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim() + doi).trim();
  }

  return "";
}

// ============================================
// MLA 9 Formatters
// ============================================

function formatMLAStyle(data: CitationData): string {
  const authors = formatAuthorsMLA(data.authors);
  const accessDate = formatAccessDate(data.accessDate);

  if (data.sourceType === "website") {
    const d = data as WebsiteData;
    const parts = [
      authors ? `${authors}.` : "",
      `"${d.title}."`,
      d.siteName ? `${d.siteName},` : "",
      d.year ? `${d.year},` : "",
      d.url ? `${d.url}.` : "",
      accessDate ? `Accessed ${accessDate}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "book") {
    const d = data as BookData;
    const parts = [
      authors ? `${authors}.` : "",
      `${d.title}.`,
      d.edition ? `${d.edition} ed.,` : "",
      d.publisher ? `${d.publisher},` : "",
      d.year ? `${d.year}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "journal") {
    const d = data as JournalData;
    const volumeIssue = d.volume
      ? `vol. ${d.volume}${d.issue ? `, no. ${d.issue}` : ""}`
      : "";
    const parts = [
      authors ? `${authors}.` : "",
      `"${d.title}."`,
      d.journalName ? `${d.journalName},` : "",
      volumeIssue ? `${volumeIssue},` : "",
      d.year ? `${d.year},` : "",
      d.pages ? `pp. ${d.pages}.` : "",
      d.url ? `${d.url}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  return "";
}

// ============================================
// IEEE Formatters
// ============================================

function formatIEEEStyle(data: CitationData): string {
  const authors = formatAuthorsIEEE(data.authors);
  const accessDate = formatAccessDate(data.accessDate);

  if (data.sourceType === "website") {
    const d = data as WebsiteData;
    const parts = [
      authors ? `${authors},` : "",
      `"${d.title},"`,
      d.siteName ? `${d.siteName},` : "",
      d.year ? `${d.year}.` : "",
      d.url ? `[Online]. Available: ${d.url}` : "",
      accessDate ? `[Accessed: ${accessDate}]` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "book") {
    const d = data as BookData;
    const parts = [
      authors ? `${authors},` : "",
      `${d.title}${d.edition ? `, ${d.edition} ed.` : ""}`,
      d.city ? `${d.city}:` : "",
      d.publisher ? `${d.publisher},` : "",
      d.year ? `${d.year}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "journal") {
    const d = data as JournalData;
    const parts = [
      authors ? `${authors},` : "",
      `"${d.title},"`,
      d.journalName ? `${d.journalName},` : "",
      d.volume ? `vol. ${d.volume},` : "",
      d.issue ? `no. ${d.issue},` : "",
      d.pages ? `pp. ${d.pages},` : "",
      d.year ? `${d.year}.` : "",
      d.doi ? `doi: ${d.doi}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  return "";
}

// ============================================
// Harvard Formatters
// ============================================

function formatHarvardStyle(data: CitationData): string {
  const authors = formatAuthorsHarvard(data.authors);
  const accessDate = formatAccessDate(data.accessDate);

  if (data.sourceType === "website") {
    const d = data as WebsiteData;
    const parts = [
      authors ? `${authors}` : "",
      d.year ? `(${d.year})` : "(no date)",
      `${d.title}.`,
      d.siteName ? `Available at: ${d.siteName}` : "",
      d.url ? `${d.url}` : "",
      accessDate ? `(Accessed: ${accessDate})` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "book") {
    const d = data as BookData;
    const parts = [
      authors ? `${authors}` : "",
      d.year ? `(${d.year})` : "(no date)",
      `${d.title}.`,
      d.edition ? `${d.edition} edn.` : "",
      d.city ? `${d.city}:` : "",
      d.publisher ? `${d.publisher}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  if (data.sourceType === "journal") {
    const d = data as JournalData;
    const parts = [
      authors ? `${authors}` : "",
      d.year ? `(${d.year})` : "(no date)",
      `'${d.title}',`,
      d.journalName ? `${d.journalName},` : "",
      d.volume ? `${d.volume}${d.issue ? `(${d.issue})` : ""},` : "",
      d.pages ? `pp. ${d.pages}.` : "",
      d.doi ? `doi: ${d.doi}.` : "",
    ];
    return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  return "";
}

// ============================================
// Main Formatter
// ============================================

/**
 * Citation data ko diye gaye style mein format karta hai.
 */
export function formatCitation(
  data: CitationData,
  style: CitationStyle
): string {
  try {
    switch (style) {
      case "APA":
        return formatAPAStyle(data);
      case "MLA":
        return formatMLAStyle(data);
      case "IEEE":
        return formatIEEEStyle(data);
      case "HARVARD":
        return formatHarvardStyle(data);
      default:
        return "";
    }
  } catch (err) {
    console.error("Citation format error:", err);
    return "Error formatting citation. Please check your input.";
  }
}

/**
 * Empty citation data banata hai.
 */
export function createEmptyCitationData(
  sourceType: "website" | "book" | "journal"
): CitationData {
  const base = {
    authors: [{ firstName: "", lastName: "" }],
    title: "",
    year: "",
  };

  if (sourceType === "website") {
    return { ...base, sourceType: "website", siteName: "" };
  }
  if (sourceType === "book") {
    return { ...base, sourceType: "book", publisher: "" };
  }
  return {
    ...base,
    sourceType: "journal",
    journalName: "",
  };
}