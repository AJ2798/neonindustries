import siteConfig from "../data/siteConfig";

// Closing call to action. Shared by both pages; the About page passes its
// own copy and address.
export default function Contact({ title, copy, email }) {
  const { contact } = siteConfig;
  const to = email ?? contact.email;

  return (
    <section id="contact">
      <div className="container">
        <div className="cta-panel">
          <div className="cta-orbit" aria-hidden="true" />
          <span className="mono-label">{contact.kicker}</span>
          <h2>{title ?? contact.title}</h2>
          <p>{copy ?? contact.copy}</p>
          <a className="btn btn-primary" href={`mailto:${to}?subject=Connecting%20with%20Neon%20Industries`}>
            {contact.buttonLabel} <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
