import { useEffect, useRef, useState } from "react";
import siteConfig from "../data/siteConfig";

function Stat({ item }) {
  const [display, setDisplay] = useState(typeof item.value === "number" ? 0 : item.value);
  const ref = useRef(null);
  useEffect(() => {
    if (typeof item.value !== "number") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1200;
      const animate = (now) => {
        const p = Math.min((now - start)/duration, 1);
        const eased = 1 - Math.pow(1-p, 3);
        setDisplay(Math.floor(item.value * eased));
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: .6 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.value]);
  return <div className="stat reveal visible" ref={ref}><strong>{display}{item.suffix}</strong><span>{item.label}</span></div>;
}

export default function Projects() {
  const { projectsSection, featuredProject, stats } = siteConfig;
  return (
    <section id="projects"><div className="container">
      <div className="section-head reveal visible">
        <div><div className="kicker">{projectsSection.kicker}</div><h2>{projectsSection.title}</h2></div>
        <p>{projectsSection.intro}</p>
      </div>
      <div className="project-shell reveal visible">
        <div className="project-copy"><span className="pill">{featuredProject.pill}</span><h3>{featuredProject.title}</h3><p>{featuredProject.description}</p>
          <div className="mini-points">{featuredProject.points.map((p) => <span key={p}>{p}</span>)}</div>
        </div>
        <div className="project-visual" aria-hidden="true"><div className="ring r3"></div><div className="ring r2"></div><div className="ring r1"></div><div className="core"></div></div>
      </div>
      <div className="stat-row">{stats.map((item, i) => <Stat item={item} key={i}/>)}</div>
    </div></section>
  );
}
