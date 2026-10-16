-- ============================================
-- Studyo: Saved Citations Table
-- ============================================
-- User ke generate kiye gaye citations save karne ke liye.
-- ============================================

CREATE TABLE IF NOT EXISTS public.citations_saved (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  style TEXT NOT NULL,
  source_type TEXT NOT NULL,
  data_json JSONB NOT NULL,
  formatted_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Style sirf in mein se ek
  CONSTRAINT citations_style_check
    CHECK (style IN ('APA', 'MLA', 'IEEE', 'HARVARD')),

  -- Source type sirf in mein se ek
  CONSTRAINT citations_source_type_check
    CHECK (source_type IN ('website', 'book', 'journal', 'newspaper', 'video', 'other'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_citations_user ON public.citations_saved(user_id);
CREATE INDEX IF NOT EXISTS idx_citations_style ON public.citations_saved(style);
CREATE INDEX IF NOT EXISTS idx_citations_created ON public.citations_saved(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_citations_data_gin ON public.citations_saved USING GIN (data_json);

-- Comments
COMMENT ON TABLE public.citations_saved IS 'User ke saved citations';
COMMENT ON COLUMN public.citations_saved.style IS 'Citation style (APA, MLA, IEEE, HARVARD)';
COMMENT ON COLUMN public.citations_saved.source_type IS 'Source type (website, book, journal, etc.)';
COMMENT ON COLUMN public.citations_saved.data_json IS 'Raw citation data (author, title, year, etc.)';
COMMENT ON COLUMN public.citations_saved.formatted_text IS 'Ready-to-copy formatted citation';