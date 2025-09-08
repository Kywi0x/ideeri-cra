import { describe, it, expect } from "vitest";
import { containsIdeeriTag, extractUsKey } from "@/lib/ideeri";

describe("containsIdeeriTag", () => {
  it("detects ASCII brackets", () => {
    expect(containsIdeeriTag("[IDEERI] foo")).toBe(true);
  });
  it("detects typographic brackets and spaces", () => {
    expect(containsIdeeriTag("［  IDEERI  ］ bar")).toBe(true);
  });
  it("is case-insensitive", () => {
    expect(containsIdeeriTag("[ideeri] baz")).toBe(true);
  });
  it("false when absent", () => {
    expect(containsIdeeriTag("misc text")).toBe(false);
  });
});

describe("extractUsKey", () => {
  it("extracts US-123", () => {
    expect(extractUsKey("Work on US-123 details")).toBe("US-123");
  });
  it("extracts US 456 with space", () => {
    expect(extractUsKey("US 456 fix bug")).toBe("US-456");
  });
  it("returns null if not present", () => {
    expect(extractUsKey("no key here")).toBeNull();
  });
});

