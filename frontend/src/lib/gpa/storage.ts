// ============================================
// Studyo: GPA localStorage Helpers
// ============================================
// Data browser mein save hota hai — signup nahi chahiye.
// Server par kuch nahi jata.
// ============================================

import type { Course, Semester } from "./types";

const STORAGE_KEY = "studyo-gpa-data-v1";
const PREFERENCES_KEY = "studyo-gpa-prefs-v1";

export interface SavedGpaData {
  presetId: string;
  previousCgpa: number;
  previousCredits: number;
  semesters: Semester[];
  savedAt: string;
}

export interface GpaPreferences {
  lastPresetId: string;
  lastProfileType: "undergraduate" | "postgraduate";
}

/**
 * Saved GPA data load karta hai.
 */
export function loadGpaData(): SavedGpaData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedGpaData;
  } catch (err) {
    console.error("Failed to load GPA data:", err);
    return null;
  }
}

/**
 * GPA data save karta hai.
 */
export function saveGpaData(data: SavedGpaData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save GPA data:", err);
  }
}

/**
 * GPA data clear karta hai.
 */
export function clearGpaData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear GPA data:", err);
  }
}

/**
 * Preferences load karta hai.
 */
export function loadPreferences(): GpaPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GpaPreferences;
  } catch (err) {
    console.error("Failed to load preferences:", err);
    return null;
  }
}

/**
 * Preferences save karta hai.
 */
export function savePreferences(prefs: GpaPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error("Failed to save preferences:", err);
  }
}

/**
 * Naya empty course banata hai.
 */
export function createEmptyCourse(id: string): Course {
  return {
    id,
    name: "",
    creditHours: 3,
    marks: null,
    grade: null,
    gradePoints: 0,
  };
}

/**
 * Naya empty semester banata hai.
 */
export function createEmptySemester(id: string, name: string): Semester {
  return {
    id,
    name,
    courses: [],
  };
}