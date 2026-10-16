// ============================================
// Studyo: University Presets Registry
// ============================================
// Saare presets yahan load hote hain.
// Nayi university add karni ho toh bas:
//   1. Nayi JSON file banao (jaise nust.json)
//   2. Yahan import karke PRESETS mein add karo
// ============================================

import type { UniversityPreset } from "../types";
import hecStandard from "./hec-standard.json";
import uog from "./uog.json";

export const PRESETS: Record<string, UniversityPreset> = {
  "hec-standard": hecStandard as UniversityPreset,
  uog: uog as UniversityPreset,
};

export const DEFAULT_PRESET_ID = "hec-standard";

export const PRESET_LIST: UniversityPreset[] = Object.values(PRESETS);

/**
 * Preset ID se preset nikalta hai. Agar nahi mila toh default return karta hai.
 */
export function getPreset(id: string): UniversityPreset {
  return PRESETS[id] || PRESETS[DEFAULT_PRESET_ID];
}