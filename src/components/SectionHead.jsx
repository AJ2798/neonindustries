// Numbered section heading used across both pages.
export default function SectionHead({ index, kicker, title, intro, children }) {
  return (
    <header className="section-head">
      <div className="section-label">
        <span className="section-index">[{index ?? "—"}]</span>
        <span>{kicker}</span>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <div className="section-head-main">
        <h2>{title}</h2>
        {(intro || children) && (
          <div className="section-head-side">
            {intro && <p>{intro}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
