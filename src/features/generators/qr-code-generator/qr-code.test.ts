import { describe, expect, it } from "vitest";
import { buildLinkPayload, buildVCardPayload, buildWifiPayload, escapeWifiValue } from "./qr-code";

describe("escapeWifiValue", () => {
  it("escapes the special characters of the WIFI format", () => {
    expect(escapeWifiValue("my;net")).toBe("my\\;net");
    expect(escapeWifiValue('pa"ss:word,1')).toBe('pa\\"ss\\:word\\,1');
  });
});

describe("buildWifiPayload", () => {
  it("builds a WPA payload", () => {
    expect(buildWifiPayload({ ssid: "HomeNet", password: "secret1", encryption: "WPA" })).toBe(
      "WIFI:T:WPA;S:HomeNet;P:secret1;;"
    );
  });

  it("omits the password for open networks and marks hidden ones", () => {
    expect(buildWifiPayload({ ssid: "Cafe", encryption: "nopass" })).toBe("WIFI:T:nopass;S:Cafe;;");
    expect(buildWifiPayload({ ssid: "Hidden", password: "x", encryption: "WPA", hidden: true })).toBe(
      "WIFI:T:WPA;S:Hidden;P:x;H:true;;"
    );
  });
});

describe("buildVCardPayload", () => {
  it("builds a minimal contact", () => {
    const card = buildVCardPayload({ firstName: "Aisha", lastName: "Khan" });
    expect(card).toContain("BEGIN:VCARD");
    expect(card).toContain("FN:Aisha Khan");
    expect(card).toContain("N:Khan;Aisha;;;");
    expect(card).toContain("END:VCARD");
  });

  it("includes optional fields when given", () => {
    const card = buildVCardPayload({
      firstName: "Tom",
      phone: "+1 555 0100",
      email: "tom@example.com",
      organisation: "Bakery, Inc",
    });
    expect(card).toContain("TEL;TYPE=CELL:+1 555 0100");
    expect(card).toContain("EMAIL:tom@example.com");
    expect(card).toContain("ORG:Bakery\\, Inc");
  });
});

describe("buildLinkPayload", () => {
  it("adds https to bare domains and leaves real URLs alone", () => {
    expect(buildLinkPayload("example.com/menu")).toBe("https://example.com/menu");
    expect(buildLinkPayload("https://example.com")).toBe("https://example.com");
    expect(buildLinkPayload("just some words")).toBe("just some words");
    expect(buildLinkPayload("   ")).toBe("");
  });
});
