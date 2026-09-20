import PageHero from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Daejeon Medical Wellness Tourism" };

const interview = [
  {
    question:
      "Could you tell us about the main activities and experiences you've pursued to globalize Korean medicine?",
    answer:
      "After working for three years in Ethiopia as an internationally dispatched Korean medicine doctor, I returned to Korea and began working full-time as a specialist at Jaseng Hospital of Korean Medicine starting in 2007. As Director of the International Clinic Center, I drew on my overseas experience and spent a year preparing to \"globalize Korean medicine\" — my biggest concern at the time was what kind of success model to build, since Jaseng was the first Korean-medicine hospital-level institution to expand into the United States. We targeted local Americans, especially middle-class patients and above, and because U.S. medical and labor laws differ so much from Korea's, we had to build an entirely new care system and think carefully about hiring staff. Recognizing the need for X-rays as part of basic examinations, we also pursued collaboration with U.S. chiropractors — practitioners legally authorized to perform spinal adjustments, in some ways similar to Korean medicine doctors — and took our first step into the U.S. market, establishing the Jaseng Hospital Fullerton branch in Fullerton, California, in 2009.",
  },
  {
    question:
      "You've led overseas medical volunteer work through KOMSTA (the Korean Medicine Overseas Volunteer Corps) — is there a particular reason for this?",
    answer:
      "During my first year as a resident at Jaseng Hospital of Korean Medicine, I took part in my first overseas medical mission through KOMSTA, volunteering in Sri Lanka — and it became a turning point in my life. Any initial unfamiliarity with a foreign country quickly disappeared, and the four days of the mission flew by in a blur as patients kept arriving without end. Having to return to Korea while leaving behind patients who I felt would keep improving with more treatment was genuinely difficult. That experience made me realize there were even more people overseas who needed \"my hands\" than there were in Korea, and it was around then that I began to seriously dream of globalizing Korean medicine.",
  },
  {
    question:
      "You've been very active in promoting the excellence of Korean medicine and working toward its globalization and popularization. Could you tell us about this year's marketing plans for attracting medical tourists?",
    answer:
      "We have sufficient infrastructure in place to accommodate international patients. Last year, together with Daejeon Marketing Corporation, we took part in overseas medical roadshows in Dubai, Mongolia, and elsewhere, meeting with local medical institutions and agencies with the aim of fully strengthening our overseas network this year — however, the COVID-19 pandemic shifted our focus more toward online promotion. With support from Daejeon Marketing Corporation, we are also currently restructuring our hospital website so that international patients who find us online can more easily come in for a visit.",
  },
  {
    question:
      "What do you see as Korean medicine's differentiating strength compared to Western medicine, and what's your view on combining Western and Korean medicine treatment?",
    answer:
      "Our hospital's non-surgical treatments have a lower recurrence rate and lower cost than surgical treatment in Western medicine — that's our biggest strength. That said, I don't think it's right to say one is superior to the other. Western medicine's diagnostic equipment allows for more accurate diagnosis of a patient's pain, while Korean medicine has the advantage of being able to provide treatment tailored to each patient.",
  },
  {
    question: "What conditions do international patients typically come to your hospital for?",
    answer:
      "Patients most often visit for treatment of spinal disc herniation, spinal stenosis, and degenerative joint disease, among others. We also provide systematic integrative immunity treatment through collaboration between Korean and Western medicine — strengthening patients' immune function, addressing the underlying cause of their condition, restoring weakened strength and energy, and ultimately helping improve their overall quality of life.",
  },
  {
    question:
      "Could you tell us about the total service your hospital provides, from attracting medical tourists through to treatment?",
    answer:
      "All of our medical staff are able to provide care in English, and we have a dedicated nutritionist who prepares personalized meal plans for inpatients. Our private, semi-hotel-style inpatient rooms allow medical tourists to receive treatment comfortably, and we also provide a shuttle bus to nearby areas so patients can enjoy shopping and sightseeing during their stay.",
  },
  {
    question: "One last question — could you share your vision for the hospital?",
    answer:
      "Next year, our hospital will be designated as a resident-training institution, which will allow us to bring on more interns and specialist physicians. We aim for Phil Hospital of Korean Medicine to become a role model for specialist-staffed Korean medicine hospitals, and we are also planning to establish franchise hospitals. My hope, and the hope of our entire medical staff, is to make science-based Korean medicine treatment more accessible, so that more people can receive it without financial burden.",
  },
];

const medicalStaff = [
  "Dr. Yoon Je-pil, Chief Director — Doctor of Korean Medicine",
  "Ph.D. in Korean Medicine, Kyung Hee University",
  "Former KOICA International Cooperation Korean Medicine Doctor (Ethiopia)",
  "Physician to Korean players in Major League Baseball, the PGA Tour, and the LPGA Tour",
];

export default function DaejeonMedicalWellnessTourismPage() {
  return (
    <>
      <PageHero
        title="Daejeon Medical Wellness Tourism"
        images={["/uploads/wellness-tourism-banner.png"]}
        imagePosition="top"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
        <section>
          <h2 className="text-2xl font-medium text-brand-900">Why Daejeon Medical Wellness Tourism?</h2>
          <p className="mt-6 max-w-[68ch] text-base leading-[1.8] text-brand-700">
            Daedeok Innopolis is home to a wide range of pharmaceutical and biotech research
            institutes, including 30 government-funded research institutes and roughly 20,000
            researchers holding master&apos;s degrees or higher. With around 60,000 domestic
            patents and 7,000 international patents in medical-related fields, this outstanding
            R&D foundation underpins the region&apos;s high standard of medical care. At just
            70–80% of the cost compared to the greater Seoul area, 8 general hospitals, more than
            2,000 medical institutions, and roughly 9,000 medical professionals in Daejeon are
            ready to welcome you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-brand-900">
            Daejeon Medical Tourism Newsletter Interview
          </h2>
          <p className="mt-6 max-w-[68ch] text-base leading-[1.8] text-brand-700">
            The globalization of original, excellent Korean medicine — increasingly recognized
            abroad as &quot;Korean Medicine.&quot; As Korea&apos;s medical standards continue to
            rise and the government expands its support for medical tourism, the number of medical
            tourists has been steadily increasing. In particular, thanks to Korea&apos;s
            K-quarantine response to COVID-19 and its advanced medical system, Korea&apos;s hospital
            system has drawn more international attention than ever before. In this interview, we
            speak with Dr. Yoon Je-pil, Director of Daejeon Phil Hospital of Korean Medicine, who is
            leading the globalization of Korean medicine.
          </p>

          <div className="mt-8 divide-y divide-brand-100 rounded-2xl border border-brand-100">
            {interview.map((item, i) => (
              <div key={i} className="p-6">
                <h3 className="font-medium text-brand-900">Q. {item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-brand-900">Medical Staff</h2>
          <div className="mt-6 flex gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/director.jpg"
              alt="Dr. Yoon Je-pil"
              className="h-32 w-32 shrink-0 rounded-xl object-cover"
            />
            <ul className="space-y-2 text-sm leading-relaxed text-brand-700">
              {medicalStaff.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl bg-brand-800 p-10 text-center text-ivory-50">
          <h2 className="text-2xl font-medium">Interested in medical wellness tourism in Daejeon?</h2>
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
