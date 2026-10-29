import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

// A rolling feed of the kind of events the platforms produce. Synthetic.
const EVENTS = [
  { product: "SchoolOS", text: "Attendance submitted · Grade 9B", meta: "41 / 42 present", tone: "ok" },
  { product: "Neon Intelligence", text: "Proposal prepared · payments.record", meta: "Awaiting approval", tone: "wait" },
  { product: "SchoolOS", text: "Invoice INV-1027 paid in full", meta: "K5,100.00", tone: "ok" },
  { product: "NI Business", text: "October payroll · bursar approved", meta: "1 of 2 approvals", tone: "wait" },
  { product: "Neon Intelligence", text: "Approved with code · snapshot a91f-3c07", meta: "Recorded", tone: "ok" },
  { product: "SchoolOS", text: "PR-0087 raised · lab consumables", meta: "Routed to bursar", tone: "wait" },
  { product: "NI Business", text: "Goods receipt GRN-0312 posted", meta: "Inventory updated", tone: "ok" },
];

function EventFeed() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setOffset((o) => (o + 1) % EVENTS.length), 2600);
    return () => clearInterval(t);
  }, []);

  const visible = Array.from({ length: 5 }, (_, i) => EVENTS[(offset + i) % EVENTS.length]);

  return (
    <div className="feed" aria-label="Example platform activity">
      <div className="feed-head">
        <span className="feed-live"><i /> Live across the stack</span>
        <span className="feed-sub">Sample data</span>
      </div>
      <ul>
        {visible.map((e, i) => (
          <li key={`${offset}-${i}`} style={{ "--i": i }}>
            <span className={`feed-dot ${e.tone}`} />
            <div>
              <div className="feed-product">{e.product}</div>
              <div className="feed-text">{e.text}</div>
            </div>
            <span className="feed-meta">{e.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  const { hero, heroProof } = siteConfig;

  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy-wrap">
          <div className="eyebrow"><i />{hero.eyebrow}</div>
          <h1>
            {hero.titleLine1}
            <br />
            <span className="gradient-text">{hero.titleLine2}</span>
          </h1>
          <p className="hero-copy">{hero.copy}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={hero.primaryButton.href}>{hero.primaryButton.label} <span>→</span></a>
            <a className="btn btn-secondary" href={hero.secondaryButton.href}>{hero.secondaryButton.label}</a>
          </div>
        </div>
        <EventFeed />
      </div>

      <div className="container">
        <dl className="proof">
          {heroProof.map((p) => (
            <div key={p.label}>
              <dt>{p.value}</dt>
              <dd>{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
