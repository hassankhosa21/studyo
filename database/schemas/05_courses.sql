-- ============================================
-- Studyo: Courses Table
-- ============================================
-- Har semester ke multiple courses hote hain.
-- Marks ya grade dono mein se ek store hota hai.
-- ============================================

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_id UUID NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  credit_hours NUMERIC(4, 2) NOT NULL,
  marks NUMERIC(5, 2),
  grade TEXT,
  grade_points NUMERIC(3, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Credit hours positive hone chahiye
  CONSTRAINT courses_credit_hours_positive
    CHECK (credit_hours > 0),

  -- Marks 0-100 ke beech
  CONSTRAINT courses_marks_range
    CHECK (marks IS NULL OR (marks >= 0 AND marks <= 100)),

  -- Grade points 0-4 ke beech
  CONSTRAINT courses_grade_points_range
    CHECK (grade_points >= 0 AND grade_points <= 4),

  -- Kam az kam marks ya grade mein se ek hona chahiye
  CONSTRAINT courses_marks_or_grade
    CHECK (marks IS NOT NULL OR grade IS NOT NULL)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_courses_semester ON public.courses(semester_id);
CREATE INDEX IF NOT EXISTS idx_courses_grade ON public.courses(grade);

-- Auto-update updated_at
CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.courses IS 'Semester ke courses with grades';
COMMENT ON COLUMN public.courses.credit_hours IS 'Credit hours (e.g., 3.00, 1.50)';
COMMENT ON COLUMN public.courses.marks IS 'Marks obtained (0-100), optional agar grade diya ho';
COMMENT ON COLUMN public.courses.grade IS 'Letter grade (A, A-, B+, etc.), optional agar marks diye ho';
COMMENT ON COLUMN public.courses.grade_points IS 'Grade point (0.00 - 4.00)';