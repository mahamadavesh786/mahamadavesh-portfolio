# Mahamadavesh Mathakiya — Portfolio

A personal portfolio website built with Angular 17 (standalone components and signals). It is a single static page with no backend and deploys to Netlify.

All content comes from the resume PDF, and it all lives in one file: **`src/app/data/resume.data.ts`**.

---

## Quick start

Requirements: Node.js **18.13 or newer** (Node 20 LTS recommended) and npm.

```bash
npm install
npm start            # dev server at http://localhost:4200
npm run build        # production build -> dist/mahamadavesh-portfolio/browser
```

To preview the production build locally:

```bash
npx http-server dist/mahamadavesh-portfolio/browser -p 4300
```

> The contact form only submits successfully on Netlify. Locally it shows the error message with an "email me directly" fallback, which is expected.

---

## Project structure

```
src/
├── index.html                  SEO/OG meta, fonts, theme script, hidden Netlify form
├── styles.scss                 Design tokens (dark + light), buttons, cards, reveal animation
├── favicon.svg  robots.txt  sitemap.xml
├── assets/resume/Mahamadavesh-Mathakiya-Resume.pdf   ← downloadable resume
└── app/
    ├── data/resume.data.ts     ← ALL content (edit this to update the site)
    ├── services/theme.service.ts
    ├── shared/reveal.directive.ts
    └── components/
        navbar  hero  about  skills  experience  projects  education  resume  contact  footer
netlify.toml                    Build command, publish dir, Node version, headers
```

---

## Editing content

Open `src/app/data/resume.data.ts`. Optional fields are empty strings, and the UI hides any field left empty:

| Field | Where | Effect when filled |
|---|---|---|
| `PROFILE.linkedin` | full URL | LinkedIn card in Contact + footer icon |
| `PROFILE.github` | full URL | GitHub card in Contact + footer icon |
| `PROFILE.location` | e.g. `"Ahmedabad, India"` | Location card in Contact |
| `PROJECTS[i].githubUrl` / `liveUrl` | full URL | Icon buttons on card + buttons in detail modal |
| `PROJECTS[i].screenshots` | `[{ src: 'assets/projects/x.webp', alt: '…' }]` | Lazy-loaded gallery in detail modal |
| `EDUCATION` | append an entry | New card in Education (template in the file's comment) |

### Replacing the resume PDF

Replace `src/assets/resume/Mahamadavesh-Mathakiya-Resume.pdf` with the new file, keeping the **same filename**. Every Download/View button points to this path. If you rename the file, also update `PROFILE.resumeFile` and `PROFILE.resumeDownloadName`.

If you update the resume, also update the matching text in `resume.data.ts`, for example the experience duration "3 years 3 months", which appears in `PROFILE`, `ABOUT`, `EXPERIENCE` and `EDUCATION`.

---

## Deploying to GitHub Pages (current setup)

The workflow `.github/workflows/deploy.yml` builds and publishes the site every time you push to `main`.

1. Create an **empty public** repository on GitHub, for example `mahamadavesh-portfolio`. Don't add a README or license.
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. On GitHub, open the repo and go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab and wait for the green check, about 2 minutes. If the first run failed because Pages wasn't enabled yet, click **Re-run all jobs**.
5. Your site is live at **`https://<you>.github.io/<repo>/`**.
   If you name the repo `<you>.github.io`, the site is served at `https://<you>.github.io/` instead.

The workflow sets the base path and fills in `SITE_URL` (canonical link, Open Graph tags, robots.txt, sitemap) automatically, so you don't need to edit those by hand.

**Contact form on GitHub Pages:** messages go through [FormSubmit](https://formsubmit.co) and are emailed to `PROFILE.email`. The **first** message sent from the live site triggers an activation email from FormSubmit. Click the link in it once, and every message after that arrives in your inbox. To switch back to Netlify Forms, set `CONTACT_FORM.provider = 'netlify'` in `resume.data.ts`.

---

## Deploying to Netlify (alternative)

If you host on Netlify instead, first set `CONTACT_FORM.provider = 'netlify'` in `resume.data.ts`.

### Option A — GitHub → Netlify

1. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Netlify, go to **Add new site → Import an existing project → GitHub** and pick the repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist/mahamadavesh-portfolio/browser`
   - Node version: `20`
4. Click **Deploy**. Every push to `main` redeploys automatically.

### Option B — Drag and drop

Run `npm run build`, then drag the `dist/mahamadavesh-portfolio/browser` folder onto https://app.netlify.com/drop.
⚠️ With drag-and-drop deploys, Netlify Forms detection still works, but enable **Forms → form detection** in site settings first if submissions don't appear.

### After the first deploy

1. **Replace `SITE_URL`** with your real domain (for example `mahamadavesh.netlify.app`) in:
   - `src/index.html` (`og:url`, `canonical`)
   - `src/robots.txt`
   - `src/sitemap.xml`
2. **Contact form:** in Netlify go to **Site configuration → Forms** and enable form detection if it is not already on, then redeploy. Submissions appear under **Forms → contact**. To get an email for each message, add a notification under **Forms → Form notifications → Add notification → Email**.
3. Send a test message from the live site to confirm everything works.

### How the contact form works

- `index.html` contains a hidden static `<form name="contact" netlify>`. Netlify's build bot detects it there because Angular renders the visible form at runtime, where the bot can't see it.
- The Angular form validates its fields, then `POST`s URL-encoded data with `form-name=contact` to `/`.
- The success message appears **only** when Netlify responds with a 2xx status. Any other result shows an error message with a pre-filled `mailto:` link.
- A honeypot field (`bot-field`) filters out basic spam.

### Environment variables

None are required. The only build setting is `NODE_VERSION = 20`, set in `netlify.toml`.

### SPA redirects

None are needed. The site is a single page that uses `#section` anchors and no Angular Router, so there are no deep routes that could return 404.

---

## Features

- Sticky navbar with active-section indicator, plus a mobile menu (closes on Escape, link click or resize)
- Dark/light theme, which starts from the system setting, is saved in `localStorage`, and loads without a flash
- Smooth scrolling and scroll-reveal animations, both turned off under `prefers-reduced-motion`
- Project filtering by technology, and a native `<dialog>` detail view (traps focus, closes on Escape and backdrop click)
- Resume download (`download` attribute) and in-browser view
- Contact form with field validation, sending, success and error states, a mailto fallback, and a copy-email button
- Back-to-top button and copyright year generated at runtime
- Accessibility: skip link, visible focus rings, `aria-current` / `aria-pressed` / `aria-expanded`, a live region for filter results, and labelled form errors
- SEO: title, description, Open Graph/Twitter tags, JSON-LD `Person` schema, canonical link, sitemap, robots.txt and an SVG favicon

---

## Still needed (optional)

These details are **not in the resume**, so the site leaves them out instead of inventing them:

- [ ] LinkedIn URL
- [ ] GitHub URL
- [ ] Location (city/country)
- [ ] Formal education: degree, institution and years (only the 6-month 2023 training appears)
- [ ] Certifications (if any)
- [ ] Profile photo (the hero currently uses an abstract code-editor illustration)
- [ ] Project screenshots (check client confidentiality first)
- [ ] Public GitHub or live demo links for projects (if any are allowed)
- [ ] Open Graph share image, 1200×630 PNG, saved as `src/assets/og-image.png` and referenced with `<meta property="og:image" content="https://SITE_URL/assets/og-image.png">`
- [ ] Your final domain, to replace `SITE_URL`

---

## Production verification checklist

Already verified locally against the production build (Chrome headless, desktop 1440px and mobile 390px):

- [x] `npm run build` completes with no errors or warnings. The initial load is about 75 kB transferred.
- [x] Every `#anchor` link resolves to an existing section
- [x] Resume PDF is served (HTTP 200) from `/assets/resume/Mahamadavesh-Mathakiya-Resume.pdf`
- [x] Theme toggle switches and persists
- [x] Project filter (e.g. *SignalR* → PIQET only) and the "All" reset work
- [x] Project modal opens, closes with Escape, and restores page scroll
- [x] Empty form submit shows 4 field errors and focuses the first invalid field
- [x] Failed submission shows the error state with the mailto fallback, never a false "sent" message
- [x] Mobile menu opens, navigates and closes
- [x] No horizontal scroll at 390px

Check these after deploying:

- [ ] The live contact form submission appears in Netlify → Forms
- [ ] The Download Resume button saves `Mahamadavesh-Mathakiya-Resume.pdf`
- [ ] Email (`mailto:`) and phone (`tel:`) links open the correct apps on a phone
- [ ] `SITE_URL` has been replaced, and `/robots.txt` and `/sitemap.xml` load
- [ ] A Lighthouse run (Chrome DevTools) shows no accessibility or SEO regressions
