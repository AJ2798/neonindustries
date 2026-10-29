import siteConfig from "../data/siteConfig";
import DemoWindow from "./DemoWindow";
import NeonWorkspace from "./demos/NeonWorkspace";

export default function IntelligenceSection() {
  const { intelligence } = siteConfig;

  return (
    <section id="intelligence" className="product-section">
      <div className="container">
        <div className="product-intro">
          <div>
            <div className="kicker">{intelligence.kicker}</div>
            <h2>{intelligence.title}</h2>
          </div>
          <p>{intelligence.copy}</p>
        </div>

        <ol className="points">
          {intelligence.points.map((p, i) => (
            <li key={p.title}>
              <span className="points-n">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <DemoWindow address="demo.neonindustriesltd.com/intelligence" label="Neon Intelligence workspace demo">
          <NeonWorkspace />
        </DemoWindow>
        <p className="demo-caption">Shown here connected to SchoolOS. Pick a suggestion, or try “Record a K2,500 payment against INV-1024” and approve it. Scripted with sample data.</p>
      </div>
    </section>
  );
}
