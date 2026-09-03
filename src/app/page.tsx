import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseBlocks, parseHeroSlides, parseStringList } from "@/lib/content-types";

export default async function HomePage() {
  const [hero, home, treatments, clinics, contact] = await Promise.all([
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

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-medium text-brand-900">{home?.ctaTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-700">
          {home?.ctaBody}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-brand-700 px-8 py-3 text-sm font-medium text-ivory-50 hover:bg-brand-800"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
