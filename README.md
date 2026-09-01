# Portfolio — Jordan Reyes (sample content)

A Next.js portfolio built around engineering-drawing conventions —
blueprints, title blocks, and a bill-of-materials — for a manufacturing
engineering student.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

**Option A — via GitHub**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — click **Deploy**. No config needed.

**Option B — via Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts; it'll deploy and give you a live URL.

## Customize it

All the content you'll want to change lives in `components/`:

- `Hero.js` — name, role, pitch, and the SVG technical drawing
- `About.js` — bio + the "inspection tag" facts panel
- `Projects.js` — the `projects` array — swap in your real projects
- `Skills.js` — the `items` array — your bill-of-materials skill list
- `Contact.js` — email / LinkedIn / GitHub links

Design tokens (colors, fonts, spacing) are all defined as CSS custom
properties at the top of `app/globals.css` under `:root` — change a value
there and it updates everywhere.

Everything here — name, school, projects, links — is placeholder. Replace
it with your own before deploying.
