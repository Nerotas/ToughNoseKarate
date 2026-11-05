import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Root loading fallback', () => {
  it('renders static card skeletons instead of a rotating icon or random message', () => {
    const { container } = render(<Loading />);
    const loading = screen.getByRole('status', { name: 'Loading page' });

    expect(loading).toHaveAttribute('aria-busy', 'true');
    expect(loading).toHaveStyle({ minHeight: '100vh' });
    expect(loading.children).toHaveLength(6);
    expect(container.querySelector('.MuiSkeleton-wave, .MuiSkeleton-pulse')).toBeNull();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
