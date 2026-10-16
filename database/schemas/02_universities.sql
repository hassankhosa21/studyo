-- ============================================
-- Studyo: Universities Table
-- ============================================
-- Ye table university-wise GPA presets store karti hai.
-- Har university ka apna grading scale, repeat policy, etc.
-- ============================================

CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL DEFAULT 'Pakistan',
  config_json JSONB NOT NULL,
  source_url TEXT,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_universities_slug ON public.universities(slug);
CREATE INDEX IF NOT EXISTS idx_universities_country ON public.universities(country);

-- Auto-update updated_at
CREATE TRIGGER universities_updated_at
  BEFORE UPDATE ON public.universities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.universities IS 'University-wise GPA grading configs';
COMMENT ON COLUMN public.universities.config_json IS 'Full preset config (grades, repeat policy, formulas)';
COMMENT ON COLUMN public.universities.source_url IS 'Official university grading policy URL';
COMMENT ON COLUMN public.universities.last_verified_at IS 'Jab aakhri baar official source se verify kiya';