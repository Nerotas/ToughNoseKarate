import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import your actual App component, adjust the path as needed
import RootLayout from 'app/layout';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock QueryClient to avoid provider issues
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  QueryClient: jest.fn().mockImplementation(() => ({
    getQueryData: jest.fn(),
    setQueryData: jest.fn(),
    invalidateQueries: jest.fn(),
    clear: jest.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
  useQuery: () => ({
    data: undefined,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<RootLayout children={<div />} />);
    expect(document.body).toBeInTheDocument();
  });

  it('has proper document structure', () => {
    render(<RootLayout children={<div role='main' />} />);
    // Replace 'main' with a selector for an element you expect RootLayout to render
    const mainElement = screen.queryByRole('main') || screen.queryByTestId('main');
    expect(mainElement).toBeInTheDocument();
  });
});
