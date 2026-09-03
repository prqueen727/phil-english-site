import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Doctors 2-10 (order field) follow Director Yoon Je-pil (order 1, set in
// apply-real-content.ts). Photos live in /public/uploads/doctor-*.
async function main() {
  const rows = await prisma.doctor.findMany({ orderBy: { order: "asc" } });

  const updates = [
    {
      order: 2,
      name: "Dr. Kim Su-min",
      photoUrl: "/uploads/doctor-kim-su-min.png",
      title: "Director — Korean Medicine Internal Medicine Specialist",
      bio: "Areas of Practice: Spinal disc herniation, degenerative spine, degenerative joint disease, post-stroke sequelae, facial palsy, cardiovascular disease, blood pressure abnormalities, headache, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of cancer treatment, cancer immunity management, aftereffects of traffic accidents, shingles",
    },
    {
      order: 3,
      name: "Dr. Kim Jae-hak",
      photoUrl: "/uploads/doctor-kim-jae-hak.png",
      title: "Director — Korean Medicine Internal Medicine Specialist",
      bio: "Areas of Practice: Spinal disc herniation, degenerative spine, degenerative joint disease, post-stroke sequelae, Parkinson's disease, headache, dizziness, facial palsy, cardiovascular disease, blood pressure abnormalities, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of traffic accidents, shingles, aftereffects of cancer treatment, cancer immunity management",
    },
    {
      order: 4,
      name: "Dr. Hong Jeong-su",
      photoUrl: "/uploads/doctor-hong-jung-soo.png",
      title: "Director — Korean Medicine Internal Medicine Specialist",
      bio: "Areas of Practice: Spinal disc herniation, degenerative spine, degenerative joint disease, post-stroke sequelae, Parkinson's disease, headache, dizziness, facial palsy, cardiovascular disease, blood pressure abnormalities, digestive disorders (loss of appetite, indigestion, reflux esophagitis, irritable bowel syndrome), chronic fatigue, sports injuries, aftereffects of traffic accidents, shingles, aftereffects of cancer treatment, cancer immunity management",
    },
    {
      order: 5,
      name: "Dr. Jang Hyun-jin",
      photoUrl: "/uploads/doctor-jang-hyun-jin.png",
      title: "Director — Acupuncture & Moxibustion Medicine Specialist",
      bio: "Areas of Practice: Spinal disc herniation, degenerative spine, degenerative joint disease, aftereffects of spinal surgery, jaw joint (TMJ) disorders, sports injuries, acute/chronic sprains, aftereffects of traffic accidents, tonic herbal medicine, obesity",
    },
    {
      order: 6,
      name: "Dr. Heo Yu-jin",
      photoUrl: "/uploads/doctor-heo-you-jin.png",
      title: "Director — Acupuncture & Moxibustion Medicine Specialist",
      bio: "Areas of Practice: Spinal disc herniation, degenerative spine, degenerative joint disease, aftereffects of spinal surgery, jaw joint (TMJ) disorders, sports injuries, acute/chronic sprains, aftereffects of traffic accidents, tonic herbal medicine, obesity",
    },
    {
      order: 7,
      name: "Dr. Lee Eon",
      photoUrl: "/uploads/doctor-lee-eon.jpg",
      title: "Director — Neurosurgery Specialist",
      bio: "Areas of Practice: Lumbar disc herniation, spinal stenosis, spinal compression fracture, spinal disorders, degenerative spinal disease, piriformis syndrome, cervical disc herniation, forward head posture (text neck syndrome), stroke and cerebrovascular disease, dementia and cognitive impairment, Parkinson's disease and movement disorders, headache and dizziness, sleep disorders, peripheral nerve and muscle disorders",
    },
    {
      order: 8,
      name: "Dr. Shim Jeong-im",
      photoUrl: "/uploads/doctor-shim-jeong-im.png",
      title: "Director — Family Medicine",
      bio: "Areas of Practice: Diagnosis and treatment of musculoskeletal disorders, traffic accident care",
    },
    {
      order: 9,
      name: "Dr. Moon Seok-jun",
      photoUrl: "/uploads/doctor-mun-seok-jun.png",
      title: "Intern — Doctor of Korean Medicine",
      bio: "Areas of Practice: Spinal disc herniation, degenerative joint disease, aftereffects of traffic accidents, joint sprains, obesity",
    },
    {
      order: 10,
      name: "Dr. Go Da-won",
      photoUrl: "/uploads/doctor-ko-da-won.png",
      title: "Intern — Doctor of Korean Medicine",
      bio: "Areas of Practice: Spinal disc herniation, degenerative joint disease, aftereffects of traffic accidents, joint sprains, obesity",
    },
  ];

  for (const u of updates) {
    const row = rows.find((r) => r.order === u.order);
    if (!row) {
      console.log("MISSING order", u.order);
      continue;
    }
    await prisma.doctor.update({
      where: { id: row.id },
      data: { name: u.name, title: u.title, bio: u.bio, photoUrl: u.photoUrl },
    });
  }

  console.log("Doctor photos and profiles applied.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
