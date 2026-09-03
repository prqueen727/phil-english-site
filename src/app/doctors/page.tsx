import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctors" };

export default async function DoctorsPage() {
  const [hero, doctors] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "doctors" } }),
    prisma.doctor.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Doctors"}
        subtitle={hero?.subtitle}
        images={parseStringList(hero?.imageUrls ?? "[]")}
        imagePosition="top"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex gap-6 rounded-2xl border border-brand-100 bg-ivory-50 p-6">
              {doctor.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="h-32 w-32 shrink-0 rounded-xl object-cover"
                />
              )}
              <div>
                <h2 className="text-lg font-medium text-brand-900">{doctor.name}</h2>
                <p className="text-sm font-medium text-gold-600">{doctor.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-700">{doctor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
