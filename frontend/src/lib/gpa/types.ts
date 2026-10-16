// ============================================
// Studyo: GPA Calculator Types
// ============================================

export interface GradeBand {
  letter: string;
  min: number; // minimum marks %
  points: number; // grade points
}

export interface UniversityPreset {
  id: string;
  label: string;
  scale: number; // usually 4.0
  rounding: number; // decimal places (usually 2)
  minCgpa: {
    undergraduate: number;
    postgraduate: number;
  };
  grades: GradeBand[];
  repeatPolicy: "replace" | "average" | "best";
  sourceUrl: string;
  lastVerifiedAt?: string;
}

export interface Course {
  id: string;
  name: string;
  creditHours: number;
  marks: number | null; // 0-100
  grade: string | null; // letter grade
  gradePoints: number; // computed or manually entered
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export interface GpaResult {
  totalCredits: number;
  totalQualityPoints: number;
  gpa: number;
}

export interface CgpaResult {
  totalCredits: number;
  totalQualityPoints: number;
  cgpa: number;
}

export interface TargetPlannerInput {
  currentCgpa: number;
  currentCredits: number;
  targetCgpa: number;
  upcomingCredits: number;
}

export interface TargetPlannerResult {
  requiredGpa: number;
  isAchievable: boolean;
  message: string;
}