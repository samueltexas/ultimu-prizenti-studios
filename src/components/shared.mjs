import { site, pageUrl } from '../data/site.mjs';

// Escapamos os dados antes de os inserir no HTML, incluindo nomes de ficheiros.
export function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );
}

export function button(label, href, secondary = false) {
  return /* HTML */ `<a
    class="button ${secondary ? 'button-outline' : ''}"
    href="${escapeHtml(href)}"
    >${escapeHtml(label)} <span aria-hidden="true">↗</span></a
  >`;
}

// O desenho seguinte é apenas o ícone de navegação do Instagram, não o logótipo do estúdio.
export const instagramIcon = /* HTML */ `<svg
  viewBox="0 0 24 24"
  width="22"
  height="22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.4"
  aria-hidden="true"
>
  <rect x="3" y="3" width="18" height="18" rx="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
</svg>`;

export function brand(language) {
  const content = site.logo
    ? /* HTML */ `<img src="${escapeHtml(site.logo)}" alt="${site.name}" width="210" height="80" />`
    : `<span class="brand-name">Ultimu Prizenti</span><span class="brand-studios">Studios</span>`;

  return /* HTML */ `<a class="brand" href="${pageUrl(language)}" aria-label="${site.name}"
    >${content}</a
  >`;
}

export function photoImage(photo, t, eager = false) {
  const imageWidth = (size) =>
    Math.round(photo.width * Math.min(1, size / Math.max(photo.width, photo.height)));
  const alt = `${t[photo.category]} — ${photo.original}`;

  return /* HTML */ `<img
    src="/assets/photos/${photo.id}-1600.webp"
    srcset="/assets/photos/${photo.id}-640.webp ${imageWidth(
      640,
    )}w, /assets/photos/${photo.id}-1600.webp ${imageWidth(
      1600,
    )}w, /assets/photos/${photo.id}-2400.webp ${imageWidth(2400)}w"
    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
    width="${photo.width}"
    height="${photo.height}"
    alt="${escapeHtml(alt)}"
    loading="${eager ? 'eager' : 'lazy'}"
    decoding="async"
  />`;
}

export function photoCard(photo, t, index) {
  return /* HTML */ `<figure class="photo-card" data-category="${photo.category}">
    <a
      class="photo-link"
      href="/assets/photos/${photo.id}-2400.webp"
      data-lightbox
      aria-label="${escapeHtml(`${t.enlarge}: ${photo.original}`)}"
    >
      ${photoImage(photo, t)}
      <span class="photo-enlarge" aria-hidden="true">↗</span>
    </a>
    <figcaption>
      <span>${String(index + 1).padStart(2, '0')}</span><span>${t[photo.category]}</span>
    </figcaption>
  </figure>`;
}

export function lightbox(t) {
  // O elemento dialog trata do foco e impede interacções com a página por baixo.
  return /* HTML */ `<dialog
    class="lightbox"
    aria-label="${escapeHtml(t.photography)}"
    data-lightbox-dialog
  >
    <button class="icon-button lightbox-close" type="button" data-close aria-label="${t.close}">
      ×
    </button>
    <button
      class="icon-button lightbox-previous"
      type="button"
      data-previous
      aria-label="${t.previous}"
    >
      ←
    </button>
    <figure>
      <img data-full-photo alt="" />
      <figcaption data-photo-caption aria-live="polite"></figcaption>
    </figure>
    <button class="icon-button lightbox-next" type="button" data-next aria-label="${t.next}">
      →
    </button>
  </dialog>`;
}

export function contactInvitation(language, t) {
  return /* HTML */ `<section class="section contact-invitation wrap">
    <div>
      <p class="eyebrow">${t.ctaEyebrow}</p>
      <h2>${t.ctaTitle}</h2>
      <p class="muted">${t.based}</p>
    </div>
    ${button(t.contact, pageUrl(language, 'contact'))}
  </section>`;
}

export function pageHeading(eyebrow, title, intro = '') {
  return /* HTML */ `<header class="page-heading wrap">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h1>${escapeHtml(title)}</h1>
    ${intro ? /* HTML */ `<p class="intro">${escapeHtml(intro)}</p>` : ''}
  </header>`;
}

// Testemunho de Marisa Albuquerque, confirmado pelo proprietário nesta conversa.
// As versões inglesa e polaca traduzem o comentário fornecido em português.
export function testimonialsSection(t) {
  return /* HTML */ `<section
    class="section wrap testimonials border-top"
    aria-labelledby="testimonials-heading"
  >
    <p class="eyebrow">03 / ${t.testimonialsTitle}</p>
    <h2 id="testimonials-heading">${t.testimonialsTitle}</h2>
    <figure class="testimonial">
      <blockquote>${t.testimonialQuote}</blockquote>
      <figcaption class="eyebrow">Marisa Albuquerque</figcaption>
    </figure>
  </section>`;
}
