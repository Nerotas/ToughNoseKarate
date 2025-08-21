import { render, screen, waitFor } from '@testing-library/react';
import ConfigValidator from 'app/config-validator';
import { validateRuntimeConfig, shouldEnableDebug } from 'utils/config/frontend.config';

// Mock the config validation functions
jest.mock('utils/config/frontend.config', () => ({
  validateRuntimeConfig: jest.fn(),
  shouldEnableDebug: jest.fn(),
}));

// Mock Loading component
jest.mock('../../app/loading', () => {
  return function MockLoading() {
    return <div data-testid='loading-component'>Loading...</div>;
  };
});
const mockValidateRuntimeConfig = validateRuntimeConfig as jest.MockedFunction<
  typeof validateRuntimeConfig
>;
const mockShouldEnableDebug = shouldEnableDebug as jest.MockedFunction<typeof shouldEnableDebug>;

describe('ConfigValidator', () => {
  const TestChildren = () => <div data-testid='test-children'>Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console mocks
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    mockValidateRuntimeConfig.mockImplementation(() => {
      // Simulate async validation
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('renders children when validation succeeds', async () => {
    mockValidateRuntimeConfig.mockImplementation(() => {
      // Validation passes
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument();
  });

  it('logs success message when debug is enabled', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockValidateRuntimeConfig.mockImplementation(() => {
      // Validation passes
    });
    mockShouldEnableDebug.mockReturnValue(true);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('🔧 Configuration validation completed successfully');
    });
  });

  it('does not log success message when debug is disabled', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockValidateRuntimeConfig.mockImplementation(() => {
      // Validation passes
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    expect(consoleSpy).not.toHaveBeenCalledWith(
      '🔧 Configuration validation completed successfully'
    );
  });

  it('renders error state when validation fails', async () => {
    const testError = new Error('Test validation error');
    mockValidateRuntimeConfig.mockImplementation(() => {
      throw testError;
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByText('Configuration Error')).toBeInTheDocument();
      expect(screen.getByText('Test validation error')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
  });

  it('logs error when validation fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const testError = new Error('Test validation error');
    mockValidateRuntimeConfig.mockImplementation(() => {
      throw testError;
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('❌ Configuration validation failed:', testError);
    });
  });

  it('handles non-Error exceptions', async () => {
    mockValidateRuntimeConfig.mockImplementation(() => {
      throw 'String error';
    });
    mockShouldEnableDebug.mockReturnValue(false);

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByText('Configuration validation failed')).toBeInTheDocument();
    });
  });

  it('renders reload button in error state', async () => {
    mockValidateRuntimeConfig.mockImplementation(() => {
      throw new Error('Test error');
    });

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByText('Reload Page')).toBeInTheDocument();
    });
  });

  it('handles reload button click', async () => {
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    mockValidateRuntimeConfig.mockImplementation(() => {
      throw new Error('Test error');
    });

    render(
      <ConfigValidator>
        <TestChildren />
      </ConfigValidator>
    );

    await waitFor(() => {
      expect(screen.getByText('Reload Page')).toBeInTheDocument();
    });

    const reloadButton = screen.getByText('Reload Page');
    reloadButton.click();

    expect(mockReload).toHaveBeenCalled();
  });
});
