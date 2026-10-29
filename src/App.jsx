import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

// Two pages, chosen by path. server.js falls back to index.html for any
// unknown path, so /about loads the app directly.
const PAGES = {
  "/": { component: Home, title: "Neon Industries | Building the Future" },
  "/about": { component: About, title: "About | Neon Industries" },
};

function currentPath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PAGES[path] ? path : "/";
}

export default function App() {
  const path = currentPath();
  const { component: Page, title } = PAGES[path];

  useEffect(() => {
    document.title = title;
    // Content renders after load, so the browser can't jump to #anchors itself.
    // Wait a frame so the browser's own scroll restoration doesn't override us.
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [title]);

  return (
    <>
      <Navbar path={path} />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}
