import { useState, useEffect } from "react";
import { FORMULES } from "../data/services";

const QUESTIONS = [
  {
    id: "ambiance",
    question: "Quelle ambiance vous fait rêver ?",
    options: [
      { label: "Fleurs sauvages et lumière naturelle", style: "boheme" },
      { label: "Château, cristal et grandeur", style: "traditionnel" },
      { label: "Lignes épurées et design audacieux", style: "avant-garde" },
    ],
  },
  {
    id: "lieu",
    question: "Vous imaginez votre mariage plutôt...",
    options: [
      { label: "En plein air, dans la nature", style: "boheme" },
      { label: "Dans un domaine historique", style: "traditionnel" },
      { label: "Dans un lieu urbain atypique", style: "avant-garde" },
    ],
  },
  {
    id: "decoration",
    question: "Côté décoration, vous préférez...",
    options: [
      { label: "Textures brutes, bois, macramé", style: "boheme" },
      { label: "Dorures, lustres, faste classique", style: "traditionnel" },
      { label: "Installations lumineuses, minimalisme", style: "avant-garde" },
    ],
  },
];

const RESULTS = {
  boheme: {
    title: "Bohème Romantique",
    description:
      "Fleurs sauvages, textures naturelles et atmosphère onirique. Votre mariage respire la liberté et la douceur.",
    formuleId: "elegance",
  },
  traditionnel: {
    title: "Luxe Traditionnel",
    description:
      "Châteaux, lustres en cristal et faste éternel. Un mariage intemporel, à la hauteur des plus grandes histoires.",
    formuleId: "heritage",
  },
  "avant-garde": {
    title: "Avant-Garde Moderne",
    description:
      "Design audacieux, installations lumineuses et esprit urbain. Votre mariage sera résolument unique.",
    formuleId: "signature",
  },
};

const TRANSITION_DURATION = 300; // ms — doit matcher la classe duration-300 ci-dessous

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [pendingAction, setPendingAction] = useState(null);

  const isFinished = step >= QUESTIONS.length;

  // Dès qu'un changement de contenu est demandé (nouvelle question ou résultat),
  // on fait d'abord disparaître le bloc actuel, puis on applique le changement,
  // puis on le refait apparaître.
  useEffect(() => {
    if (pendingAction === null) return;
    setIsVisible(false);
    const timeout = setTimeout(() => {
      pendingAction();
      setIsVisible(true);
      setPendingAction(null);
    }, TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [pendingAction]);

  const handleAnswer = (style) => {
    setPendingAction(() => () => {
      setAnswers((prev) => [...prev, style]);
      setStep((prev) => prev + 1);
    });
  };

  const handleRestart = () => {
    setPendingAction(() => () => {
      setStep(0);
      setAnswers([]);
    });
  };

  const computeResult = () => {
    const counts = {};
    answers.forEach((style) => {
      counts[style] = (counts[style] || 0) + 1;
    });
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return RESULTS[winner];
  };

  const transitionClasses = `transition-all duration-300 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  const result = isFinished ? computeResult() : null;
  const recommendedFormule = result
    ? FORMULES.find((f) => f.id === result.formuleId)
    : null;

  return (
    <section className="bg-bordeaux py-24 md:py-32">
      <div className="section-inner max-w-3xl text-center">
        <div className={transitionClasses}>
          {!isFinished ? (
            <>
              <p className="eyebrow mb-4 text-blush">
                Question {step + 1} / {QUESTIONS.length}
              </p>
              <h2 className="section-title mb-12 text-linen">{QUESTIONS[step].question}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(option.style)}
                    className="group border border-linen/20 p-8 text-left text-linen transition-all duration-500 hover:border-terracotta hover:bg-terracotta"
                  >
                    <span className="block font-display italic text-2xl">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>
              <p className="eyebrow mb-4 text-blush">Votre style de célébration</p>
              <h2 className="section-title mb-6 text-linen">{result.title}</h2>
              <p className="mx-auto mb-4 max-w-lg text-linen/80">{result.description}</p>
              {recommendedFormule && (
                <p className="mb-12 text-sm uppercase tracking-widest text-terracotta">
                  Formule recommandée : {recommendedFormule.name}
                </p>
              )}
              <div className="flex flex-col justify-center gap-6 md:flex-row">
                <a href="#services" className="btn-primary">
                  Voir nos formules
                </a>
                <button onClick={handleRestart} className="btn-outline text-linen">
                  Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
