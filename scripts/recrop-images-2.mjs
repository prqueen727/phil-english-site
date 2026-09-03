import sharp from "sharp";
import path from "path";

const SRC_DIR = "C:\\Users\\saden\\Downloads\\image";
const OUT_DIR = path.join(process.cwd(), "public", "uploads");

async function main() {
  // Hero slide 2: keep the full frame (director + the broadcaster logos on
  // the right) — no cropping, just cap the width. The previous attention
  // crop zoomed in on the face and cut the logos off entirely.
  await sharp(path.join(SRC_DIR, "hero 2 image.png"))
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "hero-home-2.jpg"));
  console.log("hero 2 image.png -> /uploads/hero-home-2.jpg (full frame, no crop)");

  // Doctors team photo: the source is already a short, tightly-framed strip
  // (983x313) with almost no headroom, so any further crop risks cutting
  // heads. Keep the full frame here too and let the page anchor to the top
  // via CSS object-position so any viewport-driven crop only trims from
  // the bottom (torsos), never the faces.
  await sharp(path.join(SRC_DIR, "doctors.png"))
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "doctors-team.jpg"));
  console.log("doctors.png -> /uploads/doctors-team.jpg (full frame, no crop)");

  // Replacement photos for Diet and Brain Health Center.
  await sharp(path.join(SRC_DIR, "diet.png"))
    .resize({ width: 1200, height: 900, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "clinic-diet.jpg"));
  console.log("diet.png -> /uploads/clinic-diet.jpg");

  await sharp(path.join(SRC_DIR, "Brain Health Center.png"))
    .resize({ width: 1200, height: 900, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "clinic-brain-health.jpg"));
  console.log("Brain Health Center.png -> /uploads/clinic-brain-health.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
