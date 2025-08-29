import { validationSchema } from '../Punches';

describe('Punches validation schema', () => {
  describe('name field', () => {
    it('should accept valid name', async () => {
      const validData = { name: 'Jab Punch' };
      await expect(validationSchema.validateAt('name', validData)).resolves.toBe('Jab Punch');
    });

    it('should trim whitespace from name', async () => {
      const validData = { name: '  Jab Punch  ' };
      const result = await validationSchema.validateAt('name', validData);
      expect(result).toBe('Jab Punch');
    });

    it('should accept null name', async () => {
      const validData = { name: null };
      await expect(validationSchema.validateAt('name', validData)).resolves.toBeNull();
    });

    it('should reject name that is too short', async () => {
      const invalidData = { name: 'a' };
      await expect(validationSchema.validateAt('name', invalidData)).rejects.toThrow('Too short');
    });

    it('should reject name that is too long', async () => {
      const invalidData = { name: 'a'.repeat(101) };
      await expect(validationSchema.validateAt('name', invalidData)).rejects.toThrow('Too long');
    });
  });

  describe('korean field', () => {
    it('should accept valid korean name', async () => {
      const validData = { korean: '정권' };
      await expect(validationSchema.validateAt('korean', validData)).resolves.toBe('정권');
    });

    it('should trim whitespace from korean', async () => {
      const validData = { korean: '  정권  ' };
      const result = await validationSchema.validateAt('korean', validData);
      expect(result).toBe('정권');
    });

    it('should accept null korean', async () => {
      const validData = { korean: null };
      await expect(validationSchema.validateAt('korean', validData)).resolves.toBeNull();
    });

    it('should reject korean that is too long', async () => {
      const invalidData = { korean: 'a'.repeat(101) };
      await expect(validationSchema.validateAt('korean', invalidData)).rejects.toThrow('Too long');
    });
  });

  describe('description field', () => {
    it('should accept valid description', async () => {
      const validData = { description: 'A straight punch delivered from the lead hand' };
      await expect(validationSchema.validateAt('description', validData)).resolves.toBe(
        'A straight punch delivered from the lead hand'
      );
    });

    it('should trim whitespace from description', async () => {
      const validData = { description: '  Valid description  ' };
      const result = await validationSchema.validateAt('description', validData);
      expect(result).toBe('Valid description');
    });

    it('should accept null description', async () => {
      const validData = { description: null };
      await expect(validationSchema.validateAt('description', validData)).resolves.toBeNull();
    });

    it('should reject description that is too long', async () => {
      const invalidData = { description: 'a'.repeat(2001) };
      await expect(validationSchema.validateAt('description', invalidData)).rejects.toThrow(
        'Too long'
      );
    });
  });

  describe('belt and beltColor fields', () => {
    it('should accept valid belt', async () => {
      const validData = { belt: 'White' };
      await expect(validationSchema.validateAt('belt', validData)).resolves.toBe('White');
    });

    it('should accept null belt', async () => {
      const validData = { belt: null };
      await expect(validationSchema.validateAt('belt', validData)).resolves.toBeNull();
    });

    it('should accept valid beltColor', async () => {
      const validData = { beltColor: '#FFFFFF' };
      await expect(validationSchema.validateAt('beltColor', validData)).resolves.toBe('#FFFFFF');
    });

    it('should accept null beltColor', async () => {
      const validData = { beltColor: null };
      await expect(validationSchema.validateAt('beltColor', validData)).resolves.toBeNull();
    });
  });

  describe('target field', () => {
    it('should accept valid target', async () => {
      const validData = { target: 'Solar plexus' };
      await expect(validationSchema.validateAt('target', validData)).resolves.toBe('Solar plexus');
    });

    it('should trim whitespace from target', async () => {
      const validData = { target: '  Solar plexus  ' };
      const result = await validationSchema.validateAt('target', validData);
      expect(result).toBe('Solar plexus');
    });

    it('should accept null target', async () => {
      const validData = { target: null };
      await expect(validationSchema.validateAt('target', validData)).resolves.toBeNull();
    });

    it('should reject target that is too long', async () => {
      const invalidData = { target: 'a'.repeat(201) };
      await expect(validationSchema.validateAt('target', invalidData)).rejects.toThrow('Too long');
    });
  });

  describe('array fields (execution, keyPoints, commonMistakes, applications)', () => {
    const arrayFields = ['execution', 'keyPoints', 'commonMistakes', 'applications'];

    arrayFields.forEach((field) => {
      describe(`${field} field`, () => {
        it('should accept valid array', async () => {
          const validData = { [field]: ['Step 1', 'Step 2'] };
          await expect(validationSchema.validateAt(field, validData)).resolves.toEqual([
            'Step 1',
            'Step 2',
          ]);
        });

        it('should trim whitespace from array items', async () => {
          const validData = { [field]: ['  Step 1  ', '  Step 2  '] };
          const result = await validationSchema.validateAt(field, validData);
          expect(result).toEqual(['Step 1', 'Step 2']);
        });

        it('should accept null array', async () => {
          const validData = { [field]: null };
          await expect(validationSchema.validateAt(field, validData)).resolves.toBeNull();
        });

        it('should default to empty array if not provided', async () => {
          const validData = {};
          const result = await validationSchema.validateAt(field, validData);
          expect(result).toEqual([]);
        });

        it('should reject array item that is too long', async () => {
          const invalidData = { [field]: ['a'.repeat(501)] };
          await expect(validationSchema.validateAt(field, invalidData)).rejects.toThrow('Too long');
        });

        it('should accept empty array', async () => {
          const validData = { [field]: [] };
          await expect(validationSchema.validateAt(field, validData)).resolves.toEqual([]);
        });
      });
    });
  });

  describe('full schema validation', () => {
    it('should validate complete valid object', async () => {
      const validData = {
        name: 'Jab Punch',
        korean: '정권',
        description: 'A straight punch from the lead hand',
        belt: 'White',
        beltColor: '#FFFFFF',
        target: 'Solar plexus',
        execution: ['Step forward', 'Extend lead hand'],
        keyPoints: ['Keep elbow straight', 'Rotate fist'],
        commonMistakes: ['Dropping guard', 'Poor footwork'],
        applications: ['Self-defense', 'Competition'],
      };

      await expect(validationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should validate object with null values', async () => {
      const validData = {
        name: null,
        korean: null,
        description: null,
        belt: null,
        beltColor: null,
        target: null,
        execution: null,
        keyPoints: null,
        commonMistakes: null,
        applications: null,
      };

      const result = await validationSchema.validate(validData);
      expect(result.name).toBeNull();
      expect(result.korean).toBeNull();
      expect(result.description).toBeNull();
      expect(result.belt).toBeNull();
      expect(result.beltColor).toBeNull();
      expect(result.target).toBeNull();
      expect(result.execution).toBeNull();
      expect(result.keyPoints).toBeNull();
      expect(result.commonMistakes).toBeNull();
      expect(result.applications).toBeNull();
    });

    it('should validate object with minimal data', async () => {
      const validData = {
        name: 'Simple Punch',
      };

      const result = await validationSchema.validate(validData);
      expect(result.name).toBe('Simple Punch');
      expect(result.execution).toEqual([]);
      expect(result.keyPoints).toEqual([]);
      expect(result.commonMistakes).toEqual([]);
      expect(result.applications).toEqual([]);
    });
  });
});
