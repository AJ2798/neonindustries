# Neon Industries Website

React + Vite website for **Neon Industries Limited**.

## Main content configuration

Most website text and content can be edited from:

```text
src/data/siteConfig.js
```

This includes company details, hero content, divisions, featured project, vision, contact details, and other editable content.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm start
```

`npm run build` creates the production site in `dist/`. `npm start` launches the included Node static server and listens on Railway's `PORT` environment variable.

## Railway deployment

The project is already configured for Railway.

- `railway.json` runs `npm run build` during the build phase.
- `npm start` runs `server.js` in production.
- `server.js` binds to `0.0.0.0` and uses `process.env.PORT`.
- SPA fallback is enabled so React routes can still resolve to `index.html` later if routing is added.

Connect the GitHub repository to Railway and deploy. No custom start command is required unless you want to override the included configuration.

## Important files

```text
src/data/siteConfig.js   Website content
src/components/          React sections/components
src/styles/styles.css    Main styles
vite.config.js           Vite build configuration
railway.json             Railway build/deploy configuration
server.js                Production static server
package.json             Node scripts and dependencies
```

## Contact

```text
info@neonindustriesltd.com
```
