import { createTestQueryClient, mockStudent } from '../mockData';

describe('mockData', () => {
  describe('createTestQueryClient', () => {
    it('should create a QueryClient with test configuration', () => {
      const queryClient = createTestQueryClient();

      expect(queryClient).toBeDefined();
      expect(queryClient.getQueryCache()).toBeDefined();
      expect(queryClient.getMutationCache()).toBeDefined();
    });

    it('should have correct default options for queries', () => {
      const queryClient = createTestQueryClient();
      const defaultOptions = queryClient.getDefaultOptions();

      expect(defaultOptions.queries?.retry).toBe(false);
      expect(defaultOptions.queries?.staleTime).toBe(Infinity);
      expect(defaultOptions.queries?.gcTime).toBe(Infinity);
    });

    it('should have correct default options for mutations', () => {
      const queryClient = createTestQueryClient();
      const defaultOptions = queryClient.getDefaultOptions();

      expect(defaultOptions.mutations?.retry).toBe(false);
    });

    it('should create different instances each time', () => {
      const client1 = createTestQueryClient();
      const client2 = createTestQueryClient();

      expect(client1).not.toBe(client2);
    });
  });

  describe('mockStudent', () => {
    it('should have all required student properties', () => {
      expect(mockStudent.studentid).toBeDefined();
      expect(mockStudent.firstName).toBeDefined();
      expect(mockStudent.lastName).toBeDefined();
      expect(mockStudent.email).toBeDefined();
      expect(mockStudent.phone).toBeDefined();
      expect(mockStudent.beltRank).toBeDefined();
    });

    it('should have correct data types', () => {
      expect(typeof mockStudent.studentid).toBe('number');
      expect(typeof mockStudent.firstName).toBe('string');
      expect(typeof mockStudent.lastName).toBe('string');
      expect(typeof mockStudent.email).toBe('string');
      expect(typeof mockStudent.phone).toBe('string');
      expect(typeof mockStudent.active).toBe('boolean');
      expect(typeof mockStudent.eligibleForTesting).toBe('boolean');
      expect(typeof mockStudent.child).toBe('boolean');
    });

    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(mockStudent.email)).toBe(true);
    });

    it('should have valid belt rank', () => {
      const validBeltRanks = ['White', 'Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black'];
      expect(validBeltRanks).toContain(mockStudent.beltRank);
    });

    it('should have consistent data structure', () => {
      expect(mockStudent).toEqual(
        expect.objectContaining({
          studentid: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          beltRank: expect.any(String),
          active: expect.any(Boolean),
          eligibleForTesting: expect.any(Boolean),
          child: expect.any(Boolean),
        })
      );
    });
  });
});
