import { NextResponse } from "next/server";

// Sink for Core Web Vitals beacons sent by WebVitalsReporter. In production
// this would forward to GA4 (Measurement Protocol), a CDP, or a metrics
// store (Datadog/Grafana) instead of logging.
export async function POST(request: Request) {
  try {
    const metric = await request.json();
    if (process.env.NODE_ENV === "development") {
      console.log("[web-vitals]", metric.name, metric.value);
    }
  } catch {
    // Ignore malformed beacons — never let telemetry break the request.
  }
  return NextResponse.json({ ok: true });
}
