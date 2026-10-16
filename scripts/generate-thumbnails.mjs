// Renders the first page of every PDF in public/projects/ to a PNG thumbnail
// in public/projects/thumbs/. Runs automatically before `npm run dev` and
// `npm run build`, or on demand with `npm run thumbs`.
//
// This script never fails the build. If a PDF can't be rendered, that project
// simply shows a "PDF" placeholder instead of a thumbnail.

import fs from "node:fs/promises";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const THUMBS_DIR = path.join(PROJECTS_DIR, "thumbs");

// Longest side of each thumbnail in pixels. Cards display at roughly 360px
// wide, so 900px stays sharp on high-density screens without huge files.
const TARGET_LONG_SIDE = 900;

const isPdf = (name) => /\.pdf$/i.test(name);
const baseName = (name) => name.replace(/\.pdf$/i, "");

// A PNG's width and height are stored at fixed byte offsets in its header.
const pngSize = (buf) => ({
  width: buf.readUInt32BE(16),
  height: buf.readUInt32BE(20),
});

async function main() {
  let files;
  try {
    files = (await fs.readdir(PROJECTS_DIR)).filter(isPdf);
  } catch {
    console.log("[thumbnails] No public/projects folder found, skipping.");
    return;
  }

  await fs.mkdir(THUMBS_DIR, { recursive: true });

  // Remove thumbnails whose PDF has been deleted or renamed.
  const wanted = new Set(files.map((f) => `${baseName(f)}.png`));
  for (const existing of await fs.readdir(THUMBS_DIR)) {
    if (existing.endsWith(".png") && !wanted.has(existing)) {
      await fs.rm(path.join(THUMBS_DIR, existing));
    }
  }

  if (files.length === 0) {
    console.log("[thumbnails] No PDFs found in public/projects.");
    return;
  }

  let pdf;
  try {
    ({ pdf } = await import("pdf-to-img"));
  } catch (err) {
    console.warn(
      "[thumbnails] Could not load pdf-to-img, so no thumbnails were made.\n" +
        "             Run: npm install --save-dev pdf-to-img@5.0.0\n" +
        `             (${err.message})`
    );
    return;
  }

  let made = 0;
  for (const file of files) {
    const pdfPath = path.join(PROJECTS_DIR, file);
    const outPath = path.join(THUMBS_DIR, `${baseName(file)}.png`);
    try {
      // First pass at scale 1 only tells us the page size...
      const probe = await pdf(pdfPath, { scale: 1 });
      const probePng = await probe.getPage(1);
      const { width, height } = pngSize(probePng);

      // ...second pass renders at the scale that hits the target size.
      const scale = TARGET_LONG_SIDE / Math.max(width, height);
      const doc = await pdf(pdfPath, { scale });
      await fs.writeFile(outPath, await doc.getPage(1));
      made++;
    } catch (err) {
      await fs.rm(outPath, { force: true });
      console.warn(`[thumbnails] Skipped "${file}": ${err.message}`);
    }
  }

  console.log(`[thumbnails] ${made} of ${files.length} thumbnail(s) generated.`);
}

main().catch((err) => {
  // Never block the build over thumbnails.
  console.warn("[thumbnails] Unexpected error:", err.message);
});
