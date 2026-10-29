import siteConfig from "../data/siteConfig";
import SectionHead from "./SectionHead";

// Editorial index of divisions: one row per division.
export default function Divisions() {
  const { divisionsSection, divisions } = siteConfig;

  return (
    <section id="divisions">
      <div className="container">
        <SectionHead {...divisionsSection} />

        <ol className="division-list">
          {divisions.map((item, i) => (
            <li className="division-row" key={item.name}>
              <span className="division-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="division-name">
                <h3>{item.name}</h3>
                <span className="tag">{item.tag}</span>
              </div>
              <p>{item.description}</p>
              <span className="division-status" data-status={item.status}>{item.status}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
