import React from "react";

function useOscillate(target: number, min: number, duration: number): number {
  const [val, setVal] = React.useState<number>(min);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    let from = min;
    let to = target;
    let startTs: number | null = null;

    const tick = (ts: number): void => {
      if (startTs === null) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setVal(from + (to - from) * eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        [from, to] = [to, from];
        startTs = null;
        setTimeout(() => {
          rafRef.current = requestAnimationFrame(tick);
        }, 800);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, min, duration]);

  return val;
}

export default useOscillate;
