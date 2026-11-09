import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { submitContact } from '../public/assets/contact-submit.js';

test('prévia local não envia nem confirma mensagens', async () => {
  await assert.rejects(
    submitContact(new FormData(), {
      hostname: 'localhost',
      request: () => assert.fail('Não deve enviar'),
    }),
    /LOCAL_PREVIEW/,
  );
});

test('envio codifica todos os dados e só aceita resposta de sucesso', async () => {
  const data = new FormData();
  data.set('form-name', 'contact');
  data.set('bot-field', '');
  data.set('message', 'Olá & Warszawa + fotografia');
  await submitContact(data, {
    hostname: 'studio.netlify.app',
    request: async (url, options) => {
      assert.equal(url, '/');
      assert.equal(options.method, 'POST');
      assert.equal(new URLSearchParams(options.body).get('message'), data.get('message'));
      assert.equal(new URLSearchParams(options.body).get('form-name'), 'contact');
      assert.ok(new URLSearchParams(options.body).has('bot-field'));
      return { ok: true };
    },
  });
  await assert.rejects(
    submitContact(data, { hostname: 'studio.netlify.app', request: async () => ({ ok: false }) }),
    /SUBMISSION_FAILED/,
  );
  await assert.rejects(
    submitContact(data, {
      hostname: 'studio.netlify.app',
      request: async () => {
        throw new Error('offline');
      },
    }),
    /offline/,
  );
});

test('os três idiomas incluem o formulário detectável pela Netlify', async () => {
  for (const lang of ['en', 'pt', 'pl']) {
    const html = await readFile(
      new URL(`../dist/${lang}/contact/index.html`, import.meta.url),
      'utf8',
    );
    assert.match(html, /name="contact"\s+method="POST"\s+data-netlify="true"/);
    assert.match(html, /name="form-name" value="contact"/);
    assert.match(html, /netlify-honeypot="bot-field"/);
    assert.match(html, /data-success="[^"]+"/);
  }
});

// A avaliação permanece privada: só os dados aprovados manualmente entram no HTML.
test('testemunhos exigem autorização e um formulário Netlify separado', async () => {
  for (const lang of ['en', 'pt', 'pl']) {
    const html = await readFile(
      new URL(`../dist/${lang}/testimonials/index.html`, import.meta.url),
      'utf8',
    );
    assert.match(html, /name="form-name"\s+value="testimonials"/);
    assert.match(html, /name="publication-consent"[^>]*required/s);
    assert.match(html, /name="bot-field"/);
    assert.match(html, /Marisa Albuquerque/);
    assert.doesNotMatch(html, /action="https?:/);
  }
});
