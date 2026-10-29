import siteConfig from "../data/siteConfig";
import DemoWindow from "./DemoWindow";
import SchoolOSDashboard from "./demos/SchoolOSDashboard";

export default function SchoolOSSection() {
  const { schoolos } = siteConfig;

  return (
    <section id="schoolos" className="product-section">
      <div className="container">
        <div className="product-intro">
          <div>
            <div className="kicker kicker-violet">{schoolos.kicker}</div>
            <h2>{schoolos.title}</h2>
          </div>
          <p>{schoolos.copy}</p>
        </div>

        <DemoWindow address="demo.neonindustriesltd.com/schoolos" label="SchoolOS dashboard demo">
          <SchoolOSDashboard />
        </DemoWindow>
        <p className="demo-caption">Click around: the sidebar, KPI cards, quick actions and theme switch all work. Figures are sample data.</p>

        <div className="feature-grid">
          {schoolos.features.map((f) => (
            <div className="feature" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
