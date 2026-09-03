import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Treatments" };

export default async function TreatmentsPage() {
  const [hero, treatments] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "treatments" } }),
    prisma.treatment.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Treatments"}
        subtitle={hero?.subtitle}
        images={parseStringList(hero?.imageUrls ?? "[]")}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="p-6">
                <h2 className="text-lg font-medium text-brand-900">{t.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{t.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
