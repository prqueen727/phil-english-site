import PageHero from "@/components/page-hero";
import PhotoPlaceholder from "@/components/photo-placeholder";
import { famTourCases } from "@/lib/fam-tour-cases";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fam Tour & Outreach Cases" };

export default function FamTourCasesPage() {
  return (
    <>
      <PageHero
        title="Fam Tour & Outreach Cases"
        subtitle="A running archive of fam tour and outreach programs Phil Hospital of Korean Medicine has hosted or taken part in for international visitor groups."
        images={["/uploads/famtour-cases-banner.jpg"]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {famTourCases.map((item) => (
            <div key={item.slug} className="overflow-hidden rounded-2xl border border-brand-100 bg-ivory-50">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title} className="aspect-square w-full object-cover" />
              ) : (
                <PhotoPlaceholder aspect="aspect-square" />
              )}
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{item.date}</p>
                <h3 className="mt-1 font-medium text-brand-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
