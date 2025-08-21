import { render } from '@testing-library/react';
import Loader from '../../../../../app/(DashboardLayout)/components/shared/loader';

describe('Loader Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('displays the karate icon', () => {
    const { container } = render(<Loader />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('has correct icon size', () => {
    const { container } = render(<Loader />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('height', '48');
  });
});
