import sharp from "sharp";
import path from "path";

const SRC_DIR = "C:\\Users\\saden\\Downloads\\image";
const OUT_DIR = path.join(process.cwd(), "public", "uploads");

// Same goal as pad-hero-images.mjs (pad sideways so the hero banner never
// crops vertically into faces), but instead of a flat sampled-color bar,
// the padding is a heavily blurred, stretched version of the photo itself
// — like the blurred-background letterboxing in music/video apps — so the
// real photo blends into the padding with no visible seam.
const TARGET_RATIO = 4.6;

async function padWithBlur(srcName, outName, quality = 85) {
  const inputPath = path.join(SRC_DIR, srcName);
  const meta = await sharp(inputPath).metadata();
  const { width, height } = meta;
  const targetWidth = Math.round(height * TARGET_RATIO);
  const left = Math.floor((targetWidth - width) / 2);

  const background = await sharp(inputPath)
    .resize({ width: targetWidth, height, fit: "cover" })
    .blur(60)
    .modulate({ brightness: 0.9 })
    .toBuffer();

  await sharp(background)
    .composite([{ input: inputPath, left, top: 0 }])
    .jpeg({ quality })
    .toFile(path.join(OUT_DIR, outName));

  console.log(`${srcName} -> /uploads/${outName} (${width}x${height} blurred-pad to ${targetWidth}x${height})`);
}

async function main() {
  await padWithBlur("doctors greeting.jpg", "greeting-hero.jpg");
  await padWithBlur("contact us.jpg", "contact-hero.jpg");
  await padWithBlur("chuna.jpg", "chuna.jpg");
  await padWithBlur("herbal acupuncture.jpg", "herbal-acupuncture.jpg");
  await padWithBlur("nonsurgical spine.png", "clinic-spine-joint.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
