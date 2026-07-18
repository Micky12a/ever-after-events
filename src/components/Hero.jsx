import Reveal from "./ui/Reveal";

const HERO_VIDEO = "/videos/hero.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bordeaux-deep"
    >
      {/* Vidéo de fond bouclée */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bordeaux-deep/70 via-bordeaux-deep/40 to-bordeaux-deep/80" />

      <div className="section-inner relative z-10 text-center text-linen">
        <Reveal>
          <p className="eyebrow text-blush">Ever After Events</p>
          <h1 className="mt-6 font-display italic text-5xl leading-[1.1] md:text-7xl">
            Votre mariage de rêve
            <br />
            commence ici
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-xl font-light text-linen/85 md:text-lg">
            Une agence à l'écoute de votre histoire, pour un jour-J aussi
            unique que vous.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <a href="#contact" className="btn-primary">
              Demander un devis
            </a>
            <a href="#services" className="btn-outline">
              Découvrir nos formules
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}