import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { collections, selectedPhotos } from '../src/data/projects.mjs';
import { languages, packages, site } from '../src/data/site.mjs';
import { translations } from '../src/data/translations.mjs';
import { escapeHtml } from '../src/components/shared.mjs';

const output = resolve('dist');
async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(path) : [path]));
  }
  return files;
}
const htmlFiles = (await walk(output)).filter((path) => path.endsWith('.html'));

test('As 66 páginas e as duas entradas auxiliares existem', () => {
  assert.equal(htmlFiles.length, 68);
});

test('Todas as ligações internas, imagens, vídeos e variantes responsivas existem', async () => {
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const urls = [
      ...html.matchAll(/(?:href|src|data-src|poster)="(\/[^"?#]*)(?:[?#][^"]*)?"/g),
    ].map((match) => match[1]);
    for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
      urls.push(...match[1].split(',').map((source) => source.trim().split(' ')[0]));
    }
    for (const url of urls) {
      const target = resolve(
        output,
        '.' + decodeURIComponent(url),
        ...(url.endsWith('/') ? ['index.html'] : []),
      );
      assert.ok((await stat(target)).isFile(), `${file}: ${url}`);
    }
    assert.ok(!html.includes('undefined'), file);
    assert.equal((html.match(/<h1[ >]/g) || []).length, file.endsWith('/dist/index.html') ? 0 : 1);
  }
});

function keys(object, prefix = '') {
  return Object.entries(object)
    .flatMap(([key, value]) =>
      typeof value === 'object' && !Array.isArray(value)
        ? keys(value, prefix + key + '.')
        : prefix + key,
    )
    .sort();
}
test('Os três idiomas têm os mesmos campos e mantêm o projecto na troca de língua', async () => {
  for (const language of languages) {
    assert.deepEqual(keys(translations[language]), keys(translations.en));
    const html = await readFile(
      resolve(output, language, 'films/studio-showreel/index.html'),
      'utf8',
    );
    for (const other of languages)
      assert.ok(html.includes(`href="/${other}/films/studio-showreel/"`));
  }
});

test('Catálogo e contactos correspondem aos valores aprovados', () => {
  assert.equal(packages.length, 14);
  assert.deepEqual(
    packages.filter((item) => item.group === 'weddingBoth').map((item) => item.price),
    ['2 800 zł', '5 200 zł', '7 500 zł'],
  );
  assert.equal(site.email, 'ultimuprizenti@gmail.com');
  assert.equal(site.whatsapp, '48729339554');
});

test('Conteúdo dinâmico é escapado para HTML', () => {
  assert.equal(escapeHtml('<script>"&\''), '&lt;script&gt;&quot;&amp;&#39;');
});

test('O testemunho confirmado aparece nos três idiomas', async () => {
  for (const language of languages) {
    const html = await readFile(resolve(output, language, 'index.html'), 'utf8');
    assert.ok(html.includes(translations[language].testimonialQuote));
    assert.ok(html.includes('Marisa Albuquerque'));
    assert.ok(!html.includes('not a client review'));
    assert.ok(!html.includes('aggregateRating'));
  }
});

test('A identidade original aparece em todas as páginas de conteúdo', async () => {
  for (const file of htmlFiles.filter((path) => !path.endsWith('/dist/index.html'))) {
    const html = await readFile(file, 'utf8');
    assert.equal((html.match(/src="\/assets\/brand\/logo-original.png"/g) || []).length, 2);
    assert.ok(html.includes('href="/assets/brand/favicon.png"'));
  }
});

test('Retrato primeiro e todas as fotografias agrupadas sem perdas', async () => {
  const photos = JSON.parse(await readFile('src/data/photos.json', 'utf8'));
  assert.equal(selectedPhotos[0], 'img-3624');
  assert.equal(photos.length, 53);
  assert.equal(photos.find((photo) => photo.category === 'places').id, 'img-8756');
  assert.deepEqual(
    collections.map((item) => item.category),
    ['portraits', 'places', 'landscapes', 'couples'],
  );
  for (const language of languages) {
    const home = await readFile(resolve(output, language, 'index.html'), 'utf8');
    assert.ok(home.indexOf('img-3624-1600.webp') < home.indexOf('img-8756-1600.webp'));
    assert.ok(home.indexOf('img-8756-1600.webp') < home.indexOf('img-9722-1600.webp'));
    const portfolio = await readFile(resolve(output, language, 'portfolio/index.html'), 'utf8');
    assert.equal((portfolio.match(/data-lightbox\s+aria-label/g) || []).length, 53);
    const groups = [...portfolio.matchAll(/data-photo-group="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(
      groups,
      collections.map((item) => item.category),
    );
  }
});
