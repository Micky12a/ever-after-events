import Reveal from "./ui/Reveal";
import { FORMULES, formatFCFA } from "../data/services";

export default function Services() {
  return (
    <section id="services" className="bg-linen py-24 md:py-32">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="eyebrow text-terracotta">Nos services</p>
          <h2 className="section-title mt-4">Trois façons de vivre l'exception</h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {FORMULES.map((formule, i) => {
            const highlighted = Boolean(formule.badge) && i === 1;
            return (
              <Reveal key={formule.id} delay={120 * i}>
                <div
                  className={`flex h-full flex-col rounded-[2rem] border p-8 transition-transform duration-300 hover:-translate-y-1 ${
                    highlighted
                      ? "border-terracotta bg-white shadow-xl md:scale-105"
                      : "border-bordeaux/10 bg-white/60"
                  }`}
                >
                  {formule.badge && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-terracotta px-4 py-1 text-xs uppercase tracking-widest text-linen">
                      {formule.badge}
                    </span>
                  )}

                  <h3 className="font-display italic text-3xl">{formule.name}</h3>
                  <p className="eyebrow mt-2 text-bordeaux/50">{formule.target}</p>

                  <p className="mt-6 font-display italic text-2xl text-terracotta">
                    À partir de {formatFCFA(formule.basePrice)}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 text-sm text-bordeaux/80">
                    {formule.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-terracotta">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#simulateur"
                    className={highlighted ? "btn-primary mt-8" : "btn-outline mt-8 text-bordeaux"}
                  >
                    Estimer mon budget
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
