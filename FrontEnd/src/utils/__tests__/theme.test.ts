import theme from '../theme';

describe('theme', () => {
  it('should export a valid MUI theme object', () => {
    expect(theme).toBeDefined();
    expect(theme.palette).toBeDefined();
    expect(theme.typography).toBeDefined();
    expect(theme.shape).toBeDefined();
    expect(theme.spacing).toBeDefined();
  });

  it('should have primary and secondary colors defined', () => {
    expect(theme.palette.primary).toBeDefined();
    expect(theme.palette.secondary).toBeDefined();
  });

  it('should have breakpoints configured', () => {
    expect(theme.breakpoints).toBeDefined();
    expect(theme.breakpoints.values).toBeDefined();
  });

  it('should be able to create spacing values', () => {
    const spacing = theme.spacing(1);
    expect(typeof spacing).toBe('string');
  });
});
