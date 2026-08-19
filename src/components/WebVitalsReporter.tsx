"use client";

import { useReportWebVitals } from "next/web-vitals";

// Ships Core Web Vitals (LCP, INP, CLS, TTFB, FCP) to the analytics
// endpoint so performance regressions surface in production, not just in
// local Lighthouse runs.
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify(metric);
    const url = "/api/vitals";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: "POST", keepalive: true });
    }
  });
  return null;
}
