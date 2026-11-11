import { packages, packageGroups, pageUrl } from '../data/site.mjs';
import { button, pageHeading, escapeHtml, contactInvitation } from '../components/shared.mjs';

export function servicesPage(language, t) {
  return /* HTML */ `
    ${pageHeading(t.nav.services, t.story, t.quote)}
    <section class="wrap services-detail">
      ${t.services
        .map(
          (name, index) =>
            /* HTML */ `<article class="service-row" id="service-${index}">
              <span class="eyebrow">0${index + 1}</span>
              <div>
                <h2>${name}</h2>
                <p>${t.serviceDetails[index]}</p>
                ${index === 3
                  ? /* HTML */ `<p class="eyebrow">${t.droneQuote}</p>
                      <a class="text-link" href="${pageUrl(language, 'drone')}"
                        >${t.droneLink} ↗</a
                      >`
                  : ''}
              </div>
              ${button(t.discuss, `${pageUrl(language, 'contact')}?service=${index}`, true)}
            </article>`,
        )
        .join('\n')}
    </section>
    <section class="section wrap pricing-section">
      <p class="eyebrow">${t.pricing}</p>
      ${Object.entries(packageGroups)
        .map(
          ([group, title]) =>
            /* HTML */ `<section class="package-group">
              <h2>${title[language]}</h2>
              <div class="packages-grid">
                ${packages
                  .filter((item) => item.group === group)
                  .map(
                    (item) =>
                      /* HTML */ `<article class="package">
                        <h3>${escapeHtml(item.name[language])}</h3>
                        ${item.price
                          ? /* HTML */ `<p class="price">${escapeHtml(item.price)}</p>`
                          : ''}
                        <ul>
                          ${item.items[language]
                            .map((detail) => /* HTML */ `<li>${escapeHtml(detail)}</li>`)
                            .join('')}
                        </ul>
                        ${button(
                          t.packageCta,
                          pageUrl(language, 'contact') +
                            '?package=' +
                            encodeURIComponent(title[language] + ' — ' + item.name[language]),
                        )}
                      </article>`,
                  )
                  .join('')}
              </div>
            </section>`,
        )
        .join('')}
    </section>
    <section class="section wrap">
      <h2>${t.processTitle}</h2>
      <div class="services-grid">
        ${t.process
          .map(
            ([number, title, text]) =>
              /* HTML */ `<article>
                <p class="eyebrow">${number}</p>
                <h3>${title}</h3>
                <p class="muted">${text}</p>
              </article>`,
          )
          .join('\n')}
      </div>
    </section>
    <section class="section wrap prose" aria-labelledby="pricing-note">
      <h2 id="pricing-note">${t.pricingNoteTitle}</h2>
      <p>${t.pricingNote}</p>
    </section>
    ${contactInvitation(language, t)}
  `;
}
