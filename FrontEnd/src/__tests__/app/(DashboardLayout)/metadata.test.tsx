import { metadata } from '../../../app/(DashboardLayout)/metadata';

describe('Metadata Configuration', () => {
  it('has the correct title', () => {
    expect(metadata.title).toBe('Tough Nose Karate');
  });

  it('has the correct description', () => {
    expect(metadata.description).toBe(
      'Tough Nose Karate provides essential resources and management tools for Tang Soo Do students and instructors.'
    );
  });

  it('has correct Open Graph configuration', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.title).toBe('Tough Nose Karate');
    expect(metadata.openGraph.url).toBe('https://toughnosekarate.netlify.app/');
    expect(metadata.openGraph.description).toBe(
      'Empowering Tang Soo Do students with modern martial arts management.'
    );
    expect(metadata.openGraph.type).toBe('article');
  });

  it('has correct Open Graph image configuration', () => {
    expect(metadata.openGraph.images).toBeDefined();
    expect(metadata.openGraph.images).toHaveLength(1);

    const image = metadata.openGraph.images[0];
    expect(image.url).toBe('/sitepreview.png');
    expect(image.width).toBe(300);
    expect(image.height).toBe(200);
    expect(image.alt).toBe('Tough Nose Karate Logo');
  });

  it('has all required metadata properties', () => {
    expect(metadata).toHaveProperty('title');
    expect(metadata).toHaveProperty('description');
    expect(metadata).toHaveProperty('openGraph');
  });

  it('has valid Open Graph properties structure', () => {
    const { openGraph } = metadata;

    expect(openGraph).toHaveProperty('title');
    expect(openGraph).toHaveProperty('url');
    expect(openGraph).toHaveProperty('description');
    expect(openGraph).toHaveProperty('images');
    expect(openGraph).toHaveProperty('type');
  });

  it('has proper URL format', () => {
    expect(metadata.openGraph.url).toMatch(/^https:\/\/.+/);
  });

  it('has proper image dimensions', () => {
    const image = metadata.openGraph.images[0];
    expect(typeof image.width).toBe('number');
    expect(typeof image.height).toBe('number');
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  it('has meaningful alt text for image', () => {
    const image = metadata.openGraph.images[0];
    expect(image.alt).toBeTruthy();
    expect(image.alt.length).toBeGreaterThan(0);
  });
});
