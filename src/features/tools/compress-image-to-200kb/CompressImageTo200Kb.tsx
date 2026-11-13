"use client";

import CompressImage from "../compress-image/CompressImage";

/** Preset page module: compress an image to 200 KB or under. */
export default function CompressImageTo200Kb() {
  return <CompressImage defaultTargetKb={200} fixedTargetKb />;
}
