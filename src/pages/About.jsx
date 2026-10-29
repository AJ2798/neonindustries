import siteConfig from "../data/siteConfig";
import SectionHead from "../components/SectionHead";
import Contact from "../components/Contact";

export default function About() {
  const { about, company } = siteConfig;

  return (
    <>
      <section className="page-hero" id="top">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-orbit" />
          <div className="hero-glow" />
        </div>
        <div className="container">
          <div className="eyebrow"><i />{about.title}</div>
          <h1>
            Building <span className="gradient-text">the Future.</span>
          </h1>
          <p className="page-lede">{about.lede}</p>
          <nav className="page-toc" aria-label="On this page">
            <a href="#who-we-are">Who we are</a>
            <a href="#vision-mission">Vision & mission</a>
            <a href="#what-we-do">What we do</a>
            <a href="#approach">Approach</a>
            <a href="#values">Values</a>
            <a href="#story">Our story</a>
          </nav>
        </div>
      </section>

      <section id="who-we-are">
        <div className="container split">
          <div className="section-label sticky-label">
            <span className="section-index">01</span>
            <span>Who we are</span>
          </div>
          <div className="prose">
            <p className="prose-lead">{about.whoWeAre[0]}</p>
            {about.whoWeAre.slice(1).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section id="vision-mission">
        <div className="container">
          <div className="vm-grid vm-grid-large">
            <div className="vm-card">
              <span className="mono-label">02 · Our vision</span>
              <p>{about.vision}</p>
            </div>
            <div className="vm-card">
              <span className="mono-label">03 · Our mission</span>
              <p>{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do">
        <div className="container">
          <SectionHead index="04" kicker="What we do" title="Five strategic areas." intro={about.whatWeDoIntro} />
          <ol className="area-list">
            {about.areas.map((a, i) => (
              <li className="area-row" key={a.title}>
                <span className="division-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="area-head">
                  <h3>{a.title}</h3>
                  <div className="chips">
                    {a.products.map((p) => <span className="chip" key={p}>{p}</span>)}
                  </div>
                </div>
                <div className="area-text">
                  {a.text.map((t) => <p key={t}>{t}</p>)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="approach">
        <div className="container">
          <SectionHead index="05" kicker="Our approach" title={about.approach.title} intro={about.approach.text} />
          <div className="principles">
            {about.approach.principles.map((p, i) => (
              <div className="principle" key={p.title}>
                <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="values">
        <div className="container">
          <SectionHead index="06" kicker="Our values" title="What we stand for." />
          <dl className="values">
            {about.values.map((v) => (
              <div className="value" key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="story">
        <div className="container split">
          <div className="section-label sticky-label">
            <span className="section-index">07</span>
            <span>Our story</span>
          </div>
          <div className="prose">
            {about.story.map((p, i) => <p key={p} className={i === 0 ? "prose-lead" : undefined}>{p}</p>)}
            <h3 className="prose-sub">Looking ahead</h3>
            {about.lookingAhead.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="closing-line" aria-label="Closing statement">
        <div className="container">
          <p>{about.closingLine}</p>
        </div>
      </section>

      <Contact title={about.cta.title} copy={about.cta.text} email={about.cta.email} />

      <section className="about-card-wrap" aria-label="Company details">
        <div className="container">
          <dl className="about-card">
            <div><dt>Company</dt><dd>{company.fullName}</dd></div>
            <div><dt>Tagline</dt><dd>{company.tagline}</dd></div>
            <div><dt>Website</dt><dd><a href={company.website}>{company.websiteLabel}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${about.cta.email}`}>{about.cta.email}</a></dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
