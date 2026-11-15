# camilobrownpinilla.github.io

Personal site built with [Astro](https://astro.build). No backend, no framework, just files.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| To change…                     | Edit                                              |
| ------------------------------ | ------------------------------------------------- |
| Name, social links, Last.fm user | `src/site.ts`                                   |
| Colors, fonts, spacing         | `src/styles/global.css` (CSS variables at the top) |
| Bio                            | `src/sections/home/bio.md`                        |
| Research statement             | `src/sections/research/research.md`               |
| Publications                   | `src/sections/publications/publications.yaml`     |
| Globe places                   | `src/sections/misc/places.yaml`                   |
| Globe photos                   | `src/sections/misc/photos/<place-slug>/`          |
| Section order / which sections | `src/pages/index.astro`                           |

Each section is one folder in `src/sections/` holding its markup, styles, and data.

## Common tasks

**Add a publication.** Copy a block in `publications.yaml` and edit it. `links` is a free list,
so each card can have any pills, such as PDF, Code, arXiv, Project page, or Press. Set `featured: true` to also
show it on the home page. For a thumbnail, drop an image in `publications/images/` and add
`image: ./images/file.png`.

**Add a place to the globe.** Add a line to `places.yaml` with a `slug`, then put photos in
`photos/<slug>/`. Photos are resized automatically at build time.

**Add a section.** Create `src/sections/<name>/<Name>.astro` wrapped in
`<Card id="<name>" kicker="~/<name>">…</Card>`, then add it to `src/pages/index.astro`.
To show it as a tab, add it to `nav` in `src/site.ts`.

## Music (Last.fm)

1. Get an API key at https://www.last.fm/api/account/create.
2. For local development, copy `.env.example` to `.env` and paste the key.
3. For the live site, add a repository secret named `LASTFM_API_KEY` under
   Settings → Secrets and variables → Actions.
4. Set `lastfmUser` in `src/site.ts`.

## Deploying

Pushing to `master` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
