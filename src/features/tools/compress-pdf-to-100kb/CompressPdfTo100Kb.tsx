"use client";

import CompressPdf from "../compress-pdf/CompressPdf";

/** Preset page module: compress a PDF to 100 KB or under. */
export default function CompressPdfTo100Kb() {
  return <CompressPdf defaultTargetKb={100} fixedTargetKb />;
}
