// ============================================
// Studyo: Citation Generator Types
// ============================================

export type CitationStyle = "APA" | "MLA" | "IEEE" | "HARVARD";

export type SourceType = "website" | "book" | "journal";

export interface Author {
  firstName: string;
  lastName: string;
}

export interface BaseCitationData {
  authors: Author[];
  title: string;
  year: string;
  url?: string;
  accessDate?: string; // ISO date string
}

export interface WebsiteData extends BaseCitationData {
  sourceType: "website";
  siteName: string;
  publisher?: string;
}

export interface BookData extends BaseCitationData {
  sourceType: "book";
  publisher: string;
  city?: string;
  edition?: string;
}

export interface JournalData extends BaseCitationData {
  sourceType: "journal";
  journalName: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
}

export type CitationData = WebsiteData | BookData | JournalData;

export interface SavedCitation {
  id: string;
  style: CitationStyle;
  data: CitationData;
  formattedText: string;
  createdAt: string;
}

export const CITATION_STYLES: CitationStyle[] = [
  "APA",
  "MLA",
  "IEEE",
  "HARVARD",
];

export const SOURCE_TYPES: { value: SourceType; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "book", label: "Book" },
  { value: "journal", label: "Journal Article" },
];

export const STYLE_LABELS: Record<CitationStyle, string> = {
  APA: "APA 7th Edition",
  MLA: "MLA 9th Edition",
  IEEE: "IEEE",
  HARVARD: "Harvard",
};