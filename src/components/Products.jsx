import siteConfig from "../data/siteConfig";
import SectionHead from "./SectionHead";

// Overview of the two flagship platforms.
export default function Products() {
  const { productsSection, products } = siteConfig;

  return (
    <section id="projects">
      <div className="container">
        <SectionHead {...productsSection} />

        <div className="stack">
          {products.map((p, i) => (
            <a className={`stack-card stack-${p.id}`} href={p.href} key={p.id}>
              <div className="stack-top">
                <span className="tag">{p.tag}</span>
                <span className="stack-n">0{i + 1}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <span className="stack-link">See it working <span>↓</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
