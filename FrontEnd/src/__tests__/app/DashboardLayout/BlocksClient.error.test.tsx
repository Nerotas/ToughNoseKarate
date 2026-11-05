import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlocksClient from '../../../app/(DashboardLayout)/blocks/BlocksClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../hooks/useGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the heavy create form to avoid unrelated complexity
jest.mock('../../../app/(DashboardLayout)/components/blocks/blockCreateForm', () => () => (
  <div data-testid='mock-create-form'>Create Form</div>
));

const mockUseAuth = require('../../../hooks/useAuth').useAuth;
const mockUseGet = require('../../../hooks/useGet').default;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const theme = createTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('BlocksClient error + create modal', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the load error, retries the request, and opens the create dialog', async () => {
    const refetch = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({ isAuthenticated: true, instructor: { role: 'admin' } });
    mockUseGet.mockReturnValue({ data: [], isPending: false, isError: true, refetch });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    expect(screen.getByText('Unable to load blocks. Please try again.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(refetch).toHaveBeenCalledTimes(1));

    // Dialog should not be open initially
    expect(screen.queryByRole('dialog', { name: /Add Block/i })).not.toBeInTheDocument();

    // Open the create dialog via the button (ensure we target the button element only)
    const addButtons = screen.getAllByRole('button', { name: 'Add Block' });
    fireEvent.click(addButtons[0]);

    // Now the dialog (title 'Add Block') should appear; findByRole waits automatically
    expect(await screen.findByRole('dialog', { name: /Add Block/i })).toBeInTheDocument();
    // And our mocked form renders
    expect(screen.getByTestId('mock-create-form')).toBeInTheDocument();
  });

  it('clears the error after recovery without granting anonymous users create access', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, instructor: null });
    mockUseGet.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch: jest.fn(),
    });
    const { rerender } = render(<BlocksClient />, { wrapper: TestWrapper });

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add Block' })).not.toBeInTheDocument();

    mockUseGet.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      refetch: jest.fn(),
    });
    rerender(<BlocksClient />);

    expect(screen.queryByText('Unable to load blocks. Please try again.')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Retry' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Tang Soo Do Blocking Techniques'
    );
    expect(screen.queryByRole('button', { name: 'Add Block' })).not.toBeInTheDocument();
  });
});
