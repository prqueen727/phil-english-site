import PageHero from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Phil Korean Medicine Cream" };

const ingredients = [
  "Scutellaria (Baikal Skullcap) Extract",
  "Red Ginseng Extract",
  "Schizonepeta Extract",
  "Licorice Root Extract",
  "And more",
];

const lineup = [
  {
    name: "Phil Korean Medicine Cream+ C",
    type: "COOL Gel Type, 80 mL",
  },
  {
    name: "Phil Korean Medicine Cream+ H",
    type: "HOT Cream Type, 80 mL",
  },
];

const faq = [
  {
    question: "What inspired you to develop a Korean medicine cream for use in healthcare?",
    answer:
      "In our practice, we frequently see patients with spinal or joint discomfort. Many of them find frequent hospital visits burdensome, so they rely on medicated patches instead — but in the summer heat, sweating and increased activity make it uncomfortable to keep a patch on for long periods. This prompted us to consider how we could make a product that more people could use comfortably for longer. That question led us to create a cream alternative to medicated patches, infused with a variety of herbal medicine ingredients.",
  },
  {
    question: "When should I apply Phil Korean Medicine Cream?",
    answer:
      "While it's fine to use either based on personal preference, we generally recommend the H (HOT) type before exercise and the C (COOL) type after exercise.",
  },
  {
    question: "What is the correct way to use Phil Korean Medicine Cream?",
    answer:
      "Since the face has a lot of mucous membranes and the product must never get into the eyes, please apply it only to areas of the body other than the face.",
  },
];

export default function CreamPage() {
  return (
    <>
      <PageHero
        title="Phil Korean Medicine Cream"
        subtitle="Health, Captured in a Cream — Phil Korean Medicine Cream+ H/C"
        images={["/uploads/cream-hero-golf-sunset.jpg"]}
        size="large"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/cream-product-h-c.png"
            alt="Phil Korean Medicine Cream+ H and C tubes"
            className="mx-auto w-full max-w-sm object-contain"
          />
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gold-600">
              Phil Korean Medicine Cream
            </p>
            <h2 className="text-3xl font-medium text-brand-900">
              Only the Best Ingredients
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-brand-700">
              A Korean Medicine Cream Made With Real Herbal Extracts.
            </p>

            <h3 className="mt-8 font-medium text-brand-900">Key Ingredients</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-brand-700">
              {ingredients.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-medium text-brand-900">Product Lineup</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {lineup.map((item) => (
              <div key={item.name} className="rounded-2xl border border-brand-100 bg-ivory-50 p-6">
                <h3 className="font-medium text-brand-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-2xl border border-brand-100 bg-brand-50 p-8 sm:p-10">
          <h2 className="text-2xl font-medium text-brand-900">
            A Research-Driven Korean Medicine Doctor Answers Your Questions
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-brand-700">
            Phil Korean Medicine Cream was developed with the direct involvement of Dr. Yoon
            Je-pil, a board-certified specialist in Korean Rehabilitation Medicine who holds a
            Ph.D. in Korean Medicine.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-medium text-brand-900">Frequently Asked Questions</h2>
          <div className="mt-6 divide-y divide-brand-100 rounded-2xl border border-brand-100">
            {faq.map((item) => (
              <div key={item.question} className="p-6">
                <h3 className="font-medium text-brand-900">Q. {item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-20 rounded-2xl bg-brand-800 p-10 text-center text-ivory-50">
          <h2 className="text-2xl font-medium">Interested in Phil Korean Medicine Cream?</h2>
          <p className="mt-2 text-brand-100">Send us a message and our team will follow up with you.</p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-ivory-50 px-8 py-3 text-sm font-medium text-brand-900 hover:bg-brand-100"
          >
            Contact Us
          </a>
        </section>
      </section>
    </>
  );
}
