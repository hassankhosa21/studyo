-- ============================================
-- Studyo: Row Level Security for citations_saved
-- ============================================
-- Har user sirf apne saved citations access kare.
-- ============================================

ALTER TABLE public.citations_saved ENABLE ROW LEVEL SECURITY;

-- Users apne citations dekhte hain
DROP POLICY IF EXISTS "Users can view own citations" ON public.citations_saved;
CREATE POLICY "Users can view own citations"
  ON public.citations_saved
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users apne citations insert karte hain
DROP POLICY IF EXISTS "Users can insert own citations" ON public.citations_saved;
CREATE POLICY "Users can insert own citations"
  ON public.citations_saved
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users apne citations update karte hain
DROP POLICY IF EXISTS "Users can update own citations" ON public.citations_saved;
CREATE POLICY "Users can update own citations"
  ON public.citations_saved
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users apne citations delete karte hain
DROP POLICY IF EXISTS "Users can delete own citations" ON public.citations_saved;
CREATE POLICY "Users can delete own citations"
  ON public.citations_saved
  FOR DELETE
  USING (auth.uid() = user_id);