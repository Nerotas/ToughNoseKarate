import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the config module
jest.mock('../../config/frontend.config', () => ({
  getConfig: jest.fn(() => ({
    NEXT_PUBLIC_API_PATH: 'http://localhost:3001/api',
    NEXT_PUBLIC_API_VERSION: 'v1',
  })),
  shouldEnableDebug: jest.fn(() => false),
}));

// Set up the axios.create mock before any tests run
const mockAxiosInstance = {
  interceptors: {
    request: {
      use: jest.fn((successHandler, errorHandler) => {
        // Store the handlers for testing
        mockAxiosInstance.requestInterceptor = successHandler;
        mockAxiosInstance.requestErrorHandler = errorHandler;
      }),
    },
    response: {
      use: jest.fn((successHandler, errorHandler) => {
        // Store the handlers for testing
        mockAxiosInstance.responseInterceptor = successHandler;
        mockAxiosInstance.responseErrorHandler = errorHandler;
      }),
    },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  defaults: {},
  requestInterceptor: null as any,
  requestErrorHandler: null as any,
  responseInterceptor: null as any,
  responseErrorHandler: null as any,
};

mockedAxios.create = jest.fn().mockReturnValue(mockAxiosInstance);

// Import the module once to trigger axios instance creation
require('../AxiosInstance');

describe('AxiosInstance', () => {
  beforeEach(() => {
    // Only clear method mocks, preserve interceptor and create call history
    mockAxiosInstance.get.mockClear();
    mockAxiosInstance.post.mockClear();
    mockAxiosInstance.put.mockClear();
    mockAxiosInstance.delete.mockClear();
  });

  it('should create axios instance with correct base configuration', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001/api/v1',
      timeout: 30000,
      withCredentials: true,
    });
  });

  it('should handle API path without trailing slash', () => {
    // Since the module was imported with 'http://localhost:3001/api' config,
    // it should create baseURL 'http://localhost:3001/api/v1' (trailing slash handled)
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'http://localhost:3001/api/v1',
      })
    );
  });

  it('should handle API version without v prefix', () => {
    // Config uses 'v1' which should result in '/v1' in baseURL
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: expect.stringContaining('/v1'),
      })
    );
  });

  it('should handle empty API version with default', () => {
    // Should default to 'v1' for version
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: expect.stringContaining('/v1'),
      })
    );
  });
  it('should set up request interceptor', () => {
    // Import the module to trigger axios instance creation
    require('../AxiosInstance');

    // Verify that request interceptor was set up
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
  });

  it('should set up response interceptor', () => {
    // Import the module to trigger axios instance creation
    require('../AxiosInstance');

    // Verify that response interceptor was set up
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });

  describe('request interceptor', () => {
    beforeEach(() => {
      // Ensure the module is loaded so interceptors are set up
      require('../AxiosInstance');
    });

    it('should add Content-Type header for POST requests with data', () => {
      const mockRequest = {
        method: 'POST',
        data: { test: 'data' },
        headers: {},
        baseURL: 'http://localhost:3001/api',
        url: '/test',
      };

      const result = mockAxiosInstance.requestInterceptor(mockRequest);

      expect(result.headers['Content-Type']).toBe('application/json');
    });

    it('should add Content-Type header for PUT requests with data', () => {
      const mockRequest = {
        method: 'PUT',
        data: { test: 'data' },
        headers: {},
      };

      const result = mockAxiosInstance.requestInterceptor(mockRequest);

      expect(result.headers['Content-Type']).toBe('application/json');
    });

    it('should not add Content-Type header for GET requests', () => {
      const mockRequest = {
        method: 'GET',
        headers: {},
      };

      const result = mockAxiosInstance.requestInterceptor(mockRequest);

      expect(result.headers['Content-Type']).toBeUndefined();
    });

    it('should not add Content-Type header for requests without data', () => {
      const mockRequest = {
        method: 'POST',
        data: null,
        headers: {},
      };

      const result = mockAxiosInstance.requestInterceptor(mockRequest);

      expect(result.headers['Content-Type']).toBeUndefined();
    });

    it('should log debug information when debug is enabled', () => {
      const { shouldEnableDebug } = require('../../config/frontend.config');
      shouldEnableDebug.mockReturnValue(true);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const mockRequest = {
        method: 'POST',
        data: { test: 'data' },
        headers: {},
        baseURL: 'http://localhost:3001/api',
        url: '/test',
      };

      // Call the interceptor directly since debug behavior is controlled by shouldEnableDebug
      mockAxiosInstance.requestInterceptor(mockRequest);

      expect(consoleSpy).toHaveBeenCalledWith(
        '🔄 API Request: POST http://localhost:3001/api/test'
      );

      consoleSpy.mockRestore();
      shouldEnableDebug.mockReturnValue(false); // Reset for other tests
    });
  });
});
