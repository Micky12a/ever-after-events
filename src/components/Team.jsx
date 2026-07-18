import Reveal from "./ui/Reveal";
import { TEAM } from "../data/team";

export default function Team() {
  return (
    <section id="equipe" className="bg-linen py-24 md:py-32">
      <div className="section-inner text-center">
        <Reveal>
          <p className="eyebrow text-terracotta">Notre équipe</p>
          <h2 className="section-title mt-4">Les artisans de votre jour-J</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={100 * i}>
              <div className="arch mx-auto max-w-[220px]">
                <img
                  src={member.image}
                  alt={`Portrait de ${member.name}`}
                  loading="lazy"
                  className="h-64 w-full object-cover md:h-72"
                />
              </div>
              <p className="mt-4 font-display italic text-xl">{member.name}</p>
              <p className="eyebrow mt-1 text-bordeaux/50">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
