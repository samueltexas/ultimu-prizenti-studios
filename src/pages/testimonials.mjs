import { pageUrl } from '../data/site.mjs';
import { pageHeading, escapeHtml, testimonialsSection } from '../components/shared.mjs';

// Os envios ficam privados na Netlify; só os testemunhos aprovados entram no código público.
export function testimonialsPage(language, t) {
  return /* HTML */ `${pageHeading(t.nav.about, t.reviewsTitle)} ${testimonialsSection(t)}
    <section class="section wrap review-section">
      <h2>${t.reviewHeading}</h2>
      <form
        class="contact-form"
        name="testimonials"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-review-form
        data-sending="${escapeHtml(t.sending)}"
        data-success="${escapeHtml(t.reviewSuccess)}"
        data-error="${escapeHtml(t.formError)}"
        data-local="${escapeHtml(t.formLocal)}"
      >
        <input type="hidden" name="form-name" value="testimonials" />
        <input type="hidden" name="language" value="${language}" />
        <p hidden>
          <label>Leave this empty<input name="bot-field" tabindex="-1" autocomplete="off" /></label>
        </p>
        <div class="form-row">
          <label>${t.name}<input name="name" autocomplete="name" maxlength="100" required /></label
          ><label
            >${t.email}<input
              type="email"
              name="email"
              autocomplete="email"
              maxlength="254"
              required
          /></label>
        </div>
        <label
          >${t.reviewMessage}<textarea
            name="review"
            rows="6"
            minlength="10"
            maxlength="3000"
            required
          ></textarea>
        </label>
        <label class="review-consent"
          ><input type="checkbox" name="publication-consent" value="yes" required /><span
            >${t.reviewConsent}</span
          ></label
        >
        <p class="small muted">
          ${t.reviewNote} <a href="${pageUrl(language, 'privacy')}">${t.nav.privacy} ↗</a>
        </p>
        <button class="button" type="submit">${t.reviewSend} ↗</button>
        <p role="status" aria-live="polite" data-form-status></p>
      </form>
    </section>`;
}
