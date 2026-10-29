import { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

// A rolling log of the kind of events the platforms produce. Synthetic.
const EVENTS = [
  ["schoolos", "attendance.submitted grade=9B present=41/42", "ok"],
  ["intelligence", "proposal.prepared payments.record", "wait"],
  ["schoolos", "invoice.paid INV-1027 amount=K5,100.00", "ok"],
  ["ni-business", "payroll.approved period=2026-10 step=1/2", "wait"],
  ["intelligence", "proposal.approved snapshot=a91f-3c07", "ok"],
  ["schoolos", "purchase.raised PR-0087 route=bursar", "wait"],
  ["ni-business", "goods.received GRN-0312 inventory=updated", "ok"],
];

const STATUS_TONE = { Building: "ok", "R&D": "info", Consulting: "info", Planned: "dim", "Long-term": "dim" };

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function Terminal() {
  const { divisions } = siteConfig;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setOffset((o) => o + 1), 2400);
    return () => clearInterval(t);
  }, []);

  const log = Array.from({ length: 4 }, (_, i) => EVENTS[(offset + i) % EVENTS.length]);

  return (
    <div className="terminal brackets" aria-label="Neon Industries system status (sample data)">
      <div className="terminal-bar">
        <span>neon://ecosystem</span>
        <span className="terminal-live"><i /> live</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-cmd"><b>$</b> neon status --all</div>
        <ul className="terminal-status">
          {divisions.map((d) => (
            <li key={d.name}>
              <span className={`dot ${STATUS_TONE[d.status] ?? "dim"}`} />
              <span className="terminal-name">{slug(d.name)}</span>
              <span className="terminal-fill" />
              <span className="terminal-state">{d.status.toLowerCase()}</span>
            </li>
          ))}
        </ul>
        <div className="terminal-cmd"><b>$</b> neon logs --follow <span className="terminal-note">sample data</span></div>
        <ul className="terminal-log">
          {log.map(([src, msg, tone], i) => (
            <li key={`${offset}-${i}`} style={{ "--i": i }}>
              <span className={`dot ${tone}`} />
              <span className="terminal-src">{src}</span>
              <span className="terminal-msg">{msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero, sectors, divisions, about } = siteConfig;
  const stats = [
    [String(divisions.length).padStart(2, "0"), "Divisions"],
    ["02", "Flagship platforms"],
    [String(about.areas.length).padStart(2, "0"), "Strategic areas"],
    ["ZM", "Founded in Zambia"],
  ];

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy-col">
          <div className="eyebrow"><span className="eyebrow-tag">SYS</span>{hero.eyebrow}</div>
          <h1>
            {hero.titleLine1}
            <br />
            <span className="accent">{hero.titleLine2}</span>
            <span className="cursor" aria-hidden="true">_</span>
          </h1>
          <p className="hero-copy">{hero.copy}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={hero.primaryButton.href}>{hero.primaryButton.label} <span>→</span></a>
            <a className="btn btn-secondary" href={hero.secondaryButton.href}>{hero.secondaryButton.label}</a>
          </div>
        </div>
        <Terminal />
      </div>

      <div className="container">
        <dl className="stat-grid">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="marquee" aria-label="Sectors we work in">
        <div className="marquee-track">
          {[...sectors, ...sectors].map((s, i) => (
            <span key={i} aria-hidden={i >= sectors.length}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
