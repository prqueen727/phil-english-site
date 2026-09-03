import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseBlocks, parseFaq, parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({ where: { slug } });
  return { title: treatment?.name ?? "Treatment" };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({ where: { slug } });
  if (!treatment || !treatment.published) notFound();

  const principleBlocks = parseBlocks(treatment.principleBlocks);
  const processSteps = parseBlocks(treatment.processSteps);
  const compareLeft = parseStringList(treatment.compareLeft);
  const compareRight = parseStringList(treatment.compareRight);
  const faq = parseFaq(treatment.faq);

  return (
    <>
      <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-brand-800">
        {treatment.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={treatment.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-14 pt-24">
          <h1 className="text-4xl font-medium text-ivory-50">{treatment.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">
            {treatment.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
        {principleBlocks.length > 0 && (
          <section>
            <h2 className="text-2xl font-medium text-brand-900">Principle</h2>
            <div className="mt-6 space-y-8">
              {principleBlocks.map((block, i) => (
                <div key={i}>
                  <h3 className="text-lg font-medium text-brand-800">{block.title}</h3>
                  <p className="mt-2 max-w-[68ch] text-base leading-[1.8] text-brand-700">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {processSteps.length > 0 && (
          <section>
            <h2 className="text-2xl font-medium text-brand-900">Treatment Process</h2>
            <ol className="mt-6 space-y-6">
              {processSteps.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-medium text-brand-800">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-brand-900">{step.title}</h3>
                    <p className="mt-1 max-w-[68ch] text-sm leading-[1.8] text-brand-700">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {(compareLeft.length > 0 || compareRight.length > 0) && (
          <section>
            <h2 className="text-2xl font-medium text-brand-900">How It Compares</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
                <h3 className="font-medium text-brand-900">{treatment.compareLeftTitle}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-brand-700">
                  {compareLeft.map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-ivory-50 p-6">
                <h3 className="font-medium text-brand-900">{treatment.compareRightTitle}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-brand-700">
                  {compareRight.map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {faq.length > 0 && (
          <section>
            <h2 className="text-2xl font-medium text-brand-900">Frequently Asked Questions</h2>
            <div className="mt-6 divide-y divide-brand-100 rounded-2xl border border-brand-100">
              {faq.map((item, i) => (
                <div key={i} className="p-6">
                  <h3 className="font-medium text-brand-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-brand-800 p-10 text-center text-ivory-50">
          <h2 className="text-2xl font-medium">Have questions about this treatment?</h2>
          <p className="mt-2 text-brand-100">Send us a message and our team will follow up with you.</p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-ivory-50 px-8 py-3 text-sm font-medium text-brand-900 hover:bg-brand-100"
          >
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
}
