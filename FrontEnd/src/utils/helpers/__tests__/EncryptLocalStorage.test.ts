import { encryptLocalData, getEncyptedLocalData } from '../EncryptLocalStorage';

// Mock crypto-js
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn(),
    decrypt: jest.fn(),
  },
  enc: {
    Utf8: 'utf8',
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock environment variable
const originalEnv = process.env;
beforeEach(() => {
  jest.resetAllMocks();
  process.env = { ...originalEnv, REACT_APP_CRYPTO: 'test-secret-key' };
});

afterEach(() => {
  process.env = originalEnv;
});

import { AES } from 'crypto-js';

describe('EncryptLocalStorage utilities', () => {
  describe('encryptLocalData', () => {
    it('should encrypt and store data in localStorage', () => {
      const mockEncryptedObject = { toString: jest.fn().mockReturnValue('encrypted-string') };
      (AES.encrypt as jest.Mock).mockReturnValue(mockEncryptedObject);

      const testData = { userId: 123, name: 'John Doe' };
      const testKey = 'user-data';

      encryptLocalData(testKey, testData);

      expect(AES.encrypt).toHaveBeenCalledWith(JSON.stringify(testData), 'test-secret-key');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(testKey, 'encrypted-string');
    });

    it('should handle string data', () => {
      const mockEncryptedObject = { toString: jest.fn().mockReturnValue('encrypted-string') };
      (AES.encrypt as jest.Mock).mockReturnValue(mockEncryptedObject);

      const testData = 'simple string';
      const testKey = 'simple-data';

      encryptLocalData(testKey, testData);

      expect(AES.encrypt).toHaveBeenCalledWith(JSON.stringify(testData), 'test-secret-key');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(testKey, 'encrypted-string');
    });

    it('should handle null data', () => {
      const mockEncryptedObject = { toString: jest.fn().mockReturnValue('encrypted-null') };
      (AES.encrypt as jest.Mock).mockReturnValue(mockEncryptedObject);

      const testData = null;
      const testKey = 'null-data';

      encryptLocalData(testKey, testData);

      expect(AES.encrypt).toHaveBeenCalledWith(JSON.stringify(testData), 'test-secret-key');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(testKey, 'encrypted-null');
    });

    it('should handle array data', () => {
      const mockEncryptedObject = { toString: jest.fn().mockReturnValue('encrypted-array') };
      (AES.encrypt as jest.Mock).mockReturnValue(mockEncryptedObject);

      const testData = [1, 2, 3, 'test'];
      const testKey = 'array-data';

      encryptLocalData(testKey, testData);

      expect(AES.encrypt).toHaveBeenCalledWith(JSON.stringify(testData), 'test-secret-key');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(testKey, 'encrypted-array');
    });
  });

  describe('getEncyptedLocalData', () => {
    it('should decrypt and return data from localStorage', () => {
      const testKey = 'user-data';
      const encryptedValue = 'encrypted-string';
      const decryptedValue = '{"userId":123,"name":"John Doe"}';
      const expectedData = { userId: 123, name: 'John Doe' };

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);

      const mockDecryptedObject = { toString: jest.fn().mockReturnValue(decryptedValue) };
      (AES.decrypt as jest.Mock).mockReturnValue(mockDecryptedObject);

      const result = getEncyptedLocalData(testKey);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(AES.decrypt).toHaveBeenCalledWith(encryptedValue, 'test-secret-key');
      expect(mockDecryptedObject.toString).toHaveBeenCalledWith('utf8');
      expect(result).toEqual(expectedData);
    });

    it('should return empty string when localStorage item has no size', () => {
      const testKey = 'empty-data';

      mockLocalStorage.getItem.mockReturnValue('');

      const result = getEncyptedLocalData(testKey);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(AES.decrypt).not.toHaveBeenCalled();
      expect(result).toBe('');
    });

    it('should return empty string when localStorage item is null', () => {
      const testKey = 'null-data';

      mockLocalStorage.getItem.mockReturnValue(null);

      const result = getEncyptedLocalData(testKey);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(AES.decrypt).not.toHaveBeenCalled();
      expect(result).toBe('');
    });

    it('should handle JSON parsing errors gracefully', () => {
      const testKey = 'invalid-data';
      const encryptedValue = 'encrypted-string';
      const invalidDecryptedValue = 'invalid-json{';

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);

      const mockDecryptedObject = { toString: jest.fn().mockReturnValue(invalidDecryptedValue) };
      (AES.decrypt as jest.Mock).mockReturnValue(mockDecryptedObject);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = getEncyptedLocalData(testKey);

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('error invalid-data');

      consoleSpy.mockRestore();
    });

    it('should handle decryption errors gracefully', () => {
      const testKey = 'corrupt-data';
      const encryptedValue = 'corrupt-encrypted-string';

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);
      (AES.decrypt as jest.Mock).mockImplementation(() => {
        throw new Error('Decryption failed');
      });

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = getEncyptedLocalData(testKey);

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith('error corrupt-data');

      consoleSpy.mockRestore();
    });

    it('should handle string data correctly', () => {
      const testKey = 'string-data';
      const encryptedValue = 'encrypted-string';
      const decryptedValue = '"simple string"';
      const expectedData = 'simple string';

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);

      const mockDecryptedObject = { toString: jest.fn().mockReturnValue(decryptedValue) };
      (AES.decrypt as jest.Mock).mockReturnValue(mockDecryptedObject);

      const result = getEncyptedLocalData(testKey);

      expect(result).toBe(expectedData);
    });

    it('should handle null data correctly', () => {
      const testKey = 'null-data';
      const encryptedValue = 'encrypted-null';
      const decryptedValue = 'null';

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);

      const mockDecryptedObject = { toString: jest.fn().mockReturnValue(decryptedValue) };
      (AES.decrypt as jest.Mock).mockReturnValue(mockDecryptedObject);

      const result = getEncyptedLocalData(testKey);

      expect(result).toBeNull();
    });

    it('should handle array data correctly', () => {
      const testKey = 'array-data';
      const encryptedValue = 'encrypted-array';
      const decryptedValue = '[1,2,3,"test"]';
      const expectedData = [1, 2, 3, 'test'];

      mockLocalStorage.getItem.mockReturnValue(encryptedValue);

      const mockDecryptedObject = { toString: jest.fn().mockReturnValue(decryptedValue) };
      (AES.decrypt as jest.Mock).mockReturnValue(mockDecryptedObject);

      const result = getEncyptedLocalData(testKey);

      expect(result).toEqual(expectedData);
    });
  });
});
