import siteConfig from "../data/siteConfig";

export default function Vision() {
  const { vision } = siteConfig;
  return (
    <section className="vision" id="vision">
      <div className="container vision-wrap">
        <div className="kicker">{vision.kicker}</div>
        <h2>{vision.title}</h2>
        <p>{vision.copy}</p>
      </div>
    </section>
  );
}
