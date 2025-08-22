import createEmotionCache from '../createEmotionCache';

describe('createEmotionCache', () => {
  it('should create emotion cache with correct configuration', () => {
    const cache = createEmotionCache();

    expect(cache).toBeDefined();
    expect(cache.key).toBe('mui-style');
    // Removed invalid property 'prepend' assertion
  });

  it('should create different cache instances', () => {
    const cache1 = createEmotionCache();
    const cache2 = createEmotionCache();

    // Should be different instances but same configuration
    expect(cache1).not.toBe(cache2);
    expect(cache1.key).toBe(cache2.key);
  });
});
