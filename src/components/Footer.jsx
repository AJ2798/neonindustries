import siteConfig from "../data/siteConfig";

export default function Footer() {
  const { company, navigation } = siteConfig;
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-mark">NI</span>
          <div>
            <strong>{company.fullName}</strong>
            <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
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
