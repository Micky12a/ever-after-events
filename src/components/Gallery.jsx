import Reveal from "./ui/Reveal";
import { GALLERY } from "../data/gallery";

export default function Gallery() {
  return (
    <section id="galerie" className="bg-linen py-24 md:py-32">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="eyebrow text-terracotta">Galerie</p>
          <h2 className="section-title mt-4">Des instants suspendus</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {GALLERY.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 100} className={i % 5 === 0 ? "md:row-span-2" : ""}>
              <div className="arch h-full">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                    i % 5 === 0 ? "h-full min-h-[280px] md:min-h-[560px]" : "h-[220px] md:h-[260px]"
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
