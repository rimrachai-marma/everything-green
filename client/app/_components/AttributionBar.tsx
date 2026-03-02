"use client";

import useOscillate from "@/lib/hooks/useOscillate";

interface Props {
  target: number;
  coverage: number;
  tagging: number;
  duration?: number;
}

const TICKS: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const AttributionBar: React.FC<Props> = ({ target, coverage, tagging, duration = 2200 }) => {
  const val = useOscillate(target, 0, duration);
  const pct = Math.max(0, Math.min(100, val));

  return (
    <div className="h-34 w-full sm:w-120 border-2 border-amber-400 rounded-2xl bg-[#fffdf5] px-7 py-3 box-border flex flex-col justify-between">
      {/* ── Title ── */}
      <h3 className="font-manrope font-bold text-[15px] leading-tight text-[#0a0a0a] m-0">Attribution Match</h3>
      {/* ── Bar + Thumb ── */}
      <div className="relative flex items-center h-7">
        {/* Gradient track */}
        <div className="absolute inset-x-0 h-2.5 rounded-full bg-linear-to-r from-red-500 via-yellow-400 to-green-500" />

        {/* Thumb */}
        <div
          className="absolute w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center z-10 -translate-x-1/2 -translate-y-1/2 top-1/2"
          style={{ left: `${pct}%` }}
        >
          <span className="font-manrope font-extrabold text-[12px] text-[#111] leading-none">{Math.round(val)}</span>
        </div>
      </div>

      {/* ── Tick marks ── */}
      <div className="relative h-4 -translate-y-2">
        {TICKS.map((t) => (
          <div
            key={t}
            className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2"
            style={{ left: `${t}%` }}
          >
            <div className="w-px h-1.25 bg-gray-300" />
            <span className="font-inter text-[9px] text-gray-400 leading-none">{t}</span>
          </div>
        ))}
      </div>

      {/* ── Stats ── */}
      <div className="font-inter text-[12px] text-gray-600 leading-snug flex flex-col">
        <span>
          Coverage: <strong className="font-semibold text-[#111]">{coverage}%</strong>
        </span>
        <span>
          Tagging completeness: <strong className="font-semibold text-[#111]">{tagging}%</strong>
        </span>
      </div>
    </div>
  );
};

export default AttributionBar;
