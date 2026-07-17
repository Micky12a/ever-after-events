import { useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import { TESTIMONIALS } from "../data/testimonials";

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  // Défilement automatique, en pause au survol
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const t = TESTIMONIALS[index];

  return (
    <section
      id="avis"
      className="relative bg-bordeaux text-linen py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Guillemets géants décoratifs */}
      <span
        aria-hidden="true"
        className="absolute -top-10 left-6 md:left-16 font-display italic text-[16rem] leading-none text-linen/10 select-none"
      >
        “
      </span>

      <div className="section-inner relative text-center max-w-3xl">
        <Reveal>
          <p className="eyebrow text-blush">Ils nous ont dit oui</p>
        </Reveal>

        {/* key={index} relance le fondu à chaque changement de témoignage */}
        <div key={index} className="animate-[fadeIn_0.6s_ease]">
          <blockquote className="mt-8 font-display italic text-2xl md:text-3xl leading-snug">
            « {t.quote} »
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-3">
            <img
              src={t.image}
              alt={`Portrait de ${t.couple}`}
              className="h-16 w-16 rounded-full object-cover border-2 border-blush"
              loading="lazy"
            />
            <p className="text-sm tracking-[0.25em] uppercase">{t.couple}</p>
            <p className="text-xs text-linen/60">{t.detail}</p>
            <p className="text-blush tracking-widest" aria-label="5 étoiles sur 5">★★★★★</p>
          </div>
        </div>

        {/* Contrôles */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Témoignage précédent"
            className="h-11 w-11 rounded-full border border-linen/30 hover:bg-linen/10 transition-colors"
          >
            ←
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Choisir un témoignage">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-blush" : "w-2 bg-linen/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Témoignage suivant"
            className="h-11 w-11 rounded-full border border-linen/30 hover:bg-linen/10 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Animation locale du fondu */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
