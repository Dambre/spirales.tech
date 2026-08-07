import type { CSSProperties } from "react";
import { Spiral } from "./components/Spiral";
import { DimH, Extrude, IsoCube, Target, hatch, ink, iso, p } from "./components/draw";
import { Services } from "./components/Services";
import { languages, type Lang } from "./content";

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

const sketchStyle: CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1,
};

function SketchNarrow() {
  const cube = iso(112, 214, 74);
  return (
    <svg className="sketch-narrow" aria-hidden="true" viewBox="0 0 480 1000" preserveAspectRatio="xMidYMid slice" style={sketchStyle}>
      <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <IsoCube cx={112} cy={214} r={74} />
        <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
          <path pathLength="1" d={`M${cube.ll[0]} ${cube.ll[1]} L${cube.ll[0]} 330`} />
          <path pathLength="1" d={`M${cube.lr[0]} ${cube.lr[1]} L${cube.lr[0]} 330`} />
        </g>
        <DimH x1={cube.ll[0]} x2={cube.lr[0]} y={318} />
        <g strokeOpacity="0.12" strokeWidth="0.95">
          <path pathLength="1" d="M328 138 L444 138 L444 254" />
          <path pathLength="1" d="M328 138 L444 254" />
        </g>
        <g className="hatch" strokeOpacity="0.07" strokeWidth="0.65">
          {hatch(328, 138, 116, 116, 15).map((line, i) => <path pathLength="1" key={i} d={line} />)}
        </g>
        <Extrude x={44} y={716} w={186} h={132} d={22} />
        <Target cx={352} cy={846} r={86} />
        <g strokeOpacity="0.1" strokeWidth="0.85">
          <path pathLength="1" d="M170 74 L310 74" />
          <path pathLength="1" d="M170 66 L170 82" />
          <path pathLength="1" d="M310 66 L310 82" />
        </g>
      </g>
    </svg>
  );
}

function Sketch() {
  const cube = iso(252, 352, 128);
  return (
    <svg className="sketch-wide" aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={sketchStyle}>
      <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <IsoCube cx={252} cy={352} r={128} />
        <g strokeOpacity="0.085" strokeWidth="0.7" strokeDasharray="5 6">
          <path pathLength="1" d={`M${p(cube.ul)} L${cube.ul[0] - 46} ${cube.ul[1]}`} />
          <path pathLength="1" d={`M${p(cube.ll)} L${cube.ll[0] - 46} ${cube.ll[1]}`} />
          <path pathLength="1" d={`M${cube.ll[0]} ${cube.ll[1]} L${cube.ll[0]} 596`} />
          <path pathLength="1" d={`M${cube.lr[0]} ${cube.lr[1]} L${cube.lr[0]} 596`} />
        </g>
        <DimH x1={cube.ll[0]} x2={cube.lr[0]} y={572} />
        <g strokeOpacity="0.13" strokeWidth="0.9">
          <path pathLength="1" d={`M${cube.ul[0] - 40} ${cube.ul[1]} L${cube.ul[0] - 40} ${cube.ll[1]}`} />
          <path pathLength="1" d={`M${cube.ul[0] - 45} ${cube.ul[1] + 10} L${cube.ul[0] - 40} ${cube.ul[1]} L${cube.ul[0] - 35} ${cube.ul[1] + 10}`} />
          <path pathLength="1" d={`M${cube.ul[0] - 45} ${cube.ll[1] - 10} L${cube.ul[0] - 40} ${cube.ll[1]} L${cube.ul[0] - 35} ${cube.ll[1] - 10}`} />
        </g>

        <Extrude x={1064} y={196} w={292} h={196} d={24} />
        <Target cx={1184} cy={656} r={118} />

        <g strokeOpacity="0.12" strokeWidth="0.95">
          <path pathLength="1" d="M136 704 L136 828 L260 828" />
          <path pathLength="1" d="M136 828 L260 704" />
          <path pathLength="1" d="M160 828 L160 804 L184 804" />
        </g>
        <g className="hatch" strokeOpacity="0.07" strokeWidth="0.65">
          {hatch(136, 704, 124, 124, 15).map((d, i) => <path pathLength="1" key={`hy${i}`} d={d} />)}
        </g>

        <g strokeOpacity="0.1" strokeWidth="0.85">
          <path pathLength="1" d="M488 92 L636 92" />
          <path pathLength="1" d="M488 84 L488 100" />
          <path pathLength="1" d="M636 84 L636 100" />
          <path pathLength="1" d="M868 820 L1016 820" />
          <path pathLength="1" d="M868 812 L868 828" />
          <path pathLength="1" d="M1016 812 L1016 828" />
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
    <div className="panel panel-tl" style={{ "--w": "clamp(92px, 19.13vw, 220px)", "--ar": `${W} / ${H}`, position: "absolute", top: 0, left: 0, background: "#6A72F0", overflow: "hidden", zIndex: 2, borderRadius: "0 0 18px 0" } as CSSProperties}>
      <svg viewBox={`0 0 ${W} ${H}`}>
        {spokes.map(({ a, r }, i) => {
          const rad = a * Math.PI / 180;
          const x2 = (W + Math.cos(rad) * r).toFixed(1);
          const y2 = (H + Math.sin(rad) * r).toFixed(1);
          return (
            <g key={i}>
              <line pathLength="1" x1={W} y1={H} x2={x2} y2={y2} stroke="rgba(255,255,255,0.42)" strokeWidth="0.9" />
              <circle pathLength="1" cx={x2} cy={y2} r="3" fill="rgba(255,255,255,0.28)" />
            </g>
          );
        })}
        <circle pathLength="1" cx={W} cy={H} r="9" fill="rgba(255,255,255,0.25)" />
        <circle pathLength="1" cx={W} cy={H} r="4" fill="rgba(255,255,255,0.75)" />
      </svg>
    </div>
  );
}

function PanelArch() {
  return (
    <div style={{ position: "absolute", top: 0, right: "44.068%", width: "55.932%", height: "100%", background: "#EACBA3", overflow: "hidden", borderRadius: "0 0 18px 18px" }}>
      <svg viewBox="0 0 165 195">
        <line pathLength="1" x1="82" y1="95" x2="34" y2="42"  stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line pathLength="1" x1="82" y1="95" x2="136" y2="52"  stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line pathLength="1" x1="82" y1="95" x2="28"  y2="152" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line pathLength="1" x1="82" y1="95" x2="138" y2="148" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <line pathLength="1" x1="82" y1="95" x2="82"  y2="172" stroke="rgba(130,80,20,0.3)" strokeWidth="1.2" />
        <circle pathLength="1" cx="82" cy="95" r="22" fill="none" stroke="rgba(130,80,20,0.35)" strokeWidth="1.8" />
        <circle pathLength="1" cx="82" cy="95" r="10" fill="rgba(130,80,20,0.2)" />
        {[
          [34,  42, 12], [136, 52, 10], [28, 152, 14],
          [138, 148, 11], [82, 172, 9],
        ].map(([cx, cy, r], i) => (
          <circle pathLength="1" key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(130,80,20,0.32)" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

function PanelGrid() {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: "44.068%", height: "100%", background: "#2563EB", overflow: "hidden", borderRadius: "0 0 0 18px" }}>
      <svg viewBox="0 0 130 195">
        <rect pathLength="1" x="10" y="14" width="110" height="20" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect pathLength="1" x="10" y="14" width="52" height="20" rx="4" fill="rgba(255,255,255,0.28)" />
        {Array.from({ length: 7 }, (_, row) => (
          <g key={row}>
            <rect pathLength="1" x="10"  y={44 + row * 20} width="50" height="12" rx="3" fill="rgba(255,255,255,0.12)" />
            <rect pathLength="1" x="68"  y={44 + row * 20} width="52" height="12" rx="3" fill="rgba(255,255,255,0.09)" />
            <line pathLength="1" x1="10" y1={40 + row * 20} x2="120" y2={40 + row * 20} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}
        <line pathLength="1" x1="64" y1="14" x2="64" y2="190" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
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
    <div className="panel panel-bl" style={{ "--w": "clamp(90px, 18.7vw, 215px)", "--ar": "215 / 160", position: "absolute", bottom: 0, left: 0, background: "#0F1C33", overflow: "hidden", zIndex: 2, borderRadius: "0 18px 0 0" } as CSSProperties}>
      <svg viewBox="0 0 215 160">
        <rect pathLength="1" x="0" y="0" width="215" height="22" fill="rgba(255,255,255,0.06)" />
        <circle pathLength="1" cx="14" cy="11" r="4" fill="rgba(255,80,80,0.5)" />
        <circle pathLength="1" cx="28" cy="11" r="4" fill="rgba(255,180,50,0.5)" />
        <circle pathLength="1" cx="42" cy="11" r="4" fill="rgba(80,200,100,0.5)" />
        {lines.map(({ w, color }, i) => (
          <rect pathLength="1" key={i} x="14" y={32 + i * 16} width={w} height="7" rx="2" fill={color} />
        ))}
        <rect pathLength="1" x="14" y={32 + lines.length * 16} width="7" height="10" rx="1" fill="rgba(255,255,255,0.55)" />
      </svg>
    </div>
  );
}

function PanelChart() {
  const pts = "14,108 44,90 74,98 104,64 134,74 164,46 194,56 224,32";
  const areaPts = `14,120 ${pts} 224,120`;
  return (
    <div className="panel panel-br" style={{ "--w": "clamp(105px, 21.74vw, 250px)", "--ar": "250 / 165", position: "absolute", bottom: 0, right: 0, background: "#3DB5A8", overflow: "hidden", zIndex: 2, borderRadius: "18px 0 0 0" } as CSSProperties}>
      <svg viewBox="0 0 250 165">
        <line pathLength="1" x1="14" y1="12"  x2="14"  y2="128" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <line pathLength="1" x1="14" y1="128" x2="236" y2="128" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        {[0, 1, 2, 3].map(i => (
          <line pathLength="1" key={i} x1="14" y1={128 - (i + 1) * 28} x2="236" y2={128 - (i + 1) * 28}
            stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        <polygon pathLength="1" points={areaPts} fill="rgba(255,255,255,0.12)" />
        <polyline pathLength="1" points={pts} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.split(" ").map((p, i) => {
          const [x, y] = p.split(",");
          return <circle pathLength="1" key={i} cx={x} cy={y} r="3.5" fill="white" fillOpacity="0.85" />;
        })}
        {[0, 1, 2, 3].map(i => (
          <rect pathLength="1" key={i} x="4" y={128 - (i + 1) * 28 - 0.5} width="7" height="1" fill="rgba(255,255,255,0.45)" />
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
  .hero { min-height: 100vh; min-height: 100svh; }
  .hero-rest-wrap { display: grid; grid-template-rows: 1fr; align-self: stretch; }
  .hero-rest { display: flex; flex-direction: column; align-items: center; min-height: 0; overflow: clip; }
  .svc-tag   { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; color: #9CA3AF; text-decoration: none; transition: color 0.18s; }

  .footer    { position: relative; z-index: 4; border-top: 1px solid rgba(11,15,26,0.08); padding: clamp(12px, 1.6vw, 22px) clamp(16px, 2.8vw, 40px); display: flex; justify-content: space-between; align-items: center; gap: clamp(10px, 2vw, 24px); background: #E5E4DF; }
  .footer-t  { font-family: 'DM Mono', monospace; font-size: clamp(8px, 0.85vw, 11px); line-height: 1.5; color: #9CA3AF; letter-spacing: clamp(0.01em, 0.08vw, 0.07em); }
  .footer-t + .footer-t { white-space: nowrap; }

  .panel {
    width: var(--w);
    aspect-ratio: var(--ar);
    height: auto;
  }
  .panel svg { display: block; width: 100%; height: 100%; }


  html { scroll-behavior: smooth; scroll-padding-top: 56px; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

  .svc-tag:hover { color: #0B0F1A; }

  .svc-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 6; display: flex; align-items: center; gap: clamp(16px, 3vw, 40px); padding: 0 clamp(16px, 2.8vw, 40px); height: 48px; background: #E5E4DF; border-bottom: 1px solid rgba(11,15,26,0.08); }
  .svc-nav-brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: #0B0F1A; font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 10px; letter-spacing: 0.16em; flex: 0 0 auto; }
  .svc-nav-links { display: flex; gap: clamp(14px, 2.2vw, 28px); flex: 1 1 auto; min-width: 0; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; padding-right: 28px; mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent); }
  .svc-nav-links::-webkit-scrollbar { display: none; }
  .svc-nav-links a { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; color: #6B7280; text-decoration: none; white-space: nowrap; transition: color 0.18s; }
  .svc-nav-links a:hover { color: #0B0F1A; }
  .svc-nav-mail { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 13px; color: #0B0F1A; text-decoration: none; flex: 0 0 auto; transition: opacity 0.2s; }
  .svc-nav-mail:hover { opacity: 0.7; }
  .svc-nav-lang { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.13em; color: #0B0F1A; text-decoration: none; flex: 0 0 auto; padding: 4px 7px; border: 1px solid rgba(11,15,26,0.18); border-radius: 4px; transition: background 0.18s, color 0.18s; }
  .svc-nav-lang:hover { background: #0B0F1A; color: #E5E4DF; }

  .svc-menu { display: none; margin-left: auto; }
  .svc-menu summary { list-style: none; display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 40px; height: 40px; margin-right: -10px; padding: 0 10px; cursor: pointer; }
  .svc-menu summary::-webkit-details-marker { display: none; }
  .svc-menu summary span { display: block; height: 1.5px; background: #0B0F1A; transition: transform 0.2s, opacity 0.2s; }
  .svc-menu[open] summary span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .svc-menu[open] summary span:nth-child(2) { opacity: 0; }
  .svc-menu[open] summary span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  .svc-menu-panel { position: absolute; top: 48px; left: 0; right: 0; display: flex; flex-direction: column; padding: 8px 0 12px; background: #E5E4DF; border-bottom: 1px solid rgba(11,15,26,0.08); }
  .svc-menu-panel a { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; color: #0B0F1A; text-decoration: none; padding: 13px clamp(16px, 2.8vw, 40px); border-top: 1px solid rgba(11,15,26,0.06); }
  .svc-menu-panel a:first-child { border-top: 0; }
  .svc-menu-panel .svc-menu-mail { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; letter-spacing: -0.01em; text-transform: none; color: #6B7280; }

  .svc-wrap { position: relative; }
  .paper-grid, .svc-backdrop { background-image: linear-gradient(rgba(11,15,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,15,26,0.05) 1px, transparent 1px); background-size: 64px 64px; background-position: center top; }
  .paper-grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .svc-backdrop { position: sticky; top: 0; height: 100vh; margin-bottom: -100vh; z-index: 0; overflow: hidden; pointer-events: none; }

  .svc-layer { position: absolute; left: 0; top: -16%; width: 100%; height: 132%; }
  .svc-layer-n { display: none; }
  .svc-spin { transform-box: fill-box; transform-origin: center; }
  .svc-motif { view-timeline-name: --motif; view-timeline-axis: block; }

  .svc-intro { position: relative; z-index: 4; display: grid; align-content: center; min-height: 100vh; padding: clamp(72px, 8vw, 120px) clamp(16px, 2.8vw, 40px); max-width: 1180px; margin: 0 auto; width: 100%; scroll-snap-align: start; }
  .svc-intro .hero-tag { margin-bottom: 22px; }
  .svc-intro-h { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: clamp(24px, 3.4vw, 40px); letter-spacing: -0.025em; line-height: 1.16; color: #0B0F1A; max-width: 760px; margin-bottom: 22px; }
  .svc-intro-p { font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 300; line-height: 1.75; color: #6B7280; max-width: 520px; }

  .svc-sec { position: relative; z-index: 4; display: grid; grid-template-columns: 4px minmax(0, 1fr); column-gap: clamp(18px, 3vw, 44px); align-content: center; min-height: 100vh; max-width: 1180px; margin: 0 auto; width: 100%; padding: clamp(72px, 8vw, 120px) clamp(16px, 2.8vw, 40px); scroll-snap-align: start; scroll-snap-stop: always; }
  .svc-rail { position: relative; }
  .svc-rail::before { content: ""; position: absolute; inset: 0; width: 4px; border-radius: 2px; background: var(--rail); opacity: 0.16; }
  .svc-rail div { position: sticky; top: 72px; width: 4px; height: clamp(64px, 14vh, 128px); border-radius: 2px; background: var(--rail); }
  .svc-body { position: relative; min-width: 0; }

  .svc-motif { position: absolute; right: clamp(-48px, -2vw, 0px); top: clamp(-150px, -10vw, -56px); width: clamp(220px, 28vw, 400px); height: auto; opacity: 0.9; pointer-events: none; z-index: -1; }

  .svc-head { display: flex; align-items: center; gap: clamp(12px, 1.8vw, 22px); }
  .svc-rule { flex: 0 0 clamp(24px, 4vw, 48px); height: 1px; background: var(--accent); }
  .svc-title { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: clamp(22px, 3.2vw, 38px); letter-spacing: -0.025em; line-height: 1.1; color: #0B0F1A; }

  .svc-items { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: clamp(28px, 3.4vw, 48px) clamp(28px, 4vw, 64px); margin-top: clamp(32px, 4.4vw, 60px); }
  .svc-item { position: relative; padding-top: 18px; border-top: 1px solid rgba(11,15,26,0.12); }
  .svc-item::before { content: ""; position: absolute; top: -4px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  .svc-item h3 { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 16px; letter-spacing: -0.01em; line-height: 1.35; color: #0B0F1A; margin-bottom: 8px; }
  .svc-lead { font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 300; line-height: 1.65; color: #4B5563; }
  .svc-detail { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; line-height: 1.7; color: #9CA3AF; margin-top: 10px; }

  .svc-how { min-height: 100vh; }
  .svc-how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(20px, 3vw, 48px); margin-top: clamp(28px, 4vw, 52px); max-width: 900px; }
  .svc-how-p { font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 300; line-height: 1.7; color: #4B5563; }
  .svc-mail { margin-top: clamp(32px, 4vw, 56px); }

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes expand { from { grid-template-rows: 0fr; } to { grid-template-rows: 1fr; } }
  @keyframes settle { from { scale: 1.4; translate: 0 var(--lift, 0px); } to { scale: 1; translate: 0 0; } }
  @keyframes rise-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  @keyframes brand-fade { from { opacity: 0.01; } to { opacity: 1; } }
  @keyframes brand-in { from { opacity: 0.01; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  @keyframes panel-in { from { opacity: 0.01; translate: var(--ix) var(--iy); } to { opacity: 1; translate: 0 0; } }

  @media (prefers-reduced-motion: no-preference) {
    .hero-brand, .hero-main .hero-tag, .hero-h1, .hero-sub, .hero-main .mail-row, .hero-tags { animation: rise-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: var(--d); }
    .hero-brand { --d: 0.2s; animation: brand-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both, settle 0.9s cubic-bezier(0.65, 0, 0.35, 1) 1s both; animation-delay: var(--d), 1s; }
    .hero-rest-wrap { animation: expand 0.9s cubic-bezier(0.65, 0, 0.35, 1) 1s both; }
    .hero-brand svg path { stroke-dasharray: 1 2; animation: svc-draw 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.25s both; }
    .hero-brand span { animation: brand-fade 0.6s ease-out 0.7s both; }
    .hero-main .hero-tag { --d: 1.6s; }
    .hero-h1 { --d: 1.68s; }
    .hero-sub { --d: 1.8s; }
    .hero-main .mail-row { --d: 1.9s; }
    .hero-tags { --d: 2s; }
    .panel-tl, .panel-tr, .panel-bl, .panel-br { animation: panel-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: var(--d); }
    .panel-tl { --ix: -40px; --iy: -40px; --d: 1.2s; }
    .panel-tr { --ix: 40px; --iy: -40px; --d: 1.28s; }
    .panel-bl { --ix: -40px; --iy: 40px; --d: 1.36s; }
    .panel-br { --ix: 40px; --iy: 40px; --d: 1.44s; }
    :is(.sketch-wide, .sketch-narrow) :is(path, circle, rect):not(.hatch *) { stroke-dasharray: 1 2; animation: svc-draw 2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both; }
    :is(.sketch-wide, .sketch-narrow) .hatch { animation: fade-in 1s ease-out 1.2s both; }
    .panel svg > * { --i: 0; }
    .panel svg > *:nth-child(2) { --i: 1; }
    .panel svg > *:nth-child(3) { --i: 2; }
    .panel svg > *:nth-child(4) { --i: 3; }
    .panel svg > *:nth-child(5) { --i: 4; }
    .panel svg > *:nth-child(6) { --i: 5; }
    .panel svg > *:nth-child(7) { --i: 6; }
    .panel svg > *:nth-child(8) { --i: 7; }
    .panel svg > *:nth-child(9) { --i: 8; }
    .panel svg > *:nth-child(10) { --i: 9; }
    .panel svg > *:nth-child(11) { --i: 10; }
    .panel svg > *:nth-child(12) { --i: 11; }
    .panel svg > *:nth-child(13) { --i: 12; }
    .panel svg > *:nth-child(14) { --i: 13; }
    .panel svg > *:nth-child(15) { --i: 14; }
    .panel svg > *:nth-child(16) { --i: 15; }
    .panel svg > :is(line, polyline, path, circle[fill="none"]) { stroke-dasharray: 1 2; animation: svc-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1) both; animation-delay: calc(var(--pd) + var(--i) * 35ms); }
    .panel svg > :is(g, rect, polygon, text, circle:not([fill="none"])) { animation: fade-in 0.5s ease-out both; animation-delay: calc(var(--pd) + var(--i) * 35ms); }
    .panel-tl { --pd: 1.55s; }
    .panel-tr { --pd: 1.62s; }
    .panel-bl { --pd: 1.7s; }
    .panel-br { --pd: 1.78s; }
  }

  @keyframes svc-nav-in { from { transform: translateY(-100%); } to { transform: none; } }
  @keyframes hero-drift { from { transform: none; opacity: 1; } to { transform: translateY(28%); opacity: 0; } }
  @keyframes svc-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes svc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
  @keyframes panel-out { from { transform: none; } to { transform: translate(var(--ox), var(--oy)); } }
  @keyframes panel-round { to { border-radius: 18px; } }

  @supports (animation-timeline: view()) {
    #top { timeline-scope: --hero; }
    .hero { view-timeline-name: --hero; view-timeline-axis: block; }
    .svc-nav { animation: svc-nav-in linear both; animation-timeline: --hero; animation-range: exit 84% exit 100%; }
    .svc-layer-far { animation: svc-drift-far linear both, svc-fade linear both; animation-timeline: scroll(root block), --hero; animation-range: normal, exit 25% exit 85%; }
    .svc-layer-near { animation: svc-drift-near linear both, svc-fade linear both; animation-timeline: scroll(root block), --hero; animation-range: normal, exit 25% exit 85%; }
    @media (prefers-reduced-motion: no-preference) {
      .sketch-wide, .sketch-narrow { animation: hero-drift linear both; animation-timeline: --hero; animation-range: exit 0% exit 100%; }
      .panel-tl, .panel-tr, .panel-bl, .panel-br { animation: panel-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both, panel-out linear both; animation-delay: var(--d), 0s; animation-timeline: auto, --hero; animation-range: normal, exit 0% exit 70%; }
      .panel-tl { --ox: -110%; --oy: -110%; }
      .panel-tr { --ox: 110%; --oy: -110%; }
      .panel-bl, .panel-br { animation: panel-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both, panel-out linear both, panel-round linear both; animation-delay: var(--d), 0s, 0s; animation-timeline: auto, --hero, --hero; animation-range: normal, exit 0% exit 70%, exit 0% exit 12%; }
      .panel-bl { --ox: -120%; --oy: 0; }
      .panel-br { --ox: 120%; --oy: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .svc-layer-far, .svc-layer-near { animation: svc-fade linear both; animation-timeline: --hero; animation-range: exit 25% exit 85%; }
    }
  }

  @keyframes svc-float { from { transform: translateY(44px); } to { transform: translateY(-44px); } }
  @keyframes svc-in { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
  @keyframes svc-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(-40px); } }
  @keyframes svc-drift { from { background-position: center 0; } to { background-position: center -180px; } }
  @keyframes svc-drift-far { from { transform: translateY(5%); } to { transform: translateY(-5%); } }
  @keyframes svc-drift-near { from { transform: translateY(12%); } to { transform: translateY(-12%); } }
  @keyframes svc-spin { from { transform: rotate(0deg); } to { transform: rotate(120deg); } }

  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .svc-motif { animation: svc-float linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
      .svc-motif :is(path, circle, rect):not(.hatch *) { stroke-dasharray: 1 2; animation: svc-draw linear both; animation-timeline: --motif; animation-range: cover 0% exit 0%; }
      .svc-motif .hatch { animation: fade-in linear both; animation-timeline: --motif; animation-range: cover 20% exit 0%; }
      .svc-layer-far :is(path, circle, rect):not(.hatch *) { stroke-dasharray: 1 2; animation: svc-draw linear both; animation-timeline: --hero; animation-range: exit 20% exit 100%; }
      .svc-layer-near :is(path, circle, rect):not(.hatch *) { stroke-dasharray: 1 2; animation: svc-draw linear both; animation-timeline: scroll(root block); animation-range: 5% 45%; }
      .svc-intro, .svc-sec { animation: svc-in linear both, svc-out linear both; animation-timeline: view(), view(); animation-range: entry 45% entry 95%, exit 5% exit 55%; }
      .svc-backdrop { animation: svc-drift linear both; animation-timeline: scroll(root block); }
      .svc-spin { animation: svc-spin linear both; animation-timeline: scroll(root block); }
    }
  }

  @media (min-width: 761px) {
    html { scroll-snap-type: y mandatory; scroll-padding-top: 0; }
    .hero { scroll-snap-align: start; }
    .svc-intro, .svc-sec { height: 100vh; overflow: hidden; }
  }

  @media (max-width: 760px) {
    .svc-motif { display: none; }
    .hero-brand { --lift: -6vh; }
    .svc-intro { min-height: 60vh; }
    .svc-layer-w { display: none; }
    .svc-layer-n { display: block; }
    .svc-nav-mail { display: none; }
    .svc-nav-links { display: none; }
    .svc-menu { display: block; }
    .svc-rail div { top: 64px; }
  }

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

export default function App({ lang = "en" }: { lang?: Lang }) {
  const copy = languages[lang];
  const other = languages[copy.nav.switchLang];
  const { domains } = copy;
  return (
    <div id="top" style={{ background: "#E5E4DF", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Noise />
      <nav className="svc-nav" aria-label="Sections">
        <a href="#top" className="svc-nav-brand">
          <Spiral size={18} sw={11} color="#0B0F1A" />
          <span>SPIRALES</span>
        </a>
        <div className="svc-nav-links">
          {domains.map(d => (
            <a key={d.id} href={`#${d.id}`}>{d.title}</a>
          ))}
          <a href="#how">{copy.nav.how}</a>
        </div>
        <a href="mailto:hello@spirales.tech" className="svc-nav-mail">hello@spirales.tech</a>
        <a href={other.path} hrefLang={other.lang} lang={other.lang} data-lang={other.lang} className="svc-nav-lang">{copy.nav.switchLabel}</a>
        <details className="svc-menu">
          <summary aria-label={copy.nav.menu}>
            <span />
            <span />
            <span />
          </summary>
          <div className="svc-menu-panel">
            {domains.map(d => (
              <a key={d.id} href={`#${d.id}`}>{d.title}</a>
            ))}
            <a href="#how">{copy.nav.how}</a>
            <a href={other.path} hrefLang={other.lang} lang={other.lang} data-lang={other.lang}>{copy.nav.switchLabel}</a>
            <a href="mailto:hello@spirales.tech" className="svc-menu-mail">hello@spirales.tech</a>
          </div>
        </details>
      </nav>


      <div className="hero" style={{ position: "relative", overflow: "clip visible", display: "flex", flexDirection: "column" }}>
        <div className="paper-grid" aria-hidden="true" />
        <Sketch />
        <SketchNarrow />
        <PanelRadial />
        <div
          className="panel panel-tr"
          style={{ "--w": "clamp(124px, 25.65vw, 295px)", "--ar": "295 / 195", position: "absolute", top: 0, right: 0, zIndex: 2 } as CSSProperties}
        >
          <PanelArch />
          <PanelGrid />
        </div>
        <PanelTerminal />
        <PanelChart />

        <main className="hero-main" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 48px", textAlign: "center", position: "relative", zIndex: 4 }}>

          <div className="hero-brand" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
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

          <div className="hero-rest-wrap">
            <div className="hero-rest">
              <p className="hero-tag">
                <span style={{ display: "inline-block", width: 24, height: 1, background: "#6B7280" }} />
                {copy.hero.tag}
              </p>

              <h1 className="hero-h1">{copy.hero.h1[0]}<br />{copy.hero.h1[1]}</h1>

              <p className="hero-sub">{copy.hero.sub}</p>

              <span className="mail-row">
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

              <div className="hero-tags">
                {domains.map(d => (
                  <a key={d.id} href={`#${d.id}`} className="svc-tag">{d.title}</a>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>

      <Services copy={copy} />

      <footer className="footer">
        <span className="footer-t">© <span data-year>{new Date().getFullYear()}</span> Socialinės savidestrukcijos spiralės multiplikavimo biuras</span>
        <span className="footer-t">hello@spirales.tech</span>
      </footer>
    </div>
  );
}
