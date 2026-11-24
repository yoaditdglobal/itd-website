"use client";

import { useEffect, useRef } from "react";
import { send } from "./Beacon";

/**
 * Sends the beacon's `nf` event (p = the requested path) when the not-found
 * page renders. Mounted in src/app/not-found.tsx; the prebuild guard checks it.
 */
export default function NotFoundBeacon() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    send("nf");
  }, []);
  return null;
}
