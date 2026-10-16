-- ============================================
-- Studyo: Row Level Security for gpa_profiles
-- ============================================
-- Har user sirf apne GPA profiles dekh sake, edit kar sake.
-- ============================================

ALTER TABLE public.gpa_profiles ENABLE ROW LEVEL SECURITY;

-- Users apne profiles dekhte hain
DROP POLICY IF EXISTS "Users can view own gpa profiles" ON public.gpa_profiles;
CREATE POLICY "Users can view own gpa profiles"
  ON public.gpa_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users apne profiles insert karte hain
DROP POLICY IF EXISTS "Users can insert own gpa profiles" ON public.gpa_profiles;
CREATE POLICY "Users can insert own gpa profiles"
  ON public.gpa_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users apne profiles update karte hain
DROP POLICY IF EXISTS "Users can update own gpa profiles" ON public.gpa_profiles;
CREATE POLICY "Users can update own gpa profiles"
  ON public.gpa_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users apne profiles delete karte hain
DROP POLICY IF EXISTS "Users can delete own gpa profiles" ON public.gpa_profiles;
CREATE POLICY "Users can delete own gpa profiles"
  ON public.gpa_profiles
  FOR DELETE
  USING (auth.uid() = user_id);