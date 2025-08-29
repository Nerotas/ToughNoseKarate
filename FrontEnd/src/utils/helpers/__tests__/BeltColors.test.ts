import { getBeltColor, getBeltTextColor } from '../BeltColors';

describe('BeltColors helpers', () => {
  describe('getBeltColor', () => {
    it('returns correct color for known belt ranks', () => {
      expect(getBeltColor('White')).toBe('#FFFFFF');
      expect(getBeltColor('Gold')).toBe('#FFD700');
      expect(getBeltColor('Purple')).toBe('#800080');
      expect(getBeltColor('Orange')).toBe('#FFA500');
      expect(getBeltColor('Blue')).toBe('#0000FF');
      expect(getBeltColor('Green')).toBe('#008000');
      expect(getBeltColor('Brown')).toBe('#8B4513');
      expect(getBeltColor('Red')).toBe('#FF0000');
      expect(getBeltColor('1st Black')).toBe('#000000');
    });

    it('should return correct color for belt rank with different case', () => {
      const result = getBeltColor('white');
      expect(result).toBe('#FFFFFF');
    });

    it('should return correct color for uppercase belt rank', () => {
      const result = getBeltColor('GOLD');
      expect(result).toBe('#FFD700');
    });

    it('should return default grey color for non-existing belt rank', () => {
      const result = getBeltColor('Silver');
      expect(result).toBe('#757575');
    });

    it('should return default color for empty belt rank', () => {
      const result = getBeltColor('');
      expect(result).toBe('#757575');
    });

    it('should handle null/undefined belt rank gracefully', () => {
      const result = getBeltColor(null as any);
      expect(result).toBe('#757575');
    });
  });

  describe('getBeltTextColor', () => {
    it('returns correct textColor for known belt ranks', () => {
      expect(getBeltTextColor('White')).toBe('#000000');
      expect(getBeltTextColor('Gold')).toBe('#000000');
      expect(getBeltTextColor('Purple')).toBe('#FFFFFF');
      expect(getBeltTextColor('Orange')).toBe('#FFFFFF');
      expect(getBeltTextColor('Blue')).toBe('#FFFFFF');
      expect(getBeltTextColor('Green')).toBe('#FFFFFF');
      expect(getBeltTextColor('Brown')).toBe('#FFFFFF');
      expect(getBeltTextColor('Red')).toBe('#FFFFFF');
      expect(getBeltTextColor('1st Black')).toBe('#FFFFFF');
    });

    it('should return correct text color for belt rank with different case', () => {
      const result = getBeltTextColor('gold');
      expect(result).toBe('#000000');
    });

    it('should return correct text color for black belt', () => {
      const result = getBeltTextColor('1st Black');
      expect(result).toBe('#FFFFFF');
    });

    it('should return default white text color for non-existing belt rank', () => {
      const result = getBeltTextColor('Silver');
      expect(result).toBe('#FFFFFF');
    });

    it('should return default text color for empty belt rank', () => {
      const result = getBeltTextColor('');
      expect(result).toBe('#FFFFFF');
    });

    it('should handle null/undefined belt rank gracefully', () => {
      const result = getBeltTextColor(null as any);
      expect(result).toBe('#FFFFFF');
    });
  });
});
