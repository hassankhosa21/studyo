-- ============================================
-- Studyo: Row Level Security for semesters
-- ============================================
-- User sirf apne semesters access kare.
-- Semester indirectly profile se linked hai.
-- ============================================

ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;

-- Users apne semesters dekhte hain (profile ownership check)
DROP POLICY IF EXISTS "Users can view own semesters" ON public.semesters;
CREATE POLICY "Users can view own semesters"
  ON public.semesters
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.gpa_profiles
      WHERE gpa_profiles.id = semesters.profile_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne semesters insert karte hain
DROP POLICY IF EXISTS "Users can insert own semesters" ON public.semesters;
CREATE POLICY "Users can insert own semesters"
  ON public.semesters
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.gpa_profiles
      WHERE gpa_profiles.id = semesters.profile_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne semesters update karte hain
DROP POLICY IF EXISTS "Users can update own semesters" ON public.semesters;
CREATE POLICY "Users can update own semesters"
  ON public.semesters
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.gpa_profiles
      WHERE gpa_profiles.id = semesters.profile_id
        AND gpa_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.gpa_profiles
      WHERE gpa_profiles.id = semesters.profile_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne semesters delete karte hain
DROP POLICY IF EXISTS "Users can delete own semesters" ON public.semesters;
CREATE POLICY "Users can delete own semesters"
  ON public.semesters
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.gpa_profiles
      WHERE gpa_profiles.id = semesters.profile_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );