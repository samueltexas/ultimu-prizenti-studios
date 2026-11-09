import { pageHeading } from '../components/shared.mjs';

export function privacyPage(language, t) {
  return /* HTML */ `${pageHeading(t.nav.privacy, t.privacyTitle)}
    <section class="wrap prose">
      <p>${t.privacyBody}</p>
      <p>${t.reviewPrivacy}</p>
    </section>`;
}
