import fs from "node:fs";
import path from "node:path";

// Drop PDFs into public/projects/ and they show up here automatically.
// Thumbnails are generated into public/projects/thumbs/ by
// scripts/generate-thumbnails.mjs (it runs before dev and build).
const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const THUMBS_DIR = path.join(PROJECTS_DIR, "thumbs");

function getProjects() {
  let files;
  try {
    files = fs.readdirSync(PROJECTS_DIR);
  } catch {
    return []; // folder doesn't exist yet
  }

  return files
    .filter((file) => /\.pdf$/i.test(file))
    .sort((a, b) =>
      // Natural order, so "Project 2" comes before "Project 10".
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((file, index) => {
      const title = file.replace(/\.pdf$/i, "");
      const hasThumb = fs.existsSync(path.join(THUMBS_DIR, `${title}.png`));
      return {
        no: `SHEET ${String(index + 1).padStart(2, "0")}`,
        title,
        href: `/projects/${encodeURIComponent(file)}`,
        thumb: hasThumb
          ? `/projects/thumbs/${encodeURIComponent(title)}.png`
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
