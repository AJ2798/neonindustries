import siteConfig from "../data/siteConfig";

export default function Contact() {
  const { contact } = siteConfig;
  return (
    <section id="contact">
      <div className="container">
        <div className="cta-panel">
          <div>
            <div className="kicker">{contact.kicker}</div>
            <h2>{contact.title}</h2>
            <p>{contact.copy}</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-primary" href={`mailto:${contact.email}?subject=Neon%20Industries%20demo`}>{contact.buttonLabel} <span>→</span></a>
            <a className="cta-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
