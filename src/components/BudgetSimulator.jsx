import { useState, useMemo, useEffect, useRef } from "react";
import Reveal from "./ui/Reveal";
import { FORMULES, VENUES, formatFCFA } from "../data/services";

const ANIMATION_DURATION = 500;

function useAnimatedNumber(targetValue, duration = ANIMATION_DURATION) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const frameRef = useRef(null);
  const startValueRef = useRef(targetValue);

  useEffect(() => {
    const startValue = startValueRef.current;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        startValueRef.current = targetValue;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [targetValue, duration]);

  return displayValue;
}

export default function BudgetSimulator() {
  const [guests, setGuests] = useState(120);
  const [levelIdx, setLevelIdx] = useState(1);
  const [venueIdx, setVenueIdx] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);

  const formule = FORMULES[levelIdx];
  const venue = VENUES[venueIdx];

  const { base, guestsCost, subtotal, low, high } = useMemo(() => {
    const base = formule.basePrice;
    const guestsCost = guests * formule.perGuest;
    const subtotal = (base + guestsCost) * venue.multiplier;
    return {
      base,
      guestsCost,
      subtotal,
      low: subtotal * 0.92,
      high: subtotal * 1.12,
    };
  }, [formule, guests, venue]);

  const animatedLow = useAnimatedNumber(low);
  const animatedHigh = useAnimatedNumber(high);

  return (
    <section id="simulateur" className="bg-bordeaux py-24 md:py-32">
      <div className="section-inner max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow text-blush">Simulateur d'exception</p>
          <h2 className="section-title mt-4 text-linen">Estimez votre investissement</h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-[2rem] border border-linen/10 bg-linen/5 p-8 md:p-12">
            {/* Invités */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label htmlFor="guest-slider" className="eyebrow text-linen">
                  Nombre d'invités
                </label>
                <span className="font-display italic text-2xl text-blush">{guests}</span>
              </div>
              <input
                id="guest-slider"
                type="range"
                min={20}
                max={500}
                step={10}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-linen/20 accent-terracotta"
              />
            </div>

            {/* Formule */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <label htmlFor="level-slider" className="eyebrow text-linen">
                  Formule
                </label>
                <span className="font-display italic text-2xl text-blush">{formule.name}</span>
              </div>
              <input
                id="level-slider"
                type="range"
                min={0}
                max={2}
                value={levelIdx}
                onChange={(e) => setLevelIdx(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-linen/20 accent-terracotta"
              />
            </div>

            {/* Type de lieu */}
            <div className="mt-10">
              <p className="eyebrow mb-4 text-linen">Type de lieu</p>
              <div className="flex flex-wrap gap-3">
                {VENUES.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVenueIdx(i)}
                    className={`rounded-full border px-5 py-2 text-sm tracking-wide transition-colors ${
                      i === venueIdx
                        ? "border-terracotta bg-terracotta text-linen"
                        : "border-linen/25 text-linen/80 hover:border-linen/50"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Résultat */}
            <div className="mt-12 border-t border-linen/10 pt-10 text-center">
              <p className="eyebrow mb-4 text-linen/50">Estimation du budget global</p>
              <div className="font-display italic text-4xl leading-none text-linen tabular-nums md:text-6xl">
                {formatFCFA(animatedLow)} – {formatFCFA(animatedHigh)}
              </div>
              <p className="mt-4 text-sm italic text-terracotta">
                *Cette simulation est indicative et ne constitue pas un devis final.
              </p>

              <button
                type="button"
                onClick={() => setDetailOpen((o) => !o)}
                className="mt-8 text-sm uppercase tracking-widest text-blush underline underline-offset-4"
              >
                {detailOpen ? "Masquer le détail" : "Voir le détail des postes"}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  detailOpen ? "mt-6 max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-left text-sm text-linen/80">
                  <li className="flex justify-between border-b border-linen/10 py-2">
                    <span>Formule {formule.name}</span>
                    <span>{formatFCFA(base)}</span>
                  </li>
                  <li className="flex justify-between border-b border-linen/10 py-2">
                    <span>{guests} invités × {formatFCFA(formule.perGuest)}</span>
                    <span>{formatFCFA(guestsCost)}</span>
                  </li>
                  <li className="flex justify-between border-b border-linen/10 py-2">
                    <span>{venue.label} (×{venue.multiplier})</span>
                    <span>{formatFCFA(subtotal - base - guestsCost)}</span>
                  </li>
                  <li className="flex justify-between pt-2 font-medium text-blush">
                    <span>Sous-total</span>
                    <span>{formatFCFA(subtotal)}</span>
                  </li>
                </ul>
              </div>

              <a href="#contact" className="btn-primary mt-10">
                Recevoir mon devis personnalisé
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
