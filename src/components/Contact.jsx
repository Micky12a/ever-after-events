import { useState, useEffect } from "react";
import { FOOTER } from "../data/site";
import { PhoneIcon, MailIcon, MapPinIcon } from "./ui/Icon";

const initialValues = {
  name: "",
  email: "",
  date: "",
  guests: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Merci d'indiquer votre nom.";
  }

  if (!values.email.trim()) {
    errors.email = "Merci d'indiquer votre email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Cet email ne semble pas valide.";
  }

  if (!values.message.trim()) {
    errors.message = "Parlez-nous un peu de votre projet.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Un peu plus de détails nous aiderait (10 caractères min).";
  }

  return errors;
}

// Petit composant dédié pour que le message d'erreur apparaisse
// en fondu + léger glissement au lieu de surgir d'un coup.
function FieldError({ message }) {
  return (
    <p
      className={`text-red-500 text-sm mt-2 transition-all duration-300 ease-out ${
        message ? "opacity-100 translate-y-0 max-h-10" : "opacity-0 -translate-y-1 max-h-0"
      } overflow-hidden`}
    >
      {message || ""}
    </p>
  );
}

function SubmittedMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On attend une frame pour laisser le temps au navigateur d'appliquer
    // l'état initial (opacity-0), sinon la transition ne se joue pas.
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="contact" className="bg-linen py-24 md:py-32">
      <div
        className={`section-inner max-w-2xl text-center transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="section-title mb-6">Merci !</h2>
        <p className="text-bordeaux/70">
          Votre demande a bien été envoyée. Notre équipe vous recontactera très
          prochainement pour parler de votre mariage.
        </p>
      </div>
    </section>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      // Ici, appel API / service d'envoi d'email à brancher
    }
  };

  const inputClass = (field) =>
    `w-full bg-transparent border-0 border-b py-4 placeholder:text-bordeaux/40 transition-colors duration-300 focus:outline-none ${
      errors[field] ? "border-red-400 focus:border-red-500" : "border-bordeaux/20 focus:border-terracotta"
    }`;

  if (isSubmitted) {
    return <SubmittedMessage />;
  }

  return (
    <section className="bg-linen py-24 md:py-32" id="contact">
      <div className="section-inner grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <p className="eyebrow text-terracotta">Contact</p>
          <h2 className="section-title mt-4 mb-8">Commençons à écrire votre chapitre</h2>
          <p className="mb-12 max-w-md text-bordeaux/70">
            Discutons de vos envies, de vos rêves et de la manière dont nous pouvons
            les rendre éternels.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <PhoneIcon className="text-terracotta" />
              <span>{FOOTER.phone}</span>
            </div>
            <div className="flex items-center gap-4">
              <MailIcon className="text-terracotta" />
              <span>{FOOTER.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPinIcon className="text-terracotta" />
              <span>{FOOTER.address}</span>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <input
                type="text"
                placeholder="Vos prénoms (ex : Awa & Jean-Baptiste)"
                value={values.name}
                onChange={handleChange("name")}
                className={inputClass("name")}
              />
              <FieldError message={errors.name} />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange("email")}
                className={inputClass("email")}
              />
              <FieldError message={errors.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <input
              type="date"
              placeholder="Date envisagée"
              value={values.date}
              onChange={handleChange("date")}
              className={inputClass("date")}
            />
            <input
              type="number"
              min={0}
              placeholder="Nombre d'invités"
              value={values.guests}
              onChange={handleChange("guests")}
              className={inputClass("guests")}
            />
          </div>

          <div>
            <textarea
              placeholder="Parlez-nous de votre projet..."
              rows={4}
              value={values.message}
              onChange={handleChange("message")}
              className={`${inputClass("message")} resize-none`}
            />
            <FieldError message={errors.message} />
          </div>

          <button type="submit" className="btn-primary w-full text-center">
            Envoyer la demande
          </button>
        </form>
      </div>
    </section>
  );
}
