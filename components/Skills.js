const items = [
  { item: "001", desc: "SolidWorks & Fusion 360", cat: "Design / CAD" },
  { item: "002", desc: "GD&T (ASME Y14.5)", cat: "Design / CAD" },
  { item: "003", desc: "3-Axis CNC Milling & Turning", cat: "Fabrication" },
  { item: "004", desc: "Fixture & Jig Design", cat: "Fabrication" },
  { item: "005", desc: "DFM / DFA Analysis", cat: "Process" },
  { item: "006", desc: "Lean Manufacturing & Line Balancing", cat: "Process" },
  { item: "007", desc: "Minitab / Statistical Process Control", cat: "Quality" },
  { item: "008", desc: "Python for Data Analysis", cat: "Tooling" },
];

export default function Skills() {
  return (
    <section className="bom-section" id="skills">
      <div className="wrap">
        <span className="section-label">Capabilities</span>
        <h2>Bill of Materials</h2>

        <table className="bom">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.item}>
                <td className="bom__item">{row.item}</td>
                <td>{row.desc}</td>
                <td className="bom__cat">{row.cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
