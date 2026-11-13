/** SEO content for the QR Code Generator page. */
export const content = {
  title: "QR Code Generator Free, No Expiry, No Signup",
  metaDescription:
    "Create QR codes for links, WiFi networks and contact cards. Free forever, with no expiry date, no signup wall and no watermark.",
  intro:
    "Make a QR code for a website link, your WiFi network or a digital contact card, and download it as a clean PNG. Codes made here are static, which means they work forever, never expire, and point straight at your content instead of passing through a tracking service.",
  howTo: [
    "Choose what the code should do: link or text, WiFi, or contact card.",
    "Fill in the fields. The QR code updates live as you type.",
    "Download the PNG and print it, share it or place it in your design.",
    "Test it with your own phone before printing a hundred copies.",
  ],
  explanationTitle: "Static codes, and why they beat expiring ones",
  explanation: [
    "Many free QR sites quietly make dynamic codes: the square points at their server first, and when your trial ends, the code dies. A static code holds the destination itself, printed right into the pattern. It cannot expire, cannot be switched off, and does not report every scan to a marketing company.",
    "WiFi codes deserve a special note. The password is stored inside the square, visible to anyone who decodes it. That is exactly what makes them handy on a cafe wall and exactly why you should not print one for a private home network you share with strangers.",
  ],
  faqs: [
    {
      q: "Do these QR codes expire?",
      a: "No. They are static codes with the content built in, so they work for as long as the destination itself works.",
    },
    {
      q: "Is there a scan limit or watermark?",
      a: "No scan limit, no watermark, no account. Download the PNG and use it anywhere.",
    },
    {
      q: "Why does my WiFi code ask nothing when scanned?",
      a: "Older phones sometimes need the camera's QR mode or a scanner app for WiFi codes. The payload format used here is the standard one modern Android and iPhone cameras recognise.",
    },
    {
      q: "What is the smallest I can print a QR code?",
      a: "For a link, 2 cm square is a safe minimum at arm's length. Longer content packs the pattern tighter and needs a bigger print.",
    },
    {
      q: "Is my WiFi password sent anywhere?",
      a: "No. The code is generated in your browser and the password never leaves your device. It is, of course, readable by anyone who scans or decodes the printed code.",
    },
  ],
};
