import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardCard from '../../../../app/(DashboardLayout)/components/shared/DashboardCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('DashboardCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <DashboardCard />
      </TestWrapper>
    );
    expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const title = 'Test Dashboard Card';
    render(
      <TestWrapper>
        <DashboardCard title={title} />
      </TestWrapper>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    const subtitle = 'Test subtitle';
    render(
      <TestWrapper>
        <DashboardCard title='Test Title' subtitle={subtitle} />
      </TestWrapper>
    );
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('renders children content', () => {
    const testContent = 'Test content';
    render(
      <DashboardCard>
        <div>{testContent}</div>
      </DashboardCard>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders action element when provided', () => {
    const actionText = 'Action Button';
    render(<DashboardCard action={<button>{actionText}</button>} title='Test' />);
    expect(screen.getByText(actionText)).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    const footerText = 'Footer content';
    render(<DashboardCard footer={<div>{footerText}</div>} title='Test' />);
    expect(screen.getByText(footerText)).toBeInTheDocument();
  });

  it('renders cardheading when provided', () => {
    const cardheading = 'Card Heading';
    render(
      <TestWrapper>
        <DashboardCard cardheading={cardheading} headtitle={cardheading} />
      </TestWrapper>
    );
    expect(screen.getByText(cardheading)).toBeInTheDocument();
  });

  it('renders headtitle and headsubtitle when provided', () => {
    const headtitle = 'Head Title';
    const headsubtitle = 'Head Subtitle';
    render(
      <TestWrapper>
        <DashboardCard cardheading='something' headtitle={headtitle} headsubtitle={headsubtitle} />
      </TestWrapper>
    );
    expect(screen.getByText(headtitle)).toBeInTheDocument();
    expect(screen.getByText(headsubtitle)).toBeInTheDocument();
  });

  it('renders middlecontent when provided', () => {
    const middlecontent = 'Middle content';
    render(<DashboardCard middlecontent={middlecontent} />);
    expect(screen.getByText(middlecontent)).toBeInTheDocument();
  });

  it('applies correct elevation prop', () => {
    const { container } = render(
      <TestWrapper>
        <DashboardCard title='Test' />
      </TestWrapper>
    );
    const card = container.querySelector('.MuiCard-root');
    expect(card).toHaveClass('MuiPaper-elevation9');
  });
});
