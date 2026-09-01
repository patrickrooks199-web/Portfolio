const projects = [
  {
    no: "SHEET 01",
    title: "CNC-Machined Steering Upright",
    description:
      "Redesigned our formula racing team's front upright to cut machining time by 40%, consolidating four fixtures into one and simplifying toolpaths without losing stiffness.",
    material: "7075-T6 Aluminum",
    process: "3-Axis CNC Milling",
    date: "Mar 2026",
  },
  {
    no: "SHEET 02",
    title: "Injection-Molded Enclosure DFM Study",
    description:
      "Ran a full design-for-manufacturability pass on a sensor housing for a course capstone, resolving undercuts and wall-thickness issues before tooling was cut.",
    material: "ABS",
    process: "Injection Molding",
    date: "Nov 2025",
  },
  {
    no: "SHEET 03",
    title: "Assembly Line Rebalance",
    description:
      "Time-studied a six-station mock assembly line for a lean manufacturing project, rebalancing workload to cut cycle-time variance by 22% across stations.",
    material: "N/A",
    process: "Lean / Line Balancing",
    date: "Sep 2025",
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="projects__head">
          <div>
            <span className="section-label">Selected Work</span>
            <h2>Projects</h2>
          </div>
          <div className="projects__count">03 SHEETS ON FILE</div>
        </div>

        <div className="sheets">
          {projects.map((p) => (
            <article className="sheet" key={p.no}>
              <div className="sheet__no">{p.no}</div>
              <div className="sheet__body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              <dl className="sheet__titleblock">
                <div className="sheet__tb-row">
                  <dt>Material</dt>
                  <dd>{p.material}</dd>
                </div>
                <div className="sheet__tb-row">
                  <dt>Process</dt>
                  <dd>{p.process}</dd>
                </div>
                <div className="sheet__tb-row">
                  <dt>Date</dt>
                  <dd>{p.date}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
