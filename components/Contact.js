export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact__inner">
          <span className="section-label">Contact</span>
          <h2>Let's talk shop.</h2>
          <p className="contact__lede">
            Looking for a manufacturing or process engineering internship for
            summer 2027. Reach out if you're hiring, or if you just want to
            talk tolerances.
          </p>

          <div className="signblock">
            <div className="signblock__row">
              <div className="signblock__label">Email</div>
              <div className="signblock__value">
                <a href="mailto:patrickrooks199@gmail.com">
                  patrickrooks199@gmail.com
                </a>
              </div>
            </div>
            <div className="signblock__row">
              <div className="signblock__label">LinkedIn</div>
              <div className="signblock__value">
                <a
                  href="https://linkedin.com/in/jordanreyes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/jordanreyes
                </a>
              </div>
            </div>
            <div className="signblock__row">
              <div className="signblock__label">GitHub</div>
              <div className="signblock__value">
                <a
                  href="https://github.com/jordanreyes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/jordanreyes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        © {new Date().getFullYear()} Jordan Reyes — Drawn to specification.
      </div>
    </section>
  );
}
