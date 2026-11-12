import { site } from '../data/site.mjs';
import { escapeHtml, pageHeading } from '../components/shared.mjs';

export function contactPage(language, t) {
  return /* HTML */ `
    ${pageHeading(t.nav.contact, t.contactTitle, t.contactIntro)}
    <section class="wrap contact-grid">
      <aside class="contact-details">
        <p class="eyebrow">${t.location}</p>
        <h2>${t.contactCreateTitle}</h2>
        <p>${t.based}</p>
        ${site.email
          ? /* HTML */ `<a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)} ↗</a>`
          : `<p class="muted">${t.contactPending}</p>`}
        ${site.whatsapp
          ? /* HTML */ `<a
              href="https://wa.me/${site.whatsapp}"
              target="_blank"
              rel="noopener noreferrer"
              >WhatsApp ↗</a
            >`
          : ''}
        ${site.instagram
          ? /* HTML */ `<a
              href="${escapeHtml(site.instagram)}"
              target="_blank"
              rel="noopener noreferrer"
              >Instagram ↗</a
            >`
          : ''}
      </aside>
      <form
        class="contact-form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-contact-form
        data-email="${escapeHtml(site.email)}"
        data-subject="${t.projectSubject}"
        data-copied="${t.copied}"
        data-copy-error="${t.copyError}"
        data-sending="${t.sending}"
        data-success="${t.formSuccess}"
        data-error="${t.formError}"
        data-local="${t.formLocal}"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="language" value="${language}" />
        <p hidden>
          <label>Leave this empty<input name="bot-field" tabindex="-1" autocomplete="off" /></label>
        </p>
        <div class="form-row">
          <label>${t.name}<input name="name" autocomplete="name" required maxlength="100" /></label
          ><label
            >${t.email}<input
              type="email"
              name="email"
              autocomplete="email"
              required
              maxlength="254"
          /></label>
        </div>
        <label
          >${t.service}<select name="service" required>
            <option value="">${t.select}</option>
            ${t.services
              .map(
                (name, index) =>
                  /* HTML */ `<option value="${name}" data-service-index="${index}">
                    ${name}
                  </option>`,
              )
              .join('')}
          </select></label
        >
        <div class="form-row">
          <label>${t.date}<input type="date" name="date" /></label
          ><label>${t.place}<input name="place" maxlength="200" /></label>
        </div>
        <label
          >${t.message}<textarea
            name="message"
            rows="5"
            required
            minlength="10"
            maxlength="3000"
          ></textarea>
        </label>
        <p class="small muted">${t.formNote}</p>
        <div class="button-row">
          <button class="button" type="submit" ${site.email ? '' : 'hidden'}>${t.send} ↗</button
          ><button class="button button-outline" type="button" data-copy-brief>${t.copy}</button>
        </div>
        <p role="status" data-form-status></p>
        <label data-brief-output hidden
          >${t.brief}<textarea readonly rows="8" data-brief-text></textarea>
        </label>
        <noscript><p>${site.email ? escapeHtml(site.email) : t.contactPending}</p></noscript>
      </form>
    </section>
  `;
}
