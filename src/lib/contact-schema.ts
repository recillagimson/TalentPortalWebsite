import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Required")
    .max(80, "Too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Required")
    .max(80, "Too long"),
  email: z
    .string()
    .trim()
    .min(1, "Required")
    .email("That doesn't look like an email"),
  company: z
    .string()
    .trim()
    .min(2, "Required")
    .max(100, "Too long"),
  size: z
    .string()
    .min(1, "Required"),
  topic: z.enum(["demo", "pricing", "other"]),
  message: z
    .string()
    .trim()
    .min(10, "A bit more detail, please")
    .max(2000, "Too long"),
  // Honeypot — bots fill this; humans don't. We accept any string here and let
  // the API handler quietly drop submissions where this is non-empty (no 400 to
  // signal the bot that it was caught).
  hp_field: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const TEAM_SIZES = [
  "1–10 talents",
  "11–50 talents",
  "51–200 talents",
  "201–500 talents",
  "500+ talents",
] as const;
