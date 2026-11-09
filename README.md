# Ultimu Prizenti Studios

A multilingual photography and filmmaking website developed for my own company,
**Ultimu Prizenti Studios**, based in Warsaw and available for projects worldwide.

This project brings together my creative work and my interest in information
technology: brand identity, visual direction, photography, filmmaking and a complete
web experience. The design direction and original photographic and audiovisual
portfolio are my own work. I am sharing the project to demonstrate my technical
skills, product decisions and ability to take a real business requirement through
to a working website.

> More Than Visuals. Memories That Live On.
>
> A Little Phototherapy for the Soul.

## What the project demonstrates

- A custom static-site generator using Node.js and JavaScript ES modules.
- Reusable page components and a separate content/data layer.
- English, Polish and Portuguese pages with language-aware navigation.
- Responsive CSS, accessible forms, keyboard-operated galleries and reduced-motion support.
- Responsive WebP photographs and on-demand video playback with original aspect ratios.
- Netlify Forms integration for enquiries and privately reviewed client testimonials.
- Automated checks for generated pages, assets, translations, links and form submissions.
- A reproducible build, GitHub Actions validation and Git-based Netlify deployment.

## Run locally

Use **Node.js 24 LTS** (minimum supported: 22). No npm packages are required to run,
build or test the site.

```sh
git clone https://github.com/samueltexas/ultimu-prizenti-studios.git
cd ultimu-prizenti-studios
npm run dev
```

Open <http://localhost:3001/en/>. The local server binds only to this computer and
never uses port 3000. Stop it with Ctrl+C. After an edit, run `npm run build` in a
second terminal and refresh the browser.

```sh
npm run check  # Build the complete site and run the automated checks.
npm run build # Generate dist/ without starting the server.
npm test      # Test an existing build.
```

## Features and content

The build produces **66 language-specific pages**, plus the language entry point and
404 page. The portfolio includes 53 photographs in three responsive sizes, seven
films, four photo collections, dedicated events and music-video pages, 14 service
packages, the studio story, drone services, contact and testimonials pages.

The web-ready media is included, so a clone builds without missing videos. The
repository is roughly 365 MB before Git history; download or clone over a suitable
connection. Private source masters are stored separately and are not in this repo.

## Project structure

```text
src/data/        Content, translations, prices, photographs and film catalogue
src/components/ Shared layout, navigation, cards and HTML escaping
src/pages/      Page templates
public/assets/  Styles, browser JavaScript, logos and web-ready media
scripts/        Static build and local HTTP server
tests/          Automated verification using node:test
docs/           Publishing instructions and project explanation
dist/           Generated output (not tracked)
```

Start with [the project guide](docs/PROJECT.md) to follow how data becomes HTML.
Code comments explain important decisions in Portuguese.

## Deployment

Import this repository into **Netlify Free**. `netlify.toml` sets:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `24`

No API key is embedded in the frontend. Netlify supplies the public URL during the
build; optionally set `SITE_URL` for a custom domain. Enable Forms detection and
configure email notifications for both `contact` and `testimonials`, then redeploy.
Read [the publishing guide](docs/PUBLICAR.md) for the complete sequence.

Localhost does not submit forms. Live submission and notification delivery must be
verified on the deployed site. Reviews are never automatically published: approved
content is added manually and deployed again. There is no CMS or private client
photo-delivery system in this release.

The free hosting plan has usage limits. Video traffic can consume the allowance;
a custom domain is optional and paid separately. No paid services are required by
the code, and no automatic payment flow is implemented.

## Ownership

This is a source-available professional portfolio, not an open-source template.
The code, brand identity and creative assets remain protected; see [LICENSE](LICENSE).
Viewing the repository does not grant permission to reuse photographs, videos or branding.

Contact: **ultimuprizenti@gmail.com** · [Instagram](https://www.instagram.com/ultimuprizenti/)
