import siteConfig from "../data/siteConfig";

export default function Divisions() {
  const { divisionsSection, divisions } = siteConfig;
  return (
    <section id="divisions">
      <div className="container">
        <div className="section-head reveal visible">
          <div><div className="kicker">{divisionsSection.kicker}</div><h2>{divisionsSection.title}</h2></div>
          <p>{divisionsSection.intro}</p>
        </div>
        <div className="division-grid">
          {divisions.map((item) => (
            <article className={`division-card ${item.large ? "large" : ""} reveal visible`} key={item.name}>
              <span className="tag">{item.tag}</span><div className="division-icon">{item.icon}</div>
              <h3>{item.name}</h3><p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
