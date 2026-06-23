import { useEffect, useState } from 'react';
import type { AxisResult } from '../lib/scoring';

interface Props {
  axisResults: AxisResult[];
}

const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 100;

function polarToCart(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  };
}

function polygonPoints(values: number[], maxR = R) {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i;
      const r = (v / 100) * maxR;
      const p = polarToCart(angle, r);
      return `${p.x},${p.y}`;
    })
    .join(' ');
}

const GRID_LEVELS = [0.25, 0.5, 0.75];
const N = 5;
const LABEL_OFFSET = 22;

export default function RadarChart({ axisResults }: Props) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scores = axisResults.map((r) => (animated ? r.score : 0));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[280px] mx-auto"
      aria-label="採用力レーダーチャート"
    >
      {/* grid polygons */}
      {GRID_LEVELS.map((level) => (
        <polygon
          key={level}
          points={polygonPoints(Array(N).fill(level * 100))}
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
        />
      ))}
      {/* axis lines */}
      {Array.from({ length: N }, (_, i) => {
        const angle = (360 / N) * i;
        const outer = polarToCart(angle, R);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={outer.x}
            y2={outer.y}
            stroke="var(--line)"
            strokeWidth="1"
          />
        );
      })}
      {/* score polygon */}
      <polygon
        points={polygonPoints(scores)}
        fill="var(--green)"
        fillOpacity="0.2"
        stroke="var(--green)"
        strokeWidth="2"
        style={{ transition: 'all 800ms ease-out' }}
      />
      {/* axis labels */}
      {axisResults.map((r, i) => {
        const angle = (360 / N) * i;
        const p = polarToCart(angle, R + LABEL_OFFSET);
        return (
          <text
            key={r.axis}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--navy)"
            fontSize="12"
            fontWeight="700"
          >
            {r.axis}
          </text>
        );
      })}
    </svg>
  );
}
