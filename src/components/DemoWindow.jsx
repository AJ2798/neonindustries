// Terminal-style frame that hosts an interactive product replica.
export default function DemoWindow({ address, label, children }) {
  return (
    <figure className="demo-window brackets">
      <div className="demo-chrome" aria-hidden="true">
        <span className="demo-dots"><i /><i /><i /></span>
        <span className="demo-address">{address}</span>
        <span className="demo-tag"><i /> Interactive demo</span>
      </div>
      <div className="demo-body" role="region" aria-label={label}>
        {children}
      </div>
    </figure>
  );
}
