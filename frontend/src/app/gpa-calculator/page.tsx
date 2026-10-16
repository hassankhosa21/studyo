"use client";

import { useState, useEffect, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  calculateSgpa,
  calculateCgpa,
  calculateUpdatedCgpa,
  calculateTargetGpa,
  cgpaToPercentage,
  marksToGradePoints,
  letterToGradePoints,
  generateId,
} from "@/lib/gpa/calculator";
import {
  PRESET_LIST,
  DEFAULT_PRESET_ID,
  getPreset,
} from "@/lib/gpa/presets";
import {
  loadGpaData,
  saveGpaData,
  clearGpaData,
  createEmptyCourse,
  createEmptySemester,
} from "@/lib/gpa/storage";
import type { Course, Semester } from "@/lib/gpa/types";

const relatedTools = [
  { name: "Word Counter", href: "/word-counter" },
  { name: "Citation Generator", href: "/citation-generator" },
  { name: "PDF Merge", href: "/pdf-merge" },
];

const howToSteps = [
  "Select your university preset from the dropdown.",
  "Add courses with credit hours and marks (or letter grade).",
  "See your SGPA calculated automatically for the semester.",
  "Add more semesters to get your overall CGPA.",
  "Use the Target Planner to know what GPA you need next semester.",
];

const features = [
  "HEC-aligned 4.0 scale with university presets",
  "SGPA, CGPA, and Updated CGPA calculations",
  "Target CGPA planner — what GPA do I need?",
  "CGPA to percentage conversion",
  "Auto-save in your browser (no signup)",
  "Preset source link and verified date shown",
];

const faqs = [
  {
    question: "Is the GPA calculator accurate for my university?",
    answer:
      "We use HEC-aligned 4.0 scale presets verified from official university sources. Always check your university's official notification — results are estimates only.",
  },
  {
    question: "How is SGPA calculated?",
    answer:
      "SGPA = Sum of (Grade Points × Credit Hours) / Sum of Credit Hours. Same formula used by most Pakistani universities on the HEC 4.0 scale.",
  },
  {
    question: "Is my data stored on your server?",
    answer:
      "No. Your GPA data is saved locally in your browser using localStorage. It never leaves your device.",
  },
  {
    question: "Can I use this for UOG?",
    answer:
      "Yes — we have a University of Gujrat (UOG) preset. More university presets are being added. If yours is missing, use the HEC-style standard preset.",
  },
];

export default function GpaCalculatorPage() {
  const [presetId, setPresetId] = useState<string>(DEFAULT_PRESET_ID);
  const [profileType, setProfileType] = useState<
    "undergraduate" | "postgraduate"
  >("undergraduate");
  const [previousCgpa, setPreviousCgpa] = useState<number>(0);
  const [previousCredits, setPreviousCredits] = useState<number>(0);
  const [semesters, setSemesters] = useState<Semester[]>([
    createEmptySemester(generateId(), "Semester 1"),
  ]);

  // Target planner inputs
  const [targetCgpa, setTargetCgpa] = useState<number>(3.5);
  const [upcomingCredits, setUpcomingCredits] = useState<number>(15);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadGpaData();
    if (saved) {
      setPresetId(saved.presetId || DEFAULT_PRESET_ID);
      setPreviousCgpa(saved.previousCgpa || 0);
      setPreviousCredits(saved.previousCredits || 0);
      if (saved.semesters && saved.semesters.length > 0) {
        setSemesters(saved.semesters);
      }
    }
  }, []);

  // Auto-save on change
  useEffect(() => {
    saveGpaData({
      presetId,
      previousCgpa,
      previousCredits,
      semesters,
      savedAt: new Date().toISOString(),
    });
  }, [presetId, previousCgpa, previousCredits, semesters]);

  const preset = useMemo(() => getPreset(presetId), [presetId]);

  // ---- Calculations ----
  const currentSemesterCgpa = useMemo(() => {
    if (semesters.length === 0) {
      return { gpa: 0, totalCredits: 0, totalQualityPoints: 0 };
    }
    return calculateSgpa(semesters[0].courses, preset);
  }, [semesters, preset]);

  const finalCgpa = useMemo(
    () =>
      calculateUpdatedCgpa(
        previousCgpa,
        previousCredits,
        semesters.flatMap((s) => s.courses),
        preset
      ),
    [previousCgpa, previousCredits, semesters, preset]
  );

  const targetResult = useMemo(
    () =>
      calculateTargetGpa(
        {
          currentCgpa: finalCgpa.cgpa,
          currentCredits: finalCgpa.totalCredits,
          targetCgpa,
          upcomingCredits,
        },
        preset
      ),
    [finalCgpa, targetCgpa, upcomingCredits, preset]
  );

  // ---- Handlers ----
  const updateCourse = (
    semId: string,
    courseId: string,
    updates: Partial<Course>
  ) => {
    setSemesters((prev) =>
      prev.map((s) => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: s.courses.map((c) => {
            if (c.id !== courseId) return c;
            const updated = { ...c, ...updates };

            // Auto-compute grade points
            if (updates.marks !== undefined && updated.marks !== null) {
              const { letter, points } = marksToGradePoints(
                updated.marks,
                preset
              );
              updated.grade = letter;
              updated.gradePoints = points;
            } else if (updates.grade !== undefined && updated.grade) {
              updated.gradePoints = letterToGradePoints(
                updated.grade,
                preset
              );
            }

            return updated;
          }),
        };
      })
    );
  };

  const addCourse = (semId: string) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? { ...s, courses: [...s.courses, createEmptyCourse(generateId())] }
          : s
      )
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  };

  const addSemester = () => {
    const newNum = semesters.length + 1;
    setSemesters((prev) => [
      ...prev,
      createEmptySemester(generateId(), `Semester ${newNum}`),
    ]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((s) => s.id !== semId));
  };

  const handleReset = () => {
    if (!confirm("Sab data clear karna hai? Ye undo nahi hoga.")) return;
    clearGpaData();
    setPresetId(DEFAULT_PRESET_ID);
    setPreviousCgpa(0);
    setPreviousCredits(0);
    setSemesters([createEmptySemester(generateId(), "Semester 1")]);
  };

  return (
    <ToolLayout
      title="GPA / CGPA Calculator"
      description="HEC-aligned 4.0 scale GPA and CGPA calculator with university presets. Calculate SGPA, updated CGPA, and see what GPA you need for your target."
      howToSteps={howToSteps}
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      {/* Preset Selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          University Preset
        </label>
        <select
          value={presetId}
          onChange={(e) => setPresetId(e.target.value)}
          style={{
            width: "100%",
            padding: "0.625rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "0.95rem",
            background: "white",
            cursor: "pointer",
          }}
        >
          {PRESET_LIST.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            color: "#6b7280",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span>
            Source:{" "}
            <a
              href={preset.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb" }}
            >
              {preset.sourceUrl === "reference-only"
                ? "Reference (verify with your university)"
                : preset.sourceUrl}
            </a>
          </span>
          {preset.lastVerifiedAt && (
            <span>Verified: {preset.lastVerifiedAt}</span>
          )}
        </div>

        {/* Profile Type */}
        <div style={{ marginTop: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Profile Type
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {(["undergraduate", "postgraduate"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setProfileType(type)}
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  background: profileType === type ? "#2563eb" : "white",
                  color: profileType === type ? "white" : "#374151",
                  border:
                    profileType === type
                      ? "1px solid #2563eb"
                      : "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </button>
            ))}
          </div>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "#6b7280",
            }}
          >
            Minimum qualifying CGPA:{" "}
            <strong>{preset.minCgpa[profileType]}</strong>
          </p>
        </div>
      </div>

      {/* Previous CGPA Section */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.25rem",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "0.75rem",
          }}
        >
          Previous Record (optional)
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>
          Agar aap already kuch semesters kar chuke ho, toh yahan previous CGPA
          aur credits daalo. Nahi toh 0 chhoro.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Previous CGPA
            </label>
            <input
              type="number"
              min="0"
              max={preset.scale}
              step="0.01"
              value={previousCgpa || ""}
              onChange={(e) =>
                setPreviousCgpa(parseFloat(e.target.value) || 0)
              }
              placeholder="e.g., 3.25"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Previous Credits
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={previousCredits || ""}
              onChange={(e) =>
                setPreviousCredits(parseFloat(e.target.value) || 0)
              }
              placeholder="e.g., 60"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* Semesters */}
      {semesters.map((semester) => {
        const sgpa = calculateSgpa(semester.courses, preset);
        return (
          <div
            key={semester.id}
            style={{
              marginTop: "1.5rem",
              padding: "1.25rem",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                value={semester.name}
                onChange={(e) =>
                  setSemesters((prev) =>
                    prev.map((s) =>
                      s.id === semester.id ? { ...s, name: e.target.value } : s
                    )
                  )
                }
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#111827",
                  border: "1px solid transparent",
                  background: "transparent",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.375rem",
                  flex: 1,
                  minWidth: "150px",
                }}
              />
              {semesters.length > 1 && (
                <button
                  onClick={() => removeSemester(semester.id)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "transparent",
                    color: "#dc2626",
                    border: "1px solid #fca5a5",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Remove Semester
                </button>
              )}
            </div>

            {/* Courses Table */}
            {semester.courses.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.9rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "#6b7280", fontWeight: 600 }}>
                        Course
                      </th>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "#6b7280", fontWeight: 600, width: "90px" }}>
                        Credits
                      </th>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "#6b7280", fontWeight: 600, width: "100px" }}>
                        Marks
                      </th>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "#6b7280", fontWeight: 600, width: "80px" }}>
                        Grade
                      </th>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "#6b7280", fontWeight: 600, width: "80px" }}>
                        Points
                      </th>
                      <th style={{ width: "50px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.courses.map((course) => (
                      <tr
                        key={course.id}
                        style={{ borderBottom: "1px solid #f3f4f6" }}
                      >
                        <td style={{ padding: "0.5rem" }}>
                          <input
                            type="text"
                            value={course.name}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder="Course name"
                            style={{
                              width: "100%",
                              padding: "0.375rem 0.5rem",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.375rem",
                              fontSize: "0.85rem",
                            }}
                          />
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={course.creditHours || ""}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, {
                                creditHours: parseFloat(e.target.value) || 0,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "0.375rem 0.5rem",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.375rem",
                              fontSize: "0.85rem",
                            }}
                          />
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            value={course.marks ?? ""}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, {
                                marks:
                                  e.target.value === ""
                                    ? null
                                    : parseFloat(e.target.value),
                              })
                            }
                            placeholder="—"
                            style={{
                              width: "100%",
                              padding: "0.375rem 0.5rem",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.375rem",
                              fontSize: "0.85rem",
                            }}
                          />
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          <input
                            type="text"
                            value={course.grade || ""}
                            onChange={(e) =>
                              updateCourse(semester.id, course.id, {
                                grade: e.target.value || null,
                              })
                            }
                            placeholder="—"
                            style={{
                              width: "100%",
                              padding: "0.375rem 0.5rem",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.375rem",
                              fontSize: "0.85rem",
                              textAlign: "center",
                            }}
                          />
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                          <span
                            style={{
                              color: "#2563eb",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                            }}
                          >
                            {course.gradePoints.toFixed(2)}
                          </span>
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                          <button
                            onClick={() =>
                              removeCourse(semester.id, course.id)
                            }
                            style={{
                              background: "transparent",
                              color: "#dc2626",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "1rem",
                              padding: "0.25rem",
                            }}
                            aria-label="Remove course"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Add Course Button */}
            <button
              onClick={() => addCourse(semester.id)}
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                background: "white",
                color: "#2563eb",
                border: "1px dashed #93c5fd",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              + Add Course
            </button>

            {/* Semester SGPA */}
            {semester.courses.length > 0 && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  background: "#eff6ff",
                  borderRadius: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "#1e40af" }}>
                  Total Credits:{" "}
                  <strong>{sgpa.totalCredits.toFixed(2)}</strong>
                </span>
                <span style={{ color: "#1e40af" }}>
                  Quality Points:{" "}
                  <strong>{sgpa.totalQualityPoints.toFixed(2)}</strong>
                </span>
                <span style={{ color: "#1e40af", fontWeight: 700 }}>
                  SGPA: <strong>{sgpa.gpa.toFixed(2)}</strong>
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Semester Button */}
      <button
        onClick={addSemester}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.25rem",
          background: "white",
          color: "#2563eb",
          border: "1px dashed #93c5fd",
          borderRadius: "0.5rem",
          fontSize: "0.95rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + Add Another Semester
      </button>

      {/* ---- Results ---- */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          border: "1px solid #93c5fd",
          borderRadius: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1e3a8a",
            marginBottom: "1rem",
          }}
        >
          📊 Your Results
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          <ResultCard
            label="Current CGPA"
            value={finalCgpa.cgpa.toFixed(2)}
            subtitle={`${finalCgpa.totalCredits.toFixed(2)} credits`}
          />
          <ResultCard
            label="Percentage (approx.)"
            value={`${cgpaToPercentage(finalCgpa.cgpa, preset.scale).toFixed(2)}%`}
            subtitle="Unofficial estimate"
          />
          <ResultCard
            label="Total Quality Points"
            value={finalCgpa.totalQualityPoints.toFixed(2)}
            subtitle="Sum across all courses"
          />
          <ResultCard
            label="Semester SGPA (Current)"
            value={(currentSemesterCgpa.gpa || 0).toFixed(2)}
            subtitle={`${semesters.length} semester(s)`}
          />
        </div>

        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.75rem",
            color: "#1e3a8a",
            lineHeight: 1.5,
          }}
        >
          ⚠️ <strong>Disclaimer:</strong> Ye estimate hai. Official result
          aapki university ka hi final hoga. Percentage formula unofficial
          hai — HEC ki official conversion table se verify karo.
        </p>
      </div>

      {/* ---- Target Planner ---- */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "#fef9c3",
          border: "1px solid #fde047",
          borderRadius: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#713f12",
            marginBottom: "1rem",
          }}
        >
          🎯 Target CGPA Planner
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#713f12",
                marginBottom: "0.25rem",
              }}
            >
              Target CGPA
            </label>
            <input
              type="number"
              min="0"
              max={preset.scale}
              step="0.01"
              value={targetCgpa || ""}
              onChange={(e) =>
                setTargetCgpa(parseFloat(e.target.value) || 0)
              }
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #fde047",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                background: "white",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#713f12",
                marginBottom: "0.25rem",
              }}
            >
              Upcoming Credits
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={upcomingCredits || ""}
              onChange={(e) =>
                setUpcomingCredits(parseFloat(e.target.value) || 0)
              }
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #fde047",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                background: "white",
              }}
            />
          </div>
        </div>

        <div
          style={{
            padding: "1rem",
            background: targetResult.isAchievable ? "#dcfce7" : "#fee2e2",
            border: `1px solid ${
              targetResult.isAchievable ? "#86efac" : "#fca5a5"
            }`,
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: targetResult.isAchievable ? "#166534" : "#991b1b",
              marginBottom: "0.25rem",
            }}
          >
            Required GPA: {targetResult.requiredGpa.toFixed(2)}
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: targetResult.isAchievable ? "#166534" : "#991b1b",
              lineHeight: 1.5,
            }}
          >
            {targetResult.message}
          </p>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1rem",
          background: "transparent",
          color: "#dc2626",
          border: "1px solid #fca5a5",
          borderRadius: "0.5rem",
          fontSize: "0.85rem",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        🗑️ Reset All Data
      </button>
    </ToolLayout>
  );
}

/* Result Card */
function ResultCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid #dbeafe",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "#6b7280",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "0.5rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#1e40af",
        }}
      >
        {value}
      </div>
      {subtitle && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}