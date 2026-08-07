import type { CSSProperties } from "react";
import { Spiral } from "./components/Spiral";

function Noise() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3, opacity: 0.055, mixBlendMode: "multiply" }}
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

const ink = "#0B0F1A";

const iso = (cx: number, cy: number, r: number) => {
  const dx = r * 0.866, dy = r * 0.5;
  return {
    top: [cx, cy - r], ur: [cx + dx, cy - dy], lr: [cx + dx, cy + dy],
    bot: [cx, cy + r], ll: [cx - dx, cy + dy], ul: [cx - dx, cy - dy], c: [cx, cy],
  } as Record<string, number[]>;
};

const p = (a: number[]) => `${a[0]} ${a[1]}`;

const hatch = (x: number, y: number, w: number, h: number, gap: number) => {
  const out: string[] = [];
  for (let o = -h + gap; o < w; o += gap) {
    const x1 = Math.max(x, x + o);
    const x2 = Math.min(x + w, x + o + h);
    if (x2 <= x1) continue;
    out.push(`M${x1} ${y + (x1 - (x + o))} L${x2} ${y + (x2 - (x + o))}`);
  }
  return out;
};

function IsoCube({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const c = iso(cx, cy, r);
  return (
    <g strokeOpacity="0.15" strokeWidth="1.15">
      <path d={`M${p(c.top)} L${p(c.ur)} L${p(c.lr)} L${p(c.bot)} L${p(c.ll)} L${p(c.ul)} Z`} />
      <path d={`M${p(c.c)} L${p(c.top)}`} />
      <path d={`M${p(c.c)} L${p(c.lr)}`} />
      <path d={`M${p(c.c)} L${p(c.ll)}`} />
    </g>
  );
}

function DimH({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g strokeOpacity="0.13" strokeWidth="0.9">
      <path d={`M${x1} ${y} L${x2} ${y}`} />
      <path d={`M${x1} ${y - 8} L${x1} ${y + 8}`} />
      <path d={`M${x2} ${y - 8} L${x2} ${y + 8}`} />
      <path d={`M${x1 + 10} ${y - 5} L${x1} ${y} L${x1 + 10} ${y + 5}`} />
      <path d={`M${x2 - 10} ${y - 5} L${x2} ${y} L${x2 - 10} ${y + 5}`} />
    </g>
  );
}

function Target({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g strokeOpacity="0.14" strokeWidth="1.05">
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.63} />
      <circle cx={cx} cy={cy} r="3" />
      <path d={`M${cx} ${cy - r - 36} L${cx} ${cy + r + 36}`} strokeOpacity="0.08" strokeWidth="0.7" strokeDasharray="9 7" />
      <path d={`M${cx - r - 36} ${cy} L${cx + r + 36} ${cy}`} strokeOpacity="0.08" strokeWidth="0.7" strokeDasharray="9 7" />
      <path d={`M${cx} ${cy} L${cx + r * 0.7} ${cy - r * 0.7}`} />
    </g>
  );
}

function Extrude({ x, y, w, h, d }: { x: number; y: number; w: number; h: number; d: number }) {
  return (
    <>
      <g strokeOpacity="0.14" strokeWidth="1.05">
        <rect x={x} y={y} width={w} height={h} />
        <rect x={x + d} y={y + d} width={w} height={h} />
        <path d={`M${x} ${y} L${x + d} ${y + d}`} />
        <path d={`M${x + w} ${y} L${x + w + d} ${y + d}`} />
        <path d={`M${x} ${y + h} L${x + d} ${y + h + d}`} />
        <path d={`M${x + w} ${y + h} L${x + w + d} ${y + h + d}`} />
      </g>
      <g strokeOpacity="0.075" strokeWidth="0.65">
        {hatch(x, y, w, h, 17).map((line, i) => <path key={i} d={line} />)}
      </g>
    </>
  );
}

function Grid({ w, h, step }: { w: number; h: number; step: number }) {
  return (
    <g stroke={ink} fill="none" strokeOpacity="0.05" strokeWidth="0.7">
      {Array.from({ length: Math.ceil(h / step) + 1 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * step} L${w} ${i * step}`} />)}
      {Array.from({ length: Math.ceil(w / step) + 1 }, (_, i) => <path key={`v${i}`} d={`M${i * step} 0 L${i * step} ${h}`} />)}
    </g>
  );
}

function Graphite({ id }: { id: string }) {
  return (
    <filter id={id} x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="grain" />
      <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );
}

const sketchStyle: CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1,
};

function SketchNarrow() {
  const cube = iso(112, 214, 74);
  return (
    <svg className="sketch-narrow" aria-hidden="true" viewBox="0 0 480 1000" preserveAspectRatio="xMidYMid slice" style={sketchStyle}>
      <Graphite id="graphite-n" />
      <Grid w={480} h={1000} step={64} />
      <g filter="url(#graphite-n)" stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <IsoCube cx={112} cy={214} r={74} />
        <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
          <path d={`M${cube.ll[0]} ${cube.ll[1]} L${cube.ll[0]} 330`} />
          <path d={`M${cube.lr[0]} ${cube.lr[1]} L${cube.lr[0]} 330`} />
        </g>
        <DimH x1={cube.ll[0]} x2={cube.lr[0]} y={318} />
        <g strokeOpacity="0.12" strokeWidth="0.95">
          <path d="M328 138 L444 138 L444 254" />
          <path d="M328 138 L444 254" />
        </g>
        <g strokeOpacity="0.07" strokeWidth="0.65">
          {hatch(328, 138, 116, 116, 15).map((line, i) => <path key={i} d={line} />)}
        </g>
        <Extrude x={44} y={716} w={186} h={132} d={22} />
        <Target cx={352} cy={846} r={86} />
        <g strokeOpacity="0.1" strokeWidth="0.85">
          <path d="M170 74 L310 74" />
          <path d="M170 66 L170 82" />
          <path d="M310 66 L310 82" />
        </g>
      </g>
    </svg>
  );
}

function Sketch() {
  const cube = iso(252, 352, 128);
  return (
    <svg className="sketch-wide" aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={sketchStyle}>
      <Graphite id="graphite-w" />
      <Grid w={1440} h={900} step={64} />
      <g filter="url(#graphite-w)" stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <IsoCube cx={252} cy={352} r={128} />
        <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
          <path d={`M${p(cube.ul)} L${cube.ul[0] - 46} ${cube.ul[1]}`} />
          <path d={`M${p(cube.ll)} L${cube.ll[0] - 46} ${cube.ll[1]}`} />
          <path d={`M${cube.ll[0]} ${cube.ll[1]} L${cube.ll[0]} 596`} />
          <path d={`M${cube.lr[0]} ${cube.lr[1]} L${cube.lr[0]} 596`} />
        </g>
        <DimH x1={cube.ll[0]} x2={cube.lr[0]} y={572} />
        <g strokeOpacity="0.13" strokeWidth="0.9">
          <path d={`M${cube.ul[0] - 40} ${cube.ul[1]} L${cube.ul[0] - 40} ${cube.ll[1]}`} />
          <path d={`M${cube.ul[0] - 45} ${cube.ul[1] + 10} L${cube.ul[0] - 40} ${cube.ul[1]} L${cube.ul[0] - 35} ${cube.ul[1] + 10}`} />
          <path d={`M${cube.ul[0] - 45} ${cube.ll[1] - 10} L${cube.ul[0] - 40} ${cube.ll[1]} L${cube.ul[0] - 35} ${cube.ll[1] - 10}`} />
        </g>

        <Extrude x={1064} y={196} w={292} h={196} d={24} />
        <Target cx={1184} cy={656} r={118} />

        <g strokeOpacity="0.12" strokeWidth="0.95">
          <path d="M136 704 L136 828 L260 828" />
          <path d="M136 828 L260 704" />
          <path d="M160 828 L160 804 L184 804" />
        </g>
        <g strokeOpacity="0.07" strokeWidth="0.65">
          {hatch(136, 704, 124, 124, 15).map((d, i) => <path key={`hy${i}`} d={d} />)}
        </g>

        <g strokeOpacity="0.1" strokeWidth="0.85">
          <path d="M488 92 L636 92" />
          <path d="M488 84 L488 100" />
          <path d="M636 84 L636 100" />
          <path d="M868 820 L1016 820" />
          <path d="M868 812 L868 828" />
          <path d="M1016 812 L1016 828" />
        </g>
      </g>
    </svg>
  );
}

function PanelRadial() {
  const spokes = [
    { a: -158, r: 185 }, { a: -143, r: 168 }, { a: -128, r: 148 },
    { a: -113, r: 128 }, { a: -98,  r: 108 }, { a: -83,  r:  88 },
    { a: -172, r: 120 }, { a: -68,  r:  72 },
  ];
  const W = 220, H = 210;
  return (
    <div className="panel" style={{ "--w": "clamp(92px, 19.13vw, 220px)", "--ar": `${W} / ${H}`, position: "absolute", top: 0, left: 0, background: "#6A72F0", overflow: "hidden", zIndex: 2, borderRadius: "0 0 18px 0" } as CSSProperties}>
      <svg viewBox={`0 0 ${W} ${H}`}>
        {spokes.map(({ a, r }, i) => {
          const rad = a * Math.PI / 180;
          const x2 = (W + Math.cos(rad) * r).toFixed(1);
          const y2 = (H + Math.sin(rad) * r).toFixed(1);
          return (
            <g key={i}>
              <line x1={W} y1={H} x2={x2} y2={y2} stroke="rgba(255,255,255,0.42)" strokeWidth="0.9" />
              <circle cx={x2} cy={y2} r="3" fill="rgba(255,255,255,0.28)" />
            </g>
          );
        })}
        <circle cx={W} cy={H} r="9" fill="rgba(255,255,255,0.25)" />
        <circle cx={W} cy={H} r="4" fill="rgba(255,255,255,0.75)" />
      </svg>
    </div>
  );
}

function PanelArch() {
  return (
    <div style={{ position: "absolute", top: 0, right: "44.068%", width: "55.932%", height: "100%", background: "#EACBA3", overflow: "hidden", borderRadius: "0 0 18px 18px" }}>
      <svg viewBox="0 0 165 195">
        <line x1="82" y1="95" x2="34" y2="42"  stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line x1="82" y1="95" x2="136" y2="52"  stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line x1="82" y1="95" x2="28"  y2="152" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line x1="82" y1="95" x2="138" y2="148" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line x1="82" y1="95" x2="82"  y2="172" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <circle cx="82" cy="95" r="22" fill="none" stroke="rgba(130,80,20,0.35)" strokeWidth="1.8" />
        <circle cx="82" cy="95" r="10" fill="rgba(130,80,20,0.2)" />
        {[
          [34,  42, 12], [136, 52, 10], [28, 152, 14],
          [138, 148, 11], [82, 172, 9],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(130,80,20,0.32)" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

function PanelGrid() {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: "44.068%", height: "100%", background: "#2563EB", overflow: "hidden", borderRadius: "0 0 0 18px" }}>
      <svg viewBox="0 0 130 195">
        <rect x="10" y="14" width="110" height="20" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="10" y="14" width="52" height="20" rx="4" fill="rgba(255,255,255,0.28)" />
        {Array.from({ length: 7 }, (_, row) => (
          <g key={row}>
            <rect x="10"  y={44 + row * 20} width="50" height="12" rx="3" fill="rgba(255,255,255,0.12)" />
            <rect x="68"  y={44 + row * 20} width="52" height="12" rx="3" fill="rgba(255,255,255,0.09)" />
            <line x1="10" y1={40 + row * 20} x2="120" y2={40 + row * 20} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}
        <line x1="64" y1="14" x2="64" y2="190" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function PanelTerminal() {
  const lines = [
    { w: 110, color: "rgba(100,210,160,0.55)" },
    { w:  80, color: "rgba(255,255,255,0.22)" },
    { w: 140, color: "rgba(255,255,255,0.16)" },
    { w:  60, color: "rgba(100,210,160,0.4)"  },
    { w: 120, color: "rgba(255,255,255,0.18)" },
    { w:  90, color: "rgba(255,255,255,0.14)" },
    { w: 100, color: "rgba(100,210,160,0.35)" },
  ];
  return (
    <div className="panel" style={{ "--w": "clamp(90px, 18.7vw, 215px)", "--ar": "215 / 160", position: "absolute", bottom: 0, left: 0, background: "#0F1C33", overflow: "hidden", zIndex: 2, borderRadius: "0 18px 0 0" } as CSSProperties}>
      <svg viewBox="0 0 215 160">
        <rect x="0" y="0" width="215" height="22" fill="rgba(255,255,255,0.06)" />
        <circle cx="14" cy="11" r="4" fill="rgba(255,80,80,0.5)" />
        <circle cx="28" cy="11" r="4" fill="rgba(255,180,50,0.5)" />
        <circle cx="42" cy="11" r="4" fill="rgba(80,200,100,0.5)" />
        {lines.map(({ w, color }, i) => (
          <rect key={i} x="14" y={32 + i * 16} width={w} height="7" rx="2" fill={color} />
        ))}
        <rect x="14" y={32 + lines.length * 16} width="7" height="10" rx="1" fill="rgba(255,255,255,0.55)" />
      </svg>
    </div>
  );
}

function PanelChart() {
  const pts = "14,108 44,90 74,98 104,64 134,74 164,46 194,56 224,32";
  const areaPts = `14,120 ${pts} 224,120`;
  return (
    <div className="panel" style={{ "--w": "clamp(105px, 21.74vw, 250px)", "--ar": "250 / 165", position: "absolute", bottom: 0, right: 0, background: "#3DB5A8", overflow: "hidden", zIndex: 2, borderRadius: "18px 0 0 0" } as CSSProperties}>
      <svg viewBox="0 0 250 165">
        <line x1="14" y1="12"  x2="14"  y2="128" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <line x1="14" y1="128" x2="236" y2="128" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="14" y1={128 - (i + 1) * 28} x2="236" y2={128 - (i + 1) * 28}
            stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        <polygon points={areaPts} fill="rgba(255,255,255,0.12)" />
        <polyline points={pts} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.split(" ").map((p, i) => {
          const [x, y] = p.split(",");
          return <circle key={i} cx={x} cy={y} r="3.5" fill="white" fillOpacity="0.85" />;
        })}
        {[25, 50, 75, 100].map((v, i) => (
          <text key={i} x="10" y={128 - (i + 1) * 28 + 4} textAnchor="end"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", fill: "rgba(255,255,255,0.45)" }}>
            {v}
          </text>
        ))}
      </svg>
    </div>
  );
}

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { color-scheme: only light; }
  body { background: #E5E4DF; }

  .sketch-narrow { display: none; }

  .hero-tag  { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.16em; color: #6B7280; text-transform: uppercase; margin-bottom: 28px; display: flex; align-items: center; gap: 8px; }
  .hero-h1   { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: clamp(42px, 7.5vw, 92px); letter-spacing: -0.03em; line-height: 1.04; color: #0B0F1A; margin-bottom: 28px; max-width: 820px; }
  .hero-sub  { font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 300; line-height: 1.75; color: #6B7280; max-width: 380px; margin-bottom: 48px; }
  .hero-mail { display: inline-flex; align-items: center; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: clamp(17px, 2.4vw, 22px); letter-spacing: -0.01em; color: #0B0F1A; text-decoration: none; transition: opacity 0.2s; }
  .hero-mail:hover { opacity: 0.7; }

  .mail-row  { position: relative; display: inline-flex; align-items: center; }
  .mail-copy { position: absolute; left: 100%; top: 50%; margin-left: 10px; width: 26px; height: 26px; padding: 4px; border: 0; background: none; color: #6B7280; cursor: pointer; opacity: 0; transform: translateY(-50%) translateX(-5px); transition: opacity 0.18s, transform 0.18s, color 0.18s; }
  .mail-copy svg { display: block; width: 100%; height: 100%; }
  .mail-row:hover .mail-copy, .mail-copy:focus-visible { opacity: 1; transform: translateY(-50%); }
  .mail-copy:hover { color: #0B0F1A; }
  .mail-copy .done-mark { opacity: 0; }
  .mail-copy.is-copied { opacity: 1; transform: translateY(-50%); color: #0B0F1A; }
  .mail-copy.is-copied .copy-mark { opacity: 0; }
  .mail-copy.is-copied .done-mark { opacity: 1; }

  @media (hover: none) {
    .mail-copy { opacity: 1; transform: translateY(-50%); }
  }
  .hero-tags { display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap; justify-content: center; }
  .svc-tag   { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; color: #9CA3AF; }

  .footer    { position: relative; z-index: 4; border-top: 1px solid rgba(11,15,26,0.08); padding: clamp(12px, 1.6vw, 22px) clamp(16px, 2.8vw, 40px); display: flex; justify-content: space-between; align-items: center; gap: clamp(10px, 2vw, 24px); background: #E5E4DF; }
  .footer-t  { font-family: 'DM Mono', monospace; font-size: clamp(8px, 0.85vw, 11px); line-height: 1.5; color: #9CA3AF; letter-spacing: clamp(0.01em, 0.08vw, 0.07em); }
  .footer-t + .footer-t { white-space: nowrap; }

  .panel {
    width: var(--w);
    aspect-ratio: var(--ar);
    height: auto;
  }
  .panel svg { display: block; width: 100%; height: 100%; }

  @media (max-width: 640px) {
    .hero-h1 { font-size: clamp(38px, 10.5vw, 60px); }
    .hero-sub { font-size: 15px; }
  }

  @media (max-width: 760px) {
    .sketch-wide { display: none; }
    .sketch-narrow { display: block; }
  }

  @media (max-width: 440px) {
    .footer { flex-direction: column-reverse; gap: 4px; align-items: flex-start; }
  }
`;

export default function App() {
  return (
    <div style={{ background: "#E5E4DF", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{css}</style>
      <Noise />

      <div style={{ position: "relative", overflow: "hidden", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        <Sketch />
        <SketchNarrow />
        <PanelRadial />
        <div
          className="panel"
          style={{ "--w": "clamp(124px, 25.65vw, 295px)", "--ar": "295 / 195", position: "absolute", top: 0, right: 0, zIndex: 2 } as CSSProperties}
        >
          <PanelArch />
          <PanelGrid />
        </div>
        <PanelTerminal />
        <PanelChart />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 48px", textAlign: "center", position: "relative", zIndex: 4 }}>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Spiral size={96} sw={11} color="#0B0F1A" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "0.16em", marginRight: "-0.16em", color: "#0B0F1A" }}>
                SPIRALES
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: "9px", letterSpacing: "0.18em", marginRight: "-0.18em", color: "#9CA3AF" }}>
                spirales.tech
              </span>
            </div>
          </div>

          <p className="hero-tag">
            <span style={{ display: "inline-block", width: 24, height: 1, background: "#6B7280" }} />
            Software Solutions &amp; Services
          </p>

          <h1 className="hero-h1">Systems built<br />to scale.</h1>

          <p className="hero-sub">
            We design and engineer software for companies navigating complexity.
          </p>

          <span className="mail-row">
            <a href="mailto:hello@spirales.tech" className="hero-mail">
              hello@spirales.tech
            </a>
            <button type="button" className="mail-copy" data-copy="hello@spirales.tech" aria-label="Copy email address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect className="copy-mark" x="9" y="9" width="12" height="12" rx="2.5" />
                <path className="copy-mark" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                <path className="done-mark" d="M4 12.6 9.2 18 20 6.6" />
              </svg>
            </button>
          </span>

          <div className="hero-tags">
            {["Architecture", "Engineering", "Operations"].map(s => (
              <span key={s} className="svc-tag">{s}</span>
            ))}
          </div>

        </main>
      </div>

      <footer className="footer">
        <span className="footer-t">© <span data-year>{new Date().getFullYear()}</span> Socialinės savidestrukcijos spiralės multiplikavimo biuras</span>
        <span className="footer-t">hello@spirales.tech</span>
      </footer>
    </div>
  );
}
