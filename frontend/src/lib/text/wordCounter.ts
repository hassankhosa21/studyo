// ============================================
// Studyo: Word Counter Logic
// ============================================
// Pure functions — text analysis ke liye.
// ============================================

export interface WordCountResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  topKeywords: { word: string; count: number }[];
}

/**
 * Text ko analyze karke saare stats return karta hai.
 */
export function analyzeText(text: string): WordCountResult {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      topKeywords: [],
    };
  }

  // Words — split on whitespace, filter empties
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);

  // Characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  // Sentences — split on . ! ? (with space or end)
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  // Paragraphs — split on double newlines (or single newline + trim)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;

  // Reading time — average 200 words per minute
  const readingTimeMinutes = words.length / 200;

  // Speaking time — average 130 words per minute
  const speakingTimeMinutes = words.length / 130;

  // Top keywords — lowercase, remove punctuation, filter stopwords
  const topKeywords = getTopKeywords(text, 10);

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    topKeywords,
  };
}

/**
 * Top N keywords nikalta hai (stopwords hata ke).
 */
function getTopKeywords(
  text: string,
  limit: number
): { word: string; count: number }[] {
  const stopwords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "up", "about", "into", "through", "during",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "do", "does", "did", "will", "would", "could", "should", "may", "might",
    "must", "shall", "can", "need", "dare", "ought", "used", "it", "its",
    "this", "that", "these", "those", "i", "you", "he", "she", "we", "they",
    "me", "him", "her", "us", "them", "my", "your", "his", "our", "their",
    "as", "if", "then", "than", "so", "such", "no", "not", "only", "own",
    "same", "too", "very", "just", "also", "there", "here", "when", "where",
    "why", "how", "what", "which", "who", "whom",
  ]);

  const wordCounts: Record<string, number> = {};

  // Lowercase, remove punctuation, split
  const cleanText = text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, " ")
    .replace(/\s+/g, " ");

  const allWords = cleanText.split(" ").filter((w) => w.length > 2);

  for (const word of allWords) {
    if (stopwords.has(word)) continue;
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  // Sort by count desc, take top N
  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Reading time ko human-readable format mein convert karta hai.
 */
export function formatTime(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.ceil(minutes * 60);
    return `${seconds} sec`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}