-- ============================================
-- Studyo: Row Level Security for users
-- ============================================
-- Har user sirf apna data dekh sake, update kar sake.
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users apna profile dekh sakte hain
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Users apna profile update kar sakte hain
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users apna profile insert kar sakte hain (signup ke waqt)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);