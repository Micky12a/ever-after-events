// Icônes fines "outline" en SVG inline — évite toute dépendance à une
// police d'icônes externe (Material Symbols n'était pas chargée : les
// icônes de Contact.jsx s'affichaient en texte brut "call", "mail"...).
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4.5 4.5h3.6l1.8 4.5-2.25 1.8a12.3 12.3 0 0 0 5.55 5.55l1.8-2.25 4.5 1.8v3.6c0 1-.85 1.78-1.84 1.66-4.02-.47-7.8-2.3-10.66-5.16C4.14 13.14 2.31 9.36 1.84 5.34 1.72 4.35 2.5 3.5 3.5 3.5" transform="translate(0.5 0)" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 21.5S19 15 19 10a7 7 0 1 0-14 0c0 5 7 11.5 7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
