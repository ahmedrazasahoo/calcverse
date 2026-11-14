import { describe, expect, it } from "vitest";
import { convertCase, splitWords } from "./case-converter";

// Expected values are worked out by hand from the rules in case-converter.ts:
// title case keeps small connecting words lowercase unless they come first,
// sentence case lowercases everything then lifts the first letter of each
// sentence, and identifier styles split on punctuation, spaces and humps.

describe("prose styles", () => {
  it("title case keeps small words lowercase in the middle", () => {
    expect(convertCase("the lord of the rings", "title")).toBe("The Lord of the Rings");
  });

  it("capitalize lifts every word, small words included", () => {
    expect(convertCase("the lord of the rings", "capitalize")).toBe("The Lord Of The Rings");
  });

  it("sentence case restarts after each sentence ending mark", () => {
    expect(convertCase("hello WORLD. how ARE you?", "sentence")).toBe("Hello world. How are you?");
  });

  it("upper and lower convert the whole text", () => {
    expect(convertCase("Hello World", "upper")).toBe("HELLO WORLD");
    expect(convertCase("Hello World", "lower")).toBe("hello world");
  });
});

describe("playful styles", () => {
  it("alternating starts lowercase and only letters consume the toggle", () => {
    expect(convertCase("abc def", "alternating")).toBe("aBc DeF");
  });

  it("inverse swaps the case of every letter", () => {
    expect(convertCase("AbC", "inverse")).toBe("aBc");
    expect(convertCase("Hello, World!", "inverse")).toBe("hELLO, wORLD!");
  });
});

describe("identifier styles", () => {
  it("builds camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE", () => {
    expect(convertCase("hello world example", "camel")).toBe("helloWorldExample");
    expect(convertCase("hello world example", "pascal")).toBe("HelloWorldExample");
    expect(convertCase("hello world example", "snake")).toBe("hello_world_example");
    expect(convertCase("hello world example", "kebab")).toBe("hello-world-example");
    expect(convertCase("hello world example", "constant")).toBe("HELLO_WORLD_EXAMPLE");
  });

  it("splits existing identifiers on humps and separators", () => {
    expect(splitWords("parseHTTPResponse")).toEqual(["parse", "HTTP", "Response"]);
    expect(convertCase("already-snake_case here", "camel")).toBe("alreadySnakeCaseHere");
  });
});

describe("edge cases", () => {
  it("returns empty output for empty input in every style", () => {
    expect(convertCase("", "title")).toBe("");
    expect(convertCase("", "camel")).toBe("");
    expect(convertCase("", "alternating")).toBe("");
    expect(convertCase("", "constant")).toBe("");
  });
});
