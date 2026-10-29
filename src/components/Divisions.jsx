import siteConfig from "../data/siteConfig";
import SectionHead from "./SectionHead";

// Divisions as a spec table: one row per division.
export default function Divisions() {
  const { divisionsSection, divisions } = siteConfig;

  return (
    <section id="divisions">
      <div className="container">
        <SectionHead {...divisionsSection} />

        <div className="division-table" role="table" aria-label="Neon Industries divisions">
          <div className="division-row division-header" role="row">
            <span role="columnheader">ID</span>
            <span role="columnheader">Division</span>
            <span role="columnheader">Scope</span>
            <span role="columnheader">Status</span>
          </div>
          {divisions.map((item, i) => (
            <div className="division-row" role="row" key={item.name}>
              <span className="division-n" role="cell">NI-{String(i + 1).padStart(2, "0")}</span>
              <div className="division-name" role="cell">
                <h3>{item.name}</h3>
                <span className="tag">{item.tag}</span>
              </div>
              <p role="cell">{item.description}</p>
              <span role="cell"><span className="division-status" data-status={item.status}>{item.status}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
