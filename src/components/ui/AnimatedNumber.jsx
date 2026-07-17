import { useEffect, useRef, useState } from "react";


export default function AnimatedNumber({ value, suffix = "", duration = 1200, className = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const current = useRef(0);

  const animateTo = (target) => {
    const from = current.current;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easing doux
      const val = Math.round(from + (target - from) * eased);
      current.current = val;
      setDisplay(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Premier déclenchement : quand le nombre entre à l'écran
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animateTo(value);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Changements suivants (utile pour le simulateur)
  useEffect(() => {
    if (started.current) animateTo(value);
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}
