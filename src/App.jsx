import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import SchoolOSSection from "./components/SchoolOSSection";
import IntelligenceSection from "./components/IntelligenceSection";
import Divisions from "./components/Divisions";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <SchoolOSSection />
        <IntelligenceSection />
        <Divisions />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
