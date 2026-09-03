import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.clinic.update({
    where: { slug: "non-surgical-spine-joint-treatment" },
    data: {
      summary:
        "Through non-surgical treatments such as acupuncture, pharmacopuncture, Chuna manual therapy, and manual therapy, we treat the root cause of pain and help restore muscle strength and function, supporting patients' return to daily life.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Treatments",
          body: "Lumbar disc herniation, cervical disc herniation, jaw joint (TMJ) disorders, frozen shoulder, sports injuries, plantar fasciitis, and more.",
        },
        {
          title: "Our Approach",
          body: "Through non-surgical Korean medical treatments such as for lumbar disc, cervical disc, jaw joint disorders, frozen shoulder, and sports injuries, this treatment improves the root cause of pain and helps restore muscle strength and function so patients can return to daily life.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "Is this suitable for herniated discs?",
          answer:
            "Yes. Non-surgical treatments such as acupuncture, Chuna manual therapy, and pharmacopuncture are widely used for herniated discs, especially in mild to moderate cases. Your practitioner will review your symptoms and any imaging at your first visit to confirm whether this approach is right for you.",
        },
        {
          question: "How long does treatment typically take?",
          answer:
            "Recovery timelines vary by condition and severity. Most patients begin a course of regular visits and are reassessed periodically so the treatment plan can be adjusted as needed.",
        },
        {
          question: "Can international patients receive this treatment?",
          answer:
            "Yes. English- and Japanese-speaking staff are available to support international patients throughout consultation and treatment.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "traffic-accident-aftereffects" },
    data: {
      name: "Aftereffects of Traffic Accidents",
      summary:
        "Various aftereffects that occur after a traffic accident — such as neck and back pain, headaches, dizziness, and muscle damage — are systematically treated according to each patient's individual symptoms.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Treatments",
          body: "Neck and back pain, headache and dizziness, muscle and ligament damage, neurological symptoms, stress and anxiety symptoms, and more.",
        },
        {
          title: "Our Approach",
          body: "Various aftereffects such as neck and back pain, headaches, dizziness, and muscle damage that occur after a traffic accident are systematically treated according to each patient's individual symptoms.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "I don't have symptoms yet — should I still get checked?",
          answer:
            "Yes. Some aftereffects of a traffic accident, such as whiplash, can take a few days to appear. An early evaluation helps catch and treat these issues before they worsen.",
        },
        {
          question: "What if I was in an accident while traveling in Korea?",
          answer:
            "We can still evaluate and treat your symptoms. Please bring any documentation you have, such as a police report or insurance details, and our staff will help clarify next steps, with translation support where needed.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "post-surgical-rehabilitation" },
    data: {
      summary:
        "To relieve pain and restore joint and muscle strength after surgery, we operate a customized rehabilitation program based on Korean medicine–Western medicine collaboration to support a rapid return to daily life.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Areas",
          body: "Rehabilitation after spinal surgery, rehabilitation after joint surgery, rehabilitation after joint replacement surgery, and muscle strength and functional recovery management.",
        },
        {
          title: "Our Approach",
          body: "To relieve pain and restore joint and muscle strength after spinal and joint surgery, we operate a customized rehabilitation program based on Korean medicine–Western medicine cooperation to support a rapid return to daily life.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "When can I start after surgery?",
          answer:
            "Timing depends on your surgery and your surgeon's recovery guidelines. In most cases, rehabilitation begins once your surgical team confirms it is safe to do so, and our practitioners coordinate with your referring surgeon where possible.",
        },
        {
          question: "Do I need a referral from my surgeon?",
          answer:
            "A referral is not required to book a consultation, but bringing your surgical records helps our practitioners design a program that safely complements your recovery.",
        },
        {
          question: "Can I continue this program if I had surgery outside Korea?",
          answer:
            "Yes. Please bring any available surgical records or a summary from your surgeon so our team can tailor your rehabilitation plan accordingly.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "integrative-cancer-immunity-center" },
    data: {
      summary:
        "We operate an integrated immunity-management program to help restore immunity and physical strength weakened during cancer treatment. We also have a women-only immunotherapy ward, providing a safer and more comfortable treatment environment.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Programs",
          body: "Immunity management, personalized herbal medicine treatment, nutritional management, physical strength recovery program, and a women-only immunotherapy ward.",
        },
        {
          title: "Our Approach",
          body: "We operate an integrated immunity-management program to help restore immunity and physical strength that have been weakened during cancer treatment.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "Can this replace my cancer treatment?",
          answer:
            "No. This program is supportive care designed to be used alongside your oncology treatment — it does not replace chemotherapy, radiation, surgery, or any treatment prescribed by your oncology team. We recommend continuing all treatments as directed by your oncologist and using our program to help manage side effects and support your overall strength.",
        },
        {
          question: "Will my oncologist be informed of this treatment?",
          answer:
            "We encourage coordination with your oncology team wherever possible, and can provide a summary of your program upon request.",
        },
        {
          question: "Is the women-only ward available to international patients?",
          answer:
            "Yes. The women-only immunotherapy ward is available to all patients, including international visitors, offering a private and comfortable recovery environment.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "brain-health-center" },
    data: {
      summary:
        "Using an EEG-based NEUROMATCH system with more than 18 channels, we precisely analyze brain function and systematically evaluate sleep, cognition, and autonomic nervous system conditions to provide personalized treatment and management programs.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Areas",
          body: "Sleep disorders, cognitive function management, autonomic nervous system imbalance, concentration and memory management, headache and dizziness, and depression and anxiety management.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "Is the EEG test painful or invasive?",
          answer:
            "No. The EEG test is completely non-invasive — sensors are placed on the scalp to measure brain activity, and the process is painless and typically takes only a short time.",
        },
        {
          question: "Who is this program recommended for?",
          answer:
            "It's well suited to patients experiencing sleep difficulties, concentration or memory concerns, stress-related symptoms, or anyone who wants a detailed evaluation of their brain and nervous system health.",
        },
        {
          question: "Can international patients receive a report in English?",
          answer:
            "Yes. Results can be explained with the support of our English-speaking staff, and a summary report can be provided upon request.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "diet-weight-management" },
    data: {
      summary:
        "A traditional Korean medicine diet program, systematically managed by Korean medicine doctors, treats overweight and obesity — major causes of chronic conditions such as high blood pressure, diabetes, and musculoskeletal issues.",
      principleBlocks: JSON.stringify([
        {
          title: "Key Focus Areas",
          body: "Personalized constitutional assessment, herbal medicine-based weight management, chronic condition prevention (high blood pressure, diabetes), musculoskeletal health support (back and knee pain), and lifestyle and dietary guidance.",
        },
        {
          title: "Our Approach",
          body: "Overweight and obesity are major causes of chronic conditions such as high blood pressure and diabetes, as well as musculoskeletal issues like back and knee pain. Phil Hospital of Korean Medicine treats obesity through a traditional Korean medicine diet program, systematically managed by Korean medicine doctors.",
        },
      ]),
      faq: JSON.stringify([
        {
          question: "Are the herbal formulas safe for long-term use?",
          answer:
            "Each formula is prescribed and monitored by a Korean medicine doctor based on your individual constitution and health status, with regular follow-up visits to track your progress and adjust the plan as needed. Please share your full health history and any current medications during your consultation so your program can be safely tailored to you.",
        },
        {
          question: "How much weight can I expect to lose, and how long does the program take?",
          answer:
            "Results vary by individual constitution, health status, and lifestyle. Your practitioner will discuss a realistic goal and timeline based on your assessment at your first visit.",
        },
        {
          question: "Can I continue the herbal program after I return to my home country?",
          answer:
            "In many cases, herbal formulas can be prepared for you to take with you, with follow-up guidance provided remotely where possible. Please check with our staff about packaging and any customs considerations for your home country.",
        },
      ]),
    },
  });

  console.log("Full clinic copy applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
