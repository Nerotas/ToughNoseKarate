import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import axiosInstance from 'utils/helpers/AxiosInstance';
import BackgroundRefreshIndicator from 'components/loading/BackgroundRefreshIndicator';
import StancesClient from 'app/(DashboardLayout)/stances/StancesClient';
import StancesLoading from 'app/(DashboardLayout)/stances/loading';
import BlocksClient from 'app/(DashboardLayout)/blocks/BlocksClient';
import BlocksLoading from 'app/(DashboardLayout)/blocks/loading';
import PunchesClient from 'app/(DashboardLayout)/punches/PunchesClient';
import PunchesLoading from 'app/(DashboardLayout)/punches/loading';
import KicksClient from 'app/(DashboardLayout)/kicks/KicksClient';
import KicksLoading from 'app/(DashboardLayout)/kicks/loading';
import FormsClient from 'app/(DashboardLayout)/forms/FormsClient';
import FormsLoading from 'app/(DashboardLayout)/forms/loading';
import OneStepsClient from 'app/(DashboardLayout)/one-steps/OneStepsClient';
import OneStepsLoading from 'app/(DashboardLayout)/one-steps/loading';
import SelfDefenseClient from 'app/(DashboardLayout)/self-defense/SelfDefenseClient';
import SelfDefenseLoading from 'app/(DashboardLayout)/self-defense/loading';
import { useAuth } from 'hooks/useAuth';

jest.mock('utils/helpers/AxiosInstance');
jest.mock('hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ isAuthenticated: false, instructor: null, isAuthLoading: false })),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

const technique = {
  id: 1,
  name: 'Cached technique',
  blockName: 'Cached technique',
  formName: 'Cached technique',
  description: 'Practice with control.',
  beltRank: 'White',
  korean: 'Test',
  category: 'Escapes',
  difficulty: 'Beginner',
  setup: [],
  execution: [],
  keyPoints: [],
  commonMistakes: [],
  applications: [],
};
const data = [technique];
const routes = [
  {
    label: 'stances',
    apiLabel: 'stance-definitions',
    Client: StancesClient,
    Loading: StancesLoading,
    columns: ['MuiGrid-grid-md-6'],
    panel: 'Stance Training Guidelines',
  },
  {
    label: 'blocks',
    apiLabel: 'blocks-definitions',
    Client: BlocksClient,
    Loading: BlocksLoading,
    columns: ['MuiGrid-grid-md-6'],
    panel: 'Blocking Training Guidelines',
  },
  {
    label: 'punches',
    apiLabel: 'punches-definitions',
    Client: PunchesClient,
    Loading: PunchesLoading,
    columns: ['MuiGrid-grid-md-6'],
    panel: 'Punching Training Guidelines',
  },
  {
    label: 'kicks',
    apiLabel: 'kicks-definitions',
    Client: KicksClient,
    Loading: KicksLoading,
    columns: ['MuiGrid-grid-md-6'],
    panel: 'Kicking Training Guidelines',
  },
  {
    label: 'forms',
    apiLabel: 'form-definitions',
    Client: FormsClient,
    Loading: FormsLoading,
    columns: ['MuiGrid-grid-md-6'],
    panel: 'Form Training Tips',
  },
  {
    label: 'one-step sparring',
    apiLabel: 'onestep-definitions',
    Client: OneStepsClient,
    Loading: OneStepsLoading,
    columns: ['MuiGrid-grid-lg-6'],
    panel: 'One-Step Sparring Training Guidelines',
  },
  {
    label: 'self-defense techniques',
    apiLabel: 'self-defense-definitions',
    Client: SelfDefenseClient,
    Loading: SelfDefenseLoading,
    columns: ['MuiGrid-grid-sm-6', 'MuiGrid-grid-lg-4'],
    panel: undefined,
  },
];

const deferredResponse = () => {
  let resolve!: (response: { data: typeof data }) => void;
  const promise = new Promise<{ data: typeof data }>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

let client: QueryClient;
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={client}>
    {children}
    <BackgroundRefreshIndicator />
  </QueryClientProvider>
);

beforeEach(() => {
  jest.mocked(axiosInstance).get.mockReset();
  jest.mocked(axiosInstance).get.mockResolvedValue({ data: [] });
  jest.mocked(useAuth).mockClear();
  client = new QueryClient({
    defaultOptions: {
      queries: { placeholderData: [], retry: false, retryDelay: 0, gcTime: Infinity },
    },
  });
});

afterEach(() => {
  cleanup();
  client.clear();
});

describe.each(routes)('$label loading', ({ label, apiLabel, Client, Loading, columns, panel }) => {
  const key = [apiLabel, 'getAll'];

  it('uses the real page frame without starting queries in the route fallback', () => {
    const { container } = render(<Loading />);
    const skeleton = screen.getByRole('status', { name: `Loading ${label}` });
    expect(skeleton).toHaveStyle({ minHeight: '100vh' });
    expect(skeleton.children).toHaveLength(6);
    expect(skeleton.children[0]).toHaveClass('MuiGrid-grid-xs-12', ...columns);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(container.querySelector('.MuiSkeleton-wave, .MuiSkeleton-pulse')).toBeNull();
    if (panel) {
      expect(skeleton.compareDocumentPosition(screen.getByText(panel))).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }
    expect(axiosInstance.get).not.toHaveBeenCalled();
    expect(useAuth).not.toHaveBeenCalled();
  });

  it('shows skeletons despite the provider placeholder, then replaces them without moving the heading', async () => {
    const request = deferredResponse();
    jest.mocked(axiosInstance).get.mockReturnValueOnce(request.promise);
    render(
      <Wrapper>
        <Client />
      </Wrapper>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(screen.getByRole('status', { name: `Loading ${label}` })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Refreshing content' })).not.toBeInTheDocument();
    expect(
      screen.queryByText('No techniques found matching your criteria')
    ).not.toBeInTheDocument();
    request.resolve({ data });
    expect(await screen.findByText('Cached technique')).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: `Loading ${label}` })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBe(heading);
  });

  it('shows fresh prefetched data immediately without skeletons or a refresh indicator', () => {
    client.setQueryData(key, data);
    render(
      <Wrapper>
        <Client />
      </Wrapper>
    );
    expect(screen.getByText('Cached technique')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(client.getQueryState(key)?.fetchStatus).toBe('idle');
  });

  it('keeps cached cards mounted while showing one nonblocking refresh indicator', async () => {
    client.setQueryData(key, data, { updatedAt: Date.now() - 120000 });
    const request = deferredResponse();
    jest.mocked(axiosInstance).get.mockReturnValueOnce(request.promise);
    render(
      <Wrapper>
        <Client />
      </Wrapper>
    );
    const card = screen.getByText('Cached technique');
    const indicator = await screen.findByRole('status', { name: 'Refreshing content' });
    expect(indicator).toHaveStyle({ position: 'fixed', pointerEvents: 'none' });
    expect(screen.queryByRole('status', { name: `Loading ${label}` })).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();
    request.resolve({ data });
    await waitFor(() =>
      expect(screen.queryByRole('status', { name: 'Refreshing content' })).not.toBeInTheDocument()
    );
    expect(screen.getByText('Cached technique')).toBe(card);
  });

  it('retains cached cards and reports an error when a background refresh fails', async () => {
    client.setQueryData(key, data, { updatedAt: Date.now() - 120000 });
    jest.mocked(axiosInstance).get.mockRejectedValue(new Error('Network unavailable'));
    render(
      <Wrapper>
        <Client />
      </Wrapper>
    );
    const card = screen.getByText('Cached technique');
    expect(await screen.findByText(/Unable to load/)).toBeInTheDocument();
    expect(screen.getByText('Cached technique')).toBe(card);
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

it('aggregates concurrent background requests into a single indicator until both complete', async () => {
  const first = deferredResponse();
  const second = deferredResponse();
  client.setQueryData(['first'], data);
  client.setQueryData(['second'], data);
  render(
    <Wrapper>
      <div>Existing content</div>
    </Wrapper>
  );
  act(() => {
    void client.fetchQuery({ queryKey: ['first'], queryFn: () => first.promise });
    void client.fetchQuery({ queryKey: ['second'], queryFn: () => second.promise });
  });
  expect(await screen.findAllByRole('status', { name: 'Refreshing content' })).toHaveLength(1);
  first.resolve({ data });
  await waitFor(() => expect(client.getQueryState(['first'])?.fetchStatus).toBe('idle'));
  expect(screen.getByRole('status', { name: 'Refreshing content' })).toBeInTheDocument();
  second.resolve({ data });
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  expect(screen.getByText('Existing content')).toBeInTheDocument();
});
