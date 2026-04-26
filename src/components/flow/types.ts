/**
 * @file types.ts
 * @description Shared types for the client qualification flow.
 * Used by all Step components and the main page.
 */

import type { FlowContent } from "@/data/content/types";

export interface FormData {
  goal: string;
  problem: string;
  attempts?: string;
  timing: string;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  formData: FormData;
  setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  flow: FlowContent;
  isRtl: boolean;
}
