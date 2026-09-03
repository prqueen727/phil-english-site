import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Care Process and How It Compares are not wanted on any clinic page —
// clear the underlying data so the template's conditional sections don't render.
async function main() {
  const slugs = [
    "non-surgical-spine-joint-treatment",
    "traffic-accident-aftereffects",
    "post-surgical-rehabilitation",
    "integrative-cancer-immunity-center",
    "brain-health-center",
    "diet-weight-management",
  ];

  for (const slug of slugs) {
    await prisma.clinic.update({
      where: { slug },
      data: {
        processSteps: "[]",
        compareLeftTitle: "",
        compareRightTitle: "",
        compareLeft: "[]",
        compareRight: "[]",
      },
    });
  }

  console.log("Cleared Care Process and How It Compares for all clinics.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
