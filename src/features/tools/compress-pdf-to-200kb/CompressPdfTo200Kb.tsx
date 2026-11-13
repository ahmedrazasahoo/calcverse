"use client";

import CompressPdf from "../compress-pdf/CompressPdf";

/** Preset page module: compress a PDF to 200 KB or under. */
export default function CompressPdfTo200Kb() {
  return <CompressPdf defaultTargetKb={200} fixedTargetKb />;
}
