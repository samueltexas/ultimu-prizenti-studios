import { submitContact } from './contact-submit.js';

// Cada comportamento é opcional: os links e conteúdos funcionam sem JavaScript.
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const mobile = matchMedia('(max-width: 650px)');
function syncMenu() {
  menu.hidden = !mobile.matches;
  menu.setAttribute('aria-expanded', 'false');
  navigation.hidden = mobile.matches;
}
syncMenu();
mobile.addEventListener('change', syncMenu);
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open;
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && !navigation.hidden) {
    syncMenu();
    menu.focus();
  }
});

// Respeitamos movimento reduzido e poupança de dados antes de carregar o hero.
const background = document.querySelector('[data-background-video]');
const toggle = document.querySelector('[data-video-toggle]');
if (background && toggle) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const load = () => {
    const source = background.querySelector('source');
    if (!source.src) {
      source.src = source.dataset.src;
      background.load();
    }
  };
  const sync = () => {
    toggle.setAttribute(
      'aria-label',
      background.paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel,
    );
    toggle.textContent = background.paused ? '▶' : 'Ⅱ';
  };
  toggle.hidden = false;
  background.addEventListener('play', sync);
  background.addEventListener('pause', sync);
  toggle.addEventListener('click', () => {
    load();
    if (background.paused) background.play().catch(sync);
    else background.pause();
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) background.pause();
  });
  if (!reduced.matches && !navigator.connection?.saveData) {
    load();
    background.play().catch(sync);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) background.pause();
  });
}

// A galeria usa apenas as fotografias visíveis após o filtro escolhido.
const dialog = document.querySelector('[data-lightbox-dialog]');
const links = [...document.querySelectorAll('[data-lightbox]')];
let current = 0;
let active = [];
let opener;
if (dialog) {
  const display = (index) => {
    current = (index + active.length) % active.length;
    const link = active[current];
    const image = dialog.querySelector('[data-full-photo]');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('[data-photo-caption]').textContent =
      `${current + 1} / ${active.length} · ${image.alt}`;
  };
  links.forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      opener = link;
      active = links.filter((item) => !item.closest('.photo-card').hidden);
      display(active.indexOf(link));
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }),
  );
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-previous]').addEventListener('click', () => display(current - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => display(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      display(current - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      display(current + 1);
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus();
  });
}
const filters = document.querySelector('[data-filters]');
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters
      .querySelectorAll('button')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    const cards = [...document.querySelectorAll('.photo-grid .photo-card')];
    cards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
    document.querySelectorAll('[data-photo-group]').forEach((group) => {
      group.hidden =
        button.dataset.filter !== 'all' && group.dataset.photoGroup !== button.dataset.filter;
    });
    document.querySelector('[data-result-count]').textContent =
      `${cards.filter((card) => !card.hidden).length} · ${button.textContent}`;
  });
}

// Enviamos para a Netlify e só confirmamos após uma resposta de sucesso.
const form = document.querySelector('[data-contact-form]');
if (form) {
  const chosen = new URLSearchParams(location.search).get('service');
  const option = [...form.elements.service.options].find(
    (item) => item.dataset.serviceIndex === chosen,
  );
  if (option) form.elements.service.value = option.value;
  const selectedPackage = new URLSearchParams(location.search).get('package');
  if (selectedPackage) form.elements.message.value = selectedPackage;
  const status = form.querySelector('[data-form-status]');
  const brief = () =>
    [...new FormData(form)]
      .filter(([key]) => ['name', 'email', 'service', 'date', 'place', 'message'].includes(key))
      .map(([key, value]) => {
        const label = form.elements[key].closest('label').firstChild.textContent.trim();
        return `${label}: ${String(value).trim()}`;
      })
      .join('\n\n');
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    const button = form.querySelector('[type="submit"]');
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = form.dataset.sending;
    form.setAttribute('aria-busy', 'true');
    status.textContent = form.dataset.sending;
    try {
      await submitContact(new FormData(form));
      status.textContent = form.dataset.success;
      form.reset();
    } catch (error) {
      status.textContent =
        error.message === 'LOCAL_PREVIEW' ? form.dataset.local : form.dataset.error;
    } finally {
      sending = false;
      button.disabled = false;
      button.textContent = originalLabel;
      form.removeAttribute('aria-busy');
    }
  });
  form.querySelector('[data-copy-brief]').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(brief());
      status.textContent = form.dataset.copied;
    } catch {
      form.querySelector('[data-brief-output]').hidden = false;
      const output = form.querySelector('[data-brief-text]');
      output.value = brief();
      output.focus();
      output.select();
      status.textContent = form.dataset.copyError;
    }
  });
}

// Recebemos avaliações para revisão privada, sem publicação automática nem dados no armazenamento local.
const reviewForm = document.querySelector('[data-review-form]');
if (reviewForm) {
  let pending = false;
  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !reviewForm.reportValidity()) return;
    const button = reviewForm.querySelector('[type="submit"]');
    const status = reviewForm.querySelector('[data-form-status]');
    const label = button.textContent;
    pending = true;
    button.disabled = true;
    button.textContent = reviewForm.dataset.sending;
    reviewForm.setAttribute('aria-busy', 'true');
    status.textContent = reviewForm.dataset.sending;
    try {
      await submitContact(new FormData(reviewForm));
      reviewForm.reset();
      status.textContent = reviewForm.dataset.success;
    } catch (error) {
      status.textContent =
        error.message === 'LOCAL_PREVIEW' ? reviewForm.dataset.local : reviewForm.dataset.error;
    } finally {
      pending = false;
      button.disabled = false;
      button.textContent = label;
      reviewForm.removeAttribute('aria-busy');
    }
  });
}
