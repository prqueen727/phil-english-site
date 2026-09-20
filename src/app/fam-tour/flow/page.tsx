import PageHero from "@/components/page-hero";
import PhotoPlaceholder from "@/components/photo-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fam Tour Flow" };

const steps = [
  {
    title: "Herbal Tea Tasting",
    body: "Sample a selection of signature Korean herbal teas, including Gyeongokgo, Jigujacha, Hwangjeongcha, Gukhwacha, Saengmaeksan, and Ssanghwatang.",
    imageUrl: "/uploads/famtour-flow-herbal-tea.jpg",
  },
  {
    title: "One-on-One Consultation",
    body: "A private consultation with one of our hospital directors to discuss everyday discomforts and lifestyle habits.",
    imageUrl: "/uploads/famtour-flow-consultation.jpg",
  },
  {
    title: "Chuna Manual Therapy Experience",
    body: "All participants experience Chuna manual therapy firsthand.",
    imageUrl: "/uploads/famtour-flow-chuna.jpg",
  },
  {
    title: "Acupuncture (Optional)",
    body: "Acupuncture treatment is available for those who wish to try it.",
    imageUrl: "/uploads/famtour-flow-acupuncture.jpg",
  },
  {
    title: "Stretching & Exercise Guidance",
    body: "Simple stretches and self-care exercises you can practice in daily life.",
    imageUrl: "/uploads/famtour-flow-exercise.jpg",
  },
  {
    title: "Gift Presentation",
    body: "Guests receive a keepsake gift, including an English-language hospital brochure, Phil Korean Medicine Cream, and a set of five Gyeongokgo.",
    imageUrl: "/uploads/cream-product-h-c.png",
  },
];

export default function FamTourFlowPage() {
  return (
    <>
      <PageHero
        title="Fam Tour Flow"
        subtitle="From sampling traditional Korean herbal tea to one-on-one care from our English- and Japanese-speaking medical staff, come experience the excellence of Korean medicine treatment for yourself."
        images={["/uploads/famtour-flow-banner.jpg"]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-medium text-brand-900">Program Flow</h2>
        <ol className="mt-8 space-y-10">
          {steps.map((step, i) => (
            <li key={step.title} className="grid gap-6 sm:grid-cols-[auto_1fr_12rem] sm:items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-medium text-brand-800">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-brand-900">{step.title}</h3>
                <p className="mt-1 max-w-[68ch] text-sm leading-[1.8] text-brand-700">{step.body}</p>
              </div>
              {step.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="aspect-square w-full rounded-2xl object-cover sm:w-48"
                />
              ) : (
                <PhotoPlaceholder aspect="aspect-square" className="sm:w-48" />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-prose text-sm italic leading-relaxed text-brand-500">
          This flow can be adjusted flexibly depending on the group&apos;s size and needs.
        </p>

        <section className="mt-20 rounded-2xl bg-brand-800 p-10 text-center text-ivory-50">
          <h2 className="text-2xl font-medium">Interested in hosting a fam tour?</h2>
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
