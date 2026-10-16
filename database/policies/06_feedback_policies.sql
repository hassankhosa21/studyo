-- ============================================
-- Studyo: Row Level Security for feedback
-- ============================================
-- Feedback public hai (koi bhi submit kar sakta hai).
-- Lekin dekhna sirf apna feedback (agar logged in ho).
-- Admin sab dekh sakta hai (service_role se).
-- ============================================

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Koi bhi feedback insert kar sakta hai (anonymous bhi)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit feedback"
  ON public.feedback
  FOR INSERT
  WITH CHECK (true);

-- Logged-in user apna feedback dekh sakta hai
DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;
CREATE POLICY "Users can view own feedback"
  ON public.feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admin (service role) sab feedback dekh sakta hai
DROP POLICY IF EXISTS "Service role can view all feedback" ON public.feedback;
CREATE POLICY "Service role can view all feedback"
  ON public.feedback
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');