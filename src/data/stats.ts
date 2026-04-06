/**
 * @file stats.ts
 * @description Metrics data — sourced from content system.
 */

import { content } from "@/data/content";
export type { MetricContent as Metric } from "@/data/content";

export const METRICS = content.stats;

export const HERO_METRICS = METRICS.slice(0, 3);
