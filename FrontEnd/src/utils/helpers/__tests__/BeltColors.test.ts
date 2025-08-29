import { getBeltColor, getBeltTextColor } from '../BeltColors';
import { BeltRequirements } from '../../../models/BeltRequirements/BeltRequirements';

describe('BeltColors helpers', () => {
  const mockBeltRequirements: BeltRequirements[] = [
    {
      beltOrder: 1,
      beltRank: 'White',
      forms: [],
      stances: [],
      blocks: [],
      punches: [],
      kicks: [],
      jumps: [],
      falling: [],
      oneSteps: [],
      selfDefense: [],
      color: '#FFFFFF',
      textColor: '#000000',
    },
    {
      beltOrder: 2,
      beltRank: 'Yellow',
      forms: [],
      stances: [],
      blocks: [],
      punches: [],
      kicks: [],
      jumps: [],
      falling: [],
      oneSteps: [],
      selfDefense: [],
      color: '#FFFF00',
      textColor: '#000000',
    },
    {
      beltOrder: 10,
      beltRank: 'Black',
      forms: [],
      stances: [],
      blocks: [],
      punches: [],
      kicks: [],
      jumps: [],
      falling: [],
      oneSteps: [],
      selfDefense: [],
      color: '#000000',
      textColor: '#FFFFFF',
    },
  ];

  describe('getBeltColor', () => {
    it('should return correct color for existing belt rank', () => {
      const result = getBeltColor('White', mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });

    it('should return correct color for belt rank with different case', () => {
      const result = getBeltColor('white', mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });

    it('should return correct color for uppercase belt rank', () => {
      const result = getBeltColor('BLACK', mockBeltRequirements);
      expect(result).toBe('#000000');
    });

    it('should return default grey color for non-existing belt rank', () => {
      const result = getBeltColor('Purple', mockBeltRequirements);
      expect(result).toBe('#757575');
    });

    it('should return default color for empty belt rank', () => {
      const result = getBeltColor('', mockBeltRequirements);
      expect(result).toBe('#757575');
    });

    it('should return default color when belt requirements array is empty', () => {
      const result = getBeltColor('White', []);
      expect(result).toBe('#757575');
    });

    it('should handle null/undefined belt rank gracefully', () => {
      const result = getBeltColor(null as any, mockBeltRequirements);
      expect(result).toBe('#757575');
    });
  });

  describe('getBeltTextColor', () => {
    it('should return correct text color for existing belt rank', () => {
      const result = getBeltTextColor('White', mockBeltRequirements);
      expect(result).toBe('#000000');
    });

    it('should return correct text color for belt rank with different case', () => {
      const result = getBeltTextColor('yellow', mockBeltRequirements);
      expect(result).toBe('#000000');
    });

    it('should return correct text color for black belt', () => {
      const result = getBeltTextColor('Black', mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });

    it('should return default white text color for non-existing belt rank', () => {
      const result = getBeltTextColor('Purple', mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });

    it('should return default text color for empty belt rank', () => {
      const result = getBeltTextColor('', mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });

    it('should return default text color when belt requirements array is empty', () => {
      const result = getBeltTextColor('White', []);
      expect(result).toBe('#FFFFFF');
    });

    it('should handle null/undefined belt rank gracefully', () => {
      const result = getBeltTextColor(null as any, mockBeltRequirements);
      expect(result).toBe('#FFFFFF');
    });
  });
});
