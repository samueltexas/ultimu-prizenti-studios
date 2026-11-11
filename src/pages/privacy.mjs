import { pageHeading, escapeHtml } from '../components/shared.mjs';
import { privacySections } from '../data/privacy.mjs';

// Apresenta a política no idioma escolhido, sem expor detalhes técnicos da implementação.
export function privacyPage(language, t) {
  return /* HTML */ `${pageHeading(t.nav.privacy, t.privacyTitle)}
    <section class="wrap prose">
      ${privacySections[language]
        .map(
          ([heading, text]) => /* HTML */ `
            <h2>${escapeHtml(heading)}</h2>
            <p>${escapeHtml(text)}</p>
          `,
        )
        .join('')}
      <p>${t.reviewPrivacy}</p>
    </section>`;
}
