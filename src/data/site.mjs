// Dados públicos do estúdio. Mantemos os contactos num único sítio.
// Um valor vazio nunca é substituído por um endereço inventado.
export const site = {
  name: 'Ultimu Prizenti Studios',
  email: 'ultimuprizenti@gmail.com',
  whatsapp: '48729339554',
  instagram: 'https://www.instagram.com/ultimuprizenti/',
  facebook: '',
  // A Netlify fornece URL automaticamente; SITE_URL permite usar um domínio próprio.
  origin: (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, ''),
  logo: '/assets/brand/logo-original.png',
  location: 'Warsaw',
};

// Os caminhos são descritivos e mantêm-se iguais nos três idiomas.
export const routes = {
  home: '',
  portfolio: 'portfolio',
  films: 'films',
  drone: 'drone',
  services: 'services',
  about: 'about',
  contact: 'contact',
  privacy: 'privacy',
  testimonials: 'testimonials',
};

export const languages = ['en', 'pl', 'pt'];

export function pageUrl(language, page = 'home') {
  return `/${language}/${routes[page] ? `${routes[page]}/` : ''}`;
}

// Catálogo revisto com o proprietário; cada idioma descreve as mesmas entregas.
export const packages = [
  {
    group: 'portraits',
    name: {
      en: 'The Muse',
      pl: 'The Muse',
      pt: 'The Muse',
    },
    price: '200 zł',
    items: {
      en: ['1 hour session', '15 edited photographs', 'Delivery in a private online gallery'],
      pl: [
        '1 godz. sesji',
        '15 zdjęć po obróbce',
        'Zdjęcia udostępniane w prywatnej galerii online',
      ],
      pt: ['1 hora de sessão', '15 fotografias editadas', 'Entrega em galeria digital privada'],
    },
  },
  {
    group: 'portraits',
    name: {
      en: 'The Editorial',
      pl: 'The Editorial',
      pt: 'The Editorial',
    },
    price: '500 zł',
    items: {
      en: ['2 hours session', '30 edited photographs', 'Delivery in a private online gallery'],
      pl: [
        '2 godz. sesji',
        '30 zdjęć po obróbce',
        'Zdjęcia udostępniane w prywatnej galerii online',
      ],
      pt: ['2 horas de sessão', '30 fotografias editadas', 'Entrega em galeria digital privada'],
    },
  },
  {
    group: 'weddingPhoto',
    name: {
      en: 'The Moment',
      pl: 'The Moment',
      pt: 'The Moment',
    },
    price: '1 200 zł',
    items: {
      en: [
        '2 hours of coverage',
        'Minimum of 60 edited photographs',
        'Delivery in a private online gallery',
      ],
      pl: [
        '2 godz. reportażu',
        'Minimum 60 zdjęć po obróbce',
        'Zdjęcia udostępniane w prywatnej galerii online',
      ],
      pt: [
        '2 horas de cobertura',
        'Mínimo de 60 fotografias editadas',
        'Entrega em galeria digital privada',
      ],
    },
  },
  {
    group: 'weddingPhoto',
    name: {
      en: 'The Story',
      pl: 'The Story',
      pt: 'The Story',
    },
    price: '2 500 zł',
    items: {
      en: [
        '6 hours of coverage',
        'Minimum of 200 edited photographs',
        'Delivery in a private online gallery',
      ],
      pl: [
        '6 godz. reportażu',
        'Minimum 200 zdjęć po obróbce',
        'Zdjęcia udostępniane w prywatnej galerii online',
      ],
      pt: [
        '6 horas de cobertura',
        'Mínimo de 200 fotografias editadas',
        'Entrega em galeria digital privada',
      ],
    },
  },
  {
    group: 'weddingPhoto',
    name: {
      en: 'The Legacy',
      pl: 'The Legacy',
      pt: 'The Legacy',
    },
    price: '3 800 zł',
    items: {
      en: [
        '10 hours of coverage',
        'Minimum of 400 edited photographs',
        'Delivery in a private online gallery',
      ],
      pl: [
        '10 godz. reportażu',
        'Minimum 400 zdjęć po obróbce',
        'Zdjęcia udostępniane w prywatnej galerii online',
      ],
      pt: [
        '10 horas de cobertura',
        'Mínimo de 400 fotografias editadas',
        'Entrega em galeria digital privada',
      ],
    },
  },
  {
    group: 'weddingVideo',
    name: {
      en: 'The Moment',
      pl: 'The Moment',
      pt: 'The Moment',
    },
    price: '1 800 zł',
    items: {
      en: [
        '2 hours of coverage',
        '1 cinematic film of 2–3 minutes',
        'Videos available to download',
      ],
      pl: ['2 godz. reportażu', '1 film kinowy o długości 2–3 minut', 'Filmy do pobrania'],
      pt: [
        '2 horas de cobertura',
        '1 filme cinematográfico de 2–3 minutos',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'weddingVideo',
    name: {
      en: 'The Story',
      pl: 'The Story',
      pt: 'The Story',
    },
    price: '3 200 zł',
    items: {
      en: [
        '6 hours of coverage',
        '1 cinematic film of 5–7 minutes',
        '1 vertical video of 30–60 seconds',
        'Videos available to download',
      ],
      pl: [
        '6 godz. reportażu',
        '1 film kinowy o długości 5–7 minut',
        '1 film pionowy o długości 30–60 sekund',
        'Filmy do pobrania',
      ],
      pt: [
        '6 horas de cobertura',
        '1 filme cinematográfico de 5–7 minutos',
        '1 vídeo vertical de 30–60 segundos',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'weddingVideo',
    name: {
      en: 'The Legacy',
      pl: 'The Legacy',
      pt: 'The Legacy',
    },
    price: '4 800 zł',
    items: {
      en: [
        '10 hours of coverage',
        '1 full-length film of 60 minutes or more',
        '1 teaser of 60–90 seconds',
        '1 vertical video of 30–60 seconds, with longer edits possible',
        'Videos available to download',
      ],
      pl: [
        '10 godz. reportażu',
        '1 pełny film o długości co najmniej 60 minut',
        '1 teaser o długości 60–90 sekund',
        '1 film pionowy o długości 30–60 sekund, z możliwością dłuższej wersji',
        'Filmy do pobrania',
      ],
      pt: [
        '10 horas de cobertura',
        '1 filme completo de 60 minutos ou mais',
        '1 teaser de 60–90 segundos',
        '1 vídeo vertical de 30–60 segundos, com possibilidade de duração superior',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'weddingBoth',
    name: {
      en: 'The Moment',
      pl: 'The Moment',
      pt: 'The Moment',
    },
    price: '2 800 zł',
    items: {
      en: [
        '2 hours of coverage',
        'Minimum of 60 edited photographs',
        '1 cinematic film of 2–3 minutes',
        'Delivery in a private online gallery',
        'Videos available to download',
      ],
      pl: [
        '2 godz. reportażu',
        'Minimum 60 zdjęć po obróbce',
        '1 film kinowy o długości 2–3 minut',
        'Zdjęcia udostępniane w prywatnej galerii online',
        'Filmy do pobrania',
      ],
      pt: [
        '2 horas de cobertura',
        'Mínimo de 60 fotografias editadas',
        '1 filme cinematográfico de 2–3 minutos',
        'Entrega em galeria digital privada',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'weddingBoth',
    name: {
      en: 'The Story',
      pl: 'The Story',
      pt: 'The Story',
    },
    price: '5 200 zł',
    items: {
      en: [
        '6 hours of coverage',
        'Minimum of 200 edited photographs',
        '1 cinematic film of 5–7 minutes',
        '1 vertical video of 30–60 seconds',
        'Delivery in a private online gallery',
        'Videos available to download',
      ],
      pl: [
        '6 godz. reportażu',
        'Minimum 200 zdjęć po obróbce',
        '1 film kinowy o długości 5–7 minut',
        '1 film pionowy o długości 30–60 sekund',
        'Zdjęcia udostępniane w prywatnej galerii online',
        'Filmy do pobrania',
      ],
      pt: [
        '6 horas de cobertura',
        'Mínimo de 200 fotografias editadas',
        '1 filme cinematográfico de 5–7 minutos',
        '1 vídeo vertical de 30–60 segundos',
        'Entrega em galeria digital privada',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'weddingBoth',
    name: {
      en: 'The Legacy',
      pl: 'The Legacy',
      pt: 'The Legacy',
    },
    price: '7 500 zł',
    items: {
      en: [
        '10 hours of coverage',
        'Minimum of 400 edited photographs',
        '1 full-length film of 60 minutes or more',
        '1 teaser of 60–90 seconds',
        '1 vertical video of 30–60 seconds, with longer edits possible',
        'Delivery in a private online gallery',
        'Videos available to download',
      ],
      pl: [
        '10 godz. reportażu',
        'Minimum 400 zdjęć po obróbce',
        '1 pełny film o długości co najmniej 60 minut',
        '1 teaser o długości 60–90 sekund',
        '1 film pionowy o długości 30–60 sekund, z możliwością dłuższej wersji',
        'Zdjęcia udostępniane w prywatnej galerii online',
        'Filmy do pobrania',
      ],
      pt: [
        '10 horas de cobertura',
        'Mínimo de 400 fotografias editadas',
        '1 filme completo de 60 minutos ou mais',
        '1 teaser de 60–90 segundos',
        '1 vídeo vertical de 30–60 segundos, com possibilidade de duração superior',
        'Entrega em galeria digital privada',
        'Vídeos disponíveis para descarregar',
      ],
    },
  },
  {
    group: 'motion',
    name: {
      en: 'The Frame',
      pl: 'The Frame',
      pt: 'The Frame',
    },
    price: '1 500–2 000 zł',
    items: {
      en: [
        'Up to 3 hours of filming',
        '3–5 short videos of 15–45 seconds each',
        'Vertical or horizontal format agreed before production',
        '1 round of revisions',
        'Videos available to download',
        'Final price and exact video count agreed in the quotation',
      ],
      pl: [
        'Do 3 godz. nagrań',
        '3–5 krótkich filmów po 15–45 sekund',
        'Format pionowy lub poziomy ustalony przed produkcją',
        '1 runda poprawek',
        'Filmy do pobrania',
        'Ostateczna cena i liczba filmów określone w wycenie',
      ],
      pt: [
        'Até 3 horas de captação',
        '3–5 vídeos curtos de 15–45 segundos cada',
        'Formato vertical ou horizontal definido antes da produção',
        '1 ronda de ajustes',
        'Vídeos disponíveis para descarregar',
        'Preço final e quantidade exacta de vídeos definidos no orçamento',
      ],
    },
  },
  {
    group: 'motion',
    name: {
      en: 'The Sequence',
      pl: 'The Sequence',
      pt: 'The Sequence',
    },
    price: '2 500–3 500 zł',
    items: {
      en: [
        'Up to 6 hours of filming',
        '5–8 short videos of 15–60 seconds each',
        '1 additional film of 1–2 minutes',
        'Formats agreed before production',
        '2 rounds of revisions',
        'Videos available to download',
        'Final price and exact video count agreed in the quotation',
      ],
      pl: [
        'Do 6 godz. nagrań',
        '5–8 krótkich filmów po 15–60 sekund',
        '1 dodatkowy film o długości 1–2 minut',
        'Formaty ustalone przed produkcją',
        '2 rundy poprawek',
        'Filmy do pobrania',
        'Ostateczna cena i liczba filmów określone w wycenie',
      ],
      pt: [
        'Até 6 horas de captação',
        '5–8 vídeos curtos de 15–60 segundos cada',
        '1 filme adicional de 1–2 minutos',
        'Formatos definidos antes da produção',
        '2 rondas de ajustes',
        'Vídeos disponíveis para descarregar',
        'Preço final e quantidade exacta de vídeos definidos no orçamento',
      ],
    },
  },
  {
    group: 'custom',
    name: {
      en: 'Director’s Cut',
      pl: 'Director’s Cut',
      pt: 'Director’s Cut',
    },
    price: '',
    items: {
      en: [
        'Custom photography and film production · quotation on request',
        'Concept, crew and coverage tailored to your project',
        'Photo count, number and duration of films, formats and delivery agreed in a personalised proposal',
      ],
      pl: [
        'Indywidualna produkcja fotograficzna i filmowa · wycena na zapytanie',
        'Koncepcja, ekipa i czas pracy dopasowane do projektu',
        'Liczba zdjęć, liczba i długość filmów, formaty oraz warunki przekazania ustalane w indywidualnej ofercie',
      ],
      pt: [
        'Produção personalizada de fotografia e vídeo · sob orçamento',
        'Conceito, equipa e horas de cobertura à medida do projecto',
        'Quantidade de fotografias, número e duração dos vídeos, formatos e condições de entrega definidos numa proposta individual',
      ],
    },
  },
];

export const packageGroups = {
  portraits: {
    en: 'The Portrait Collection (Portrait Packages)',
    pl: 'The Portrait Collection (Pakiety Portretowe)',
    pt: 'The Portrait Collection (Pacotes de Retrato)',
  },
  weddingPhoto: {
    en: 'The Love Story Collection (Wedding Packages) / Photography',
    pl: 'The Love Story Collection (Pakiety Ślubne) / Fotografia',
    pt: 'The Love Story Collection (Pacotes de Casamento) / Fotografia',
  },
  weddingVideo: {
    en: 'The Love Story Collection (Wedding Packages) / Film',
    pl: 'The Love Story Collection (Pakiety Ślubne) / Film',
    pt: 'The Love Story Collection (Pacotes de Casamento) / Vídeo',
  },
  weddingBoth: {
    en: 'The Love Story Collection (Wedding Packages) / Photography + Film',
    pl: 'The Love Story Collection (Pakiety Ślubne) / Fotografia + Film',
    pt: 'The Love Story Collection (Pacotes de Casamento) / Fotografia + Vídeo',
  },
  motion: {
    en: 'The Motion Collection (Video Production Packages)',
    pl: 'The Motion Collection (Pakiety Produkcji Wideo)',
    pt: 'The Motion Collection (Pacotes de Produção de Vídeo)',
  },
  custom: {
    en: 'Director’s Cut (Custom Production)',
    pl: 'Director’s Cut (Produkcja Indywidualna)',
    pt: 'Director’s Cut (Produção Personalizada)',
  },
};
