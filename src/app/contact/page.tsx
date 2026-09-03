import { prisma } from "@/lib/prisma";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import { parseStringList } from "@/lib/content-types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const [hero, contact] = await Promise.all([
    prisma.pageHero.findUnique({ where: { slug: "contact" } }),
    prisma.contactInfo.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Contact"}
        subtitle={hero?.subtitle}
        images={parseStringList(hero?.imageUrls ?? "[]")}
      />

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium text-brand-900">Get in Touch</h2>
          <dl className="mt-6 space-y-4 text-sm text-brand-700">
            {contact?.address && (
              <div>
                <dt className="font-medium text-brand-900">Address</dt>
                <dd className="mt-1">{contact.address}</dd>
              </div>
            )}
            {contact?.phone && (
              <div>
                <dt className="font-medium text-brand-900">Phone</dt>
                <dd className="mt-1">{contact.phone}</dd>
              </div>
            )}
            {contact?.email && (
              <div>
                <dt className="font-medium text-brand-900">Email</dt>
                <dd className="mt-1">{contact.email}</dd>
              </div>
            )}
            {contact?.hoursText && (
              <div>
                <dt className="font-medium text-brand-900">Hours</dt>
                <dd className="mt-1 whitespace-pre-line">{contact.hoursText}</dd>
              </div>
            )}
            {contact?.directionsText && (
              <div>
                <dt className="font-medium text-brand-900">Directions</dt>
                <dd className="mt-1 whitespace-pre-line">{contact.directionsText}</dd>
              </div>
            )}
          </dl>
          {contact?.mapEmbedUrl && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-100">
              <iframe
                src={contact.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                title="Map"
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-medium text-brand-900">Send a Message</h2>
          <p className="mt-2 text-sm text-brand-600">
            Fill out the form below and our team will get back to you.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
