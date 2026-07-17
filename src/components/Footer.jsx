import { useEffect, useMemo, useState } from "react";
import Reveal from "./ui/Reveal";
import { FOOTER, NAV_LINKS } from "../data/site";

/** Date de démo : un mariage fictif dans 142 jours, à 16h. */
function demoDate() {
  const d = new Date();
  d.setDate(d.getDate() + 142);
  d.setHours(16, 0, 0, 0);
  return d;
}

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  return {
    jours: Math.floor(ms / 86400000),
    heures: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    secondes: Math.floor(ms / 1000) % 60,
  };
}

export default function Footer() {
  const fallback = useMemo(demoDate, []);
  const [target, setTarget] = useState(fallback);
  const [custom, setCustom] = useState(false); // le visiteur a entré SA date
  const [time, setTime] = useState(() => diff(fallback));

  // Tick chaque seconde
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    setTime(diff(target));
    return () => clearInterval(id);
  }, [target]);

  const onDateChange = (e) => {
    if (!e.target.value) return;
    const d = new Date(e.target.value + "T16:00:00");
    if (d > new Date()) {
      setTarget(d);
      setCustom(true);
    }
  };

  const units = [
    { value: time.jours, label: "jours" },
    { value: time.heures, label: "heures" },
    { value: time.minutes, label: "minutes" },
    { value: time.secondes, label: "secondes" },
  ];

  // input date : minimum = demain
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <footer className="bg-bordeaux-deep text-linen">
      {/* ★ Compte à rebours personnalisable */}
      <div className="section-inner py-16 text-center border-b border-linen/10">
        <Reveal>
          <p className="eyebrow text-blush">{FOOTER.countdownEyebrow}</p>
          <p className="mt-3 font-display italic text-2xl md:text-3xl">
            {custom
              ? "Plus que quelques battements de cœur avant votre plus beau jour"
              : "Chaque seconde nous rapproche d'un nouveau « oui »"}
          </p>

          <div className="mt-8 flex justify-center gap-6 md:gap-12">
            {units.map((u) => (
              <div key={u.label}>
                <p className="font-display italic text-4xl md:text-6xl text-blush tabular-nums">
                  {String(u.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[0.65rem] tracking-[0.3em] uppercase text-linen/60">
                  {u.label}
                </p>
              </div>
            ))}
          </div>

          <label className="mt-10 inline-flex flex-col md:flex-row items-center gap-3 text-sm text-linen/80">
            {FOOTER.countdownPrompt}
            <input
              type="date"
              min={tomorrow}
              onChange={onDateChange}
              className="rounded-full bg-linen/10 border border-linen/25 px-5 py-2.5
                text-linen focus:outline-none focus:border-blush transition-colors
                [color-scheme:dark]"
            />
          </label>
        </Reveal>
      </div>

      {/* Bas de page */}
      <div className="section-inner py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-linen/70">
        <p className="font-display italic text-xl text-linen">Ever After Events</p>

        <ul className="flex flex-wrap justify-center gap-6 text-xs tracking-wider uppercase">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-blush transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center md:text-right text-xs leading-relaxed">
          <p>{FOOTER.address}</p>
          <p>{FOOTER.email} · {FOOTER.phone}</p>
        </div>
      </div>

      <p className="pb-6 text-center text-[0.65rem] text-linen/40">
        {FOOTER.tagline} · Site fictif réalisé pour le Build Together Challenge par l'équipe Focus.
      </p>
    </footer>
  );
}
