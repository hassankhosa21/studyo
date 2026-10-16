-- ============================================
-- Studyo: Universities Seed Data
-- ============================================
-- Initial university presets (reference data).
-- Ye sirf starting points hain — har university ki
-- official scale se verify karna zaroori hai.
-- ============================================

-- Default HEC-style reference preset
INSERT INTO public.universities (name, slug, country, config_json, source_url, last_verified_at)
VALUES (
  'HEC-Style Standard 4.0 (Reference)',
  'hec-standard',
  'Pakistan',
  '{
    "id": "hec-standard",
    "label": "HEC-style standard 4.0 (reference)",
    "scale": 4.0,
    "rounding": 2,
    "minCgpa": { "undergraduate": 2.0, "postgraduate": 2.5 },
    "grades": [
      { "letter": "A", "min": 85, "points": 4.0 },
      { "letter": "A-", "min": 80, "points": 3.66 },
      { "letter": "B+", "min": 75, "points": 3.33 },
      { "letter": "B", "min": 71, "points": 3.0 },
      { "letter": "B-", "min": 68, "points": 2.66 },
      { "letter": "C+", "min": 64, "points": 2.33 },
      { "letter": "C", "min": 61, "points": 2.0 },
      { "letter": "C-", "min": 58, "points": 1.66 },
      { "letter": "D+", "min": 54, "points": 1.33 },
      { "letter": "D", "min": 50, "points": 1.0 },
      { "letter": "F", "min": 0, "points": 0.0 }
    ],
    "repeatPolicy": "replace",
    "sourceUrl": "reference-only"
  }'::jsonb,
  'reference-only',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- University of Sindh (2K21 batch onwards)
INSERT INTO public.universities (name, slug, country, config_json, source_url, last_verified_at)
VALUES (
  'University of Sindh',
  'u-sindh',
  'Pakistan',
  '{
    "id": "u-sindh",
    "label": "University of Sindh (2K21 batch onwards)",
    "scale": 4.0,
    "rounding": 2,
    "minCgpa": { "undergraduate": 2.0, "postgraduate": 2.5 },
    "grades": [
      { "letter": "A", "min": 85, "points": 4.0 },
      { "letter": "B+", "min": 80, "points": 3.6 },
      { "letter": "B", "min": 75, "points": 3.2 },
      { "letter": "C+", "min": 70, "points": 2.8 },
      { "letter": "C", "min": 65, "points": 2.4 },
      { "letter": "D+", "min": 60, "points": 2.0 },
      { "letter": "D", "min": 55, "points": 1.5 },
      { "letter": "E", "min": 50, "points": 1.0 },
      { "letter": "F", "min": 0, "points": 0.0 }
    ],
    "repeatPolicy": "replace",
    "sourceUrl": "https://usindh.edu.pk/page/176"
  }'::jsonb,
  'https://usindh.edu.pk/page/176',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Note: UOG preset abhi add nahi kiya kyunke official scale verify nahi hui.
-- Jab Hassan UOG ki official grading scale confirm karega, tab add karenge.