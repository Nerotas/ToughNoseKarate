import { render, screen } from '@testing-library/react';

// Simple test to verify the testing setup works
describe('Simple Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should render a simple component', () => {
    const TestComponent = () => <div data-testid='test-component'>Hello Test</div>;

    render(<TestComponent />);

    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });

  it('should handle string operations', () => {
    const testString = 'Hello World';
    expect(testString.toLowerCase()).toBe('hello world');
    expect(testString.includes('World')).toBe(true);
  });

  it('should handle array operations', () => {
    const testArray = [1, 2, 3, 4, 5];
    expect(testArray.length).toBe(5);
    expect(testArray.includes(3)).toBe(true);
    expect(testArray.filter((x) => x > 3)).toEqual([4, 5]);
  });

  it('should handle object operations', () => {
    const testObject = {
      name: 'Test User',
      age: 25,
      active: true,
    };

    expect(testObject.name).toBe('Test User');
    expect(testObject.age).toBeGreaterThan(20);
    expect(testObject.active).toBe(true);
  });

  it('should handle async operations', async () => {
    const asyncFunction = () => Promise.resolve('Success');
    const result = await asyncFunction();
    expect(result).toBe('Success');
  });
});
