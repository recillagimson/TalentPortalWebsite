import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class FakeResend {
    emails = { send: sendMock };
  },
}));

import handler, { __testReset } from "./contact";

interface MockRes {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
  setHeader: ReturnType<typeof vi.fn>;
  statusCode: number;
  jsonPayload: unknown;
}

function mockRes(): MockRes {
  const res = {
    statusCode: 200,
    jsonPayload: undefined as unknown,
  } as MockRes;
  res.status = vi.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = vi.fn((payload: unknown) => {
    res.jsonPayload = payload;
    return res;
  });
  res.setHeader = vi.fn();
  return res;
}

function mockReq(body: unknown, method = "POST", ip = "127.0.0.1") {
  return {
    method,
    body,
    headers: { "x-forwarded-for": ip },
    socket: { remoteAddress: ip },
  } as never;
}

const validBody = {
  firstName: "Maya",
  lastName: "Aldana",
  email: "maya@example.com",
  company: "Acme Co",
  size: "11–50 talents",
  topic: "demo",
  message: "We'd love a demo of TalentPortal for our growing team.",
  hp_field: "",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ error: null, data: { id: "fake-id" } });
    __testReset();
    process.env.RESEND_API_KEY = "test_key";
    process.env.CONTACT_TO_EMAIL = "highthriveva@gmail.com";
    process.env.CONTACT_FROM_EMAIL = "TalentPortal <onboarding@resend.dev>";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 405 for non-POST", async () => {
    const res = mockRes();
    await handler(mockReq({}, "GET"), res as never);
    expect(res.statusCode).toBe(405);
  });

  it("returns 400 for invalid payload", async () => {
    const res = mockRes();
    await handler(mockReq({ ...validBody, email: "nope" }), res as never);
    expect(res.statusCode).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 200 and a REF on success", async () => {
    const res = mockRes();
    await handler(mockReq(validBody), res as never);
    expect(res.statusCode).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const payload = res.jsonPayload as { ok: boolean; ref: string };
    expect(payload.ok).toBe(true);
    expect(payload.ref).toMatch(/^TP-[A-Z0-9]{8}$/);
  });

  it("returns 200 without sending when honeypot is tripped", async () => {
    const res = mockRes();
    await handler(mockReq({ ...validBody, hp_field: "bot" }), res as never);
    expect(res.statusCode).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate-limits a single IP after 5 submissions", async () => {
    for (let i = 0; i < 5; i++) {
      const r = mockRes();
      await handler(mockReq(validBody, "POST", "9.9.9.9"), r as never);
      expect(r.statusCode).toBe(200);
    }
    const res = mockRes();
    await handler(mockReq(validBody, "POST", "9.9.9.9"), res as never);
    expect(res.statusCode).toBe(429);
  });

  it("returns 502 when the email provider returns an error", async () => {
    sendMock.mockResolvedValueOnce({ error: { message: "boom" }, data: null });
    const res = mockRes();
    await handler(mockReq(validBody), res as never);
    expect(res.statusCode).toBe(502);
  });

  it("returns 500 when env vars are missing", async () => {
    delete process.env.RESEND_API_KEY;
    const res = mockRes();
    await handler(mockReq(validBody), res as never);
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
