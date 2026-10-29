import siteConfig from "../data/siteConfig";

export default function Footer() {
  const { company, navigation } = siteConfig;
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-tag">
            <span className="mono-label">{company.fullName}</span>
            <p>{company.tagline}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h3>Company</h3>
              {navigation.map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
            </div>
            <div>
              <h3>Contact</h3>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={company.website}>{company.websiteLabel}</a>
              <span>{company.country}</span>
            </div>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">Neon Industries</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.fullName}. All rights reserved.</span>
          <span className="footer-status"><i /> All systems operational</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
