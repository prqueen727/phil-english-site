import sharp from "sharp";
import path from "path";

const SRC_DIR = "C:\\Users\\saden\\Downloads\\image";
const OUT_DIR = path.join(process.cwd(), "public", "uploads");

// Re-crop with libvips' smart "attention" strategy (focuses on faces/salient
// detail) so the subject stays centered regardless of which aspect ratio a
// page then applies via CSS object-cover. [src, out, width, height, quality]
const attentionJobs = [
  ["hero image 1.jpg", "hero-home-1.jpg", 1920, 1080, 78],
  ["hero 2 image.png", "hero-home-2.jpg", 1920, 1080, 80],
  ["hero image 3.png", "hero-home-3.jpg", 1920, 1080, 80],
  ["director.png", "director.jpg", 1200, 900, 85],
  ["acupuncture.jpg", "acupuncture.jpg", 1200, 900, 82],
  ["chuna.jpg", "chuna.jpg", 1200, 900, 82],
  ["extention therapy.jpg", "extension-therapy.jpg", 1200, 900, 82],
  ["herbal acupuncture.jpg", "herbal-acupuncture.jpg", 1200, 900, 82],
  ["herbalmedinice.jpg", "herbal-medicine.jpg", 1200, 900, 82],
  ["nonsurgical spine.png", "clinic-spine-joint.jpg", 1200, 900, 82],
  ["Aftereffects of Traffic Accidents.jpeg", "clinic-traffic-accident.jpg", 1200, 900, 82],
  ["Brain Health Center.png", "clinic-brain-health.jpg", 1200, 900, 82],
  ["diet.png", "clinic-diet.jpg", 1200, 900, 82],
  ["Post-Surgical Rehabilitation.jpeg", "clinic-rehab.jpg", 1200, 900, 82],
  ["anti-cancer.jpeg", "clinic-cancer.jpg", 1200, 900, 82],
  ["electronic moxibustion.jpeg", "electronic-moxibustion.jpg", 1200, 900, 82],
];

async function main() {
  for (const [src, out, width, height, quality] of attentionJobs) {
    await sharp(path.join(SRC_DIR, src))
      .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality })
      .toFile(path.join(OUT_DIR, out));
    console.log(`${src} -> /uploads/${out} (attention crop)`);
  }

  // Group photo: faces sit in the top portion across the full width, so a
  // plain top-anchored crop is more reliable than face-attention here.
  await sharp(path.join(SRC_DIR, "doctors.png"))
    .resize({ width: 1920, height: 700, fit: "cover", position: "top" })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "doctors-team.jpg"));
  console.log("doctors.png -> /uploads/doctors-team.jpg (top crop)");

  // Logo was replaced — re-export at capped width, preserving transparency.
  await sharp(path.join(SRC_DIR, "logo.png"))
    .resize({ width: 480, withoutEnlargement: true })
    .png({ quality: 90 })
    .toFile(path.join(OUT_DIR, "logo.png"));
  console.log("logo.png -> /uploads/logo.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
