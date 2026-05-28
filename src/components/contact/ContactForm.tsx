import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, TEAM_SIZES } from "../../lib/contact-schema";
import type { ContactInput } from "../../lib/contact-schema";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; ref: string }
  | { kind: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      size: "",
      topic: "demo",
      message: "",
      hp_field: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ContactInput) {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setStatus({ kind: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          res.status === 429
            ? "Too many submissions — please try again in a few minutes."
            : (data?.error as string) ||
              "Couldn't send your message — please try again or email us directly at highthriveva@gmail.com.";
        setStatus({ kind: "error", message });
        return;
      }
      setStatus({ kind: "success", ref: (data?.ref as string) ?? "TP-PENDING" });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Couldn't send your message — please try again or email us directly at highthriveva@gmail.com.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="form-success">
        <div className="check-circle">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 14l5 5 11-12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Message received!</h3>
        <p>
          Thanks for reaching out. Our team will be in touch within a few hours — usually much faster during business
          hours.
        </p>
        <div className="ref">REF · {status.ref}</div>
      </div>
    );
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <>
      <h2>Tell us about your team</h2>
      <p className="form-sub">All fields are required.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <div className={`field${errors.firstName ? " field-error" : ""}`}>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              {...register("firstName")}
            />
            {errors.firstName && <div className="field-error-msg">{errors.firstName.message}</div>}
          </div>
          <div className={`field${errors.lastName ? " field-error" : ""}`}>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              {...register("lastName")}
            />
            {errors.lastName && <div className="field-error-msg">{errors.lastName.message}</div>}
          </div>
          <div className={`field span-2${errors.email ? " field-error" : ""}`}>
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              {...register("email")}
            />
            {errors.email && <div className="field-error-msg">{errors.email.message}</div>}
          </div>
          <div className={`field${errors.company ? " field-error" : ""}`}>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              {...register("company")}
            />
            {errors.company && <div className="field-error-msg">{errors.company.message}</div>}
          </div>
          <div className={`field${errors.size ? " field-error" : ""}`}>
            <label htmlFor="size">Team size</label>
            <select id="size" {...register("size")}>
              <option value="">Select…</option>
              {TEAM_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.size && <div className="field-error-msg">{errors.size.message}</div>}
          </div>

          <div className="field span-2">
            <label>I'm interested in</label>
            <div className="topic-radios">
              <label>
                <input type="radio" value="demo" {...register("topic")} />
                <span className="dot" />
                Product demo
              </label>
              <label>
                <input type="radio" value="pricing" {...register("topic")} />
                <span className="dot" />
                Pricing details
              </label>
              <label>
                <input type="radio" value="other" {...register("topic")} />
                <span className="dot" />
                Something else
              </label>
            </div>
          </div>

          <div className={`field span-2${errors.message ? " field-error" : ""}`}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="What are you trying to solve? Anything we should know about your current HR setup?"
              {...register("message")}
            />
            {errors.message && <div className="field-error-msg">{errors.message.message}</div>}
          </div>

          {/* Honeypot — must stay empty */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="hp_field">Don't fill this</label>
            <input id="hp_field" type="text" tabIndex={-1} autoComplete="off" {...register("hp_field")} />
          </div>
        </div>

        {status.kind === "error" && <div className="form-error">{status.message}</div>}

        <div className="submit-row">
          <span className="legal">
            By submitting, you agree to our <a href="#privacy">privacy notice</a>. We never share your details.
          </span>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : (<>Send message <span className="btn-arrow">→</span></>)}
          </button>
        </div>
      </form>
    </>
  );
}
