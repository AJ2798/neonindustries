import siteConfig from "../data/siteConfig";

export default function Footer() {
  const { company, navigation } = siteConfig;
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-word">
            {company.name}
            <span>{company.tagline}</span>
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
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.fullName}. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
