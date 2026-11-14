import { describe, expect, it } from "vitest";
import { formatJson, jsonToCsv, jsonToXml, minifyJson, validateJson } from "./json";

describe("formatJson", () => {
  it("pretty prints with two spaces by default style", () => {
    expect(formatJson('{"a":1,"b":[1,2]}', 2)).toBe(
      '{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}',
    );
  });

  it("pretty prints with four spaces", () => {
    expect(formatJson('{"a":1}', 4)).toBe('{\n    "a": 1\n}');
  });

  it("pretty prints with a tab", () => {
    expect(formatJson('{"a":{"b":2}}', "tab")).toBe('{\n\t"a": {\n\t\t"b": 2\n\t}\n}');
  });

  it("throws on invalid JSON", () => {
    expect(() => formatJson("{nope}", 2)).toThrow();
  });
});

describe("minifyJson", () => {
  it("removes all insignificant whitespace", () => {
    expect(minifyJson('{ "a" : 1,  "b" : [ 1, 2 ] }')).toBe('{"a":1,"b":[1,2]}');
  });
});

describe("validateJson", () => {
  it("accepts valid JSON", () => {
    expect(validateJson('{"a":[1,2,3]}')).toEqual({ ok: true });
  });

  it("reports the parser message and position for bad JSON", () => {
    const result = validateJson('{"a": }');
    expect(result.ok).toBe(false);
    expect(result.error).toBeTruthy();
    if (result.position !== undefined) {
      expect(typeof result.position).toBe("number");
    }
  });
});

describe("jsonToCsv", () => {
  it("uses the union of keys and quotes cells that need it", () => {
    const value = [
      { a: 1, b: "x,y" },
      { a: 2, c: true },
    ];
    expect(jsonToCsv(value)).toBe('a,b,c\n1,"x,y",\n2,,true');
  });

  it("JSON encodes nested values into the cell", () => {
    expect(jsonToCsv([{ id: 1, meta: { x: 1 } }])).toBe('id,meta\n1,"{""x"":1}"');
  });

  it("rejects a non array value", () => {
    expect(() => jsonToCsv({ a: 1 })).toThrow("top level array");
  });

  it("rejects an array of primitives", () => {
    expect(() => jsonToCsv([1, 2, 3])).toThrow("must be an object");
  });

  it("rejects an empty array", () => {
    expect(() => jsonToCsv([])).toThrow("empty");
  });
});

describe("jsonToXml", () => {
  it("converts an object with a repeated element for arrays", () => {
    const value = { name: "Ada", tags: ["a", "b"], age: 36 };
    expect(jsonToXml(value, "person")).toBe(
      "<person>\n  <name>Ada</name>\n  <tags>a</tags>\n  <tags>b</tags>\n  <age>36</age>\n</person>",
    );
  });

  it("escapes special characters in text", () => {
    expect(jsonToXml({ note: "a & b <c>" }, "root")).toBe(
      "<root>\n  <note>a &amp; b &lt;c&gt;</note>\n</root>",
    );
  });

  it("renders a primitive root value", () => {
    expect(jsonToXml(42, "answer")).toBe("<answer>42</answer>");
  });

  it("renders null as an empty element", () => {
    expect(jsonToXml({ x: null }, "root")).toBe("<root>\n  <x/>\n</root>");
  });
});
