-- ============================================
-- Studyo: Row Level Security for courses
-- ============================================
-- User sirf apne courses access kare.
-- Course indirectly semester → profile se linked hai.
-- ============================================

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Users apne courses dekhte hain
DROP POLICY IF EXISTS "Users can view own courses" ON public.courses;
CREATE POLICY "Users can view own courses"
  ON public.courses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.semesters
      JOIN public.gpa_profiles ON gpa_profiles.id = semesters.profile_id
      WHERE semesters.id = courses.semester_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne courses insert karte hain
DROP POLICY IF EXISTS "Users can insert own courses" ON public.courses;
CREATE POLICY "Users can insert own courses"
  ON public.courses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.semesters
      JOIN public.gpa_profiles ON gpa_profiles.id = semesters.profile_id
      WHERE semesters.id = courses.semester_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne courses update karte hain
DROP POLICY IF EXISTS "Users can update own courses" ON public.courses;
CREATE POLICY "Users can update own courses"
  ON public.courses
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.semesters
      JOIN public.gpa_profiles ON gpa_profiles.id = semesters.profile_id
      WHERE semesters.id = courses.semester_id
        AND gpa_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.semesters
      JOIN public.gpa_profiles ON gpa_profiles.id = semesters.profile_id
      WHERE semesters.id = courses.semester_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );

-- Users apne courses delete karte hain
DROP POLICY IF EXISTS "Users can delete own courses" ON public.courses;
CREATE POLICY "Users can delete own courses"
  ON public.courses
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.semesters
      JOIN public.gpa_profiles ON gpa_profiles.id = semesters.profile_id
      WHERE semesters.id = courses.semester_id
        AND gpa_profiles.user_id = auth.uid()
    )
  );