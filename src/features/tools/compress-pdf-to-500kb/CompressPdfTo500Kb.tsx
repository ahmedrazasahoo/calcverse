"use client";

import CompressPdf from "../compress-pdf/CompressPdf";

/** Preset page module: compress a PDF to 500 KB or under. */
export default function CompressPdfTo500Kb() {
  return <CompressPdf defaultTargetKb={500} fixedTargetKb />;
}
