"use client";

import CompressImage from "../compress-image/CompressImage";

/** Preset page module: compress an image to 100 KB or under. */
export default function CompressImageTo100Kb() {
  return <CompressImage defaultTargetKb={100} fixedTargetKb />;
}
