import siteConfig from "../data/siteConfig";

export default function Footer() {
  const { company, navigation } = siteConfig;
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div>
            <strong>{company.fullName}</strong>
            <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
            <a className="footer-email" href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>
        <div className="footer-links">
          {navigation.filter((i) => i.href !== "#contact").map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
