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
          <a className="btn btn-primary" href={`mailto:${contact.email}?subject=Connecting%20with%20Neon%20Industries`}>{contact.buttonLabel} <span>→</span></a>
        </div>
      </div>
    </section>
  );
}
