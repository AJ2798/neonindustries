import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

function useZambiaTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lusaka" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const t = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Navbar({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const time = useZambiaTime();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled || open ? "scrolled" : ""}`}>
      <div className="container topbar-inner">
        <a href="/" className="brand" aria-label="Neon Industries home" onClick={() => setOpen(false)}>
          {/* Neon Industries<span className="cursor" aria-hidden="true">_</span> */}
          Neon Industries
        </a>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {siteConfig.navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.href === path ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="nav-index">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-meta" aria-label={`Local time in Zambia: ${time}`}>
          <i aria-hidden="true" /> ZM {time} CAT
        </div>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
