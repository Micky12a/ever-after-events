import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menu mobile

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-linen/95 text-bordeaux shadow-sm backdrop-blur" : "bg-transparent text-linen"
      }`}
    >
      <nav className="section-inner flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#hero" onClick={close} className="font-display italic text-2xl tracking-wide">
          Ever After Events
        </a>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wider uppercase">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-terracotta transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-block btn-primary !py-2.5 !px-6">
          Demander un devis
        </a>

        {/* Burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="md:hidden bg-linen text-bordeaux border-t border-bordeaux/10">
          <ul className="section-inner py-6 space-y-4 text-sm tracking-wider uppercase">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className="block py-1">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={close} className="btn-primary mt-2">
                Demander un devis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
