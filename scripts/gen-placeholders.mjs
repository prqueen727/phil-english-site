import { writeFileSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "placeholders");

const items = [
  { name: "hero-home", label: "Home Hero Image 1", w: 1600, h: 900, bg: "#61253c" },
  { name: "hero-home-2", label: "Home Hero Image 2", w: 1600, h: 900, bg: "#7d3852" },
  { name: "hero-home-3", label: "Home Hero Image 3", w: 1600, h: 900, bg: "#894a62" },
  { name: "hero-about", label: "About Hero Image", w: 1600, h: 700, bg: "#7d3852" },
  { name: "hero-treatments", label: "Treatments Hero Image", w: 1600, h: 700, bg: "#7d3852" },
  { name: "hero-doctors", label: "Doctors Hero Image", w: 1600, h: 700, bg: "#7d3852" },
  { name: "hero-contact", label: "Contact Hero Image", w: 1600, h: 700, bg: "#7d3852" },
  { name: "intro", label: "Intro Image", w: 1200, h: 900, bg: "#894a62" },
  { name: "about", label: "About Image", w: 1200, h: 900, bg: "#894a62" },
  { name: "acupuncture", label: "Acupuncture", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "pharmacopuncture", label: "Pharmacopuncture", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "chuna", label: "Chuna Manual Therapy", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "cupping", label: "Cupping Therapy", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "herbal", label: "Herbal Medicine", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "traction", label: "Traction Therapy", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "doctor-1", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-2", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-3", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-4", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-5", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-6", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-7", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-8", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-9", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "doctor-10", label: "Doctor Photo", w: 600, h: 600, bg: "#bd9aa8" },
  { name: "clinic-spine-joint", label: "Spine & Joint Treatment", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "clinic-rehab", label: "Post-Surgical Rehabilitation", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "clinic-diet", label: "Diet & Weight Management", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "clinic-cancer", label: "Integrative Cancer & Immunity", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "clinic-accident", label: "Traffic Accident Aftereffects", w: 1200, h: 900, bg: "#9f6c80" },
  { name: "clinic-stroke", label: "Stroke Aftereffects", w: 1200, h: 900, bg: "#9f6c80" },
];

function svg({ label, w, h, bg }) {
  const fontSize = Math.round(Math.min(w, h) / 18);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
    font-family="sans-serif" font-size="${fontSize}" fill="#faf7f2" opacity="0.85">
    ${label}
  </text>
  <text x="50%" y="${h / 2 + fontSize * 1.4}" text-anchor="middle" dominant-baseline="middle"
    font-family="sans-serif" font-size="${Math.round(fontSize * 0.5)}" fill="#faf7f2" opacity="0.6">
    Replace in Admin
  </text>
</svg>`;
}

for (const item of items) {
  const content = svg(item);
  writeFileSync(join(OUT_DIR, `${item.name}.svg`), content, "utf-8");
}

console.log(`Generated ${items.length} placeholder images in public/placeholders`);
