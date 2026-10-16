-- ============================================
-- Studyo: Semesters Table
-- ============================================
-- Har GPA profile ke multiple semesters hote hain.
-- order_no se semester ki tarteeb pata chalti hai.
-- ============================================

CREATE TABLE IF NOT EXISTS public.semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.gpa_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  order_no INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ek profile mein same order_no repeat nahi ho sakta
  CONSTRAINT semesters_profile_order_unique
    UNIQUE (profile_id, order_no),

  -- order_no 1 se shuru hona chahiye
  CONSTRAINT semesters_order_positive
    CHECK (order_no >= 1)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_semesters_profile ON public.semesters(profile_id);
CREATE INDEX IF NOT EXISTS idx_semesters_order ON public.semesters(profile_id, order_no);

-- Auto-update updated_at
CREATE TRIGGER semesters_updated_at
  BEFORE UPDATE ON public.semesters
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.semesters IS 'GPA profile ke semesters';
COMMENT ON COLUMN public.semesters.name IS 'Semester ka naam (e.g., "Semester 1", "Fall 2024")';
COMMENT ON COLUMN public.semesters.order_no IS 'Semester ki tarteeb (1, 2, 3...)';