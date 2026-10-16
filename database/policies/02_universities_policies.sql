-- ============================================
-- Studyo: Row Level Security for universities
-- ============================================
-- Universities ka data sab dekhte hain (public read-only).
-- Sirf admins insert/update/delete kar sakte hain.
-- ============================================

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- Sab log universities list dekh sakte hain (public info)
DROP POLICY IF EXISTS "Anyone can view universities" ON public.universities;
CREATE POLICY "Anyone can view universities"
  ON public.universities
  FOR SELECT
  USING (true);

-- Sirf service role insert/update kar sakta hai (backend se)
-- User-side se koi change nahi kar sakta
DROP POLICY IF EXISTS "Only service role can modify universities" ON public.universities;
CREATE POLICY "Only service role can modify universities"
  ON public.universities
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');