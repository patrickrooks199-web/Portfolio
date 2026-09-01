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
            <div className="hero__eyebrow">Manufacturing Engineering Student</div>
            <h1 className="hero__name">Jordan Reyes</h1>
            <p className="hero__role">
              I design for manufacturability and build the tooling, fixtures,
              and processes that get a part from CAD to production —
              currently studying at Purdue, focused on CNC machining and
              process optimization.
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

          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 420 380" fill="none">
              {/* part outline: simple L-bracket, front view */}
              <path
                className="draw-line"
                d="M110 90 L110 260 L300 260 L300 200 L170 200 L170 90 Z"
                stroke="#BFD7E8"
                strokeWidth="2.5"
              />
              {/* bolt holes */}
              <circle
                className="draw-line draw-line--delay1"
                cx="140"
                cy="230"
                r="10"
                stroke="#BFD7E8"
                strokeWidth="2"
              />
              <circle
                className="draw-line draw-line--delay1"
                cx="270"
                cy="230"
                r="10"
                stroke="#BFD7E8"
                strokeWidth="2"
              />
              <circle
                className="draw-line draw-line--delay1"
                cx="140"
                cy="120"
                r="10"
                stroke="#BFD7E8"
                strokeWidth="2"
              />

              {/* center lines */}
              <line
                className="draw-line draw-line--delay1"
                x1="140" y1="205" x2="140" y2="255"
                stroke="#6D90A8" strokeWidth="1" strokeDasharray="6 4"
              />
              <line
                className="draw-line draw-line--delay1"
                x1="270" y1="205" x2="270" y2="255"
                stroke="#6D90A8" strokeWidth="1" strokeDasharray="6 4"
              />

              {/* width dimension line (bottom) */}
              <line className="draw-line draw-line--delay2" x1="110" y1="300" x2="300" y2="300" stroke="#BFD7E8" strokeWidth="1.25" />
              <line className="draw-line draw-line--delay2" x1="110" y1="262" x2="110" y2="306" stroke="#BFD7E8" strokeWidth="1" />
              <line className="draw-line draw-line--delay2" x1="300" y1="262" x2="300" y2="306" stroke="#BFD7E8" strokeWidth="1" />

              {/* height dimension line (left) */}
              <line className="draw-line draw-line--delay2" x1="70" y1="90" x2="70" y2="260" stroke="#BFD7E8" strokeWidth="1.25" />
              <line className="draw-line draw-line--delay2" x1="108" y1="90" x2="66" y2="90" stroke="#BFD7E8" strokeWidth="1" />
              <line className="draw-line draw-line--delay2" x1="108" y1="260" x2="66" y2="260" stroke="#BFD7E8" strokeWidth="1" />

              {/* leader line + callout */}
              <line className="draw-line draw-line--delay3" x1="270" y1="220" x2="330" y2="160" stroke="#E8590C" strokeWidth="1.25" />

              <g className="draw-fade">
                <text x="128" y="320" fill="#BFD7E8" fontFamily="var(--font-mono)" fontSize="12">
                  190.0
                </text>
                <text x="34" y="178" fill="#BFD7E8" fontFamily="var(--font-mono)" fontSize="12">
                  170.0
                </text>
                <text x="333" y="152" fill="#E8590C" fontFamily="var(--font-mono)" fontSize="12">
                  ⌀10 X 3
                </text>
                <text x="333" y="168" fill="#E8590C" fontFamily="var(--font-mono)" fontSize="12">
                  THRU ALL
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
