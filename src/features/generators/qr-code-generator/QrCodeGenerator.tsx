"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/ui";
import { buildLinkPayload, buildVCardPayload, buildWifiPayload, renderQrDataUrl, type WifiEncryption } from "./qr-code";

type Tab = "link" | "wifi" | "contact";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function QrCodeGenerator() {
  const [tab, setTab] = useState<Tab>("link");
  const [link, setLink] = useState("https://example.com");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [encryption, setEncryption] = useState<WifiEncryption>("WPA");
  const [hidden, setHidden] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState("");

  const payload =
    tab === "link"
      ? buildLinkPayload(link)
      : tab === "wifi"
        ? ssid.trim() === ""
          ? ""
          : buildWifiPayload({ ssid, password: wifiPassword, encryption, hidden })
        : firstName.trim() === ""
          ? ""
          : buildVCardPayload({ firstName, lastName, phone, email });

  useEffect(() => {
    let cancelled = false;
    if (payload === "") return;
    renderQrDataUrl(payload)
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError("");
        }
      })
      .catch(() => {
        if (!cancelled) setError("That content is too long for one QR code. Shorten it and try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  const tabs: { value: Tab; label: string }[] = [
    { value: "link", label: "Link or text" },
    { value: "wifi", label: "WiFi" },
    { value: "contact", label: "Contact card" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition ${
              tab === option.value
                ? "border-brand-950/60 bg-brand-950/85 text-white shadow-sm"
                : "border-slate-200 bg-white text-gray-700 hover:bg-white/90 hover:text-brand-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {tab === "link" && (
        <div>
          <label htmlFor="qr-link" className={labelClass}>
            Website link or any text
          </label>
          <input
            id="qr-link"
            type="text"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="example.com or any text"
            className={inputClass}
          />
        </div>
      )}

      {tab === "wifi" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="qr-ssid" className={labelClass}>
              Network name (SSID)
            </label>
            <input id="qr-ssid" type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="qr-wifi-pass" className={labelClass}>
              WiFi password
            </label>
            <input
              id="qr-wifi-pass"
              type="text"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="qr-enc" className={labelClass}>
              Security type
            </label>
            <Select
              id="qr-enc"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value as WifiEncryption)}
            >
              <option value="WPA">WPA or WPA2 (most networks)</option>
              <option value="WEP">WEP (old networks)</option>
              <option value="nopass">No password</option>
            </Select>
          </div>
          <label className="flex items-center gap-2 self-end text-sm text-gray-700">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="h-4 w-4" />
            Hidden network
          </label>
        </div>
      )}

      {tab === "contact" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="qr-first" className={labelClass}>
              First name
            </label>
            <input id="qr-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="qr-last" className={labelClass}>
              Last name
            </label>
            <input id="qr-last" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="qr-phone" className={labelClass}>
              Phone
            </label>
            <input id="qr-phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="qr-email" className={labelClass}>
              Email
            </label>
            <input id="qr-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-6 py-6">
        {payload !== "" && dataUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="Your QR code" className="h-56 w-56 rounded-lg border border-gray-200 bg-white" />
            <a
              href={dataUrl}
              download="qr-code.png"
              className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99]"
            >
              Download PNG
            </a>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            {payload !== "" && error ? error : "Fill in the fields and your QR code will appear here."}
          </p>
        )}
      </div>
    </div>
  );
}
