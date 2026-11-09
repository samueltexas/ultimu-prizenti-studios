import { collections } from '../data/projects.mjs';
import { pageUrl } from '../data/site.mjs';
import {
  pageHeading,
  photoCard,
  photoImage,
  lightbox,
  contactInvitation,
} from '../components/shared.mjs';

export function portfolioPage(language, t, photos) {
  return /* HTML */ `
    ${pageHeading(t.eyebrow, t.nav.portfolio, t.portfolioIntro)}
    <section class="wrap collections-grid" aria-label="${t.collection}">
      ${collections
        .map(
          (collection) =>
            /* HTML */ `<a
              class="collection-card"
              href="${pageUrl(language, 'portfolio')}${collection.slug}/"
              >${photoImage(
                photos.find((photo) => photo.id === collection.cover),
                t,
              )}
              <div>
                <h2>${t[collection.category]}</h2>
                <span>${t.viewCollection} ↗</span>
              </div></a
            >`,
        )
        .join('\n')}
    </section>
    <section class="section wrap">
      <div class="filter-bar" data-filters hidden aria-label="${t.photography}">
        ${['all', ...collections.map((collection) => collection.category)]
          .map(
            (key, index) =>
              /* HTML */ `<button type="button" data-filter="${key}" aria-pressed="${index === 0}">
                ${t[key]}
              </button>`,
          )
          .join('\n')}
      </div>
      <p class="small muted" data-result-count aria-live="polite">
        ${photos.length} · ${t.photography}
      </p>
      ${collections
        .map(
          (collection) =>
            /* HTML */ `<section class="portfolio-group" data-photo-group="${collection.category}">
              <h2>${t[collection.category]}</h2>
              <div class="photo-grid">
                ${photos
                  .filter((photo) => photo.category === collection.category)
                  .map((photo, index) => photoCard(photo, t, index))
                  .join('')}
              </div>
            </section>`,
        )
        .join('')}
    </section>
    ${contactInvitation(language, t)} ${lightbox(t)}
  `;
}

// Cada colecção tem uma página que pode ser partilhada directamente.
export function collectionPage(language, t, photos, collection) {
  const selected = photos.filter((photo) => photo.category === collection.category);

  return /* HTML */ `
    ${pageHeading(t.collection, t[collection.category], t.perspective)}
    <section class="wrap">
      <a class="text-link" href="${pageUrl(language, 'portfolio')}">← ${t.backPortfolio}</a>
      <div class="photo-grid collection-photos">
        ${selected.map((photo, index) => photoCard(photo, t, index)).join('\n')}
      </div>
    </section>
    ${contactInvitation(language, t)} ${lightbox(t)}
  `;
}
