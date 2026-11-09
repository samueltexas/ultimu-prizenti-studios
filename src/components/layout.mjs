import { site, languages, pageUrl } from '../data/site.mjs';
import { translations } from '../data/translations.mjs';
import { brand, escapeHtml, instagramIcon } from './shared.mjs';

export function layout({ language, page, content, title, subpath = '' }) {
  const t = translations[language];
  const pageTitle = `${title || t.titles[page]} | ${site.name}`;
  const currentPath = `${pageUrl(language, page)}${subpath}`;
  const instagram = site.instagram
    ? /* HTML */ `<a
        class="social-icon"
        href="${escapeHtml(site.instagram)}"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
        >${instagramIcon}</a
      >`
    : '';

  // A mudança de idioma conserva a página ou o projecto que está a ser visto.
  const languageLinks = languages
    .map(
      (code) =>
        /* HTML */ `<a
          href="${pageUrl(code, page)}${subpath}"
          lang="${code}"
          hreflang="${translations[code].locale}"
          ${code === language ? 'aria-current="true"' : ''}
          >${code.toUpperCase()}</a
        >`,
    )
    .join('<span aria-hidden="true">/</span>');
  const navigation = ['portfolio', 'films', 'drone', 'services', 'about', 'testimonials', 'contact']
    .map(
      (key) =>
        /* HTML */ `<a href="${pageUrl(language, key)}" ${page === key ? 'aria-current="page"' : ''}
          >${t.nav[key]}</a
        >`,
    )
    .join('\n');
  const canonical = site.origin
    ? /* HTML */ `<link rel="canonical" href="${escapeHtml(site.origin + currentPath)}" />`
    : '';
  const alternates = site.origin
    ? languages
        .map(
          (code) =>
            /* HTML */ `<link
              rel="alternate"
              hreflang="${translations[code].locale}"
              href="${escapeHtml(site.origin + pageUrl(code, page) + subpath)}"
            />`,
        )
        .join('\n')
    : '';

  return /* HTML */ `<!doctype html>
    <html lang="${t.locale}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(pageTitle)}</title>
        <meta name="description" content="${escapeHtml(t.description)}" />
        ${process.env.SITE_PREVIEW === 'true'
          ? '<meta name="robots" content="noindex,nofollow">'
          : ''}
        <meta name="theme-color" content="#101111" />
        <meta property="og:title" content="${escapeHtml(pageTitle)}" />
        <meta property="og:description" content="${escapeHtml(t.description)}" />
        <meta property="og:type" content="website" />
        ${site.origin
          ? /* HTML */ `<meta
              property="og:image"
              content="${escapeHtml(site.origin)}/assets/videos/site-preview-poster.png"
            />`
          : ''}
        ${canonical} ${alternates}
        <link rel="icon" href="/assets/brand/favicon.png" type="image/png" />
        <link rel="stylesheet" href="/assets/styles.css" />
        <script type="module" src="/assets/main.js"></script>
      </head>
      <body>
        <a class="skip-link" href="#main">${t.skip}</a>
        <header class="site-header">
          <div class="header-inner wrap">
            ${brand(language)}
            <button
              class="menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="main-navigation"
              hidden
            >
              ${t.menu} <span aria-hidden="true">☰</span>
            </button>
            <nav id="main-navigation" aria-label="${t.menu}">${navigation}</nav>
            <div class="header-actions">
              <nav class="languages" aria-label="Language">${languageLinks}</nav>
              <a class="header-cta" href="${pageUrl(language, 'contact')}">${t.create}</a>
              ${instagram}
            </div>
          </div>
        </header>
        <main id="main">${content}</main>
        <footer class="site-footer wrap">
          <div class="footer-top">
            ${brand(language)}
            <nav class="footer-links" aria-label="${t.nav.contact}">
              ${site.instagram
                ? /* HTML */ `<a
                    class="footer-social"
                    href="${escapeHtml(site.instagram)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${instagramIcon}<span>Instagram ↗</span></a
                  >`
                : ''}
              ${site.facebook
                ? /* HTML */ `<a
                    href="${escapeHtml(site.facebook)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Facebook ↗</a
                  >`
                : ''}
              <a href="${pageUrl(language, 'contact')}">${t.nav.contact}</a>
            </nav>
            <nav class="languages" aria-label="Language">${languageLinks}</nav>
          </div>
          <p class="small muted footer-authorship">${escapeHtml(t.authorship)}</p>
          <div class="footer-bottom">
            <small>© ${new Date().getFullYear()} ${site.name}. ${t.rights}</small
            ><a href="${pageUrl(language, 'privacy')}">${t.nav.privacy}</a>
          </div>
        </footer>
      </body>
    </html>`;
}
