import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const heroes = [
  {
    slug: "home",
    title: "Traditional Korean Medicine, Modern Care",
    subtitle:
      "Phil Korean Medicine Hospital blends time-tested Korean medicine with modern clinical standards to support your health and recovery.",
    imageUrls: ["/uploads/hero-home-1.jpg", "/uploads/hero-home-2.jpg", "/uploads/hero-home-3.jpg"],
  },
  {
    slug: "about",
    title: "About Phil Korean Medicine Hospital",
    subtitle: "Our philosophy, our team, and our approach to care.",
    imageUrls: ["/uploads/about-hero.jpg"],
  },
  {
    slug: "greeting",
    title: "Director's Greeting",
    subtitle: "A welcome message from our medical director.",
    imageUrls: ["/uploads/greeting-hero.jpg"],
  },
  {
    slug: "treatments",
    title: "Our Treatments",
    subtitle: "A range of Korean medicine therapies tailored to your needs.",
    imageUrls: ["/placeholders/hero-treatments.svg"],
  },
  {
    slug: "clinics",
    title: "Our Clinics",
    subtitle: "Specialized care centers addressing a wide range of conditions.",
    imageUrls: ["/placeholders/hero-treatments.svg"],
  },
  {
    slug: "doctors",
    title: "Our Medical Team",
    subtitle: "Experienced practitioners dedicated to your wellbeing.",
    imageUrls: ["/uploads/doctors-team.jpg"],
  },
  {
    slug: "contact",
    title: "Contact Us",
    subtitle: "Send us a message and our team will get back to you.",
    imageUrls: ["/uploads/contact-hero-2.png"],
  },
];

const treatments = [
  {
    slug: "acupuncture",
    name: "Acupuncture",
    summary:
      "Fine needles inserted at specific points relieve pain, reduce inflammation, and restore balance in nerve and muscle function.",
    imageUrl: "/uploads/acupuncture.jpg",
    order: 1,
    principleBlocks: [
      {
        title: "How It Works",
        body: "Acupuncture involves inserting fine needles into specific points on the body to relieve pain, reduce inflammation, and restore balance in nerve and muscle function. It improves blood circulation and stimulates the body's natural healing response, helping to speed recovery.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Acupuncture",
    compareRightTitle: "Pharmacopuncture",
    compareLeft: ["Uses fine filiform needles only", "Targets meridian points broadly", "Long-standing traditional technique"],
    compareRight: ["Injects diluted herbal extract using a needle", "Combines the effects of herbal medicine and acupuncture", "Often used for more localized, concentrated action"],
    faq: [
      { question: "Is acupuncture painful?", answer: "Most patients feel only a light sensation, such as a slight pinch or pressure, at the insertion point — not sharp pain. Many find the sessions relaxing." },
      { question: "How many sessions will I need?", answer: "This varies by condition and severity; your practitioner will recommend a treatment plan and number of sessions during your consultation." },
      { question: "Are the needles safe and sterile?", answer: "Yes. We use sterile, single-use disposable needles for every patient and discard them after each treatment." },
      { question: "Can I receive acupuncture as a short-term visitor to Korea?", answer: "Yes. Acupuncture is available to international visitors — no long-term residency is required, and English-speaking staff can assist with your visit." },
    ],
  },
  {
    slug: "chuna-manual-therapy",
    name: "Chuna Manual Therapy",
    summary: "A hands-on therapy for muscle and tendon recovery and pain relief, adjusted to each patient's symptoms.",
    imageUrl: "/uploads/chuna.jpg",
    order: 2,
    principleBlocks: [
      {
        title: "How It Works",
        body: "A treatment for muscle and tendon recovery and pain relief. The therapy is adjusted based on each patient's symptoms to minimize bodily strain.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Chuna Manual Therapy",
    compareRightTitle: "Traction Therapy",
    compareLeft: ["Hands-on joint manipulation", "Focus on structural alignment", "Often combined with other therapies"],
    compareRight: ["Mechanical, device-assisted stretching", "Focus on decompressing the spine", "Passive treatment"],
    faq: [
      { question: "Is Chuna therapy safe for everyone?", answer: "Chuna therapy is generally safe and gentle, but it may not be suitable for people with acute fractures or certain spinal conditions, or during pregnancy. Your practitioner will review your health history before treatment to confirm it is appropriate for you." },
      { question: "Is Chuna similar to chiropractic care?", answer: "They share some similarities, as both involve manual joint and spinal manipulation. Chuna is a traditional Korean medicine technique that also takes muscles, tendons, and overall body balance into account as part of treatment." },
      { question: "Do I need to remove clothing for this treatment?", answer: "No. Chuna therapy is typically performed while you wear comfortable, loose-fitting clothing." },
    ],
  },
  {
    slug: "herbal-medicine",
    name: "Herbal Medicine",
    summary: "Customized herbal formulas relieve inflammation and edema and delay the degenerative process to prevent symptoms from worsening.",
    imageUrl: "/uploads/herbal-medicine.jpg",
    order: 3,
    principleBlocks: [
      {
        title: "How It Works",
        body: "A treatment that can reduce pain by relieving inflammation and edema in the nerves. It also delays the degenerative process to prevent the symptoms from worsening.",
      },
      {
        title: "Safety & Quality",
        body: "Herbal ingredients undergo a processing method called po-je — such as roasting or steaming — to reduce toxicity and adjust their therapeutic properties before use. A large-scale domestic observational study on herbal-medicine-related liver injury found that 6 out of 1,000 patients (0.6%) experienced liver injury, and this was found to be largely unrelated to the inherent toxicity of the herbal medicine itself. For mineral-based ingredients, attention is paid to heavy metal content; for animal-based ingredients, attention is paid to toxicity and CITES (endangered species) regulations.",
      },
      {
        title: "Side Effects and Precautions",
        body: "Depending on individual constitution and dosage, side effects such as digestive discomfort, allergic reactions, or neurological symptoms may occasionally occur.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Herbal Medicine",
    compareRightTitle: "Pharmacopuncture",
    compareLeft: ["Taken orally over a period of time", "Addresses internal balance", "Formula adjusted during follow-up visits"],
    compareRight: ["Injected directly at acupuncture points", "Concentrated, localized dose", "Often used alongside herbal medicine"],
    faq: [
      { question: "Are the herbs safe?", answer: "Herbal formulas are prepared individually for each patient based on a practitioner's diagnosis, using quality-checked ingredients. Please inform your practitioner of any allergies, current medications, or health conditions so your formula can be safely tailored to you." },
      { question: "Will herbal medicine interact with medications I'm already taking?", answer: "Please share a full list of medications and supplements you're currently taking during your consultation, so your practitioner can check for potential interactions before prescribing." },
      { question: "Can herbal medicine be shipped or taken with me after I leave Korea?", answer: "In many cases, herbal formulas can be prepared for you to take with you. Please check with our staff about packaging and any customs considerations for your home country." },
    ],
  },
  {
    slug: "pharmacopuncture",
    name: "Pharmacopuncture (Herbal Acupuncture)",
    summary: "Refined herbal extracts injected directly into the painful area take effect quickly, even with small doses.",
    imageUrl: "/uploads/herbal-acupuncture.jpg",
    order: 4,
    principleBlocks: [
      {
        title: "How It Works",
        body: "A treatment in which refined herbal extracts are injected directly into the painful area. Pharmacopuncture takes effect quickly even with small doses and is also helpful for patients who cannot take herbal medicine orally due to indigestion.",
      },
      {
        title: "Safety & Quality",
        body: "Pharmacopuncture solutions are made from herbal medicine extracts. A product containing separately regulated pharmaceutical ingredients without proper approval cannot be called pharmacopuncture. Preparation facilities are subject to the Ministry of Health and Welfare's evaluation and certification system; for pharmacopuncture preparation facilities, the assessment also covers sterile equipment and related items.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "",
    compareRightTitle: "",
    compareLeft: [],
    compareRight: [],
    faq: [
      { question: "What is pharmacopuncture solution made from?", answer: "It is made from herbal medicine extracts. Any solution that includes separately regulated pharmaceutical ingredients without proper approval is not genuine pharmacopuncture." },
      { question: "How is the safety of the preparation process ensured?", answer: "Preparation facilities are certified under the Ministry of Health and Welfare's evaluation system, which includes assessment of equipment used for sterile pharmacopuncture preparation." },
      { question: "Can I ask which solution is being used and where it was prepared?", answer: "Yes. You are welcome to ask your practitioner during your consultation which pharmacopuncture solution is used and where it was prepared." },
    ],
  },
  {
    slug: "traction-therapy",
    name: "Traction Therapy",
    summary: "Suspension devices relieve pressure on spinal discs by applying and releasing controlled traction to the spinal joints.",
    imageUrl: "/uploads/extension-therapy.jpg",
    order: 5,
    principleBlocks: [
      {
        title: "How It Works",
        body: "Suspension devices relieve pressure on spinal discs by applying traction to the spinal joints at a regular intensity, then releasing it. The treatment is effective for spinal disc disorders or stenosis.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Traction Therapy",
    compareRightTitle: "Chuna Manual Therapy",
    compareLeft: ["Mechanical, device-assisted stretching", "Consistent, controlled force", "Passive treatment"],
    compareRight: ["Hands-on manipulation by a practitioner", "Targets specific joint misalignments", "Active, technique-based adjustment"],
    faq: [
      { question: "Is traction therapy safe for herniated discs?", answer: "Traction therapy is commonly used for disc-related conditions and is generally well tolerated, but it may not be suitable for certain severe or unstable spinal conditions. Your practitioner will assess your condition before beginning treatment." },
      { question: "Does the treatment hurt?", answer: "No. The pulling force is gentle and gradual, and most patients find the sessions comfortable and even relaxing." },
      { question: "How long is each session?", answer: "Sessions are typically brief. Your practitioner will confirm the exact duration and recommended frequency based on your condition." },
    ],
  },
  {
    slug: "electronic-moxibustion-therapy",
    name: "Electronic Moxibustion Therapy",
    summary: "An electronic heating device delivers steady, controlled warmth to acupuncture points without smoke or an open flame.",
    imageUrl: "/uploads/electronic-moxibustion.jpg",
    order: 6,
    principleBlocks: [
      {
        title: "How It Works",
        body: "An electronic heating device delivers steady, controlled warmth to acupuncture points, similar in principle to traditional moxibustion but without smoke or an open flame. The heat is thought to improve local circulation and relax surrounding muscles.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Electronic Moxibustion",
    compareRightTitle: "Traditional Moxibustion",
    compareLeft: ["Controlled, adjustable heat via an electronic device", "No smoke or open flame", "Consistent, precise temperature control"],
    compareRight: ["Heat from burning moxa (mugwort)", "Produces smoke and herbal aroma", "Longstanding traditional technique"],
    faq: [
      { question: "Is electronic moxibustion safe?", answer: "Yes. Because the heat is generated electronically and the temperature is controlled and adjustable, treatment is designed to be comfortable and safe, without the risk of burns or smoke associated with traditional moxibustion." },
      { question: "Does it smell like traditional moxibustion?", answer: "No. Because there is no burning involved, electronic moxibustion produces no smoke or herbal smell, making it a comfortable option for patients sensitive to smoke." },
      { question: "Is this available as a stand-alone treatment?", answer: "Electronic moxibustion is often combined with acupuncture or other treatments as part of a broader plan, but your practitioner can advise on the best approach for your specific needs." },
    ],
  },
];

const REMOVED_TREATMENT_SLUGS = ["cupping-therapy"];

const clinics = [
  {
    slug: "non-surgical-spine-joint-treatment",
    name: "Non-Surgical Spine & Joint Treatment",
    summary: "Non-surgical treatments treat the root cause of pain and help restore muscle strength and function.",
    imageUrl: "/uploads/clinic-spine-joint.jpg",
    order: 1,
    principleBlocks: [
      {
        title: "Conditions and Symptoms Treated",
        body: "Conditions and symptoms treated include lumbar disc herniation, cervical disc herniation, temporomandibular joint (TMJ) disorders, frozen shoulder, sports injuries, plantar fasciitis, and more.",
      },
      {
        title: "Our Approach",
        body: "Through non-surgical Korean medicine treatments for conditions such as lumbar disc herniation, cervical disc herniation, temporomandibular joint disorders, frozen shoulder, and sports injuries, we treat the root cause of pain and help restore muscle strength and function so patients can return to daily life.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Non-Surgical Approach",
    compareRightTitle: "Surgical Approach",
    compareLeft: ["No incision or hospitalization required", "Gradual, cumulative improvement", "Lower procedural risk"],
    compareRight: ["May offer faster structural correction", "Requires recovery and hospitalization", "Reserved for severe or urgent cases"],
    faq: [
      { question: "Is this suitable for herniated discs?", answer: "Yes. Non-surgical treatments such as acupuncture, Chuna manual therapy, and pharmacopuncture are widely used for herniated discs, especially in mild to moderate cases. Your practitioner will review your symptoms and any imaging at your first visit to confirm whether this approach is right for you." },
      { question: "How long does treatment typically take?", answer: "Recovery timelines vary by condition and severity. Most patients begin a course of regular visits and are reassessed periodically so the treatment plan can be adjusted as needed." },
      { question: "Can international patients receive this treatment?", answer: "Yes. English- and Japanese-speaking staff are available to support international patients throughout consultation and treatment." },
    ],
  },
  {
    slug: "traffic-accident-aftereffects",
    name: "Aftereffects of Traffic Accidents",
    summary: "Systematic treatment for neck and back pain, headaches, dizziness, and muscle damage following a traffic accident.",
    imageUrl: "/uploads/clinic-traffic-accident.jpg",
    order: 2,
    principleBlocks: [
      {
        title: "Conditions and Symptoms Treated",
        body: "Conditions and symptoms treated include neck and back pain, headache and dizziness, muscle and ligament damage, neurological symptoms, stress and anxiety symptoms, and more.",
      },
      {
        title: "Our Approach",
        body: "Various aftereffects such as neck and back pain, headaches, dizziness, and muscle damage that occur after a traffic accident are systematically treated according to each patient's individual symptoms.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Korean Medicine Care",
    compareRightTitle: "Pain Medication Alone",
    compareLeft: ["Addresses muscle and joint function directly", "May reduce reliance on medication", "Individualized treatment plan"],
    compareRight: ["Manages pain symptoms only", "Does not address underlying tension", "Short-term relief"],
    faq: [
      { question: "I don't have symptoms yet — should I still get checked?", answer: "Yes. Some aftereffects of a traffic accident, such as whiplash, can take a few days to appear. An early evaluation helps catch and treat these issues before they worsen." },
      { question: "What if I was in an accident while traveling in Korea?", answer: "We can still evaluate and treat your symptoms. Please bring any documentation you have, such as a police report or insurance details, and our staff will help clarify next steps, with translation support where needed." },
    ],
  },
  {
    slug: "post-surgical-rehabilitation",
    name: "Post-Surgical Rehabilitation",
    summary: "A customized rehabilitation program supports a rapid return to daily life after spinal or joint surgery.",
    imageUrl: "/uploads/clinic-rehab.jpg",
    order: 3,
    principleBlocks: [
      {
        title: "Key Areas",
        body: "Key areas include rehabilitation after spinal surgery, rehabilitation after joint surgery, rehabilitation after joint replacement surgery, and management of muscle strength and functional recovery.",
      },
      {
        title: "Our Approach",
        body: "To relieve pain and restore joint and muscle strength after spinal and joint surgery, we operate a customized rehabilitation program based on Korean medicine–Western medicine collaboration to support a rapid return to daily life.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Rehabilitation Focus",
    compareRightTitle: "Acute Surgical Care",
    compareLeft: ["Focuses on functional recovery", "Complements post-op instructions", "Longer-term, gradual process"],
    compareRight: ["Focuses on the surgical procedure itself", "Managed by the surgical team", "Immediate post-operative period"],
    faq: [
      { question: "When can I start after surgery?", answer: "Timing depends on your surgery and your surgeon's recovery guidelines. In most cases, rehabilitation begins once your surgical team confirms it is safe to do so, and our practitioners coordinate with your referring surgeon where possible." },
      { question: "Do I need a referral from my surgeon?", answer: "A referral is not required to book a consultation, but bringing your surgical records helps our practitioners design a program that safely complements your recovery." },
      { question: "Can I continue this program if I had surgery outside Korea?", answer: "Yes. Please bring any available surgical records or a summary from your surgeon so our team can tailor your rehabilitation plan accordingly." },
    ],
  },
  {
    slug: "integrative-cancer-immunity-center",
    name: "Anti-Cancer Immunotherapy",
    summary: "An integrated immunity-management program helps restore immunity and physical strength weakened during cancer treatment.",
    imageUrl: "/uploads/clinic-cancer.jpg",
    order: 4,
    principleBlocks: [
      {
        title: "Key Programs",
        body: "Key programs include immunity management, personalized herbal medicine treatment, nutritional management, a program to restore physical strength, and a women-only immunotherapy ward.",
      },
      {
        title: "Our Approach",
        body: "We operate an integrated immunity-management program to help restore immunity and physical strength that have been weakened during cancer treatment.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Integrative Supportive Care",
    compareRightTitle: "Conventional Treatment Alone",
    compareLeft: ["Aims to ease side effects and support wellbeing", "Used alongside oncology care", "Individualized herbal and acupuncture support"],
    compareRight: ["Directly targets the cancer itself", "Led by the oncology team", "Standard of care"],
    faq: [
      { question: "Can this replace my cancer treatment?", answer: "No. This supportive care program is designed to be used alongside your oncology treatment — it does not replace chemotherapy, radiation, surgery, or any treatment prescribed by your oncology team. We recommend continuing all treatments as directed by your oncologist and using our program to help manage side effects and support your overall strength." },
      { question: "Will my oncologist be informed of this treatment?", answer: "We encourage coordination with your oncology team wherever possible and can provide a summary of your program upon request." },
      { question: "Is the women-only ward available to international patients?", answer: "Yes. The women-only immunotherapy ward is available to all patients, including international visitors, offering a private and comfortable recovery environment." },
    ],
  },
  {
    slug: "brain-health-center",
    name: "Brain Health Center",
    summary: "An EEG-based NEUROMATCH system with more than 18 channels precisely analyzes brain function to support personalized care.",
    imageUrl: "/uploads/clinic-brain-health.jpg",
    order: 5,
    principleBlocks: [
      {
        title: "Key Areas",
        body: "Key areas include sleep disorders, cognitive function management, autonomic nervous system imbalance, concentration and memory management, headache and dizziness, and depression and anxiety management.",
      },
      {
        title: "Our Approach",
        body: "Using an EEG-based NEUROMATCH system with more than 18 channels, we precisely analyze brain function and systematically evaluate sleep, cognition, and autonomic nervous system conditions to provide personalized treatment and management programs.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "",
    compareRightTitle: "",
    compareLeft: [],
    compareRight: [],
    faq: [
      { question: "Is the EEG test painful or invasive?", answer: "No. The EEG test is completely non-invasive — sensors are placed on the scalp to measure brain activity, and the process is painless and typically takes only a short time." },
      { question: "Who is this program recommended for?", answer: "It's well suited to patients experiencing sleep difficulties, concentration or memory concerns, or stress-related symptoms, as well as anyone who wants a detailed evaluation of their brain and nervous system health." },
      { question: "Can international patients receive a report in English?", answer: "Yes. Results can be explained with the support of our English-speaking staff, and a summary report can be provided upon request." },
    ],
  },
  {
    slug: "diet-weight-management",
    name: "Weight Management",
    summary: "A traditional Korean medicine weight-management program, systematically managed by Korean medicine doctors.",
    imageUrl: "/uploads/clinic-diet.jpg",
    order: 6,
    principleBlocks: [
      {
        title: "Key Focus Areas",
        body: "Key focus areas include personalized constitutional assessment, herbal medicine-based weight management, chronic condition prevention (high blood pressure, diabetes), musculoskeletal health support (back and knee pain), and lifestyle and dietary guidance.",
      },
      {
        title: "Our Approach",
        body: "Overweight and obesity are major causes of chronic conditions such as high blood pressure and diabetes, as well as musculoskeletal issues like back and knee pain. Phil Hospital of Korean Medicine treats obesity through a traditional Korean medicine weight-management program, systematically managed by Korean medicine doctors.",
      },
    ],
    processSteps: [],
    compareLeftTitle: "Korean Medicine Approach",
    compareRightTitle: "General Diet Programs",
    compareLeft: ["Tailored to each patient's constitution", "Combines herbal medicine and acupuncture", "Addresses underlying metabolic patterns"],
    compareRight: ["Often based on standardized meal plans", "May not address individual constitution", "Typically limited to diet and exercise"],
    faq: [
      { question: "Are the herbal formulas safe for long-term use?", answer: "Each formula is prescribed and monitored by a Korean medicine doctor based on your individual constitution and health status, with regular follow-up visits to track your progress and adjust the plan as needed. Please share your full health history and any current medications during your consultation so your program can be safely tailored to you." },
      { question: "How much weight can I expect to lose, and how long does the program take?", answer: "Results vary by individual constitution, health status, and lifestyle. Your practitioner will discuss a realistic goal and timeline based on your assessment at your first visit." },
      { question: "Can I continue the herbal program after I return to my home country?", answer: "In many cases, herbal formulas can be prepared for you to take with you, with follow-up guidance provided remotely where possible. Please check with our staff about packaging and any customs considerations for your home country." },
    ],
  },
];

const REMOVED_CLINIC_SLUGS = ["stroke-aftereffects"];

const doctors = [
  {
    name: "Dr. Kim Su-min",
    title: "Director — Korean Medicine Internal Medicine Specialist",
    bio: "Areas of Practice: Spinal disc herniation, degenerative spinal disease, degenerative joint disease, post-stroke sequelae, facial palsy, cardiovascular disease, blood pressure abnormalities, headache, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of cancer treatment, cancer immunity management, aftereffects of traffic accidents, shingles",
    photoUrl: "/uploads/doctor-kim-su-min.png",
    order: 1,
  },
  {
    name: "Dr. Kim Jae-hak",
    title: "Director — Korean Medicine Internal Medicine Specialist",
    bio: "Areas of Practice: Spinal disc herniation, degenerative spinal disease, degenerative joint disease, post-stroke sequelae, Parkinson's disease, headache, dizziness, facial palsy, cardiovascular disease, blood pressure abnormalities, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of traffic accidents, shingles, aftereffects of cancer treatment, cancer immunity management",
    photoUrl: "/uploads/doctor-kim-jae-hak.png",
    order: 2,
  },
  {
    name: "Dr. Hong Jeong-su",
    title: "Director — Korean Medicine Internal Medicine Specialist",
    bio: "Areas of Practice: Spinal disc herniation, degenerative spinal disease, degenerative joint disease, post-stroke sequelae, Parkinson's disease, headache, dizziness, facial palsy, cardiovascular disease, blood pressure abnormalities, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of traffic accidents, shingles, aftereffects of cancer treatment, cancer immunity management",
    photoUrl: "/uploads/doctor-hong-jung-soo.png",
    order: 3,
  },
  {
    name: "Dr. Jang Hyun-jin",
    title: "Director — Acupuncture & Moxibustion Medicine Specialist",
    bio: "Areas of Practice: Spinal disc herniation, degenerative spinal disease, degenerative joint disease, aftereffects of spinal surgery, temporomandibular joint (TMJ) disorders, sports injuries, acute and chronic sprains, aftereffects of traffic accidents, tonic herbal medicine, obesity",
    photoUrl: "/uploads/doctor-jang-hyun-jin.png",
    order: 4,
  },
  {
    name: "Dr. Heo Yu-jin",
    title: "Director — Acupuncture & Moxibustion Medicine Specialist",
    bio: "Areas of Practice: Spinal disc herniation, degenerative spinal disease, degenerative joint disease, aftereffects of spinal surgery, temporomandibular joint (TMJ) disorders, sports injuries, acute and chronic sprains, aftereffects of traffic accidents, tonic herbal medicine, obesity",
    photoUrl: "/uploads/doctor-heo-you-jin.png",
    order: 5,
  },
  {
    name: "Dr. Lee Eon",
    title: "Director — Neurosurgery Specialist",
    bio: "Areas of Practice: Lumbar disc herniation, spinal stenosis, spinal compression fracture, spinal disorders, degenerative spinal disease, piriformis syndrome, cervical disc herniation, forward head posture (text neck syndrome), stroke and cerebrovascular disease, dementia and cognitive impairment, Parkinson's disease and movement disorders, headache and dizziness, sleep disorders, peripheral nerve and muscle disorders",
    photoUrl: "/uploads/doctor-lee-eon.jpg",
    order: 6,
  },
  {
    name: "Dr. Shim Jeong-im",
    title: "Director — Family Medicine",
    bio: "Areas of Practice: Diagnosis and treatment of musculoskeletal disorders, traffic accident care",
    photoUrl: "/uploads/doctor-shim-jeong-im.png",
    order: 7,
  },
  {
    name: "Dr. Moon Seok-jun",
    title: "Resident — Doctor of Korean Medicine",
    bio: "Areas of Practice: Spinal disc herniation, degenerative joint disease, aftereffects of traffic accidents, joint sprains, obesity",
    photoUrl: "/uploads/doctor-mun-seok-jun.png",
    order: 8,
  },
  {
    name: "Dr. Go Da-won",
    title: "Resident — Doctor of Korean Medicine",
    bio: "Areas of Practice: Spinal disc herniation, degenerative joint disease, aftereffects of traffic accidents, joint sprains, obesity",
    photoUrl: "/uploads/doctor-ko-da-won.png",
    order: 9,
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  for (const hero of heroes) {
    const data = { slug: hero.slug, title: hero.title, subtitle: hero.subtitle, imageUrls: JSON.stringify(hero.imageUrls) };
    await prisma.pageHero.upsert({
      where: { slug: hero.slug },
      update: data,
      create: data,
    });
  }

  const homeContentData = {
    introEyebrow: "Introduction",
    introTitle: "An Integrated Korean and Western Medicine Treatment System",
    introBody:
      "Phil Hospital of Korean Medicine offers an integrated treatment system that combines the strengths of Korean medicine and Western medicine. From spinal, joint, and pain conditions to cancer management, stress through EEG tests, sleep disorders, and mild cognitive impairment, we provide Korean medicine treatment.",
    introImageUrl: "/uploads/intro-building.jpg",
    highlights: JSON.stringify([
      {
        title: "Medical Staff Fluent in English and Japanese",
        body: "Medical staff who can speak English and Japanese will treat patients directly.",
      },
      {
        title: "Korean Medicine–Western Medicine Collaborative System",
        body: "Through collaboration between Korean medicine doctors and medical doctors, we have built the most effective treatment system for each condition.",
      },
      {
        title: "Advancing the Science of Korean Medicine",
        body: "In collaboration with Kyung Hee University's department of herbal pharmacology, Phil Hospital of Korean Medicine is conducting clinical research on medicinal herbs, the basis of Korean medicine.",
      },
      {
        title: "Korean Medicine at the Center of the Korean Wave (Hallyu)",
        body: "By treating sports stars competing in Major League Baseball and on the LPGA and PGA Tours, Phil Hospital of Korean Medicine aims to be another pioneer of Hallyu in the field of Korean medicine.",
      },
    ]),
    ctaTitle: "Ready to Learn More?",
    ctaBody: "Reach out to our team with any questions about our treatments and services.",
  };
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: homeContentData,
    create: { id: 1, ...homeContentData },
  });

  const aboutContentData = {
    title: "An Integrated Korean and Western Medicine Treatment System",
    body: "Phil Hospital of Korean Medicine offers an integrated treatment system that combines the strengths of Korean medicine and Western medicine. From spinal, joint, and pain conditions to cancer management, stress through EEG tests, sleep disorders, and mild cognitive impairment, we provide Korean medicine treatment.",
    imageUrl: "/uploads/intro-building.jpg",
    highlights: JSON.stringify([
      {
        title: "Medical Staff Fluent in English and Japanese",
        body: "Medical staff who can speak English and Japanese will treat patients directly.",
      },
      {
        title: "Korean Medicine–Western Medicine Collaborative System",
        body: "Through collaboration between Korean medicine doctors and medical doctors, we have built the most effective treatment system for each condition.",
      },
    ]),
    missionTitle: "Our Mission",
    missionSubtitle: "Phil Hospital of Korean Medicine — A Global Standard",
    missionBlocks: JSON.stringify([
      {
        title: "Advancing the Science of Korean Medicine",
        body: "In collaboration with Kyung Hee University's department of herbal pharmacology, Phil Hospital of Korean Medicine is conducting clinical research on medicinal herbs, the basis of Korean medicine, in order to scientifically prove and standardize Korean medicine.",
      },
      {
        title: "Popularization of Korean Medicine",
        body: "By following the care standards for Korean National Health Insurance and private indemnity health insurance, Phil Hospital of Korean Medicine strives to minimize patients' economic burdens.",
      },
      {
        title: "Globalization of Korean Medicine",
        body: "By treating sports stars competing in Major League Baseball and on the LPGA and PGA Tours, Phil Hospital of Korean Medicine aims to be another pioneer of Hallyu in the field of Korean medicine.",
      },
    ]),
    systemTitle: "Our System",
    systemSubtitle: "A 365-Day Clinic System — Open Weekends and Holidays",
    systemIntro: "With clinic doors always open, we support patients' return to daily life.",
    systemBlocks: JSON.stringify([
      {
        title: "365 Days of Care",
        body: "Our year-round clinic operates 365 days a year, without closure. Outpatient care and inpatient admission are available on weekends and public holidays, with regular treatment hours maintained according to each day's schedule (holidays included).",
      },
      {
        title: "Weekday Night Clinic until 8 PM",
        body: "To accommodate patients who need to visit after work, we operate a night clinic until 8:00 PM.",
      },
    ]),
  };
  await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: aboutContentData,
    create: { id: 1, ...aboutContentData },
  });

  const greetingContentData = {
    title: "Message From the Director",
    body: "Korean medicine is a curative form of medicine. Korean medicine has proven its effectiveness over the years through extensive clinical experience and historical medical literature. Phil Hospital of Korean Medicine offers an integrated treatment system that combines the strengths of Korean medicine and Western medicine. From spinal, joint, and pain conditions to cancer management, stress through EEG tests, sleep disorders, and mild cognitive impairment, we provide Korean medicine treatment. Patients will receive comfortable care from our English- and Japanese-speaking medical staff! Phil Hospital of Korean Medicine will help “fill” your heart with happiness and help you “feel” at home as you share your thoughts on health care. Thank you.",
    imageUrl: "/uploads/director.jpg",
    directorName: "Dr. Yoon Je-pil",
    directorTitle: "Hospital Director — Ph.D. in Korean Medicine, Board-Certified Specialist in Korean Rehabilitation Medicine",
  };
  await prisma.greetingContent.upsert({
    where: { id: 1 },
    update: greetingContentData,
    create: { id: 1, ...greetingContentData },
  });

  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      address: "[DRAFT — please provide street address]",
      phone: "[DRAFT — please provide phone number]",
      email: "[DRAFT — please provide contact email]",
      hoursText: "Mon–Fri: 9:00 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM\nSun & Holidays: Closed [DRAFT]",
      mapEmbedUrl: "",
      inquiryToEmail: adminEmail,
    },
  });

  await prisma.treatment.deleteMany({ where: { slug: { in: REMOVED_TREATMENT_SLUGS } } });
  for (const treatment of treatments) {
    const data = {
      name: treatment.name,
      summary: treatment.summary,
      imageUrl: treatment.imageUrl,
      order: treatment.order,
      principleBlocks: JSON.stringify(treatment.principleBlocks),
      processSteps: JSON.stringify(treatment.processSteps),
      compareLeftTitle: treatment.compareLeftTitle,
      compareRightTitle: treatment.compareRightTitle,
      compareLeft: JSON.stringify(treatment.compareLeft),
      compareRight: JSON.stringify(treatment.compareRight),
      faq: JSON.stringify(treatment.faq),
    };
    await prisma.treatment.upsert({
      where: { slug: treatment.slug },
      update: data,
      create: { slug: treatment.slug, ...data },
    });
  }

  await prisma.clinic.deleteMany({ where: { slug: { in: REMOVED_CLINIC_SLUGS } } });
  for (const clinic of clinics) {
    const data = {
      name: clinic.name,
      summary: clinic.summary,
      imageUrl: clinic.imageUrl,
      order: clinic.order,
      principleBlocks: JSON.stringify(clinic.principleBlocks),
      processSteps: JSON.stringify(clinic.processSteps),
      compareLeftTitle: clinic.compareLeftTitle,
      compareRightTitle: clinic.compareRightTitle,
      compareLeft: JSON.stringify(clinic.compareLeft),
      compareRight: JSON.stringify(clinic.compareRight),
      faq: JSON.stringify(clinic.faq),
    };
    await prisma.clinic.upsert({
      where: { slug: clinic.slug },
      update: data,
      create: { slug: clinic.slug, ...data },
    });
  }

  // Full replace: the medical staff roster is now the hospital's actual doctors,
  // not placeholders, so stale placeholder rows are cleared first.
  await prisma.doctor.deleteMany({});
  await prisma.doctor.createMany({ data: doctors });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
