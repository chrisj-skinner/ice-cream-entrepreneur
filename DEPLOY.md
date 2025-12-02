# Build & Deploy Process

## Local Development

```bash
npm run dev
```

Opens dev server at http://localhost:3000

## Build for Production

```bash
npm run build
```

- Builds optimized bundle to `dist/` directory
- Uses Vite with production optimizations
- Output: minified JS, CSS, and assets

## Deploy to GitHub Pages

```bash
npm run deploy
```

This command:

1. Runs `vite build --base=/ice-cream-entrepreneur/` (sets correct base path for GH Pages)
2. Creates `dist/.nojekyll` file (tells GitHub Pages not to use Jekyll)

After running `npm run deploy`, you need to manually push the `dist/` folder to the `gh-pages` branch:

```bash
# From the root of the project
git subtree push --prefix dist origin gh-pages
```

Or if you encounter issues, force push:

```bash
git push origin `git subtree split --prefix dist main`:gh-pages --force
```

## Complete Deploy Workflow

```bash
# 1. Build for GitHub Pages
npm run deploy

# 2. Push to gh-pages branch
git subtree push --prefix dist origin gh-pages

# 3. Commit source changes (if any)
git add .
git commit -m "your message"
git push origin main
```

## Preview Production Build Locally

```bash
npm run preview
```

Serves the built `dist/` folder locally to test the production build before deploying.

---

**Note:** The live site is at https://chrisj-skinner.github.io/ice-cream-entrepreneur/
