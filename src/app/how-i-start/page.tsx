/**
 * @file page.tsx
 * @description "How I Start" — Client Qualification Flow.
 * Multi-step guided thinking process. Not a contact form.
 * Manages form state and step navigation centrally.
 */
"use client";

import { useState, useCallback } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import {
  StepIntro,
  StepGoal,
  StepProblem,
  StepAttempts,
  StepTiming,
  StepFilter,
  StepSubmit,
} from "@/components/flow";
import type { FormData } from "@/components/flow";

const TOTAL_STEPS = 7;

export default function HowIStartPage() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    problem: "",
    attempts: "",
    timing: "",
  });

  const next = useCallback(
    () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)),
    [],
  );
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const setField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const stepProps = { formData, setField, onNext: next, onBack: back };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Progress bar */}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: C.bg3,
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
              transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "80px 20px 40px" : "100px 48px 60px",
          boxSizing: "border-box",
        }}
      >
        <div
          key={step}
          style={{
            width: "100%",
            maxWidth: 640,
            animation: "fadeUp .35s ease both",
          }}
        >
          {step === 0 && <StepIntro onNext={next} />}
          {step === 1 && <StepGoal {...stepProps} />}
          {step === 2 && <StepProblem {...stepProps} />}
          {step === 3 && <StepAttempts {...stepProps} />}
          {step === 4 && <StepTiming {...stepProps} />}
          {step === 5 && <StepFilter onNext={next} onBack={back} />}
          {step === 6 && <StepSubmit formData={formData} onBack={back} />}
        </div>
      </div>

      {/* Footer branding */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          borderTop: `1px solid ${C.line}`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: C.faint,
            letterSpacing: 2,
          }}
        >
          KANATA SYSTEM · CLIENT QUALIFICATION
        </span>
      </div>
    </div>
  );
}
