import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = {
  firstName: "Maya",
  lastName: "Aldana",
  email: "maya@example.com",
  company: "Acme Co",
  size: "11–50 talents",
  topic: "demo" as const,
  message: "We'd love a demo of TalentPortal for our growing team.",
  hp_field: "",
};

describe("contactSchema", () => {
  it("accepts a well-formed payload", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("rejects an empty first name", () => {
    const r = contactSchema.safeParse({ ...valid, firstName: "" });
    expect(r.success).toBe(false);
  });

  it("rejects malformed email", () => {
    const r = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects too-short messages", () => {
    const r = contactSchema.safeParse({ ...valid, message: "hi" });
    expect(r.success).toBe(false);
  });

  it("rejects unknown topic values", () => {
    const r = contactSchema.safeParse({ ...valid, topic: "spam" });
    expect(r.success).toBe(false);
  });

  it("accepts a non-empty honeypot at the schema level (handler quarantines)", () => {
    // The honeypot is enforced in the API handler, not the schema, so that
    // bots get a 200 (no signal they were caught).
    const r = contactSchema.safeParse({ ...valid, hp_field: "I am a bot" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.hp_field).toBe("I am a bot");
  });

  it("defaults the honeypot to empty when missing", () => {
    const { hp_field, ...rest } = valid;
    void hp_field;
    const r = contactSchema.safeParse(rest);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.hp_field).toBe("");
  });
});
