-- ============================================
-- Studyo: Feedback Table
-- ============================================
-- Users ka feedback store karne ke liye.
-- Anonymous bhi ho sakta hai (user_id NULL).
-- ============================================

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Status sirf in values mein se ek ho
  CONSTRAINT feedback_status_check
    CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_feedback_user ON public.feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON public.feedback(created_at DESC);

-- Comments
COMMENT ON TABLE public.feedback IS 'User feedback aur contact form submissions';
COMMENT ON COLUMN public.feedback.user_id IS 'NULL agar anonymous feedback ho';
COMMENT ON COLUMN public.feedback.status IS 'Feedback ka status (new, read, replied, archived)';