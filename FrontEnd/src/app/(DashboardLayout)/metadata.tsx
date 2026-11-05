import type { Metadata } from 'next';

export const SITE_URL = 'https://toughnosekarate.com';
const SITE_NAME = 'Tough Nose Karate';

export const publicPages = {
  '/': {
    title: 'Tang Soo Do Karate in Plano, TX',
    description:
      'Traditional Tang Soo Do karate classes in Plano, TX. Build confidence, discipline, and self-defense skills with family and adult classes at Tough Nose Karate.',
  },
  '/belt-requirements': {
    title: 'Tang Soo Do Belt Requirements',
    description:
      'Explore Tang Soo Do belt requirements, forms, blocks, punches, kicks, and testing guidance. Follow your progression with Tough Nose Karate in Plano, TX.',
  },
  '/stances': {
    title: 'Tang Soo Do Stances',
    description:
      'Learn the basic stances of Tang Soo Do, including foot placement, balance, and training guidelines. Practice with Tough Nose Karate in Plano, TX.',
  },
  '/blocks': {
    title: 'Tang Soo Do Blocking Techniques',
    description:
      'Explore Tang Soo Do blocks, execution steps, common mistakes, and practice guidelines. Develop your defensive techniques with Tough Nose Karate in Plano, TX.',
  },
  '/punches': {
    title: 'Tang Soo Do Punching Techniques',
    description:
      'Learn Tang Soo Do punches, proper execution, targets, and training guidelines. Build accurate, controlled techniques with Tough Nose Karate in Plano, TX.',
  },
  '/kicks': {
    title: 'Tang Soo Do Kicking Techniques',
    description:
      'Study Tang Soo Do kicks, execution steps, targets, and common mistakes. Improve balance and technique with training guidance from Tough Nose Karate in Plano, TX.',
  },
  '/forms': {
    title: 'Tang Soo Do Forms (Hyung)',
    description:
      'Explore Tang Soo Do forms, their meanings, key points, and practice guidelines. Develop balance and discipline with Tough Nose Karate in Plano, TX.',
  },
  '/one-steps': {
    title: 'Tang Soo Do One-Step Sparring',
    description:
      'Learn Tang Soo Do one-step sparring sequences and partner practice guidelines. Develop timing, distance, and control with Tough Nose Karate in Plano, TX.',
  },
  '/self-defense': {
    title: 'Tang Soo Do Self-Defense Techniques',
    description:
      'Explore Tang Soo Do self-defense techniques, escapes, and ground work. Learn progressive training skills with guidance from Tough Nose Karate in Plano, TX.',
  },
  '/instructors': {
    title: 'Karate Instructors in Plano, TX',
    description:
      'Meet the Tough Nose Karate instructors in Plano, TX. Learn about their Tang Soo Do experience, teaching philosophy, specialties, and traditional martial arts values.',
  },
} satisfies Record<string, { title: string; description: string }>;

const createMetadata = (path: string, title: string, description: string) =>
  ({
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/sitepreview.png',
          width: 1894,
          height: 959,
          alt: 'Tough Nose Karate',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ['/sitepreview.png'],
    },
  }) satisfies Metadata;

export const getPageMetadata = (path: keyof typeof publicPages) => {
  const { title, description } = publicPages[path];
  return createMetadata(path, title, description);
};

export const getPrivatePageMetadata = (path: string, title: string, description: string) =>
  ({
    ...createMetadata(path, title, description),
    robots: { index: false, follow: false },
  }) satisfies Metadata;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...getPageMetadata('/'),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/icon-192.png',
  },
} satisfies Metadata;

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: 'toughnosekarate@gmail.com',
      areaServed: {
        '@type': 'City',
        name: 'Plano',
        containedInPlace: { '@type': 'State', name: 'Texas' },
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};
