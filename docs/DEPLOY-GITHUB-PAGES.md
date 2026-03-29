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

## If the workflow shows a red X

1. Open **Actions** → click the failed run → see which job failed (**build** or **deploy**).
2. **Settings** → **Actions** → **General** → **Workflow permissions** → choose **Read and write permissions** → Save. (Deploy steps need permission to publish Pages artifacts.)
3. **Settings** → **Environments** → **github-pages** → remove extra **Required reviewers** / protection rules if deploy hangs or fails on approval.
4. Common **build** failure (fixed in repo): `next/font/google` downloads fonts during `next build`; GitHub runners often cannot reach `fonts.googleapis.com` reliably. This project uses system fonts in CSS instead so CI does not need that network call.
