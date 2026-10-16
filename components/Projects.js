import fs from "node:fs";
import path from "node:path";

// Put PDFs in public/projects/, inside folders named with a date, for example:
//   public/projects/03-15-2026/Saber-Grip Mouse.pdf
// The folder's date (MM-DD-YYYY) sets the order: newest first. Nested folders
// like public/projects/03/15/2026/ work too. PDFs with no date folder go last.
//
// Thumbnails are generated into public/projects/thumbs/ by
// scripts/generate-thumbnails.mjs (it runs before dev and build).
const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const THUMBS_DIR = path.join(PROJECTS_DIR, "thumbs");

// Finds every PDF under public/projects, remembering which folders it is in.
function findPdfs(dir = PROJECTS_DIR, folders = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return []; // folder doesn't exist yet
  }

  return entries.flatMap((entry) => {
    if (entry.isDirectory()) {
      if (folders.length === 0 && entry.name === "thumbs") return [];
      return findPdfs(path.join(dir, entry.name), [...folders, entry.name]);
    }
    return /\.pdf$/i.test(entry.name) ? [{ name: entry.name, folders }] : [];
  });
}

// Reads MM-DD-YYYY out of the folder path. Accepts - . _ / or spaces between
// the parts, and the date can sit inside a longer folder name.
function folderDate(folders) {
  const m = folders
    .join("/")
    .match(/(\d{1,2})[-._/ ](\d{1,2})[-._/ ](\d{4})/);
  if (!m) return null;

  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  if (year < 1990 || year > 2100) return null;
  return Date.UTC(year, month - 1, day);
}

function getProjects() {
  return findPdfs()
    .map((pdf) => ({ ...pdf, time: folderDate(pdf.folders) }))
    .sort((a, b) => {
      if (a.time !== b.time) {
        if (a.time === null) return 1; // undated PDFs go last
        if (b.time === null) return -1;
        return b.time - a.time; // newest first (swap to a.time - b.time for oldest first)
      }
      // Same date: natural alphabetical order, so "Project 2" comes before "Project 10".
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    })
    .map(({ name, folders }, index) => {
      const title = name.replace(/\.pdf$/i, "");
      const hasThumb = fs.existsSync(
        path.join(THUMBS_DIR, ...folders, `${title}.png`)
      );
      const url = (...parts) => "/" + parts.map(encodeURIComponent).join("/");
      return {
        no: `SHEET ${String(index + 1).padStart(2, "0")}`,
        title,
        href: url("projects", ...folders, name),
        thumb: hasThumb
          ? url("projects", "thumbs", ...folders, `${title}.png`)
          : null,
      };
    });
}

export default function Projects() {
  const projects = getProjects();
  const count = String(projects.length).padStart(2, "0");

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="projects__head">
          <div>
            <span className="section-label">Selected Work</span>
            <h2>Projects</h2>
          </div>
          <div className="projects__count">
            {count} {projects.length === 1 ? "SHEET" : "SHEETS"} ON FILE
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="projects__empty">
            No projects yet. Add PDF files to <code>public/projects</code>.
          </p>
        ) : (
          <div className="sheets">
            {projects.map((p) => (
              <article className="sheet" key={p.href}>
                <div className="sheet__no">{p.no}</div>
                <a
                  className="sheet__link"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="sheet__thumb">
                    {p.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumb} alt="" loading="lazy" />
                    ) : (
                      <span className="sheet__thumb-empty">PDF</span>
                    )}
                  </div>
                  <h3 className="sheet__title">{p.title}</h3>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
