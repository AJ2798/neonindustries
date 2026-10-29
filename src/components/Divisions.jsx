import siteConfig from "../data/siteConfig";

export default function Divisions() {
  const { divisionsSection, divisions } = siteConfig;

  return (
    <section id="divisions">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{divisionsSection.kicker}</div>
            <h2>{divisionsSection.title}</h2>
          </div>
          <p>{divisionsSection.intro}</p>
        </div>

        <div className="division-grid">
          {divisions.map((item, i) => (
            <article className="division-card" key={item.name}>
              <div className="division-top">
                <span className="division-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="division-status" data-status={item.status}>{item.status}</span>
              </div>
              <span className="tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
