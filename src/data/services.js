// Source unique des formules — utilisée par Services.jsx ET BudgetSimulator.jsx
// pour éviter toute désynchronisation des noms/prix entre les sections.
export const FORMULES = [
  {
    id: "elegance",
    name: "Élégance Éphémère",
    badge: null,
    target: "Petit budget · mariage intime",
    basePrice: 2500000,
    perGuest: 45000,
    includes: [
      "Coordination jour-J",
      "Décoration essentielle",
      "Accompagnement administratif",
    ],
  },
  {
    id: "signature",
    name: "Le Mariage Signature",
    badge: "Le plus populaire",
    target: "L'équilibre parfait",
    basePrice: 5000000,
    perGuest: 75000,
    includes: [
      "Tout Élégance Éphémère",
      "Traiteur raffiné",
      "Décoration florale complète",
      "Animation musicale",
    ],
  },
  {
    id: "heritage",
    name: "Héritage Royal",
    badge: "Prestige",
    target: "Mariage haut de gamme",
    basePrice: 9500000,
    perGuest: 125000,
    includes: [
      "Tout Le Mariage Signature",
      "Photographe & vidéaste",
      "Lieu d'exception",
      "Wedding planner dédié le jour-J",
    ],
  },
];

// Multiplicateur appliqué selon le type de lieu choisi dans le simulateur.
export const VENUES = [
  { id: "salle", label: "Salle de réception", multiplier: 1 },
  { id: "domaine", label: "Domaine champêtre", multiplier: 1.15 },
  { id: "exception", label: "Lieu d'exception", multiplier: 1.35 },
];

export function formatFCFA(amount) {
  return Math.round(amount).toLocaleString("fr-FR") + " FCFA";
}
