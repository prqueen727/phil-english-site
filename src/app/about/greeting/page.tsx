import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Director's Greeting" };

export default async function GreetingPage() {
  const [hero, greeting] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "greeting" } }),
    prisma.greetingContent.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Director's Greeting"}
        subtitle={hero?.subtitle}
        images={parseStringList(hero?.imageUrls ?? "[]")}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {greeting?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={greeting.imageUrl}
              alt={greeting.directorName}
              className="aspect-[3/4] w-full rounded-2xl object-cover md:order-2"
            />
          )}
          <div>
            <h2 className="text-3xl font-medium text-brand-900">{greeting?.title}</h2>
            <p className="mt-5 max-w-prose whitespace-pre-line text-base leading-[1.8] text-brand-700">
              {greeting?.body}
            </p>
            <div className="mt-8 border-t border-brand-100 pt-6">
              <p className="font-medium text-brand-900">{greeting?.directorName}</p>
              <p className="text-sm text-gold-600">{greeting?.directorTitle}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
