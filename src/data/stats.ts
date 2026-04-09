/**
 * @file stats.ts
 * @description Metrics data — sourced from content system.
 */

import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
export type { MetricContent as Metric } from "@/data/content";

export function getMetrics(locale?: Locale) {
  const content = getContent(locale);
  return content.stats;
}

export function getHeroMetrics(locale?: Locale) {
  const metrics = getMetrics(locale);
  return metrics.slice(0, 3);
}
