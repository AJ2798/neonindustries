import Hero from "../components/Hero";
import Products from "../components/Products";
import SchoolOSSection from "../components/SchoolOSSection";
import IntelligenceSection from "../components/IntelligenceSection";
import Divisions from "../components/Divisions";
import AboutTeaser from "../components/AboutTeaser";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <SchoolOSSection />
      <IntelligenceSection />
      <Divisions />
      <AboutTeaser />
      <Contact />
    </>
  );
}
