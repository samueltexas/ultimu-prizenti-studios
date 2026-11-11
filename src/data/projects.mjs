// Identificadores estáveis: podes mudar um título sem quebrar o endereço do projecto.
// A ordem é editorial: retratos, cidade, paisagens e casais.
export const collections = [
  { slug: 'portraits-and-people', category: 'portraits', cover: 'img-3624' },
  { slug: 'places-and-architecture', category: 'places', cover: 'img-8756' },
  { slug: 'landscapes-and-nature', category: 'landscapes', cover: 'img-9722' },
  { slug: 'couples', category: 'couples', cover: 'img-2929' },
];

export const films = [
  {
    slug: 'victoria-michal',
    titleKey: 'victoriaMichal',
    category: 'weddings',
    file: 'victoria-michal',
    poster: 'victoria-michal-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'studio-showreel',
    titleKey: 'showreel',
    category: 'showreels',
    file: 'site-preview',
    poster: 'site-preview-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'wedding-film',
    titleKey: 'wedding',
    category: 'weddings',
    file: 'wedding-film',
    poster: 'wedding-film-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'noc-basenow',
    titleKey: 'nocBasenow',
    category: 'events',
    file: 'noc-basenow',
    poster: 'noc-basenow-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'noc-basenow-24-maja',
    titleKey: 'nocMay',
    category: 'events',
    file: 'noc-basenow-24-maja',
    poster: 'noc-basenow-24-maja-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'sylwester',
    titleKey: 'sylwester',
    category: 'events',
    file: 'sylwester',
    poster: 'sylwester-poster.jpg',
    posterWidth: 607,
    posterHeight: 1080,
  },
  {
    slug: 'all-the-love',
    titleKey: 'allTheLove',
    category: 'music-videos',
    file: 'all-the-love',
    poster: 'all-the-love-poster.jpg',
    posterWidth: 1920,
    posterHeight: 1080,
  },
  {
    slug: 'film-02',
    titleKey: 'filmTwo',
    category: 'events',
    file: 'film-02',
    poster: 'film-02-poster.jpg',
    posterWidth: 607,
    posterHeight: 1080,
  },
];

// A apresentação começa pelo retrato, seguindo-se arquitectura e paisagens.
export const selectedPhotos = [
  // Retratos escolhidos pelo proprietário: 01, 09 e 06 da galeria.
  'img-3624',
  'img-7307',
  'img-4485',
  'img-8756',
  'img-7628',
  'img-7561',
  'img-7199',
  'img-6643',
  // Paisagens escolhidas pelo proprietário: 01, 11 e 07 da galeria.
  'img-1912',
  'img-9722',
  'img-6442',
];

// As categorias têm páginas próprias e preservam a ordem dos filmes seleccionados.
export const filmCategories = [
  { slug: 'weddings', titleKey: 'weddingFilms', featured: 'victoria-michal' },
  { slug: 'events', titleKey: 'eventFilms', featured: 'noc-basenow' },
  { slug: 'music-videos', titleKey: 'musicVideos', featured: 'all-the-love' },
];
