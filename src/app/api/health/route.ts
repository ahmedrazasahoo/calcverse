import { NextResponse } from "next/server";
import { getHealthStatus } from "@/server/health";

/** GET /api/health: lightweight liveness and registry summary for monitoring. */
export async function GET() {
  return NextResponse.json(getHealthStatus());
}
