import { describe, expect, it } from "vitest";
import { moveItem } from "./merge-pdf";

describe("moveItem", () => {
  it("moves an item up and down", () => {
    expect(moveItem(["a", "b", "c"], 1, -1)).toEqual(["b", "a", "c"]);
    expect(moveItem(["a", "b", "c"], 1, 1)).toEqual(["a", "c", "b"]);
  });

  it("stays put at the edges and for bad indexes", () => {
    expect(moveItem(["a", "b"], 0, -1)).toEqual(["a", "b"]);
    expect(moveItem(["a", "b"], 1, 1)).toEqual(["a", "b"]);
    expect(moveItem(["a", "b"], 5, 1)).toEqual(["a", "b"]);
  });

  it("does not mutate the original list", () => {
    const original = ["a", "b", "c"];
    moveItem(original, 0, 1);
    expect(original).toEqual(["a", "b", "c"]);
  });
});
