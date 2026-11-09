import { story } from '../data/story.mjs';
import { pageUrl } from '../data/site.mjs';
import { selectedPhotos, collections } from '../data/projects.mjs';
import {
  button,
  photoCard,
  lightbox,
  contactInvitation,
  testimonialsSection,
} from '../components/shared.mjs';

// Página inicial: retrato primeiro e fotografias reunidas por tema, sem misturar grupos.
export function homePage(language, t, photos) {
  const about = story[language];
  const selection = selectedPhotos
    .map((id) => photos.find((photo) => photo.id === id))
    .filter(Boolean);

  return /* HTML */ `
    <section class="hero">
      <video
        class="hero-video"
        muted
        loop
        playsinline
        preload="none"
        poster="/assets/videos/site-preview-poster.png"
        data-background-video
        aria-hidden="true"
      >
        <source data-src="/assets/videos/site-preview.mp4" type="video/mp4" />
      </video>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">${t.eyebrow} <span aria-hidden="true">/</span> ${t.location}</p>
        <h1 lang="en">More Than Visuals.<br />Memories That Live On.</h1>
        <p class="hero-subtitle" lang="en">A Little Phototherapy for the Soul.</p>
        <div class="button-row">
          ${button(t.explore, pageUrl(language, 'portfolio'))}
          ${button(t.watch, `${pageUrl(language, 'films')}studio-showreel/`, true)}
        </div>
      </div>
      <div class="hero-bottom wrap">
        <span>Ultimu Prizenti Studios</span
        ><button
          type="button"
          class="video-toggle"
          data-video-toggle
          data-play-label="${t.play}"
          data-pause-label="${t.pause}"
          aria-label="${t.play}"
          hidden
        >
          <span aria-hidden="true">▶</span>
        </button>
      </div>
    </section>
    <section class="section wrap">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 / ${t.photography}</p>
          <h2>${t.selected}</h2>
          <p class="muted">${t.perspective}</p>
        </div>
        <a class="text-link" href="${pageUrl(language, 'portfolio')}">${t.allWork} ↗</a>
      </div>
      ${collections
        .filter((collection) => selection.some((photo) => photo.category === collection.category))
        .map((collection) => {
          const group = selection.filter((photo) => photo.category === collection.category);
          return /* HTML */ `<section
            class="home-photo-group ${collection.category === 'portraits'
              ? 'home-portraits'
              : ''} ${group.length === 1 ? 'home-photo-feature' : ''}"
          >
            <div class="photo-group-heading">
              <h3>${t[collection.category]}</h3>
              <a class="text-link" href="${pageUrl(language, 'portfolio')}${collection.slug}/"
                >${t.viewCollection} ↗</a
              >
            </div>
            <div class="selected-grid">
              ${group.map((photo, index) => photoCard(photo, t, index)).join('')}
            </div>
          </section>`;
        })
        .join('')}
    </section>
    <section class="section wrap border-top">
      <p class="eyebrow">02 / ${t.nav.services}</p>
      <h2>${t.story}</h2>
      <div class="services-grid">
        ${t.services
          .map(
            (name, index) =>
              /* HTML */ `<a
                class="service-summary"
                href="${index === 3
                  ? pageUrl(language, 'drone')
                  : `${pageUrl(language, 'services')}#service-${index}`}"
                ><span class="muted small">0${index + 1}</span>
                <h3>${name}<span aria-hidden="true">↗</span></h3>
                <p class="muted">${t.serviceDescriptions[index]}</p></a
              >`,
          )
          .join('\n')}
      </div>
    </section>
    <section class="section wrap border-top home-story">
      <p class="eyebrow">${t.nav.about} / Ultimu Prizenti Studios</p>
      <h2>${about.title}</h2>
      <p class="intro">${about.intro}</p>
      <p>${about.body}</p>
      <p class="signature" lang="en">A Little Phototherapy for the Soul.</p>
      ${button(about.link, pageUrl(language, 'about'), true)}
    </section>
    ${testimonialsSection(t)}
    <div class="wrap">${button(t.reviewsTitle, pageUrl(language, 'testimonials'), true)}</div>
    ${contactInvitation(language, t)} ${lightbox(t)}
  `;
}
