import { JWT_TOKEN_STATUS, getJwtTokenStatus, clearAllDataOnUserLogout } from '../loginHelpers';

describe('loginHelpers', () => {
  describe('JWT_TOKEN_STATUS enum', () => {
    it('should have correct enum values', () => {
      expect(JWT_TOKEN_STATUS.EXPIRED).toBe('EXPIRED');
      expect(JWT_TOKEN_STATUS.INVALID).toBe('INVALID');
      expect(JWT_TOKEN_STATUS.VALID).toBe('VALID');
    });
  });

  describe('getJwtTokenStatus', () => {
    // Helper function to create a JWT token with a specific expiration time
    const createMockToken = (expirationTime: number) => {
      const header = { alg: 'HS256', typ: 'JWT' };
      const payload = { sub: '1234567890', name: 'John Doe', exp: expirationTime };

      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payload));
      const signature = 'signature';

      return `${encodedHeader}.${encodedPayload}.${signature}`;
    };

    it('should return INVALID for empty token', () => {
      const result = getJwtTokenStatus('');

      expect(result).toBe(JWT_TOKEN_STATUS.INVALID);
    });

    it('should return INVALID for null token', () => {
      const result = getJwtTokenStatus(null as any);

      expect(result).toBe(JWT_TOKEN_STATUS.INVALID);
    });

    it('should return INVALID for undefined token', () => {
      const result = getJwtTokenStatus(undefined as any);

      expect(result).toBe(JWT_TOKEN_STATUS.INVALID);
    });

    it('should return VALID for token that is not expired', () => {
      // Create a token that expires in 1 hour
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const token = createMockToken(futureTime);

      const result = getJwtTokenStatus(token);

      expect(result).toBe(JWT_TOKEN_STATUS.VALID);
    });

    it('should return EXPIRED for token that has expired', () => {
      // Create a token that expired 1 hour ago
      const pastTime = Math.floor(Date.now() / 1000) - 3600;
      const token = createMockToken(pastTime);

      const result = getJwtTokenStatus(token);

      expect(result).toBe(JWT_TOKEN_STATUS.EXPIRED);
    });

    it('should return EXPIRED for token that expires exactly now', () => {
      // Create a token that expires 1 second ago to avoid race conditions
      const currentTime = Math.floor(Date.now() / 1000) - 1;
      const token = createMockToken(currentTime);

      const result = getJwtTokenStatus(token);

      expect(result).toBe(JWT_TOKEN_STATUS.EXPIRED);
    });

    it('should handle token with exp in far future', () => {
      // Create a token that expires in 10 years
      const farFutureTime = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60;
      const token = createMockToken(farFutureTime);

      const result = getJwtTokenStatus(token);

      expect(result).toBe(JWT_TOKEN_STATUS.VALID);
    });

    it('should handle token with exp in far past', () => {
      // Create a token that expired 10 years ago
      const farPastTime = Math.floor(Date.now() / 1000) - 10 * 365 * 24 * 60 * 60;
      const token = createMockToken(farPastTime);

      const result = getJwtTokenStatus(token);

      expect(result).toBe(JWT_TOKEN_STATUS.EXPIRED);
    });

    it('should handle malformed token gracefully', () => {
      const malformedToken = 'not.a.valid.token';

      // This should throw an error when trying to parse, but we test the behavior
      expect(() => getJwtTokenStatus(malformedToken)).toThrow();
    });

    it('should handle token with invalid base64 payload', () => {
      const invalidToken = 'header.invalid-base64.signature';

      // This should throw an error when trying to decode base64
      expect(() => getJwtTokenStatus(invalidToken)).toThrow();
    });

    it('should handle token with invalid JSON in payload', () => {
      const header = btoa('{"alg":"HS256","typ":"JWT"}');
      const invalidPayload = btoa('invalid-json{');
      const signature = 'signature';
      const invalidToken = `${header}.${invalidPayload}.${signature}`;

      // This should throw an error when trying to parse JSON
      expect(() => getJwtTokenStatus(invalidToken)).toThrow();
    });

    it('should handle token with missing exp field', () => {
      const header = { alg: 'HS256', typ: 'JWT' };
      const payloadWithoutExp = { sub: '1234567890', name: 'John Doe' };

      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payloadWithoutExp));
      const signature = 'signature';
      const token = `${encodedHeader}.${encodedPayload}.${signature}`;

      const result = getJwtTokenStatus(token);

      // Should return EXPIRED when exp is undefined (undefined < currentTime)
      expect(result).toBe(JWT_TOKEN_STATUS.EXPIRED);
    });
  });

  describe('clearAllDataOnUserLogout', () => {
    // Mock sessionStorage
    const mockSessionStorage = {
      clear: jest.fn(),
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should clear sessionStorage', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      clearAllDataOnUserLogout();

      expect(mockSessionStorage.clear).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('Cleared all data on user logout');

      consoleSpy.mockRestore();
    });

    it('should log the correct message', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      clearAllDataOnUserLogout();

      expect(consoleSpy).toHaveBeenCalledWith('Cleared all data on user logout');

      consoleSpy.mockRestore();
    });

    it('should handle sessionStorage.clear() errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockSessionStorage.clear.mockImplementation(() => {
        throw new Error('SessionStorage error');
      });

      expect(() => clearAllDataOnUserLogout()).toThrow('SessionStorage error');

      consoleSpy.mockRestore();
    });
  });
});
