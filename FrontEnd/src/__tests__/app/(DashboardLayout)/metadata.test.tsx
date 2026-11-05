import {
  getPageMetadata,
  getPrivatePageMetadata,
  homeStructuredData,
  metadata,
  publicPages,
  SITE_URL,
} from '../../../app/(DashboardLayout)/metadata';
import sitemap from '../../../app/sitemap';
import robots from '../../../app/robots';

describe('Search metadata', () => {
  it('uses the canonical production host and targets Plano without a street address', () => {
    expect(metadata.metadataBase.href).toBe(`${SITE_URL}/`);
    expect(metadata.title).toBe('Tang Soo Do Karate in Plano, TX | Tough Nose Karate');
    expect(metadata.description).toContain('Plano, TX');
    expect(metadata.robots).toEqual({ index: true, follow: true });
    const organization = homeStructuredData['@graph'][0];
    expect(organization.areaServed).toEqual({
      '@type': 'City',
      name: 'Plano',
      containedInPlace: { '@type': 'State', name: 'Texas' },
    });
    expect(organization).not.toHaveProperty('address');
    expect(JSON.stringify(homeStructuredData)).not.toContain('streetAddress');
  });

  it('gives every indexable route unique canonical metadata and consistent previews', () => {
    const paths = Object.keys(publicPages) as Array<keyof typeof publicPages>;
    const pages = paths.map(getPageMetadata);

    expect(new Set(pages.map((page) => page.title)).size).toBe(paths.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(paths.length);
    pages.forEach((page, index) => {
      expect(page.alternates.canonical).toBe(paths[index]);
      expect(page.openGraph.url).toBe(paths[index]);
      expect(page.openGraph.title).toBe(page.title);
      expect(page.openGraph.description).toBe(page.description);
      expect(page.openGraph.type).toBe('website');
      expect(page.openGraph.images[0]).toEqual({
        url: '/sitepreview.png',
        width: 1894,
        height: 959,
        alt: 'Tough Nose Karate',
      });
      expect(page.twitter.card).toBe('summary_large_image');
      expect(page.description).toContain('Plano, TX');
    });
  });

  it.each([
    '/students',
    '/students/123',
    '/documents',
    '/certificate-builder',
    '/auth/login',
    '/unauthorized',
  ])('marks the private or utility route %s as noindex', (path) => {
    const page = getPrivatePageMetadata(path, 'Account', 'Authorized account tools.');
    expect(page.robots).toEqual({ index: false, follow: false });
    expect(page.alternates.canonical).toBe(path);
  });

  it('lists all ten public content routes in the sitemap, without private URLs or fake dates', () => {
    const entries = sitemap();
    expect(entries.map((entry) => entry.url)).toEqual(
      Object.keys(publicPages).map((path) => new URL(path, SITE_URL).href)
    );
    expect(entries).toHaveLength(10);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(10);
    entries.forEach((entry) => {
      expect(entry).not.toHaveProperty('lastModified');
      expect(entry.url).not.toMatch(/students|documents|certificate-builder|auth|unauthorized/);
    });
  });

  it('allows crawlers to read noindex directives and advertises the sitemap', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    });
  });
});
