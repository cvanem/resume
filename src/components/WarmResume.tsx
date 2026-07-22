"use client";

import { useEffect } from "react";

/**
 * Fires a lightweight warm-up ping at /api/resume once on page load. The ping
 * hits the route handler — spinning up the serverless container and loading the
 * heavy @react-pdf/renderer module chain — but returns before rendering any
 * PDF, so the first real "Download resume" click doesn't wait on a cold start.
 *
 * Renders nothing. Warming is best-effort: a failed or slow ping just means no
 * speed-up, never a broken page.
 */
export function WarmResume() {
  useEffect(() => {
    // keepalive so the ping survives if the user clicks/navigates right away.
    fetch("/api/resume?warm=1", { keepalive: true }).catch(() => {});
  }, []);

  return null;
}
