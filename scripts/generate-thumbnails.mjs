// Renders the first page of every PDF in public/projects/ (including PDFs
// inside subfolders) to a PNG thumbnail in public/projects/thumbs/, mirroring
// the same folder structure. Runs automatically before `npm run dev` and
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

// Finds every PDF under public/projects, remembering which folders it is in.
async function findPdfs(dir = PROJECTS_DIR, folders = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const found = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (folders.length === 0 && entry.name === "thumbs") continue;
      found.push(
        ...(await findPdfs(path.join(dir, entry.name), [...folders, entry.name]))
      );
    } else if (isPdf(entry.name)) {
      found.push({ name: entry.name, folders });
    }
  }
  return found;
}

async function main() {
  try {
    await fs.access(PROJECTS_DIR);
  } catch {
    console.log("[thumbnails] No public/projects folder found, skipping.");
    return;
  }

  const pdfs = await findPdfs();
  if (pdfs.length === 0) {
    await fs.rm(THUMBS_DIR, { recursive: true, force: true });
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

  // Start fresh so thumbnails for deleted or moved PDFs don't linger.
  await fs.rm(THUMBS_DIR, { recursive: true, force: true });

  let made = 0;
  for (const { name, folders } of pdfs) {
    const label = [...folders, name].join("/");
    const pdfPath = path.join(PROJECTS_DIR, ...folders, name);
    const outPath = path.join(THUMBS_DIR, ...folders, `${baseName(name)}.png`);
    try {
      // First pass at scale 1 only tells us the page size...
      const probe = await pdf(pdfPath, { scale: 1 });
      const { width, height } = pngSize(await probe.getPage(1));

      // ...second pass renders at the scale that hits the target size.
      const scale = TARGET_LONG_SIDE / Math.max(width, height);
      const doc = await pdf(pdfPath, { scale });
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, await doc.getPage(1));
      made++;
    } catch (err) {
      console.warn(`[thumbnails] Skipped "${label}": ${err.message}`);
    }
  }

  console.log(`[thumbnails] ${made} of ${pdfs.length} thumbnail(s) generated.`);
}

main().catch((err) => {
  // Never block the build over thumbnails.
  console.warn("[thumbnails] Unexpected error:", err.message);
});
