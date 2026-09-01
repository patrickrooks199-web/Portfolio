export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about__grid">
        <div>
          <div className="section-label about__label">About</div>
          <h2>Trained on the shop floor, not just the screen.</h2>
          <div className="about__body">
            <p>
              I'm a senior studying Manufacturing Engineering, and most of
              what I know I learned by breaking things first — stalling an
              end mill, warping a print, scrapping a batch of parts because a
              tolerance stack-up didn't add up on paper.
            </p>
            <p>
              I split my time between CAD, the CNC lab, and our student
              formula racing team, where I own fixture design and machined
              components. I care about parts that are cheap to make well, not
              just parts that look good in a render.
            </p>
          </div>
        </div>

        <div className="tag">
          <div className="tag__title">Inspection Tag</div>
          <div className="tag__row">
            <span>Program</span>
            <span>B.S. Manufacturing Eng.</span>
          </div>
          <div className="tag__row">
            <span>School</span>
            <span>Purdue University</span>
          </div>
          <div className="tag__row">
            <span>Grad.</span>
            <span>May 2027</span>
          </div>
          <div className="tag__row">
            <span>CAD</span>
            <span>SolidWorks, Fusion 360</span>
          </div>
          <div className="tag__row">
            <span>Location</span>
            <span>West Lafayette, IN</span>
          </div>
          <div className="tag__row">
            <span>Status</span>
            <span>Open to internships</span>
          </div>
        </div>
      </div>
    </section>
  );
}
