import "server-only";
import { SITE_NAME } from "@/lib/site";
import { liveTools, tools } from "@/lib/tools";

/**
 * Backend only helpers. Files in src/server must never be imported by
 * client components. Future rates endpoints (metal prices for zakat,
 * exchange rates) will live here too, behind route handlers in src/app/api.
 */
export interface HealthStatus {
  status: "ok";
  service: string;
  version: string;
  toolsRegistered: number;
  toolsLive: number;
  timestamp: string;
}

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    service: SITE_NAME,
    version: process.env.npm_package_version ?? "0.1.0",
    toolsRegistered: tools.length,
    toolsLive: liveTools().length,
    timestamp: new Date().toISOString(),
  };
}
