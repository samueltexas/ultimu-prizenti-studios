import { films, filmCategories } from '../data/projects.mjs';
import { pageUrl } from '../data/site.mjs';
import { pageHeading, contactInvitation, escapeHtml } from '../components/shared.mjs';

// As capas usam fotogramas dos originais e só carregamos vídeo após escolha do visitante.
function filmCard(language, t, film, href, label) {
  return /* HTML */ `<article class="film-card">
    <a href="${href}"
      ><div class="film-cover">
        <img
          src="/assets/videos/${film.poster}"
          alt="${escapeHtml(t[film.titleKey])}"
          width="${film.posterWidth}"
          height="${film.posterHeight}"
          loading="lazy"
        /><span class="play-symbol" aria-hidden="true">▷</span>
      </div>
      <div class="film-caption">
        <h2>${escapeHtml(label || t[film.titleKey])}</h2>
        <span aria-hidden="true">↗</span>
      </div></a
    >
  </article>`;
}

function player(t, film) {
  return /* HTML */ `<video
    controls
    playsinline
    preload="none"
    poster="/assets/videos/${film.poster}"
    aria-label="${escapeHtml(t[film.titleKey])}"
  >
    <source src="/assets/videos/${film.file}.mp4" type="video/mp4" />
    <a href="/assets/videos/${film.file}.mp4">${escapeHtml(t[film.titleKey])}</a>
  </video>`;
}

export function filmsPage(language, t) {
  const base = pageUrl(language, 'films');
  return /* HTML */ `${pageHeading(t.eyebrow, t.films, t.filmsIntro)}
    <section class="wrap film-list">
      ${films
        .filter((film) => film.category === 'showreels')
        .map((film) => filmCard(language, t, film, base + film.slug + '/'))
        .join('')}
      ${filmCategories
        .map((category) =>
          filmCard(
            language,
            t,
            films.find((film) => film.slug === category.featured),
            base + category.slug + '/',
            t[category.titleKey],
          ),
        )
        .join('')}
    </section>
    ${contactInvitation(language, t)}`;
}

export function filmCategoryPage(language, t, category) {
  const featured = films.find((film) => film.slug === category.featured);
  const rest = films.filter((film) => film.category === category.slug && film !== featured);
  return /* HTML */ `${pageHeading(t.films, t[category.titleKey])}
    <section class="wrap film-detail">
      <p class="eyebrow">${t.featuredFilm}</p>
      <h2>${escapeHtml(t[featured.titleKey])}</h2>
      ${player(t, featured)}
    </section>
    ${rest.length
      ? /* HTML */ `<section class="section wrap film-list event-film-list">
          ${rest
            .map((film) =>
              filmCard(language, t, film, pageUrl(language, 'films') + film.slug + '/'),
            )
            .join('')}
        </section>`
      : ''}
    <section class="wrap">
      <a class="text-link" href="${pageUrl(language, 'films')}">← ${t.films}</a>
    </section>
    ${contactInvitation(language, t)}`;
}

export function filmPage(language, t, film) {
  const category = filmCategories.find((item) => item.slug === film.category);
  const back = pageUrl(language, 'films') + (category ? category.slug + '/' : '');
  return /* HTML */ `${pageHeading(
      category ? t[category.titleKey] : t.films,
      t[film.titleKey],
      t.originalFilm,
    )}
    <section class="wrap film-detail">
      ${player(t, film)}<a class="text-link" href="${back}"
        >← ${category ? t[category.titleKey] : t.films}</a
      >
    </section>
    ${contactInvitation(language, t)}`;
}
