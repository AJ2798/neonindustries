import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#top" className="brand" aria-label="Neon Industries home" onClick={() => setOpen(false)}>
          <span className="brand-mark">NI</span>
          <span>{siteConfig.company.name}</span>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">Explore Neon <span>↗</span></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open navigation">{open ? "✕" : "☰"}</button>
      </nav>
    </div>
  );
}
