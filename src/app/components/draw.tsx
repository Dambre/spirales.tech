export const ink = "#0B0F1A";

export const iso = (cx: number, cy: number, r: number) => {
  const dx = r * 0.866, dy = r * 0.5;
  return {
    top: [cx, cy - r], ur: [cx + dx, cy - dy], lr: [cx + dx, cy + dy],
    bot: [cx, cy + r], ll: [cx - dx, cy + dy], ul: [cx - dx, cy - dy], c: [cx, cy],
  } as Record<string, number[]>;
};

export const p = (a: number[]) => `${a[0]} ${a[1]}`;

export const hatch = (x: number, y: number, w: number, h: number, gap: number) => {
  const out: string[] = [];
  for (let o = -h + gap; o < w; o += gap) {
    const x1 = Math.max(x, x + o);
    const x2 = Math.min(x + w, x + o + h);
    if (x2 <= x1) continue;
    out.push(`M${x1} ${y + (x1 - (x + o))} L${x2} ${y + (x2 - (x + o))}`);
  }
  return out;
};

export function IsoCube({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const c = iso(cx, cy, r);
  return (
    <g strokeOpacity="0.15" strokeWidth="1.15">
      <path pathLength="1" d={`M${p(c.top)} L${p(c.ur)} L${p(c.lr)} L${p(c.bot)} L${p(c.ll)} L${p(c.ul)} Z`} />
      <path pathLength="1" d={`M${p(c.c)} L${p(c.top)}`} />
      <path pathLength="1" d={`M${p(c.c)} L${p(c.lr)}`} />
      <path pathLength="1" d={`M${p(c.c)} L${p(c.ll)}`} />
    </g>
  );
}

export function DimH({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g strokeOpacity="0.13" strokeWidth="0.9">
      <path pathLength="1" d={`M${x1} ${y} L${x2} ${y}`} />
      <path pathLength="1" d={`M${x1} ${y - 8} L${x1} ${y + 8}`} />
      <path pathLength="1" d={`M${x2} ${y - 8} L${x2} ${y + 8}`} />
      <path pathLength="1" d={`M${x1 + 10} ${y - 5} L${x1} ${y} L${x1 + 10} ${y + 5}`} />
      <path pathLength="1" d={`M${x2 - 10} ${y - 5} L${x2} ${y} L${x2 - 10} ${y + 5}`} />
    </g>
  );
}

export function Target({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g strokeOpacity="0.14" strokeWidth="1.05">
      <circle pathLength="1" cx={cx} cy={cy} r={r} />
      <circle pathLength="1" cx={cx} cy={cy} r={r * 0.63} />
      <circle pathLength="1" cx={cx} cy={cy} r="3" />
      <path pathLength="1" d={`M${cx} ${cy - r - 36} L${cx} ${cy + r + 36}`} strokeOpacity="0.08" strokeWidth="0.7" strokeDasharray="9 7" />
      <path pathLength="1" d={`M${cx - r - 36} ${cy} L${cx + r + 36} ${cy}`} strokeOpacity="0.08" strokeWidth="0.7" strokeDasharray="9 7" />
      <path pathLength="1" d={`M${cx} ${cy} L${cx + r * 0.7} ${cy - r * 0.7}`} />
    </g>
  );
}

export function Extrude({ x, y, w, h, d }: { x: number; y: number; w: number; h: number; d: number }) {
  return (
    <>
      <g strokeOpacity="0.14" strokeWidth="1.05">
        <rect pathLength="1" x={x} y={y} width={w} height={h} />
        <rect pathLength="1" x={x + d} y={y + d} width={w} height={h} />
        <path pathLength="1" d={`M${x} ${y} L${x + d} ${y + d}`} />
        <path pathLength="1" d={`M${x + w} ${y} L${x + w + d} ${y + d}`} />
        <path pathLength="1" d={`M${x} ${y + h} L${x + d} ${y + h + d}`} />
        <path pathLength="1" d={`M${x + w} ${y + h} L${x + w + d} ${y + h + d}`} />
      </g>
      <g className="hatch" strokeOpacity="0.075" strokeWidth="0.65">
        {hatch(x, y, w, h, 17).map((line, i) => <path pathLength="1" key={i} d={line} />)}
      </g>
    </>
  );
}
