export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact__inner">
          <span className="section-label">Contact</span>
          <h2>Corny one liner</h2>
          <p className="contact__lede">
            I WANT A JOB
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
                  href="https://linkedin.com/in/patrick-rooks-a8b653424"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/patrick-rooks-a8b653424
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
        © {new Date().getFullYear()} Footer text.
      </div>
    </section>
  );
}
