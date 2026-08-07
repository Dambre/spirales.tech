import type { CSSProperties, ReactNode } from "react";
import { DimH, Extrude, IsoCube, Target, hatch, ink, iso } from "./draw";
import { SPIRAL_PATH } from "./Spiral";
import type { Copy } from "../content";

const colours: Record<string, { rail: string; accent: string }> = {
  architecture: { rail: "#6A72F0", accent: "#5A62E0" },
  design: { rail: "#EACBA3", accent: "#B07B36" },
  engineering: { rail: "#2563EB", accent: "#2563EB" },
  operations: { rail: "#0F1C33", accent: "#0F1C33" },
  ai: { rail: "#3DB5A8", accent: "#2E8E84" },
};

const motifSvg = (id: string, children: ReactNode) => (
  <svg className="svc-motif" aria-hidden="true" viewBox="0 0 400 300">
    <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

function MotifArchitecture() {
  const cube = iso(200, 138, 96);
  return motifSvg("architecture", (
    <>
      <IsoCube cx={200} cy={138} r={96} />
      <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
        <path pathLength="1" d={`M${cube.ll[0]} ${cube.ll[1]} L${cube.ll[0]} 268`} />
        <path pathLength="1" d={`M${cube.lr[0]} ${cube.lr[1]} L${cube.lr[0]} 268`} />
      </g>
      <DimH x1={cube.ll[0]} x2={cube.lr[0]} y={256} />
    </>
  ));
}

function MotifDesign() {
  return motifSvg("design", (
    <>
      <Extrude x={72} y={52} w={230} h={154} d={26} />
      <g strokeOpacity="0.1" strokeWidth="0.85">
        <path pathLength="1" d="M72 246 L302 246" />
        <path pathLength="1" d="M72 238 L72 254" />
        <path pathLength="1" d="M302 238 L302 254" />
      </g>
    </>
  ));
}

function MotifEngineering() {
  return motifSvg("engineering", (
    <>
      <g strokeOpacity="0.13" strokeWidth="0.95">
        <path pathLength="1" d="M70 40 L330 40 L330 260 L70 260 Z" />
        <path pathLength="1" d="M70 40 L330 260" />
        <path pathLength="1" d="M110 260 L110 220 L150 220" />
        <path pathLength="1" d="M330 80 L290 80 L290 40" />
      </g>
      <g className="hatch" strokeOpacity="0.07" strokeWidth="0.65">
        {hatch(70, 40, 260, 220, 16).map((d, i) => <path pathLength="1" key={i} d={d} />)}
      </g>
    </>
  ));
}

function MotifOperations() {
  return motifSvg("operations", <Target cx={200} cy={150} r={104} />);
}

function MotifAi() {
  return motifSvg("ai", (
    <>
      <g transform="translate(50 0) scale(3)" strokeOpacity="0.15" strokeWidth="0.42">
        <path pathLength="1" d={SPIRAL_PATH} />
      </g>
      <circle pathLength="1" cx="200" cy="150" r="128" strokeOpacity="0.08" strokeWidth="0.7" strokeDasharray="9 7" />
      <path pathLength="1" d="M200 8 L200 292" strokeOpacity="0.06" strokeWidth="0.7" strokeDasharray="9 7" />
    </>
  ));
}

function BackdropWide() {
  const far = iso(170, 520, 170);
  return (
    <>
      <svg className="svc-layer svc-layer-w svc-layer-far" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <IsoCube cx={170} cy={520} r={170} />
          <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
            <path pathLength="1" d={`M${far.ll[0]} ${far.ll[1]} L${far.ll[0]} 760`} />
            <path pathLength="1" d={`M${far.lr[0]} ${far.lr[1]} L${far.lr[0]} 760`} />
          </g>
          <DimH x1={far.ll[0]} x2={far.lr[0]} y={744} />
          <Extrude x={1150} y={90} w={220} h={150} d={24} />
          <g strokeOpacity="0.1" strokeWidth="0.85">
            <path pathLength="1" d="M420 58 L720 58" />
            <path pathLength="1" d="M420 50 L420 66" />
            <path pathLength="1" d="M720 50 L720 66" />
            <path pathLength="1" d="M980 842 L1180 842" />
            <path pathLength="1" d="M980 834 L980 850" />
            <path pathLength="1" d="M1180 834 L1180 850" />
          </g>
        </g>
      </svg>
      <svg className="svc-layer svc-layer-w svc-layer-near" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="svc-spin">
            <Target cx={1290} cy={700} r={100} />
          </g>
          <IsoCube cx={130} cy={140} r={64} />
          <g strokeOpacity="0.13" strokeWidth="0.95">
            <path pathLength="1" d="M1180 430 L1300 430 L1300 550 L1180 550 Z" />
            <path pathLength="1" d="M1180 430 L1300 550" />
            <path pathLength="1" d="M1204 550 L1204 526 L1228 526" />
          </g>
          <g className="hatch" strokeOpacity="0.07" strokeWidth="0.65">
            {hatch(1180, 430, 120, 120, 15).map((d, i) => <path pathLength="1" key={i} d={d} />)}
          </g>
          <g strokeOpacity="0.12" strokeWidth="0.95">
            <path pathLength="1" d="M96 790 L96 866 L172 866" />
            <path pathLength="1" d="M96 866 L172 790" />
          </g>
          <g transform="translate(36 620) scale(1.6)" strokeOpacity="0.14" strokeWidth="0.7">
            <path pathLength="1" d={SPIRAL_PATH} />
          </g>
        </g>
      </svg>
    </>
  );
}

function BackdropNarrow() {
  const far = iso(96, 300, 84);
  return (
    <>
      <svg className="svc-layer svc-layer-n svc-layer-far" viewBox="0 0 480 1000" preserveAspectRatio="xMidYMid slice">
        <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <IsoCube cx={96} cy={300} r={84} />
          <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
            <path pathLength="1" d={`M${far.ll[0]} ${far.ll[1]} L${far.ll[0]} 430`} />
            <path pathLength="1" d={`M${far.lr[0]} ${far.lr[1]} L${far.lr[0]} 430`} />
          </g>
          <DimH x1={far.ll[0]} x2={far.lr[0]} y={418} />
          <Extrude x={280} y={720} w={150} h={104} d={18} />
          <g strokeOpacity="0.1" strokeWidth="0.85">
            <path pathLength="1" d="M200 60 L360 60" />
            <path pathLength="1" d="M200 52 L200 68" />
            <path pathLength="1" d="M360 52 L360 68" />
          </g>
        </g>
      </svg>
      <svg className="svc-layer svc-layer-n svc-layer-near" viewBox="0 0 480 1000" preserveAspectRatio="xMidYMid slice">
        <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="svc-spin">
            <Target cx={400} cy={190} r={64} />
          </g>
          <g strokeOpacity="0.13" strokeWidth="0.95">
            <path pathLength="1" d="M40 620 L130 620 L130 710 L40 710 Z" />
            <path pathLength="1" d="M40 620 L130 710" />
            <path pathLength="1" d="M58 710 L58 692 L76 692" />
          </g>
          <g className="hatch" strokeOpacity="0.07" strokeWidth="0.65">
            {hatch(40, 620, 90, 90, 13).map((d, i) => <path pathLength="1" key={i} d={d} />)}
          </g>
          <g strokeOpacity="0.12" strokeWidth="0.95">
            <path pathLength="1" d="M380 880 L380 940 L440 940" />
            <path pathLength="1" d="M380 940 L440 880" />
          </g>
          <g transform="translate(300 400) scale(1.3)" strokeOpacity="0.14" strokeWidth="0.75">
            <path pathLength="1" d={SPIRAL_PATH} />
          </g>
        </g>
      </svg>
    </>
  );
}

function Backdrop() {
  return (
    <div className="svc-backdrop" aria-hidden="true">
      <BackdropWide />
      <BackdropNarrow />
    </div>
  );
}

const motifs: Record<string, () => ReactNode> = {
  architecture: MotifArchitecture,
  design: MotifDesign,
  engineering: MotifEngineering,
  operations: MotifOperations,
  ai: MotifAi,
};

export function Services({ copy }: { copy: Copy }) {
  return (
    <div className="svc-wrap" id="services">
      <Backdrop />

      <section className="svc-intro">
        <p className="hero-tag">
          <span style={{ display: "inline-block", width: 24, height: 1, background: "#6B7280" }} />
          {copy.intro.tag}
        </p>
        <h2 className="svc-intro-h">{copy.intro.h}</h2>
        <p className="svc-intro-p">{copy.intro.p}</p>
      </section>

      {copy.domains.map(d => {
        const Motif = motifs[d.id];
        const { rail, accent } = colours[d.id];
        return (
          <section key={d.id} id={d.id} className="svc-sec" style={{ "--rail": rail, "--accent": accent } as CSSProperties}>
            <div className="svc-rail" aria-hidden="true"><div /></div>
            <div className="svc-body">
              <Motif />
              <header className="svc-head">
                <span className="svc-rule" />
                <h2 className="svc-title">{d.title}</h2>
              </header>
              <ul className="svc-items">
                {d.items.map(it => (
                  <li key={it.title} className="svc-item">
                    <h3>{it.title}</h3>
                    <p className="svc-lead">{it.lead}</p>
                    <p className="svc-detail">{it.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="svc-sec svc-how" id="how" style={{ "--rail": "#0B0F1A", "--accent": "#0B0F1A" } as CSSProperties}>
        <div className="svc-rail" aria-hidden="true"><div /></div>
        <div className="svc-body">
          <header className="svc-head">
            <span className="svc-rule" />
            <h2 className="svc-title">{copy.how.title}</h2>
          </header>
          <div className="svc-how-grid">
            <p className="svc-how-p">{copy.how.p1}</p>
            <p className="svc-how-p">{copy.how.p2}</p>
          </div>
          <span className="mail-row svc-mail">
            <a href="mailto:hello@spirales.tech" className="hero-mail">
              hello@spirales.tech
            </a>
            <button type="button" className="mail-copy" data-copy="hello@spirales.tech" data-copied={copy.hero.copied} aria-label={copy.hero.copy}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect className="copy-mark" x="9" y="9" width="12" height="12" rx="2.5" />
                <path className="copy-mark" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                <path className="done-mark" d="M4 12.6 9.2 18 20 6.6" />
              </svg>
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}
