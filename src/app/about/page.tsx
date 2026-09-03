import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import { parseBlocks, parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [hero, about] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "about" } }),
    prisma.aboutContent.findUnique({ where: { id: 1 } }),
  ]);

  const highlights = parseBlocks(about?.highlights ?? "[]");
  const missionBlocks = parseBlocks(about?.missionBlocks ?? "[]");
  const systemBlocks = parseBlocks(about?.systemBlocks ?? "[]");

  return (
    <>
      <PageHero
        title={hero?.title ?? "About"}
        subtitle={hero?.subtitle}
        images={parseStringList(hero?.imageUrls ?? "[]")}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {about?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={about.imageUrl}
              alt={about.title}
              className="aspect-[4/3] w-full rounded-2xl object-cover md:order-2"
            />
          )}
          <div>
            <h2 className="text-3xl font-medium text-brand-900">{about?.title}</h2>
            <p className="mt-5 max-w-prose whitespace-pre-line text-base leading-relaxed text-brand-700">
              {about?.body}
            </p>
          </div>
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

      {(missionBlocks.length > 0 || about?.missionSubtitle) && (
        <section className="bg-brand-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              {about?.missionTitle && (
                <p className="text-sm font-medium uppercase tracking-wide text-gold-600">
                  {about.missionTitle}
                </p>
              )}
              {about?.missionSubtitle && (
                <h2 className="mt-2 text-3xl font-medium text-brand-900">{about.missionSubtitle}</h2>
              )}
            </div>
            {missionBlocks.length > 0 && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {missionBlocks.map((block, i) => (
                  <div key={i} className="rounded-2xl border border-brand-100 bg-ivory-50 p-8">
                    <h3 className="text-xl font-medium text-brand-900">{block.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-700">{block.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {(systemBlocks.length > 0 || about?.systemSubtitle) && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            {about?.systemTitle && (
              <p className="text-sm font-medium uppercase tracking-wide text-gold-600">
                {about.systemTitle}
              </p>
            )}
            {about?.systemSubtitle && (
              <h2 className="mt-2 text-3xl font-medium text-brand-900">{about.systemSubtitle}</h2>
            )}
            {about?.systemIntro && (
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-700">
                {about.systemIntro}
              </p>
            )}
          </div>
          {systemBlocks.length > 0 && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {systemBlocks.map((block, i) => (
                <div key={i} className="rounded-2xl border border-brand-100 bg-ivory-50 p-8">
                  <h3 className="text-xl font-medium text-brand-900">{block.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-brand-700">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
