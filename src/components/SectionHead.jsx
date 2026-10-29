// Numbered section heading used across both pages.
export default function SectionHead({ index, kicker, title, intro, children }) {
  return (
    <header className="section-head">
      <div className="section-label">
        {index && <span className="section-index">{index}</span>}
        <span>{kicker}</span>
      </div>
      <div className="section-head-main">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
        {children}
      </div>
    </header>
  );
}
