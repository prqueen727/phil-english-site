import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.aboutContent.update({
    where: { id: 1 },
    data: {
      title: "Global Standard Korean–Western Medicine Collaborative Care, Phil Hospital of Korean Medicine",
      body: "Phil Hospital of Korean Medicine is built on a Korean medicine–Western medicine collaborative care system that combines the strengths of both, helping patients recover and improve their quality of life through personalized, non-surgical treatment.",
      imageUrl: "/uploads/intro-building.jpg",
      highlights: JSON.stringify([
        {
          title: "Korean–Western Medicine Collaboration",
          body: "Accurate diagnosis and integrated treatment through the collaboration of Korean medicine specialists and Western medicine doctors.",
        },
        {
          title: "Patient-Centered Care",
          body: "Personalized care tailored to each patient's condition, built on carefully listening to their concerns.",
        },
        {
          title: "Non-Surgical Treatment",
          body: "A fundamental approach that identifies the root cause of pain without surgery and enhances the body's natural healing ability.",
        },
        {
          title: "Systematic Recovery Management",
          body: "An integrated system covering everything from inpatient treatment to rehabilitation and follow-up care.",
        },
      ]),
      missionTitle: "Our Mission",
      missionSubtitle: "Global Standard Phil Hospital of Korean Medicine",
      missionBlocks: JSON.stringify([
        {
          title: "Scientification of Korean Medicine",
          body: "With Kyung Hee University's department of herbal pharmacology, Phil Hospital of Korean Medicine is conducting clinical research on medicinal herbs, the basis of Korean medicine, in order to scientifically prove and standardize Korean medicine.",
        },
        {
          title: "Popularization of Korean Medicine",
          body: "By following the care standards for national health insurance and non-covered health care expenses, Phil Hospital of Korean Medicine strives to minimize patients' economic burdens.",
        },
        {
          title: "Globalization of Korean Medicine",
          body: "Through providing treatments for sports stars competing in the Major Leagues, LPGA, and PGA, Phil Hospital of Korean Medicine aims to be another pioneer for Hallyu in the field of Korean medicine.",
        },
      ]),
      systemTitle: "Our System",
      systemSubtitle: "A 365-Day Clinic System — Open Weekends and Holidays",
      systemIntro: "With clinic doors always open, we support patients' return to daily life.",
      systemBlocks: JSON.stringify([
        {
          title: "365 Days of Care",
          body: "A year-round clinic system operating 365 days a year, without closure. Outpatient care and inpatient admission are available on weekends and public holidays, with regular treatment hours maintained according to each day's schedule (holidays included).",
        },
        {
          title: "Weekday Night Clinic until 8 PM",
          body: "For patients who find it difficult to visit during regular weekday hours after work, we operate a night clinic until 8:00 PM.",
        },
      ]),
    },
  });

  await prisma.pageHero.update({
    where: { slug: "about" },
    data: { imageUrls: JSON.stringify(["/uploads/about-hero.jpg"]) },
  });

  await prisma.greetingContent.update({
    where: { id: 1 },
    data: { imageUrl: "/uploads/greeting-content.jpg" },
  });

  console.log("About content applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
