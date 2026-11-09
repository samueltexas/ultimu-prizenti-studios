import { pageUrl } from '../data/site.mjs';
import { pageHeading, button } from '../components/shared.mjs';

// O serviço pode ser consultado já; o portefólio só recebe conteúdos reais aprovados.
export function dronePage(language, t) {
  return /* HTML */ `
    ${pageHeading(t.nav.drone, t.droneHeading)}
    <section class="wrap drone-preview">
      <div class="drone-panel">
        <p class="eyebrow">${t.nav.drone} / ${t.droneQuote}</p>
        <h2>${t.droneStatus}</h2>
        <p class="intro">${t.droneBody}</p>
        <div class="button-row">
          ${button(t.discuss, `${pageUrl(language, 'contact')}?service=3`)}
          ${button(t.nav.services, `${pageUrl(language, 'services')}#service-3`, true)}
        </div>
      </div>
    </section>
  `;
}
