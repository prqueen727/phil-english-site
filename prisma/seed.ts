import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const heroes = [
  {
    slug: "home",
    title: "Traditional Korean Medicine, Modern Care",
    subtitle:
      "Phil Korean Medicine Hospital blends time-tested Korean medicine with modern clinical standards to support your health and recovery.",
    imageUrls: [
      "/placeholders/hero-home.svg",
      "/placeholders/hero-home-2.svg",
      "/placeholders/hero-home-3.svg",
    ],
  },
  {
    slug: "about",
    title: "About Phil Korean Medicine Hospital",
    subtitle: "Our philosophy, our team, and our approach to care.",
    imageUrls: ["/placeholders/hero-about.svg"],
  },
  {
    slug: "greeting",
    title: "Director's Greeting",
    subtitle: "A welcome message from our medical director.",
    imageUrls: ["/placeholders/hero-about.svg"],
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
    imageUrls: ["/placeholders/hero-doctors.svg"],
  },
  {
    slug: "contact",
    title: "Contact Us",
    subtitle: "Send us a message and our team will get back to you.",
    imageUrls: ["/placeholders/hero-contact.svg"],
  },
];

const treatments = [
  {
    slug: "acupuncture",
    name: "Acupuncture",
    summary:
      "Fine needles are placed at specific points on the body to relieve pain and restore balance.",
    imageUrl: "/placeholders/acupuncture.svg",
    order: 1,
    principleBlocks: [
      {
        title: "Restoring the Flow of Qi",
        body: "In traditional Korean medicine, acupuncture is understood to stimulate specific points along the body's meridians, helping to restore the smooth flow of Qi (vital energy) and blood. [DRAFT — general Korean medicine background, please review and replace with your clinic's own description]",
      },
      {
        title: "Modern Clinical Perspective",
        body: "From a modern clinical standpoint, acupuncture needling is associated with local stimulation of nerves, muscles, and connective tissue, which may trigger the release of natural pain-relieving substances in the body. [DRAFT — please verify against current clinical guidance before publishing]",
      },
    ],
    processSteps: [
      { title: "Consultation", body: "Your practitioner reviews your health history and current symptoms to plan a treatment approach." },
      { title: "Point Selection", body: "Needle points are chosen based on your specific condition and treatment goals." },
      { title: "Treatment", body: "Sterile, single-use needles are inserted at the selected points and left in place for a set period." },
      { title: "Aftercare", body: "You receive guidance on rest, hydration, and any follow-up sessions." },
    ],
    compareLeftTitle: "Acupuncture",
    compareRightTitle: "Pharmacopuncture",
    compareLeft: ["Uses fine filiform needles only", "Targets meridian points broadly", "Long-standing traditional technique"],
    compareRight: ["Injects diluted herbal extract via needle", "Combines herbal and acupuncture effects", "Often used for more localized, concentrated action"],
    faq: [
      { question: "Is acupuncture painful?", answer: "Most patients feel only a light sensation at the insertion point. [DRAFT — confirm wording with your clinical team]" },
      { question: "How many sessions will I need?", answer: "This varies by condition; your practitioner will discuss a recommended plan during your consultation. [DRAFT]" },
    ],
  },
  {
    slug: "pharmacopuncture",
    name: "Pharmacopuncture",
    summary:
      "Purified herbal extracts are injected at acupuncture points, combining herbal medicine with acupuncture technique.",
    imageUrl: "/placeholders/pharmacopuncture.svg",
    order: 2,
    principleBlocks: [
      {
        title: "Combining Herbal and Acupuncture Effects",
        body: "Pharmacopuncture delivers a purified, concentrated herbal extract directly into acupuncture points, aiming to combine the meridian-based effects of acupuncture with the pharmacological action of herbal medicine in a single, targeted treatment. [DRAFT — general Korean medicine background, please review and replace with your clinic's own description]",
      },
    ],
    processSteps: [
      { title: "Consultation", body: "Your practitioner reviews your condition and determines whether pharmacopuncture is appropriate." },
      { title: "Extract Selection", body: "A specific herbal extract and injection points are chosen for your condition." },
      { title: "Injection", body: "The extract is injected in small amounts at the selected acupuncture points." },
      { title: "Aftercare", body: "You receive guidance on activity and any follow-up sessions." },
    ],
    compareLeftTitle: "Pharmacopuncture",
    compareRightTitle: "Herbal Medicine (Oral)",
    compareLeft: ["Delivered directly at acupuncture points", "Small, concentrated dose", "Often used for localized musculoskeletal pain"],
    compareRight: ["Taken orally over a course of time", "Addresses whole-body internal balance", "Formula adjusted over follow-up visits"],
    faq: [
      { question: "Is pharmacopuncture safe?", answer: "[DRAFT — please provide your clinic's sourcing, sterility, and safety information]" },
    ],
  },
  {
    slug: "chuna-manual-therapy",
    name: "Chuna Manual Therapy",
    summary:
      "A hands-on therapy that corrects posture and joint alignment.",
    imageUrl: "/placeholders/chuna.svg",
    order: 3,
    principleBlocks: [
      {
        title: "Correcting Alignment",
        body: "Chuna manual therapy uses hands-on manipulation to help correct misalignments in the spine and joints. [DRAFT — please review]",
      },
    ],
    processSteps: [
      { title: "Postural Assessment", body: "Your practitioner evaluates posture and joint alignment." },
      { title: "Manual Adjustment", body: "Targeted manipulation is applied to affected areas." },
      { title: "Home Guidance", body: "You receive advice on posture and exercises to support recovery." },
    ],
    compareLeftTitle: "Chuna Manual Therapy",
    compareRightTitle: "Traction Therapy",
    compareLeft: ["Hands-on joint manipulation", "Focus on structural alignment", "Often combined with other therapies"],
    compareRight: ["Mechanical, device-assisted stretching", "Focus on decompressing the spine", "Passive treatment"],
    faq: [
      { question: "Is Chuna therapy safe for everyone?", answer: "[DRAFT — please provide contraindications from your clinical team]" },
    ],
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    summary:
      "Suction cups are applied to the skin to promote circulation and relieve muscle tension.",
    imageUrl: "/placeholders/cupping.svg",
    order: 4,
    principleBlocks: [
      {
        title: "Improving Circulation",
        body: "Cupping creates localized suction on the skin, which is believed to draw blood flow to the area and help release muscle tension. [DRAFT — please review]",
      },
    ],
    processSteps: [
      { title: "Assessment", body: "Areas of tension are identified." },
      { title: "Cup Placement", body: "Cups are applied to targeted areas for a set duration." },
      { title: "Aftercare", body: "Guidance is provided on skin care following treatment." },
    ],
    compareLeftTitle: "Cupping Therapy",
    compareRightTitle: "Manual Therapy (Chuna)",
    compareLeft: ["Uses suction to relieve muscle tension", "Passive treatment", "May leave temporary marks"],
    compareRight: ["Uses hands-on manipulation", "Active joint and posture correction", "No skin marks"],
    faq: [
      { question: "Does cupping leave marks?", answer: "[DRAFT — please provide your clinic's own guidance]" },
    ],
  },
  {
    slug: "herbal-medicine",
    name: "Herbal Medicine",
    summary:
      "Customized herbal formulas support the body's natural healing processes.",
    imageUrl: "/placeholders/herbal.svg",
    order: 5,
    principleBlocks: [
      {
        title: "Personalized Formulas",
        body: "Herbal medicine in the Korean medicine tradition uses combinations of natural ingredients selected to match an individual's constitution and condition. [DRAFT — please review and replace with your clinic's own description]",
      },
    ],
    processSteps: [
      { title: "Diagnosis", body: "Your practitioner assesses your constitution and symptoms." },
      { title: "Formula Preparation", body: "A tailored herbal formula is prepared for your specific needs." },
      { title: "Follow-up", body: "Your response to the formula is monitored and adjusted over time." },
    ],
    compareLeftTitle: "Herbal Medicine",
    compareRightTitle: "Pharmacopuncture",
    compareLeft: ["Taken orally over a course of time", "Addresses internal balance", "Formula adjusted over follow-up visits"],
    compareRight: ["Injected directly at acupuncture points", "Concentrated, localized dose", "Often used alongside herbal medicine"],
    faq: [
      { question: "Are the herbs safe?", answer: "[DRAFT — please provide your clinic's sourcing and safety information]" },
    ],
  },
  {
    slug: "traction-therapy",
    name: "Traction Therapy",
    summary:
      "Gentle mechanical stretching relieves pressure on the spine and supports disc and nerve recovery.",
    imageUrl: "/placeholders/traction.svg",
    order: 6,
    principleBlocks: [
      {
        title: "Decompressing the Spine",
        body: "Traction therapy applies a controlled, gentle pulling force to the spine, aiming to create space between vertebrae, reduce pressure on discs and nerves, and ease muscle tension around the spine. [DRAFT — general background, please review and replace with your clinic's own description]",
      },
    ],
    processSteps: [
      { title: "Assessment", body: "Your practitioner evaluates your spinal condition and symptoms." },
      { title: "Setup", body: "You are positioned comfortably on the traction device." },
      { title: "Traction Session", body: "A controlled, gradual pulling force is applied for a set period." },
      { title: "Aftercare", body: "You receive guidance on posture and activity following treatment." },
    ],
    compareLeftTitle: "Traction Therapy",
    compareRightTitle: "Chuna Manual Therapy",
    compareLeft: ["Mechanical, device-assisted stretching", "Consistent, controlled force", "Passive treatment"],
    compareRight: ["Hands-on manipulation by a practitioner", "Targets specific joint misalignments", "Active, technique-based adjustment"],
    faq: [
      { question: "Is traction therapy safe for herniated discs?", answer: "[DRAFT — please provide guidance on suitable conditions and contraindications]" },
    ],
  },
];

const clinics = [
  {
    slug: "non-surgical-spine-joint-treatment",
    name: "Non-Surgical Spine & Joint Treatment",
    summary:
      "Korean medicine therapies for spine and joint conditions that aim to relieve pain without surgery.",
    imageUrl: "/placeholders/clinic-spine-joint.svg",
    order: 1,
    principleBlocks: [
      {
        title: "Addressing the Root Cause",
        body: "This clinic combines acupuncture, Chuna manual therapy, and herbal medicine to address spine and joint conditions such as disc problems, spinal stenosis, and joint pain, aiming to relieve pain and improve function without surgery. [DRAFT — please replace with your hospital's own clinical approach]",
      },
    ],
    processSteps: [
      { title: "Diagnostic Consultation", body: "Your practitioner reviews your symptoms, imaging (if available), and health history." },
      { title: "Treatment Plan", body: "A combined treatment plan is designed using acupuncture, manual therapy, and/or herbal medicine." },
      { title: "Ongoing Care", body: "Progress is monitored and the plan adjusted over a course of visits." },
    ],
    compareLeftTitle: "Non-Surgical Approach",
    compareRightTitle: "Surgical Approach",
    compareLeft: ["No incision or hospitalization required", "Gradual, cumulative improvement", "Lower procedural risk"],
    compareRight: ["May offer faster structural correction", "Requires recovery and hospitalization", "Reserved for severe or urgent cases"],
    faq: [
      { question: "Is this suitable for herniated discs?", answer: "[DRAFT — please provide guidance on suitable conditions and contraindications]" },
    ],
  },
  {
    slug: "post-surgical-rehabilitation",
    name: "Post-Surgical Rehabilitation",
    summary:
      "Recovery-focused Korean medicine care to support healing and restore function after surgery.",
    imageUrl: "/placeholders/clinic-rehab.svg",
    order: 2,
    principleBlocks: [
      {
        title: "Supporting Recovery",
        body: "After surgery, this clinic uses acupuncture, herbal medicine, and rehabilitative exercise guidance to help reduce post-operative discomfort, support tissue healing, and restore strength and range of motion. [DRAFT — please replace with your hospital's own clinical approach]",
      },
    ],
    processSteps: [
      { title: "Post-Op Assessment", body: "Your practitioner reviews your surgical history and current recovery status." },
      { title: "Recovery Plan", body: "A rehabilitation plan is designed alongside your surgical team's guidance." },
      { title: "Functional Recovery", body: "Sessions focus on restoring mobility, strength, and reducing scar-related discomfort." },
    ],
    compareLeftTitle: "Rehabilitation Focus",
    compareRightTitle: "Acute Surgical Care",
    compareLeft: ["Focuses on functional recovery", "Complements post-op instructions", "Longer-term, gradual process"],
    compareRight: ["Focuses on the surgical procedure itself", "Managed by the surgical team", "Immediate post-operative period"],
    faq: [
      { question: "When can I start after surgery?", answer: "[DRAFT — please provide guidance in coordination with referring surgeons]" },
    ],
  },
  {
    slug: "diet-weight-management",
    name: "Diet & Weight Management",
    summary:
      "A Korean medicine approach to weight management combining herbal medicine, acupuncture, and lifestyle guidance.",
    imageUrl: "/placeholders/clinic-diet.svg",
    order: 3,
    principleBlocks: [
      {
        title: "A Constitutional Approach",
        body: "This clinic evaluates each patient's constitution and metabolic pattern to design a personalized combination of herbal medicine, acupuncture, and dietary guidance intended to support healthy weight management. [DRAFT — please replace with your hospital's own clinical approach]",
      },
    ],
    processSteps: [
      { title: "Initial Assessment", body: "Your practitioner evaluates your constitution, health history, and goals." },
      { title: "Personalized Plan", body: "A herbal and lifestyle plan is created for your specific needs." },
      { title: "Follow-up & Adjustment", body: "Progress is reviewed regularly and the plan adjusted as needed." },
    ],
    compareLeftTitle: "Korean Medicine Approach",
    compareRightTitle: "General Diet Programs",
    compareLeft: ["Personalized to individual constitution", "Combines herbal medicine and acupuncture", "Addresses underlying metabolic patterns"],
    compareRight: ["Often standardized meal plans", "May not address individual constitution", "Typically diet/exercise only"],
    faq: [
      { question: "Are the herbal formulas safe for long-term use?", answer: "[DRAFT — please provide your clinic's sourcing and safety information]" },
    ],
  },
  {
    slug: "integrative-cancer-immunity-center",
    name: "Integrative Cancer & Immunity Center",
    summary:
      "Supportive Korean medicine care for cancer patients, used alongside conventional treatment to support immunity and quality of life.",
    imageUrl: "/placeholders/clinic-cancer.svg",
    order: 4,
    principleBlocks: [
      {
        title: "Supportive, Not Substitutive Care",
        body: "This center offers Korean medicine therapies such as herbal medicine and acupuncture as a complement to conventional cancer treatment, with the aim of supporting immune function, easing treatment side effects, and improving quality of life. [DRAFT — please replace with your hospital's own clinical approach and referral policy]",
      },
    ],
    processSteps: [
      { title: "Coordinated Consultation", body: "Your practitioner reviews your diagnosis and current treatment plan, ideally in coordination with your oncology team." },
      { title: "Supportive Care Plan", body: "A plan is designed to help manage side effects and support overall wellbeing." },
      { title: "Ongoing Monitoring", body: "Care is adjusted throughout your treatment course." },
    ],
    compareLeftTitle: "Integrative Supportive Care",
    compareRightTitle: "Conventional Treatment Alone",
    compareLeft: ["Aims to ease side effects and support wellbeing", "Used alongside oncology care", "Individualized herbal and acupuncture support"],
    compareRight: ["Directly targets the cancer itself", "Led by the oncology team", "Standard of care"],
    faq: [
      { question: "Can this replace my cancer treatment?", answer: "[DRAFT — please state clearly that this is supportive care only and does not replace conventional treatment]" },
    ],
  },
  {
    slug: "traffic-accident-aftereffects",
    name: "Traffic Accident Aftereffects",
    summary:
      "Korean medicine care for pain, stiffness, and other symptoms following a traffic accident.",
    imageUrl: "/placeholders/clinic-accident.svg",
    order: 5,
    principleBlocks: [
      {
        title: "Treating Whiplash and Soft-Tissue Injury",
        body: "This clinic addresses common after-effects of traffic accidents such as whiplash, muscle stiffness, and joint pain using acupuncture, Chuna manual therapy, and herbal medicine, even when imaging shows no structural damage. [DRAFT — please replace with your hospital's own clinical approach]",
      },
    ],
    processSteps: [
      { title: "Injury Assessment", body: "Your practitioner reviews the accident details and your current symptoms." },
      { title: "Treatment Plan", body: "A combined treatment plan is designed to relieve pain and restore mobility." },
      { title: "Recovery Monitoring", body: "Progress is tracked over a course of visits." },
    ],
    compareLeftTitle: "Korean Medicine Care",
    compareRightTitle: "Pain Medication Alone",
    compareLeft: ["Addresses muscle and joint function directly", "May reduce reliance on medication", "Individualized treatment plan"],
    compareRight: ["Manages pain symptoms only", "Does not address underlying tension", "Short-term relief"],
    faq: [
      { question: "Is this covered by auto insurance?", answer: "[DRAFT — please provide your hospital's insurance and documentation process]" },
    ],
  },
  {
    slug: "stroke-aftereffects",
    name: "Stroke Aftereffects",
    summary:
      "Rehabilitative Korean medicine care for patients recovering from stroke (jungpung) and its lasting effects.",
    imageUrl: "/placeholders/clinic-stroke.svg",
    order: 6,
    principleBlocks: [
      {
        title: "Supporting Neurological Recovery",
        body: "This clinic uses acupuncture, herbal medicine, and rehabilitative therapy to support patients recovering from stroke, aiming to improve motor function, speech, and overall quality of life during the recovery process. [DRAFT — please replace with your hospital's own clinical approach]",
      },
    ],
    processSteps: [
      { title: "Neurological Assessment", body: "Your practitioner evaluates your current function and recovery stage." },
      { title: "Rehabilitation Plan", body: "A combined acupuncture, herbal, and rehabilitative therapy plan is designed." },
      { title: "Progress Review", body: "Function is reassessed regularly and the plan adjusted." },
    ],
    compareLeftTitle: "Integrative Rehabilitation",
    compareRightTitle: "Standard Rehabilitation Alone",
    compareLeft: ["Combines acupuncture and herbal medicine with rehab", "Individualized to recovery stage", "Addresses both function and overall vitality"],
    compareRight: ["Physical/occupational therapy only", "Standardized protocols", "Focuses on motor function primarily"],
    faq: [
      { question: "How soon after a stroke can treatment begin?", answer: "[DRAFT — please provide guidance in coordination with the patient's medical team]" },
    ],
  },
];

const doctors = [
  {
    name: "Dr. [Name]",
    title: "Medical Director, Korean Medicine Doctor",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-1.svg",
    order: 1,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Spine & Joint Clinic",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-2.svg",
    order: 2,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Rehabilitation Clinic",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-3.svg",
    order: 3,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Diet & Weight Management Clinic",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-4.svg",
    order: 4,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Integrative Cancer & Immunity Center",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-5.svg",
    order: 5,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Traffic Accident Clinic",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-6.svg",
    order: 6,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Stroke Rehabilitation Clinic",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-7.svg",
    order: 7,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Acupuncture & Pharmacopuncture",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-8.svg",
    order: 8,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Herbal Medicine",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-9.svg",
    order: 9,
  },
  {
    name: "Dr. [Name]",
    title: "Korean Medicine Doctor — Chuna Manual Therapy",
    bio: "[DRAFT — please provide biography, education, and specialties]",
    photoUrl: "/placeholders/doctor-10.svg",
    order: 10,
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

  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      introEyebrow: "Welcome",
      introTitle: "Whole-Person Care, Rooted in Tradition",
      introBody:
        "[DRAFT — please replace with your hospital's own introduction. Describe your approach to care, your history, and what makes your hospital distinct.]",
      introImageUrl: "/placeholders/intro.svg",
      highlights: JSON.stringify([
        { title: "Experienced Practitioners", body: "[DRAFT — describe your team's experience]" },
        { title: "Personalized Treatment Plans", body: "[DRAFT — describe your approach to individualized care]" },
        { title: "Comfortable Facilities", body: "[DRAFT — describe your hospital environment]" },
      ]),
      ctaTitle: "Ready to Learn More?",
      ctaBody: "Reach out to our team with any questions about our treatments and services.",
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "About Phil Korean Medicine Hospital",
      body: "[DRAFT — please replace with your hospital's history, mission, and values.]",
      imageUrl: "/placeholders/about.svg",
      missionBlocks: JSON.stringify([
        { title: "Our Mission", body: "[DRAFT — please provide]" },
        { title: "Our Approach", body: "[DRAFT — please provide]" },
      ]),
    },
  });

  await prisma.greetingContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "A Message From Our Medical Director",
      body: "[DRAFT — please replace with your medical director's own greeting message. This typically introduces the director, their philosophy of care, and a welcome to prospective patients.]",
      imageUrl: "/placeholders/doctor-1.svg",
      directorName: "Dr. [Name]",
      directorTitle: "Medical Director",
    },
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

  for (const treatment of treatments) {
    await prisma.treatment.upsert({
      where: { slug: treatment.slug },
      update: {},
      create: {
        slug: treatment.slug,
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
      },
    });
  }

  for (const clinic of clinics) {
    await prisma.clinic.upsert({
      where: { slug: clinic.slug },
      update: {},
      create: {
        slug: clinic.slug,
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
      },
    });
  }

  for (const doctor of doctors) {
    const existing = await prisma.doctor.findFirst({ where: { name: doctor.name, title: doctor.title } });
    if (!existing) {
      await prisma.doctor.create({ data: doctor });
    }
  }

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
