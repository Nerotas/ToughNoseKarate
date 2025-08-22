import { render, screen } from '@testing-library/react';
import PageContainer from '../../../../../app/(DashboardLayout)/components/container/PageContainer';

describe('PageContainer Component', () => {
  const mockProps = {
    title: 'Test Page',
    description: 'Test description',
    children: <div data-testid='test-child'>Test Content</div>,
  };

  it('renders with title and description', () => {
    render(<PageContainer {...mockProps} />);

    // Check if the title is set
    expect(document.title).toBe('Test Page');

    // Check if meta description is set
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Test description');
  });

  it('renders children content', () => {
    render(<PageContainer {...mockProps} />);

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });

  it('renders without title and description', () => {
    render(
      <PageContainer>
        <div data-testid='test-child'>Test Content</div>
      </PageContainer>
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
  });

  it('updates title when prop changes', () => {
    const { rerender } = render(
      <PageContainer title='Initial Title'>
        <div>Content</div>
      </PageContainer>
    );

    expect(document.title).toBe('Initial Title');

    rerender(
      <PageContainer title='Updated Title'>
        <div>Content</div>
      </PageContainer>
    );

    expect(document.title).toBe('Updated Title');
  });

  it('updates meta description when prop changes', () => {
    const { rerender } = render(
      <PageContainer description='Initial description'>
        <div>Content</div>
      </PageContainer>
    );

    let metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Initial description');

    rerender(
      <PageContainer description='Updated description'>
        <div>Content</div>
      </PageContainer>
    );

    metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Updated description');
  });
});
