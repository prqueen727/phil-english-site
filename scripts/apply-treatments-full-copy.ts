import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Treatment Process sections are kept as-is on every treatment — only
  // Principle / How It Compares / FAQ are updated here.

  await prisma.treatment.update({
    where: { slug: "acupuncture" },
    data: {
      faq: JSON.stringify([
        {
          question: "Is acupuncture painful?",
          answer:
            "Most patients feel only a light sensation, such as a slight pinch or pressure, at the insertion point — not sharp pain. Many find the sessions relaxing.",
        },
        {
          question: "How many sessions will I need?",
          answer:
            "This varies by condition and severity; your practitioner will recommend a treatment plan and number of sessions during your consultation.",
        },
        {
          question: "Are the needles safe and sterile?",
          answer:
            "Yes. We use sterile, single-use disposable needles for every patient, which are discarded after each treatment.",
        },
        {
          question: "Can I receive acupuncture as a short-term visitor to Korea?",
          answer:
            "Yes. Acupuncture is available to international visitors — no long-term residency is required, and English-speaking staff can assist with your visit.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "chuna-manual-therapy" },
    data: {
      faq: JSON.stringify([
        {
          question: "Is Chuna therapy safe for everyone?",
          answer:
            "Chuna therapy is generally safe and gentle, but it may not be suitable during acute fractures, certain spinal conditions, or pregnancy. Your practitioner will review your health history before treatment to confirm it is appropriate for you.",
        },
        {
          question: "Is Chuna similar to chiropractic care?",
          answer:
            "They share some similarities, as both involve manual joint and spinal manipulation. Chuna is a traditional Korean medicine technique that also considers muscle, tendon, and overall body balance as part of treatment.",
        },
        {
          question: "Do I need to remove clothing for this treatment?",
          answer:
            "No. Chuna therapy is typically performed while you remain in comfortable, loose clothing.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "herbal-medicine" },
    data: {
      faq: JSON.stringify([
        {
          question: "Are the herbs safe?",
          answer:
            "Herbal formulas are prepared individually for each patient based on a practitioner's diagnosis, using quality-checked ingredients. Please inform your practitioner of any allergies, current medications, or health conditions so your formula can be safely tailored to you.",
        },
        {
          question: "Will herbal medicine interact with medications I'm already taking?",
          answer:
            "Please share a full list of medications and supplements you're currently taking during your consultation, so your practitioner can check for potential interactions before prescribing.",
        },
        {
          question: "Can herbal medicine be shipped or taken with me after I leave Korea?",
          answer:
            "In many cases, herbal formulas can be prepared for you to take with you. Please check with our staff about packaging and any customs considerations for your home country.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "traction-therapy" },
    data: {
      faq: JSON.stringify([
        {
          question: "Is traction therapy safe for herniated discs?",
          answer:
            "Traction therapy is commonly used for disc-related conditions and is generally well tolerated, but it may not be suitable for certain severe or unstable spinal conditions. Your practitioner will assess your condition before beginning treatment.",
        },
        {
          question: "Does the treatment hurt?",
          answer:
            "No. The pulling force is gentle and gradual, and most patients find the sessions comfortable and even relaxing.",
        },
        {
          question: "How long is each session?",
          answer:
            "Sessions are typically brief. Your practitioner will confirm the exact duration and recommended frequency based on your condition.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "electronic-moxibustion-therapy" },
    data: {
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "An electronic heating device delivers steady, controlled warmth to acupuncture points, similar in principle to traditional moxibustion but without smoke or direct flame. The heat is thought to improve local circulation and relax surrounding muscles.",
        },
      ]),
      compareLeftTitle: "Electronic Moxibustion",
      compareRightTitle: "Traditional Moxibustion",
      compareLeft: JSON.stringify([
        "Controlled, adjustable heat via an electronic device",
        "No smoke or open flame",
        "Consistent, precise temperature control",
      ]),
      compareRight: JSON.stringify([
        "Heat from burning moxa (mugwort)",
        "Produces smoke and herbal aroma",
        "Longstanding traditional technique",
      ]),
      faq: JSON.stringify([
        {
          question: "Is electronic moxibustion safe?",
          answer:
            "Yes. Because the heat is generated electronically and the temperature is controlled and adjustable, treatment is designed to be comfortable and safe, without the risk of burns or smoke associated with traditional moxibustion.",
        },
        {
          question: "Does it smell like traditional moxibustion?",
          answer:
            "No. Because there is no burning involved, electronic moxibustion produces no smoke or herbal smell, making it a comfortable option for patients sensitive to smoke.",
        },
        {
          question: "Is this available as a stand-alone treatment?",
          answer:
            "Electronic moxibustion is often combined with acupuncture or other treatments as part of a broader plan, but your practitioner can advise on the best approach for your specific needs.",
        },
      ]),
    },
  });

  console.log("Full treatment copy applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
