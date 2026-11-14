import { describe, expect, it } from "vitest";
import { uuidV4, uuidV7 } from "./uuid";

const zeros = () => new Uint8Array(16);
const filled = (n: number) => new Uint8Array(16).fill(n);

describe("uuidV4", () => {
  it("sets version 4 and variant bits on zero bytes", () => {
    expect(uuidV4(zeros())).toBe("00000000-0000-4000-8000-000000000000");
  });

  it("keeps the random bits and masks the fixed ones on 0xff bytes", () => {
    expect(uuidV4(filled(0xff))).toBe("ffffffff-ffff-4fff-bfff-ffffffffffff");
  });

  it("matches the standard shape", () => {
    const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88]);
    const id = uuidV4(bytes);
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(id.startsWith("12345678-9abc-")).toBe(true);
  });
});

describe("uuidV7", () => {
  it("embeds a zero timestamp", () => {
    expect(uuidV7(0, zeros())).toBe("00000000-0000-7000-8000-000000000000");
  });

  it("embeds the timestamp in the first 48 bits", () => {
    expect(uuidV7(1700000000000, zeros())).toBe("018bcfe5-6800-7000-8000-000000000000");
  });

  it("sets version 7 and variant bits while keeping random tail bits", () => {
    expect(uuidV7(0, filled(0xff))).toBe("00000000-0000-7fff-bfff-ffffffffffff");
  });

  it("orders later timestamps after earlier ones as strings", () => {
    const a = uuidV7(1700000000000, zeros());
    const b = uuidV7(1700000001000, zeros());
    expect(a < b).toBe(true);
  });
});
