import siteConfig from "../data/siteConfig";

// Overview of the two flagship platforms and how they connect.
export default function Products() {
  const { productsSection, products } = siteConfig;

  return (
    <section id="products">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{productsSection.kicker}</div>
            <h2>{productsSection.title}</h2>
          </div>
          <p>{productsSection.intro}</p>
        </div>

        <div className="stack">
          {products.map((p) => (
            <a className={`stack-card stack-${p.id}`} href={p.href} key={p.id}>
              <span className="tag">{p.tag}</span>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <span className="stack-link">See it working →</span>
            </a>
          ))}

          <div className="stack-bridge" aria-hidden="true">
            <span>Delegated access</span>
            <svg viewBox="0 0 120 24" preserveAspectRatio="none">
              <path d="M0 12 H120" />
            </svg>
            <span>Approval-gated writes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
