# Phil Korean Medicine Hospital — Website

An English-language hospital website with an admin panel for editing all
hero banners, page text, treatment pages, doctor profiles, gallery photos,
and contact info — no code changes required. Includes a contact form
(email delivery only — no booking/reservation buttons anywhere).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + PostgreSQL
- Cookie-based admin auth (JWT via `jose`, passwords hashed with `bcryptjs`)
- Contact form delivered by email via `nodemailer`

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in real values
npx prisma migrate dev
npm run seed            # creates the admin account + starter content
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin` for the admin panel.

**Default admin login** is whatever you set in `.env` as `ADMIN_EMAIL` /
`ADMIN_PASSWORD` before running `npm run seed`. Change the password in
production.

## Environment Variables

See `.env.example` for the full list. You must fill in:

- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` —
  used to send contact form submissions by email.
- `CONTACT_TO_EMAIL` — where contact form messages are delivered.
- `JWT_SECRET` — already generated with a random value; replace before
  deploying to production.

## Content Editing

Everything shown on the public site is stored in the database and edited
from `/admin`:

- **Page Heroes** — the banner (title/subtitle/image) at the top of every page.
- **Home Page** — homepage introduction and highlight cards.
- **About Page** — hospital story and mission/values.
- **Treatments** — add/edit/remove treatment detail pages (principle,
  process steps, comparison, FAQ).
- **Doctors** — medical team profiles.
- **Gallery** — hospital photos.
- **Contact Info** — address, phone, hours, map embed.

## ⚠️ Before Going Live

The seed data (`prisma/seed.ts`) fills every page with **draft placeholder
content** marked `[DRAFT]`, plus generic Korean medicine background text
that has **not** been fact-checked against your hospital's actual
practices. Before publishing, please review and replace via the admin
panel:

1. Real address, phone number, and hours (Contact Info).
2. Real doctor names, credentials, and bios (Doctors).
3. Actual treatment descriptions, process steps, and any medical claims
   (Treatments) — the seeded text is generic background information, not
   verified medical content.
4. Real photography (all pages currently use placeholder images from
   `/public/placeholders`, replace via each admin section's image upload).

## Notes on Design Origin

This site's structure (hero + intro + treatments + doctors + gallery +
contact) is a common layout pattern for clinic/hospital websites and was
built from scratch — no code, CSS, copy, or images were copied from any
specific third-party site.
