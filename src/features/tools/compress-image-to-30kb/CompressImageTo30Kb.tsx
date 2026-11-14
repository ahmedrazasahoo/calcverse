"use client";

import CompressImage from "../compress-image/CompressImage";

/** Preset page module: compress an image to 30 KB or under. */
export default function CompressImageTo30Kb() {
  return <CompressImage defaultTargetKb={30} fixedTargetKb />;
}
