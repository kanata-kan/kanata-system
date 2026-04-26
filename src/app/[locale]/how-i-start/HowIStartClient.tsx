"use client";

import { useState, useCallback } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/data/content";
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

export function HowIStartClient() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();

  const content = getContent(locale);
  const flow = content.flow;
  const isRtl = locale === "ar";

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

  const shared = {
    formData,
    setField,
    onNext: next,
    onBack: back,
    flow,
    isRtl,
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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
          {step === 0 && <StepIntro onNext={next} flow={flow} isRtl={isRtl} />}
          {step === 1 && <StepGoal {...shared} />}
          {step === 2 && <StepProblem {...shared} />}
          {step === 3 && <StepAttempts {...shared} />}
          {step === 4 && <StepTiming {...shared} />}
          {step === 5 && (
            <StepFilter onNext={next} onBack={back} flow={flow} isRtl={isRtl} />
          )}
          {step === 6 && (
            <StepSubmit
              formData={formData}
              onBack={back}
              flow={flow}
              isRtl={isRtl}
            />
          )}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          borderTop: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 100 100"
          aria-hidden="true"
          style={{ opacity: 0.4 }}
        >
          <path
            d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16"
            fill="none"
            stroke={C.cyan}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5,53 L42,53"
            fill="none"
            stroke={C.cyan}
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: C.faint,
            letterSpacing: 2,
          }}
        >
          {flow.footer}
        </span>
      </div>
    </div>
  );
}
