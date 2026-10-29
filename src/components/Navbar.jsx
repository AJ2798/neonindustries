import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <nav className={scrolled || open ? "scrolled" : ""}>
        <a href="#top" className="brand" aria-label="Neon Industries home" onClick={() => setOpen(false)}>
          <span>{siteConfig.company.name}</span>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </div>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? "✕" : "☰"}
        </button>
      </nav>
    </div>
  );
}
