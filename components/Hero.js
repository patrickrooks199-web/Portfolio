export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__frame">
        <div className="hero__topline">
          <span>SHEET 1/1 &nbsp;·&nbsp; SCALE NTS</span>
          <span>REV. A</span>
        </div>

        <div className="hero__body wrap" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div>
            <div className="hero__eyebrow">
              Manufacturing and Mechanical Engineering Technology Student
            </div>
            <h1 className="hero__name">Patrick Rooks</h1>
            <p className="hero__role">
              I design for manufacturability and build the fixtures,
              processes, and hardware that get a part from CAD to something
              real — currently studying at [your school], focused on
              [your focus area].
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#projects">
                View projects
              </a>
              <a className="btn btn--ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <div className="hero__art hero__art--reveal">
            <img
              src="/hero-drawing.svg"
              alt="CAD drawing of the saber-grip mouse design"
              className="hero__art-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
