// Regenerates the site's profile photo (public/images/profile.webp) from public/images/profile.jpg.
// Usage: replace public/images/profile.jpg, then run `npm run photo`.
// 720px wide covers the largest display size (≈352 CSS px) on 2× screens.
import { existsSync, statSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/images/profile.jpg";
const OUT = "public/images/profile.webp";

if (!existsSync(SRC)) {
  console.error(`Missing ${SRC} — add your photo there first.`);
  process.exit(1);
}

await sharp(SRC).rotate().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 80 }).toFile(OUT);
console.log(`${OUT}: ${(statSync(OUT).size / 1024).toFixed(1)} KB`);
console.log("If the face isn't centered, adjust PROFILE_PHOTO_POSITION in data/portfolio.ts.");
