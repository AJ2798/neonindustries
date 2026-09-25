import { useRef } from "react";
import siteConfig from "../data/siteConfig";

function Signal({ type }) {
  if (!type) return null;
  const stroke = type === "cyan" ? "rgba(87,217,255,.8)" : "rgba(141,108,255,.9)";
  const d = type === "cyan"
    ? "M0,46 C25,15 48,55 70,27 C95,-3 118,48 140,22 C164,-4 179,35 200,12"
    : "M0,42 C25,28 45,48 64,35 C89,17 103,51 128,28 C150,8 175,27 200,16";
  return <div className="signal"><svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d={d} fill="none" stroke={stroke} strokeWidth="2"/></svg></div>;
}

export default function Hero() {
  const cardRef = useRef(null);
  const visualRef = useRef(null);
  const { hero } = siteConfig;

  const handleMove = (e) => {
    if (window.innerWidth < 760 || !cardRef.current || !visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    cardRef.current.style.transform = `rotateY(${x * 12 - 5}deg) rotateX(${-y * 10 + 3}deg) translateY(-4px)`;
  };

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-copy-wrap reveal visible">
          <div className="eyebrow"><i></i>{hero.eyebrow}</div>
          <h1>{hero.titleLine1}<br/><span className="gradient-text">{hero.titleLine2}</span></h1>
          <p className="hero-copy">{hero.copy}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={hero.primaryButton.href}>{hero.primaryButton.label} <span>→</span></a>
            <a className="btn btn-secondary" href={hero.secondaryButton.href}>{hero.secondaryButton.label}</a>
          </div>
          <div className="hero-note"><span>◌</span>{hero.note}</div>
        </div>

        <div className="hero-visual reveal visible" ref={visualRef} onPointerMove={handleMove} onPointerLeave={() => cardRef.current && (cardRef.current.style.transform = "")}>
          <div className="orb one"></div><div className="orb two"></div>
          <div className="system-card" ref={cardRef}>
            <div className="window-bar"><div className="dots"><span></span><span></span><span></span></div><span>NEON // SYSTEM CORE</span></div>
            <div className="system-title">{hero.systemCard.title}</div>
            <div className="system-sub">{hero.systemCard.subtitle}</div>
            <div className="metric-grid">
              {hero.systemCard.metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <small>{metric.label}</small><strong>{metric.value}</strong><Signal type={metric.signal}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><div className="scroll-line"></div> Scroll to explore <div className="scroll-line"></div></div>
    </section>
  );
}
