// ============================================
// Studyo: GPA Calculator Logic
// ============================================
// Pure functions — HEC-aligned 4.0 scale.
// Formulas:
//   Quality Points (course) = Grade Points × Credit Hours
//   SGPA = Sum(QP) / Sum(Credits)
//   CGPA = Sum(QP all) / Sum(Credits all)
// ============================================

import type {
  Course,
  GpaResult,
  CgpaResult,
  TargetPlannerInput,
  TargetPlannerResult,
  UniversityPreset,
} from "./types";

/**
 * Marks (%) se grade point nikalta hai, preset ke hisaab se.
 */
export function marksToGradePoints(
  marks: number,
  preset: UniversityPreset
): { letter: string; points: number } {
  // Grades sorted descending by min marks
  const sorted = [...preset.grades].sort((a, b) => b.min - a.min);

  for (const grade of sorted) {
    if (marks >= grade.min) {
      return { letter: grade.letter, points: grade.points };
    }
  }

  // Fallback — agar kuch match na kare
  const lowest = sorted[sorted.length - 1];
  return { letter: lowest.letter, points: lowest.points };
}

/**
 * Letter grade se grade point nikalta hai.
 */
export function letterToGradePoints(
  letter: string,
  preset: UniversityPreset
): number {
  const grade = preset.grades.find(
    (g) => g.letter.toLowerCase() === letter.toLowerCase()
  );
  return grade ? grade.points : 0;
}

/**
 * Course ka quality points nikalta hai.
 */
export function getCourseQualityPoints(course: Course): number {
  return course.gradePoints * course.creditHours;
}

/**
 * Semester GPA (SGPA) calculate karta hai.
 */
export function calculateSgpa(
  courses: Course[],
  preset: UniversityPreset
): GpaResult {
  let totalCredits = 0;
  let totalQualityPoints = 0;

  for (const course of courses) {
    if (course.creditHours <= 0) continue;
    totalCredits += course.creditHours;
    totalQualityPoints += getCourseQualityPoints(course);
  }

  const gpa =
    totalCredits > 0
      ? roundTo(totalQualityPoints / totalCredits, preset.rounding)
      : 0;

  return {
    totalCredits: roundTo(totalCredits, preset.rounding),
    totalQualityPoints: roundTo(totalQualityPoints, preset.rounding),
    gpa,
  };
}

/**
 * Overall CGPA calculate karta hai (multiple semesters).
 */
export function calculateCgpa(
  semesters: { courses: Course[] }[],
  preset: UniversityPreset
): CgpaResult {
  let totalCredits = 0;
  let totalQualityPoints = 0;

  for (const semester of semesters) {
    for (const course of semester.courses) {
      if (course.creditHours <= 0) continue;
      totalCredits += course.creditHours;
      totalQualityPoints += getCourseQualityPoints(course);
    }
  }

  const cgpa =
    totalCredits > 0
      ? roundTo(totalQualityPoints / totalCredits, preset.rounding)
      : 0;

  return {
    totalCredits: roundTo(totalCredits, preset.rounding),
    totalQualityPoints: roundTo(totalQualityPoints, preset.rounding),
    cgpa,
  };
}

/**
 * Updated CGPA — previous CGPA + naya semester.
 * Formula:
 *   Updated CGPA = (Prev CGPA × Prev Credits + Current QP) / (Prev Credits + Current Credits)
 */
export function calculateUpdatedCgpa(
  previousCgpa: number,
  previousCredits: number,
  currentCourses: Course[],
  preset: UniversityPreset
): CgpaResult {
  const currentQp = currentCourses.reduce(
    (sum, c) => sum + getCourseQualityPoints(c),
    0
  );
  const currentCredits = currentCourses.reduce(
    (sum, c) => sum + c.creditHours,
    0
  );

  const totalCredits = previousCredits + currentCredits;
  const totalQualityPoints = previousCgpa * previousCredits + currentQp;

  const cgpa =
    totalCredits > 0
      ? roundTo(totalQualityPoints / totalCredits, preset.rounding)
      : 0;

  return {
    totalCredits: roundTo(totalCredits, preset.rounding),
    totalQualityPoints: roundTo(totalQualityPoints, preset.rounding),
    cgpa,
  };
}

/**
 * Target CGPA Planner.
 * Formula:
 *   Required GPA = (Target CGPA × (Prev + Upcoming Credits) − Prev CGPA × Prev Credits) / Upcoming Credits
 */
export function calculateTargetGpa(
  input: TargetPlannerInput,
  preset: UniversityPreset
): TargetPlannerResult {
  const {
    currentCgpa,
    currentCredits,
    targetCgpa,
    upcomingCredits,
  } = input;

  if (upcomingCredits <= 0) {
    return {
      requiredGpa: 0,
      isAchievable: false,
      message: "Upcoming credits zero nahi ho sakti.",
    };
  }

  const requiredGpa =
    (targetCgpa * (currentCredits + upcomingCredits) -
      currentCgpa * currentCredits) /
    upcomingCredits;

  const rounded = roundTo(requiredGpa, preset.rounding);
  const maxScale = preset.scale;

  // Check achievable
  if (rounded > maxScale) {
    return {
      requiredGpa: rounded,
      isAchievable: false,
      message: `Target mushkil hai — aapko ${rounded.toFixed(
        2
      )} GPA chahiye jo max ${maxScale.toFixed(
        2
      )} se zyada hai. Target kam karo ya zyada credits lo.`,
    };
  }

  if (rounded < 0) {
    return {
      requiredGpa: 0,
      isAchievable: true,
      message: `Aap already target se aage hain! Bas ${preset.minCgpa.undergraduate.toFixed(
        2
      )} GPA maintain karo.`,
    };
  }

  if (rounded < preset.minCgpa.undergraduate) {
    return {
      requiredGpa: rounded,
      isAchievable: true,
      message: `Aapko sirf ${rounded.toFixed(
        2
      )} GPA chahiye — minimum passing se bhi neeche. Aaram se achieve kar sakte ho.`,
    };
  }

  return {
    requiredGpa: rounded,
    isAchievable: true,
    message: `Aapko agle semester mein ${rounded.toFixed(
      2
    )} GPA chahiye. Consistent mehnat se ye achievable hai.`,
  };
}

/**
 * CGPA se approximate percentage.
 * Common unofficial formula: (CGPA / 4.0) × 100
 */
export function cgpaToPercentage(cgpa: number, scale: number = 4.0): number {
  if (scale === 0) return 0;
  return roundTo((cgpa / scale) * 100, 2);
}

/**
 * Percentage se approximate CGPA.
 */
export function percentageToCgpa(
  percentage: number,
  scale: number = 4.0
): number {
  return roundTo((percentage / 100) * scale, 2);
}

/**
 * Round to N decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Unique ID generate karta hai (courses aur semesters ke liye).
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}