import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const port = Number(process.env.PORT || 8080);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function safePathname(url = "/") {
  try {
    return decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return "/";
  }
}

async function getFilePath(requestUrl) {
  let pathname = safePathname(requestUrl);
  if (pathname === "/") pathname = "/index.html";

  const requestedPath = path.normalize(path.join(distDir, pathname));
  if (!requestedPath.startsWith(distDir)) return path.join(distDir, "index.html");

  try {
    const info = await stat(requestedPath);
    if (info.isFile()) return requestedPath;
  } catch {
    // React SPA fallback below.
  }

  return path.join(distDir, "index.html");
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = await getFilePath(req.url);
    const body = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
    });
    res.end(body);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Neon Industries website running on port ${port}`);
});
