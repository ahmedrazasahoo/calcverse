"use client";

import CompressImage from "../compress-image/CompressImage";

/** Preset page module: compress an image to 20 KB or under. */
export default function CompressImageTo20Kb() {
  return <CompressImage defaultTargetKb={20} fixedTargetKb />;
}
