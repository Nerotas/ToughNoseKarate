import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../loading';

// Mock the randomSnippet to make test deterministic
jest.mock('constants/data/LoadingSnippets', () => ({
  randomSnippet: () => 'Loading snippet',
}));

describe('Loading component', () => {
  it('renders icon and snippet', () => {
    render(<Loading />);
    expect(screen.getByText('Loading snippet')).toBeInTheDocument();
  });
});
