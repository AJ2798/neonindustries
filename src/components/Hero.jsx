import siteConfig from "../data/siteConfig";

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>
        <div className="hero-ring hero-ring-one"></div>
        <div className="hero-ring hero-ring-two"></div>
        <div className="hero-ring hero-ring-three"></div>
      </div>

      <div className="container hero-inner">
        <div className="hero-copy-wrap reveal visible">
          <div className="eyebrow">
            <i></i>
            {hero.eyebrow}
          </div>

          <h1>
            {hero.titleLine1}
            <br />
            <span className="gradient-text">{hero.titleLine2}</span>
          </h1>

          <p className="hero-copy">{hero.copy}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href={hero.primaryButton.href}>
              {hero.primaryButton.label} <span>→</span>
            </a>

            <a className="btn btn-secondary" href={hero.secondaryButton.href}>
              {hero.secondaryButton.label}
            </a>
          </div>

          <div className="hero-note">
            <span>◌</span>
            {hero.note}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        Scroll to explore
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
