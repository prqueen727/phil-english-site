import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- Site branding (logo) ---
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { logoUrl: "/uploads/logo.png" },
    create: { id: 1, logoUrl: "/uploads/logo.png" },
  });

  // --- Home hero: 3-slide carousel, each with its own headline/copy ---
  await prisma.pageHero.update({
    where: { slug: "home" },
    data: {
      title: "Global Standard Korean–Western Medicine Collaborative Treatment System",
      subtitle:
        "Phil Hospital of Korean Medicine operates a Korean medicine–Western medicine collaborative treatment system that sets the standard for the scientific advancement and globalization of Korean medicine.",
      imageUrls: JSON.stringify([
        "/uploads/hero-home-1.jpg",
        "/uploads/hero-home-2.jpg",
        "/uploads/hero-home-3.jpg",
      ]),
      slides: JSON.stringify([
        {
          title: "Global Standard Korean–Western Medicine Collaborative Treatment System",
          subtitle:
            "Phil Hospital of Korean Medicine operates a Korean medicine–Western medicine collaborative treatment system that sets the standard for the scientific advancement and globalization of Korean medicine.",
        },
        {
          title: "Dr. Yoon Je-pil, Hospital Director",
          subtitle:
            "Ph.D. in Korean Medicine. Board-Certified Specialist in Korean Rehabilitation Medicine. Having appeared on numerous health programs hundreds of times, he has worked to deliver accurate information about Korean medicine and to promote greater public understanding of it.",
        },
        {
          title: "The Center for Non-Surgical Spine and Joint Treatment",
          subtitle:
            "With a cumulative total of 394,363 patients treated, we treat spinal and joint conditions without surgery.",
        },
      ]),
    },
  });

  // Doctors page hero: swap in the real team photo, keep existing title/subtitle.
  await prisma.pageHero.update({
    where: { slug: "doctors" },
    data: { imageUrls: JSON.stringify(["/uploads/doctors-team.jpg"]) },
  });

  // --- Home page content ---
  await prisma.homeContent.update({
    where: { id: 1 },
    data: {
      introEyebrow: "Introduction",
      introTitle: "An Integrated Korean and Western Medicine Treatment System",
      introBody:
        "Phil Hospital of Korean Medicine introduces an integrated treatment system of oriental medicine to provide treatment that utilizes both the strengths of oriental medicine and medicine. From spinal, joint, and pain diseases to cancer management, stress through EEG tests, sleep disorders, and mild cognitive impairment, oriental medicine medical treatment is being performed.",
      introImageUrl: "/uploads/intro-building.jpg",
      highlights: JSON.stringify([
        {
          title: "Medical Staff Fluent in English and Japanese",
          body: "Medical staff who can speak English and Japanese will treat patients directly.",
        },
        {
          title: "Korean Medicine–Western Medicine Collaborative System",
          body: "Through the joint care of Korean medicine doctors and medical doctors, we have built the most effective treatment system for each condition.",
        },
        {
          title: "Advancing the Science of Korean Medicine",
          body: "In collaboration with a university's department of herbal pharmacology, Phil Hospital of Korean Medicine is conducting clinical research on medicinal herbs, the basis of Korean medicine.",
        },
        {
          title: "Korean Medicine at the Center of the Korean Wave (Hallyu)",
          body: "Through providing treatments for sports stars competing in the Major Leagues, LPGA, and PGA, Phil Hospital of Korean Medicine aims to be another pioneer for Hallyu in the field of Korean medicine.",
        },
      ]),
    },
  });

  // --- Contact info ---
  await prisma.contactInfo.update({
    where: { id: 1 },
    data: {
      address: "128, Cheongsa-ro, Seo-gu, Daejeon (Wolpyeong-dong 282-3), Calix Building, 3F, 4F, 11F",
      phone: "042-336-1000",
      hoursText:
        "Open 365 Days a Year\nWeekdays (night clinic available): AM 9:00 – PM 20:00\nWeekends: AM 9:00 – PM 18:00",
      directionsText:
        "In navigation apps, search '필한방병원 (Phil Hospital of Korean Medicine)' or '대전 서구 월평동 282-3 (Wolpyeong-dong 282-3, Seo-gu, Daejeon)'.\n" +
        "By Subway (Line 1): Government Complex Daejeon Station — Exit 3, about a 6-minute straight walk.\n" +
        "By Subway (Line 1): Galma Station — Exit 4, about an 8-minute straight walk.",
    },
  });

  // --- Treatments ---
  // Real service lineup is 5 items; "Cupping Therapy" isn't part of it, so remove the placeholder.
  await prisma.treatment.deleteMany({ where: { slug: "cupping-therapy" } });

  await prisma.treatment.update({
    where: { slug: "acupuncture" },
    data: {
      summary:
        "Fine needles are inserted into specific points on the body to relieve pain, reduce inflammation, and restore the balance of nerve and muscle function.",
      imageUrl: "/uploads/acupuncture.jpg",
      order: 1,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "Acupuncture involves inserting fine needles into specific points on the body to relieve pain, reduce inflammation, and restore the balance of nerve and muscle function. It improves blood circulation and stimulates the body's natural healing response, helping to speed recovery.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "chuna-manual-therapy" },
    data: {
      name: "Chuna Manual Therapy",
      summary:
        "A hands-on treatment to recover muscles and tendons and relieve pain, adjusted to each patient's symptoms to minimize bodily strain.",
      imageUrl: "/uploads/chuna.jpg",
      order: 2,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "A treatment to recover muscles and tendons, and to relieve pain. The therapy is adjusted based on each patient's symptoms to minimize bodily strain.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "herbal-medicine" },
    data: {
      summary:
        "A treatment that soothes nerve inflammation and edema to reduce pain, and delays the degenerative process to prevent symptoms from worsening.",
      imageUrl: "/uploads/herbal-medicine.jpg",
      order: 3,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "A treatment that can reduce pain by soothing the nerves' inflammation and edema. It also delays the degenerative process to prevent the symptoms from becoming worse.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "pharmacopuncture" },
    data: {
      name: "Herbal Acupuncture",
      summary:
        "Refined, extracted herbal medicine is injected directly into the painful area — effective in small doses and quick-acting, and an option for patients who cannot take herbal medicine due to indigestion.",
      imageUrl: "/uploads/herbal-acupuncture.jpg",
      order: 4,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "A treatment in which refined, extracted herbal medicine is directly injected into the painful area. Medicinal acupuncture takes quick effect even with small dosages. It is also helpful for patients who cannot take herbal medicine due to indigestion.",
        },
      ]),
    },
  });

  await prisma.treatment.update({
    where: { slug: "traction-therapy" },
    data: {
      name: "Extension Therapy",
      summary:
        "Suspension devices pull and relax the spinal joints at a regular intensity and pressure, alleviating pressure on spinal discs — effective for spinal disc disorders or stenosis.",
      order: 5,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "The pressure on spinal discs is alleviated by using suspension devices that pull and relax the spinal joints at a regular intensity and pressure. The treatment is effective for spinal disc disorders or stenosis.",
        },
      ]),
    },
  });

  // --- Clinics ("Major Clinic" lineup) ---
  await prisma.clinic.update({
    where: { slug: "non-surgical-spine-joint-treatment" },
    data: {
      summary:
        "Non-surgical Korean medical treatments for lumbar disc, cervical disc, jaw joint disorders, frozen shoulder, and sports injuries — improving the root cause of pain and restoring muscle strength and function.",
      imageUrl: "/uploads/clinic-spine-joint.jpg",
      order: 1,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "Through non-surgical Korean medical treatments such as for lumbar disc, cervical disc, jaw joint disorders, frozen shoulder, and sports injuries, this treatment improves the root cause of pain and helps restore muscle strength and function so patients can return to daily life.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "traffic-accident-aftereffects" },
    data: {
      summary:
        "Neck and back pain, headaches, dizziness, muscle damage, and other aftereffects of a traffic accident are systematically treated according to each patient's individual symptoms.",
      imageUrl: "/uploads/clinic-traffic-accident.jpg",
      order: 2,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "Various aftereffects such as neck and back pain, headaches, dizziness, and muscle damage that occur after a traffic accident are systematically treated according to each patient's individual symptoms.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "post-surgical-rehabilitation" },
    data: {
      summary:
        "A customized Korean medicine–Western medicine rehabilitation program relieves pain and restores joint and muscle strength after spinal and joint surgery, supporting a rapid return to daily life.",
      order: 3,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "To relieve pain and restore joint and muscle strength after spinal and joint surgery, we operate a customized rehabilitation program based on Korean medicine–Western medicine cooperation to support a rapid return to daily life.",
        },
      ]),
    },
  });

  await prisma.clinic.update({
    where: { slug: "integrative-cancer-immunity-center" },
    data: {
      name: "Anti-Cancer Immunotherapy",
      summary:
        "An integrated immunity-management program helps restore immunity and physical strength weakened during cancer treatment.",
      order: 4,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "We operate an integrated immunity-management program to help restore immunity and physical strength that have been weakened during cancer treatment.",
        },
      ]),
    },
  });

  // Repurpose the old "stroke-aftereffects" row as the real "Brain Health Center" clinic.
  await prisma.clinic.update({
    where: { slug: "stroke-aftereffects" },
    data: {
      slug: "brain-health-center",
      name: "Brain Health Center",
      summary:
        "Using an EEG-based NEUROMATCH system with more than 18 channels, we precisely analyze brain function and systematically evaluate sleep, cognition, and autonomic nervous system conditions.",
      imageUrl: "/uploads/clinic-brain-health.jpg",
      order: 5,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "Using an EEG-based NEUROMATCH system with more than 18 channels, we precisely analyze brain function and systematically evaluate sleep, cognition, and autonomic nervous system conditions to provide personalized treatment and management programs.",
        },
      ]),
      processSteps: "[]",
      compareLeftTitle: "",
      compareRightTitle: "",
      compareLeft: "[]",
      compareRight: "[]",
      faq: "[]",
    },
  });

  await prisma.clinic.update({
    where: { slug: "diet-weight-management" },
    data: {
      name: "Diet",
      summary:
        "A traditional Korean medicine diet program, systematically managed by Korean medicine doctors, treats overweight and obesity — major causes of chronic conditions such as high blood pressure, diabetes, and musculoskeletal issues.",
      imageUrl: "/uploads/clinic-diet.jpg",
      order: 6,
      principleBlocks: JSON.stringify([
        {
          title: "Our Approach",
          body: "Overweight and obesity are major causes of chronic conditions such as high blood pressure and diabetes, as well as musculoskeletal issues like back and knee pain. Phil Hospital of Korean Medicine treats obesity through a traditional Korean medicine diet program, systematically managed by Korean medicine doctors.",
        },
      ]),
    },
  });

  // --- Director bio (Hero Section 2 subject) reflected on the Doctors page + Greeting page ---
  const director = await prisma.doctor.findFirst({ where: { order: 1 } });
  if (director) {
    await prisma.doctor.update({
      where: { id: director.id },
      data: {
        name: "Dr. Yoon Je-pil",
        title: "Hospital Director — Ph.D. in Korean Medicine, Board-Certified Specialist in Korean Rehabilitation Medicine",
        bio: "Having appeared on numerous health programs hundreds of times, he has worked to deliver accurate information about Korean medicine and to promote greater public understanding of it.",
        photoUrl: "/uploads/hero-home-2.jpg",
      },
    });
  }

  await prisma.greetingContent.update({
    where: { id: 1 },
    data: {
      directorName: "Dr. Yoon Je-pil",
      directorTitle: "Hospital Director — Ph.D. in Korean Medicine, Board-Certified Specialist in Korean Rehabilitation Medicine",
      imageUrl: "/uploads/hero-home-2.jpg",
    },
  });

  console.log("Real content applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
