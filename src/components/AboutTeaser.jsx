import siteConfig from "../data/siteConfig";
import SectionHead from "./SectionHead";

export default function AboutTeaser() {
  const { aboutTeaser, about } = siteConfig;

  return (
    <section id="about-teaser">
      <div className="container">
        <SectionHead index={aboutTeaser.index} kicker={aboutTeaser.kicker} title={aboutTeaser.title} intro={aboutTeaser.copy}>
          <a className="text-link" href={aboutTeaser.link.href}>{aboutTeaser.link.label} <span>→</span></a>
        </SectionHead>

        <div className="vm-grid">
          <div className="vm-card brackets">
            <span className="mono-label">// Our vision</span>
            <p>{about.vision}</p>
          </div>
          <div className="vm-card brackets">
            <span className="mono-label">// Our mission</span>
            <p>{about.mission}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
