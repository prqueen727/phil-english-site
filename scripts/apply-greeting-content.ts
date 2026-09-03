import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.greetingContent.update({
    where: { id: 1 },
    data: {
      title: "Message From the Director",
      body: [
        "Korean medicine is curing medicine.",
        "Korean medicine has proven its effectiveness over the years through numerous clinical experiences and references of its ancestors.",
        "Phil Hospital of Korean Medicine introduces an integrated treatment system of oriental medicine to provide treatment that utilizes both the strengths of oriental medicine and medicine. From spinal, joint, and pain diseases to cancer management, stress through EEG tests, sleep disorders, and mild cognitive impairment, oriental medicine medical treatment is being performed.",
        'Medical staff who can speak English and Japanese will receive comfortable treatment! Phil Oriental Medicine Hospital will help you "fill" the hearts of foreign patients with happiness, "feel" as if you are at home and share your thoughts on health care.',
        "Thank you.",
      ].join("\n\n"),
      imageUrl: "/uploads/director.jpg",
      directorName: "Dr. Yoon Je-pil",
      directorTitle: "Hospital Director, Phil Hospital of Korean Medicine",
    },
  });

  // Use the same clean studio portrait for the doctor listing (the homepage
  // hero keeps the TV-appearance photo for the media-credibility slide).
  const director = await prisma.doctor.findFirst({ where: { order: 1 } });
  if (director) {
    await prisma.doctor.update({ where: { id: director.id }, data: { photoUrl: "/uploads/director.jpg" } });
  }

  console.log("Greeting content applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
