import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseBlocks, parseHeroSlides, parseStringList } from "@/lib/content-types";

export default async function HomePage() {
  const [hero, home, treatments, clinics, contact, doctorCount] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "home" } }),
    prisma.homeContent.findUnique({ where: { id: 1 } }),
    prisma.treatment.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.clinic.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.contactInfo.findUnique({ where: { id: 1 } }),
    prisma.doctor.count(),
  ]);

  const highlights = parseBlocks(home?.highlights ?? "[]");

  return (
    <>
      <PageHero
        title={hero?.title ?? "Phil Korean Medicine Hospital"}
        subtitle={hero?.subtitle ?? ""}
        images={parseStringList(hero?.imageUrls ?? "[]")}
        slides={parseHeroSlides(hero?.slides ?? "[]")}
        size="large"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            {home?.introEyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gold-600">
                {home.introEyebrow}
              </p>
            )}
            <h2 className="text-3xl font-medium text-brand-900">
              {home?.introTitle}
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-brand-700">
              {home?.introBody}
            </p>
          </div>
          {home?.introImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={home.introImageUrl}
              alt="Inside Phil Korean Medicine Hospital"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          )}
        </div>

        {highlights.length > 0 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <div key={i} className="rounded-2xl border border-brand-100 bg-ivory-50 p-6">
                <h3 className="text-lg font-medium text-brand-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {treatments.length > 0 && (
        <section className="bg-brand-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-medium text-brand-900">Treatments</h2>
              <Link href="/treatments" className="text-sm font-medium text-brand-700 hover:text-brand-900">
                View all →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((t) => (
                <Link
                  key={t.id}
                  href={`/treatments/${t.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-100 bg-ivory-50 transition-shadow hover:shadow-lg"
                >
                  {t.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-medium text-brand-900">{t.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-600 line-clamp-2">
                      {t.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {clinics.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-medium text-brand-900">Clinics</h2>
              <Link href="/clinics" className="text-sm font-medium text-brand-700 hover:text-brand-900">
                View all →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clinics.map((c) => (
                <Link
                  key={c.id}
                  href={`/clinics/${c.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-100 bg-ivory-50 transition-shadow hover:shadow-lg"
                >
                  {c.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-medium text-brand-900">{c.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-600 line-clamp-2">
                      {c.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {contact?.mapEmbedUrl && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-medium text-brand-900">Find Us</h2>
            <Link href="/contact" className="text-sm font-medium text-brand-700 hover:text-brand-900">
              Full contact details →
            </Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-100">
            <iframe
              src={contact.mapEmbedUrl}
              className="h-96 w-full"
              loading="lazy"
              title="Map"
            />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="rounded-3xl border-2 border-brand-700 bg-ivory-50 p-8 sm:p-10">
            <p className="text-xl text-brand-800">Available</p>
            <p className="text-3xl font-semibold text-brand-900">365 days a year</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-brand-100 pt-5 text-sm text-brand-700">
              <span>Korean–Western Medicine Collaborative Care</span>
              <span className="text-brand-300">|</span>
              <span>{doctorCount} Professional Medical Staff</span>
            </div>

            <div className="mt-6 flex items-start gap-4 border-t border-brand-100 pt-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-9 w-9 shrink-0 text-gold-600">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <dl className="space-y-1.5 text-sm text-brand-800">
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 font-medium">Mon–Fri</dt>
                  <dd>9:00 – 20:00 <span className="text-brand-500">(night clinic available)</span></dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 font-medium">Sat–Sun</dt>
                  <dd>9:00 – 18:00</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 font-medium">Lunch</dt>
                  <dd>13:00 – 14:00</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-brand-700 bg-ivory-50 p-8 sm:p-10">
            <h2 className="text-2xl font-medium text-brand-900">{home?.ctaTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-700">{home?.ctaBody}</p>

            {(contact?.email || contact?.phone) && (
              <div className="mt-6 space-y-3 border-t border-brand-100 pt-6">
                {contact?.email && (
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 shrink-0 text-gold-600">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 shrink-0 text-gold-600">
                      <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.37 11.3 11.3 0 0 0 3.5.56 1.5 1.5 0 0 1 1.5 1.5V20.5a1.5 1.5 0 0 1-1.5 1.5A18 18 0 0 1 2 4a1.5 1.5 0 0 1 1.5-1.5H6.9a1.5 1.5 0 0 1 1.5 1.5 11.3 11.3 0 0 0 .56 3.5 1.5 1.5 0 0 1-.37 1.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            )}

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-brand-700 px-8 py-3 text-sm font-medium text-ivory-50 hover:bg-brand-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
