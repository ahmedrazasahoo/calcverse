"use client";

import CompressPdf from "../compress-pdf/CompressPdf";

/** Preset page module: compress a PDF to 50 KB or under. */
export default function CompressPdfTo50Kb() {
  return <CompressPdf defaultTargetKb={50} fixedTargetKb />;
}
