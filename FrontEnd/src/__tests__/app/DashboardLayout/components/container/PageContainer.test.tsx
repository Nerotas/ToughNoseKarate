import { render, screen } from '@testing-library/react';
import PageContainer from '../../../../../app/(DashboardLayout)/components/container/PageContainer';

describe('PageContainer', () => {
  it('renders and updates page content', () => {
    const { rerender } = render(
      <PageContainer>
        <div>Initial content</div>
      </PageContainer>
    );
    expect(screen.getByText('Initial content')).toBeInTheDocument();

    rerender(
      <PageContainer>
        <div>Updated content</div>
      </PageContainer>
    );
    expect(screen.getByText('Updated content')).toBeInTheDocument();
  });

  it('leaves server-owned metadata unchanged', () => {
    document.title = 'Server route title';
    render(
      <PageContainer>
        <h1>Page content</h1>
      </PageContainer>
    );

    expect(document.title).toBe('Server route title');
    expect(document.querySelectorAll('title')).toHaveLength(1);
    expect(document.querySelector('meta[name="description"]')).not.toBeInTheDocument();
    document.title = '';
  });
});
