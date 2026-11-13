"use client";

import CompressImage from "../compress-image/CompressImage";

/** Preset page module: compress an image to 50 KB or under. */
export default function CompressImageTo50Kb() {
  return <CompressImage defaultTargetKb={50} fixedTargetKb />;
}
