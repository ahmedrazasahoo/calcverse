/** SEO content for the HEIC to JPG converter page. */
export const content = {
  title: "HEIC to JPG Converter Online Free, On Your Device",
  metaDescription:
    "Turn iPhone HEIC photos into standard JPG files that open everywhere. Converted in your browser, no upload, no signup, no limit on photos.",
  intro:
    "Every iPhone since 2017 saves photos as HEIC by default. It is a clever format, but Windows PCs, older software and plenty of upload portals still cannot open it. This converter turns your HEIC photos into ordinary JPG files, right in your browser, so your private photos are never uploaded to a stranger's server.",
  howTo: [
    "Drop one or more HEIC photos into the box, or click to browse for them.",
    "Press Convert to JPG and watch the list fill up as each photo finishes.",
    "Download each JPG with its own button.",
  ],
  explanationTitle: "Why your iPhone uses HEIC, and why JPG still wins",
  explanation: [
    "HEIC stores a photo in about half the space of JPG at the same quality, which is why Apple chose it. The problem is support: outside the Apple world, plenty of apps, websites and office software still shrug at a .heic file. JPG is the opposite, slightly larger and understood by literally everything made in the last thirty years.",
    "Converting here happens with a decoder that runs inside your browser tab. That design choice matters more than it sounds: the usual converter sites make you upload family photos to their servers and wait in a queue. Here the photos never leave your phone or computer.",
  ],
  faqs: [
    {
      q: "Will I lose photo quality converting to JPG?",
      a: "The conversion uses a high quality setting, and at normal viewing sizes the difference is not visible. The original HEIC stays untouched on your device, so nothing is lost permanently.",
    },
    {
      q: "Are my photos uploaded?",
      a: "No. The decoder runs in your browser. Your photos stay on your device from start to finish.",
    },
    {
      q: "Can I convert many photos at once?",
      a: "Yes. Add as many as you like and each one appears in the results list with its own download button.",
    },
    {
      q: "Why did one photo fail?",
      a: "A few HEIC variants, such as certain burst or depth effect files, store extra frames that simple decoders cannot read. Exporting that photo from the Photos app as a JPG is the reliable fallback.",
    },
    {
      q: "How do I stop my iPhone saving HEIC?",
      a: "In Settings, open Camera, then Formats, and choose Most Compatible. New photos will be saved as JPG from then on, at roughly double the file size.",
    },
  ],
};
