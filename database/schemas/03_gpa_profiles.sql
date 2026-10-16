-- ============================================
-- Studyo: GPA Profiles Table
-- ============================================
-- Har user ke multiple GPA profiles ho sakte hain
-- (jaise: "BS Fall 2024", "MS Spring 2025" etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS public.gpa_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  profile_type TEXT NOT NULL DEFAULT 'undergraduate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT gpa_profiles_type_check
    CHECK (profile_type IN ('undergraduate', 'postgraduate'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gpa_profiles_user ON public.gpa_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_gpa_profiles_university ON public.gpa_profiles(university_id);

-- Auto-update updated_at
CREATE TRIGGER gpa_profiles_updated_at
  BEFORE UPDATE ON public.gpa_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.gpa_profiles IS 'User ke GPA profiles (multiple per user)';
COMMENT ON COLUMN public.gpa_profiles.name IS 'Profile ka naam (e.g., "BS CS Fall 2023")';
COMMENT ON COLUMN public.gpa_profiles.profile_type IS 'undergraduate ya postgraduate';