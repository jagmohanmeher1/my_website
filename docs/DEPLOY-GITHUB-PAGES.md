# Deploying this site on GitHub Pages

The live URL uses the **Next.js app** in `src/`, not the old `index.html` in the repo root. GitHub Pages must build and serve the **static export** from the workflow in `.github/workflows/deploy-github-pages.yml`.

## One-time setup (GitHub UI)

1. Open the repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch” with `/ (root)` — that only serves the old static `index.html` and will not show the new site).
3. Push to `main` (or merge) so the **Deploy to GitHub Pages** workflow runs. Check the **Actions** tab for a green run.

## Site URL

For this repo, the Project Pages URL is:

`https://jagmohanmeher1.github.io/my_website/`

(Trailing slash matters.)

## If you rename the repository

Update `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy-github-pages.yml` to `/<new-repo-name>` and push again.

## Local production preview

```bash
NEXT_PUBLIC_BASE_PATH=/my_website npm run build
npx serve out
```

Open `http://localhost:3000/my_website/` (port may vary; `serve` prints the URL).
