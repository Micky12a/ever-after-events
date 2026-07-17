import Reveal from "./ui/Reveal";
import AnimatedNumber from "./ui/AnimatedNumber";
import { ABOUT, STATS } from "../data/site";

export default function About() {
  return (
    <section id="apropos" className="bg-bordeaux text-linen py-24 md:py-32">
      <div className="section-inner grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Photo en arche */}
        <Reveal>
          <div className="arch mx-auto max-w-sm md:max-w-none">
            <img
              src={ABOUT.image}
              alt={ABOUT.imageAlt}
              className="w-full h-[420px] md:h-[520px] object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="eyebrow text-blush">{ABOUT.eyebrow}</p>
            <h2 className="section-title mt-4">{ABOUT.title}</h2>
          </Reveal>

          {ABOUT.paragraphs.map((text, i) => (
            <Reveal key={i} delay={120 * (i + 1)}>
              <p className="mt-6 font-light leading-relaxed text-linen/85">{text}</p>
            </Reveal>
          ))}

          {/* Chiffres clés animés */}
          <Reveal delay={300}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-linen/20 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-display italic text-3xl md:text-4xl text-blush"
                  />
                  <p className="mt-1 text-xs tracking-wider uppercase text-linen/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
