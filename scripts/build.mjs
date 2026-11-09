import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { site, languages, routes } from '../src/data/site.mjs';
import { translations } from '../src/data/translations.mjs';
import { collections, films, filmCategories } from '../src/data/projects.mjs';
import { layout } from '../src/components/layout.mjs';
import { homePage } from '../src/pages/home.mjs';
import { portfolioPage, collectionPage } from '../src/pages/portfolio.mjs';
import { filmsPage, filmPage, filmCategoryPage } from '../src/pages/films.mjs';
import { servicesPage } from '../src/pages/services.mjs';
import { aboutPage } from '../src/pages/about.mjs';
import { contactPage } from '../src/pages/contact.mjs';
import { dronePage } from '../src/pages/drone.mjs';
import { testimonialsPage } from '../src/pages/testimonials.mjs';
import { privacyPage } from '../src/pages/privacy.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
// A compilação só substitui dist, que contém exclusivamente ficheiros gerados.
export async function build() {
  const output = resolve(root, 'dist');
  const photos = JSON.parse(await readFile(resolve(root, 'src/data/photos.json'), 'utf8'));
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(resolve(root, 'public'), output, { recursive: true });
  const pages = {
    home: homePage,
    portfolio: portfolioPage,
    films: filmsPage,
    drone: dronePage,
    services: servicesPage,
    about: aboutPage,
    contact: contactPage,
    privacy: privacyPage,
    testimonials: testimonialsPage,
  };
  const paths = [];
  async function save(path, html) {
    await mkdir(resolve(output, path), { recursive: true });
    await writeFile(resolve(output, path, 'index.html'), html);
    paths.push('/' + path + '/');
  }
  for (const language of languages) {
    const t = translations[language];
    for (const [page, render] of Object.entries(pages)) {
      await save(
        `${language}${routes[page] ? '/' + routes[page] : ''}`,
        layout({ language, page, content: render(language, t, photos) }),
      );
    }
    for (const collection of collections) {
      await save(
        `${language}/portfolio/${collection.slug}`,
        layout({
          language,
          page: 'portfolio',
          title: t[collection.category],
          subpath: collection.slug + '/',
          content: collectionPage(language, t, photos, collection),
        }),
      );
    }
    for (const category of filmCategories) {
      await save(
        `${language}/films/${category.slug}`,
        layout({
          language,
          page: 'films',
          title: t[category.titleKey],
          subpath: category.slug + '/',
          content: filmCategoryPage(language, t, category),
        }),
      );
    }
    for (const film of films) {
      await save(
        `${language}/films/${film.slug}`,
        layout({
          language,
          page: 'films',
          title: t[film.titleKey],
          subpath: film.slug + '/',
          content: filmPage(language, t, film),
        }),
      );
    }
  }
  await writeFile(
    resolve(output, 'index.html'),
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/en/"><title>Ultimu Prizenti Studios</title></head><body><a href="/en/">English</a> · <a href="/pl/">Polski</a> · <a href="/pt/">Português</a></body></html>',
  );
  const t = translations.en;
  await writeFile(
    resolve(output, '404.html'),
    layout({
      language: 'en',
      page: 'home',
      title: '404',
      content: `<section class="page-heading wrap"><p>404</p><h1>${t.notFound}</h1><p>${t.notFoundText}</p><a class="button" href="/en/">${t.returnHome}</a></section>`,
    }),
  );
  await writeFile(
    resolve(output, 'robots.txt'),
    `User-agent: *\nAllow: /\n${site.origin ? 'Sitemap: ' + site.origin + '/sitemap.xml' : ''}\n`,
  );
  if (site.origin)
    await writeFile(
      resolve(output, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${site.origin}${path}</loc></url>`).join('')}</urlset>`,
    );
  console.log(`${paths.length} páginas construídas em dist.`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
