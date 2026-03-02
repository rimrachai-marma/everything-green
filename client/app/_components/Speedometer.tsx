"use client";

import { useState, useEffect, useRef, JSX } from "react";

interface ColorBand {
  from: number;
  to: number;
  color: string;
}
interface Point {
  x: number;
  y: number;
}

const COLORS: ColorBand[] = [
  { from: 0, to: 20, color: "#FF4444" },
  { from: 20, to: 40, color: "#FF7043" },
  { from: 40, to: 50, color: "#FFD600" },
  { from: 50, to: 60, color: "#C6D930" },
  { from: 60, to: 80, color: "#8BC34A" },
  { from: 80, to: 100, color: "#4CAF50" },
];

const CX = 200,
  CY = 210;
const OUTER = 155;
const TICK_OUTER = 148,
  TICK_INNER_MAJOR = 130,
  TICK_INNER_MINOR = 136;
const BAND_OUTER = 160,
  BAND_INNER = 140;
const LABELS = [0, 10, 20, 40, 60, 80, 100];

const getColorForValue = (v: number): string => COLORS.find((c) => v >= c.from && v <= c.to)?.color ?? "#4CAF50";

const valueToAngle = (v: number): number => -180 + (v / 100) * 180;

const polar = (cx: number, cy: number, r: number, deg: number): Point => ({
  x: cx + r * Math.cos((deg * Math.PI) / 180),
  y: cy + r * Math.sin((deg * Math.PI) / 180),
});

const arcPath = (cx: number, cy: number, r: number, a1: number, a2: number): string => {
  const s = polar(cx, cy, r, a1),
    e = polar(cx, cy, r, a2);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
};

const needlePath = (cx: number, cy: number, angle: number, len = 92, base = 5): string => {
  const tip = polar(cx, cy, len, angle);
  const l = polar(cx, cy, base, angle - 90);
  const r = polar(cx, cy, base, angle + 90);
  return `M ${l.x} ${l.y} L ${tip.x} ${tip.y} L ${r.x} ${r.y} Z`;
};

const BAND_SEGMENTS = COLORS.map(({ from, to, color }) => {
  const a1 = -180 + (from / 100) * 180,
    a2 = -180 + (to / 100) * 180;
  const so = polar(CX, CY, BAND_OUTER, a1),
    eo = polar(CX, CY, BAND_OUTER, a2);
  const si = polar(CX, CY, BAND_INNER, a1),
    ei = polar(CX, CY, BAND_INNER, a2);
  const lg = a2 - a1 > 180 ? 1 : 0;
  return {
    color,
    d: `M ${so.x} ${so.y} A ${BAND_OUTER} ${BAND_OUTER} 0 ${lg} 1 ${eo.x} ${eo.y}
        L ${ei.x} ${ei.y} A ${BAND_INNER} ${BAND_INNER} 0 ${lg} 0 ${si.x} ${si.y} Z`,
  };
});

interface SpeedometerProps {
  value: number;
}

const SWEEP_DURATION = 1200;
const RETURN_DURATION = 900;
const PAUSE_DURATION = 500;

export default function Speedometer({ value }: SpeedometerProps): JSX.Element {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [animAngle, setAnimAngle] = useState<number>(valueToAngle(0));
  const animRef = useRef<number | null>(null);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const animateSegment = (fromVal: number, toVal: number, duration: number, onDone: () => void) => {
      const fromAngle = valueToAngle(fromVal);
      const toAngle = valueToAngle(toVal);
      let startTs: number | null = null;

      const animate = (ts: number) => {
        if (!startTs) startTs = ts;
        const t = Math.min((ts - startTs) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setAnimAngle(fromAngle + (toAngle - fromAngle) * ease);
        setDisplayValue(Math.round(fromVal + (toVal - fromVal) * ease));
        if (t < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          onDone();
        }
      };

      animRef.current = requestAnimationFrame(animate);
    };

    const runSweep = () => {
      animateSegment(0, value, SWEEP_DURATION, () => {
        loopRef.current = setTimeout(() => {
          animateSegment(value, 0, RETURN_DURATION, () => {
            loopRef.current = setTimeout(runSweep, 200);
          });
        }, PAUSE_DURATION);
      });
    };

    runSweep();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [value]);

  const needleColor = getColorForValue(displayValue);

  const ticks = Array.from({ length: 51 }, (_, idx) => {
    const i = idx * 2;
    const angle = -180 + (i / 100) * 180;
    const isMajor = i % 10 === 0;
    const p1 = polar(CX, CY, TICK_OUTER, angle);
    const p2 = polar(CX, CY, isMajor ? TICK_INNER_MAJOR : TICK_INNER_MINOR, angle);
    return (
      <line
        key={i}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="white"
        strokeWidth={isMajor ? 2 : 1}
        strokeOpacity={0.9}
      />
    );
  });

  const VB_X = 15,
    VB_Y = 25,
    VB_W = 370,
    VB_H = 215;

  return (
    <div className="mx-auto border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-manrope font-bold text-[15px] leading-tight text-[#0a0a0a]">Green Keyword Manager</h3>
      <div className="p-5">
        <svg
          width="100%"
          height="auto"
          viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
          style={{ display: "block", maxWidth: 420 }}
          overflow="visible"
        >
          <defs>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#167A60" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#167A60" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={`M ${polar(CX, CY, OUTER, -180).x} ${polar(CX, CY, OUTER, -180).y}
              A ${OUTER} ${OUTER} 0 0 1 ${polar(CX, CY, OUTER, 0).x} ${polar(CX, CY, OUTER, 0).y}
              L ${CX} ${CY} Z`}
            fill="url(#faceGrad)"
          />

          <path d={arcPath(CX, CY, OUTER, -180, 0)} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={1} />

          {BAND_SEGMENTS.map((seg, i) => (
            <path key={i} d={seg.d} fill={seg.color} opacity={0.92} />
          ))}

          {[0, 20, 40, 50, 60, 80, 100].map((v) => {
            const angle = -180 + (v / 100) * 180;
            const p1 = polar(CX, CY, BAND_INNER - 2, angle);
            const p2 = polar(CX, CY, BAND_OUTER + 2, angle);
            return (
              <line key={v} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,0.9)" strokeWidth={2} />
            );
          })}

          {ticks}

          {LABELS.map((v) => {
            const angle = -180 + (v / 100) * 180;
            const p = polar(CX, CY, OUTER + 22, angle);
            return (
              <text
                key={v}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#374151"
                fontSize={13}
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {v}
              </text>
            );
          })}

          <path d={needlePath(CX, CY, animAngle)} fill="rgba(0,0,0,0.15)" transform="translate(2,4)" />
          <path d={needlePath(CX, CY, animAngle)} fill="#1f2937" filter="url(#needleGlow)" />

          <circle cx={CX} cy={CY} r={16} fill="white" stroke="#e5e7eb" strokeWidth={2} />
          <circle cx={CX} cy={CY} r={8} fill={needleColor} filter="url(#glow)" style={{ transition: "fill 0.3s" }} />
          <circle cx={CX} cy={CY} r={4} fill="white" />
        </svg>
      </div>
    </div>
  );
}
