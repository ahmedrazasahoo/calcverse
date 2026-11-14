"use client";

import CompressPdf from "../compress-pdf/CompressPdf";

/** Preset page module: compress a PDF to 300 KB or under. */
export default function CompressPdfTo300Kb() {
  return <CompressPdf defaultTargetKb={300} fixedTargetKb />;
}
