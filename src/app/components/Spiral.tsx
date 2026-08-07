export const SPIRAL_PATH =
  "M 34.2,61.3 " +
  "A 2.4,2.4,0,0,1 31.8,58.9 " +
  "A 3.8,3.8,0,0,1 35.6,55.1 " +
  "A 6.3,6.3,0,0,1 41.9,61.4 " +
  "A 10.1,10.1,0,0,1 31.8,71.5 " +
  "A 16.4,16.4,0,0,1 15.4,55.1 " +
  "A 26.5,26.5,0,0,1 41.9,28.6 " +
  "A 42.8,42.8,0,0,1 84.7,71.4";

export const SPIRAL_STROKE = 11;

export function Spiral({
  size,
  sw = SPIRAL_STROKE,
  color = "#FFFFFF",
}: {
  size: number;
  sw?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ display: "block" }}
      role="img"
      aria-label="SPIRALES"
    >
      <path
        d={SPIRAL_PATH}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
