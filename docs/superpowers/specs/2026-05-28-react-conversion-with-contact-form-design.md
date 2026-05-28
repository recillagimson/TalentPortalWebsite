# TalentPortal — React Conversion + Functional Contact Form

_Design spec · 2026-05-28_

## Background

The repo currently contains a static HTML/CSS/JS marketing prototype generated from a Claude Design handoff bundle (one landing page: `index.html`, plus shared `styles.css`, `site.js`, and a CDN-React tweaks panel). The prototype mocks four pages: Home, Features, Pricing, Contact. Only the Home page (`index.html`) and its shared assets are in the repo today; the other three pages exist in the handoff bundle but were not copied over.

The goal is to convert the prototype into a real React application, ship a functional contact form, and lay the groundwork for Stripe checkout on the pricing page. Stripe itself is explicitly deferred.

## Goals

1. Convert the static prototype into a Vite + React + TypeScript app, preserving the existing visual design pixel-close.
2. Port all four prototype pages (Home, Features, Pricing, Contact) as React routes.
3. Make the contact form actually deliver submissions, via Resend, to `highthriveva@gmail.com`.
4. Build the pricing page UI such that Stripe wiring is a drop-in change later — no refactor required to add it.
5. Single repo, single Vercel deploy.

## Non-goals

- Stripe integration (UI only; buttons are stubs marked `TODO(stripe)`).
- Authentication or user accounts.
- A CMS / database.
- The live "tweaks" panel (color / radius / hero-variant / dark-mode switcher) from the prototype — dropped. One hero variant (`split`), default radius, light mode are baked in.
- Component-level UI tests, E2E tests, or observability tooling.
- Porting the prototype's `tweaks-panel.jsx` and `tweaks-app.jsx` files.

## Stack

| Concern | Choice |
|---|---|
| Build tool | Vite |
| UI framework | React 18 |
| Language | TypeScript |
| Routing | React Router v7 (client-side) |
| Styling | Tailwind CSS v4 (CSS-first config, `@theme` block) |
| Backend | Vercel Serverless Functions in `/api`, written in TypeScript |
| Email | Resend SDK (`resend` npm package) |
| Form state | `react-hook-form` |
| Validation | `zod` — shared between client and server |
| Testing | Vitest (unit only) |
| Project config | `vercel.ts` (per current Vercel best practice) |
| Deploy | Vercel |
| Local dev | `vite dev` + `vercel dev` run together via `concurrently`; Vite proxies `/api/*` to the functions runtime |

## Repository layout

```
/
├── api/
│   └── contact.ts                # POST handler: validates, sends via Resend
├── public/
│   ├── favicon.png
│   └── dashboard.png
├── src/
│   ├── main.tsx                  # entry, mounts <App/>
│   ├── App.tsx                   # router + global layout
│   ├── app.css                   # Tailwind v4 @import + @theme tokens
│   ├── routes/
│   │   ├── Home.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx          # split variant only
│   │   │   ├── LogoStrip.tsx
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── OrgChartPreview.tsx
│   │   │   ├── PayrollShowcase.tsx
│   │   │   ├── PoweredByHighthrive.tsx
│   │   │   └── FinalCta.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx        # btn / btn-primary / btn-secondary / btn-ghost
│   │   │   ├── Chip.tsx
│   │   │   └── UiMock.tsx        # browser-chrome wrapper around screenshots
│   │   └── contact/
│   │       └── ContactForm.tsx
│   └── lib/
│       ├── contact-schema.ts     # zod schema shared by form + API handler
│       └── pricing.ts            # typed tier metadata (Stripe priceId fields ready for later)
├── index.html                    # Vite entry (not the prototype's index.html)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.ts
```

Design notes baked into the layout:
- `routes/` for URL-bearing pages, `components/` for reusable pieces — keeps "what's a URL" obvious.
- `home/` subfolder isolates landing-page-only sections so `components/` stays useful as the site grows.
- One shared zod schema in `lib/contact-schema.ts` — single source of validation truth for the form and the API handler.

## Design tokens

Carried over from the prototype's `styles.css` into `app.css` as Tailwind v4 `@theme` variables:

| Token | Value | Use |
|---|---|---|
| `--color-brand-green` | `#004532` | Primary brand color |
| `--color-brand-green-tint` | `#e6efeb` | Icon backgrounds, soft fills |
| `--color-brand-green-wash` | `#f3f7f5` | Showcase / org-chart preview backgrounds |
| `--color-accent` | `#c89a5b` | Gold accent — chips, dark CTA buttons |
| `--color-bg` | `#fbfaf6` | Page background (cream) |
| `--color-surface` | `#ffffff` | Cards |
| `--color-text` | `#0d1a14` | Primary text |
| `--color-text-muted` | `#5a635d` | Body copy |
| `--color-text-faint` | `#8a918c` | Meta / labels |
| `--font-display`, `--font-body` | Geist | Display + body |
| `--font-serif` | Instrument Serif | Italic accents in headlines |
| `--font-mono` | Geist Mono | Eyebrows, meta, numbers |

Fonts loaded via Google Fonts in `app.css` (same `@import` URL as the prototype).

## Contact form flow

```
ContactForm.tsx (client)
   │ 1. react-hook-form holds form state
   │ 2. on submit: zod schema validates client-side
   │ 3. fetch POST /api/contact  { name, email, company, message, hp_field }
   ▼
api/contact.ts (Vercel Function)
   │ 4. re-validate body with the same zod schema
   │ 5. honeypot check: if hp_field non-empty, respond 200 silently
   │ 6. rate-limit check: in-memory Map keyed by IP, max 5 per 10 min
   │ 7. send via Resend → CONTACT_TO_EMAIL
   │ 8. respond { ok: true, ref: "TP-<8 char id>" } on success
   │    respond 4xx { ok: false, error } on validation failure
   │    respond 429 { ok: false, error } on rate limit
   │    respond 5xx { ok: false, error } on Resend failure
   ▼
ContactForm.tsx
   │ success → success card showing the REF code (matches prototype UX)
   │ error   → inline error message, form data preserved
```

### Validation rules (in `lib/contact-schema.ts`)

| Field | Rule |
|---|---|
| `name` | string, 2–80 chars, required |
| `email` | valid email, required |
| `company` | string, 2–100 chars, required |
| `message` | string, 10–2000 chars, required |
| `hp_field` | string, must be empty (honeypot) |

### Server hardening

- Reject non-POST methods with 405.
- Honeypot field: if `hp_field` is non-empty, respond 200 without sending — bots don't get a signal they were filtered.
- In-memory rate limit: `Map<ip, timestamps[]>` cleaned lazily on each request; 5 submissions per 10-minute sliding window. Acceptable for marketing-site contact volume; swap for Upstash Redis later if the site scales.
- Log validation failures and Resend errors via `console.error` — visible in Vercel function logs.

### Secrets

| Env var | Source |
|---|---|
| `RESEND_API_KEY` | Resend dashboard |
| `CONTACT_TO_EMAIL` | `highthriveva@gmail.com` |

Both managed via `vercel env add` and pulled locally with `vercel env pull` into `.env.local`. `.env.local` is gitignored.

During initial development, Resend's onboarding sandbox sender (`onboarding@resend.dev`) is used as the `from:` address. Swap to a verified domain once one is set up.

## Pricing page

UI fully built; checkout is stubbed.

```
Pricing.tsx
├── PricingHero
├── BillingToggle      // monthly | annual (useState; hover-preview + click-commit per prototype)
├── PricingCards       // <PricingCard tier="basic" />, ...
├── ComparisonTable
└── FAQ
```

Tier metadata lives in `src/lib/pricing.ts` as a typed const, including `priceId` fields with placeholder values, so the Stripe wiring later is a fill-in-the-blanks change:

```ts
export const TIERS = [
  {
    id: "basic",
    name: "Basic",
    monthly: 180,
    annual: 162,   // 25% off applied
    priceIdMonthly: null,   // TODO(stripe)
    priceIdAnnual: null,    // TODO(stripe)
    features: [...]
  },
  // premium, enterprise
] as const;
```

`PricingCard` exposes `onSubscribe(tier, billing)`. The current implementation:

```tsx
function handleSubscribe(tier, billing) {
  // TODO(stripe): POST /api/checkout { tier, billing } → redirect to session.url
  alert("Checkout coming soon — please contact sales.");
}
```

When Stripe arrives, only the body of `handleSubscribe` and the contents of `priceId*` fields change. The `PricingCard` props, tier metadata shape, and page layout do not.

## Error handling

| Failure | UX |
|---|---|
| Contact form network error | Inline error under form: "Couldn't send your message — please try again or email us directly at highthriveva@gmail.com." Form data preserved. |
| Contact form validation error (client) | Per-field inline error on blur and on submit. |
| Contact form validation error (server) | 400 response; client shows a generic inline error and logs details. |
| Contact form rate limited | 429 response; client shows "Too many submissions — please try again in a few minutes." |
| Unknown route | React Router fallback → simple "Page not found · go home" component. |

No Sentry or observability tooling in v1; `console.error` in functions plus Vercel's built-in logs are the diagnostic surface.

## Testing

Lean and focused.

- **Vitest** for unit tests.
- `lib/contact-schema.test.ts` — happy path + each validation rule fails as expected.
- `api/contact.test.ts` — mocks Resend client; asserts 200, 400 (validation), 429 (rate limit), 500 (Resend failure), 200-with-no-send (honeypot triggered) paths.
- No component tests in v1 — marketing UI churns too fast for them to pay off.
- No E2E in v1 — manual smoke before each deploy.

## Dev workflow

| Command | What it does |
|---|---|
| `npm run dev` | Runs `vite dev` (SPA on :5173) and `vercel dev` (functions on :3000) in parallel via `concurrently`. Vite proxies `/api/*` → `localhost:3000`. |
| `npm run build` | `vite build` → outputs `dist/`. Vercel build picks it up via `vercel.ts`. |
| `npm run test` | `vitest run` |
| `npm run typecheck` | `tsc --noEmit` |

Husky pre-commit: typecheck + vitest run (fast enough at this scale).

## Deployment

- Single Vercel project, single domain.
- `vercel.ts` configures: build command, framework hint (`vite`), `/api` routing (default), and one cron-free function.
- First deploy via `vercel` CLI; subsequent deploys auto on git push once linked to a repo.

## Open questions

None at the time of writing. The user has answered all clarifying questions during brainstorming.

## Future work (out of scope for this spec)

- Stripe Checkout wiring: `/api/checkout` endpoint that creates a Subscription session and returns `session.url`; webhook handler at `/api/stripe-webhook` for subscription events.
- Domain verification with Resend (move off the sandbox sender).
- Move rate limiter to Upstash Redis if traffic warrants it.
- Sentry or similar for error tracking.
- A11y audit pass (alt text, focus management on success state, etc.).
