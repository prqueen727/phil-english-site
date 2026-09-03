import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Extension Therapy was missing its image in the first pass — fix it.
  await prisma.treatment.update({
    where: { slug: "traction-therapy" },
    data: { imageUrl: "/uploads/extension-therapy.jpg" },
  });

  // New 6th treatment.
  await prisma.treatment.upsert({
    where: { slug: "electronic-moxibustion-therapy" },
    update: {},
    create: {
      slug: "electronic-moxibustion-therapy",
      name: "Electronic Moxibustion Therapy",
      summary:
        "Controlled, targeted heat is applied to acupuncture points using an electronic thermal device — a modern alternative to traditional moxibustion that improves circulation and eases muscle tension without direct flame.",
      imageUrl: "/uploads/electronic-moxibustion.jpg",
      order: 6,
      principleBlocks: JSON.stringify([
        {
          title: "How It Works",
          body: "[DRAFT — written as a general description of electronic moxibustion since no hospital-specific text was provided; please review] An electronic heating device delivers steady, controlled warmth to acupuncture points, similar in principle to traditional moxibustion but without smoke or direct flame. The heat is thought to improve local circulation and relax surrounding muscles.",
        },
      ]),
    },
  });

  // Clinic photos that arrived in a later batch.
  await prisma.clinic.update({
    where: { slug: "post-surgical-rehabilitation" },
    data: { imageUrl: "/uploads/clinic-rehab.jpg" },
  });
  await prisma.clinic.update({
    where: { slug: "integrative-cancer-immunity-center" },
    data: { imageUrl: "/uploads/clinic-cancer.jpg" },
  });

  console.log("Round 2 content applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
