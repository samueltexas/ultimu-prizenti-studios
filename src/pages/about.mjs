import { pageUrl } from '../data/site.mjs';
import { story } from '../data/story.mjs';
import { button, pageHeading, contactInvitation, escapeHtml } from '../components/shared.mjs';

// A história mantém a marca no centro e preserva a privacidade da pessoa que ofereceu o nome.
export function aboutPage(language, t) {
  const copy = story[language];
  return /* HTML */ `
    ${pageHeading(t.nav.about, copy.sections[0].title, copy.intro)}
    <div class="wrap studio-story">
      ${copy.sections
        .map(
          (section, index) =>
            /* HTML */ `<section class="story-section">
              <div>
                <p class="eyebrow">0${index + 1} / ${escapeHtml(section.label)}</p>
                <h2 ${index === 2 ? 'lang="en"' : ''}>${escapeHtml(section.title)}</h2>
              </div>
              <div class="story-copy">
                ${section.paragraphs
                  .map((text) => /* HTML */ `<p>${escapeHtml(text)}</p>`)
                  .join('')}
              </div>
            </section>`,
        )
        .join('')}
      <section class="story-signature">
        <p class="eyebrow">Ultimu Prizenti Studios</p>
        <h2 lang="en">A Little Phototherapy for the Soul.</h2>
        <p>${escapeHtml(copy.therapy)}</p>
        ${button(t.aboutLink, pageUrl(language, 'portfolio'), true)}
      </section>
    </div>
    ${contactInvitation(language, t)}
  `;
}
