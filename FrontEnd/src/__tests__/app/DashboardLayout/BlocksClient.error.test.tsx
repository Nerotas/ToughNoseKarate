import { render, screen, fireEvent } from '@testing-library/react';
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

jest.mock('../../../app/loading', () => () => <div data-testid='loading'>Loading...</div>);
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

  it('shows error demo alert and opens create dialog', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, instructor: { role: 'admin' } });
    mockUseGet.mockReturnValue({ data: [], isPending: false, isError: true, refetch: jest.fn() });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    // Error (demo) alert present
    expect(screen.getByText(/Unable to connect to the backend server/)).toBeInTheDocument();

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
});
