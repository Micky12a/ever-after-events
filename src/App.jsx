import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Quiz from "./components/Quiz";
import Gallery from "./components/Gallery";
import BudgetSimulator from "./components/BudgetSimulator";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Quiz />
        <Gallery />
        <BudgetSimulator />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}