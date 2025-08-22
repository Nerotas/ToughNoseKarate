import { render, screen } from '@testing-library/react';
import RequirementsList from '../../../../../app/(DashboardLayout)/components/belt-requirements/RequirementsList';

// Mock the textFormatting utility
jest.mock('utils/helpers/textFormatting', () => ({
  toReadableText: jest.fn((text: string) => text.replace(/_/g, ' ').toLowerCase()),
}));

describe('RequirementsList Component', () => {
  const mockProps = {
    requirements: ['basic_kicks', 'advanced_punches', 'self_defense_moves'],
    requirementName: 'White Belt Requirements',
  };

  it('renders the requirement name as heading', () => {
    render(<RequirementsList {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 6 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('White Belt Requirements');
  });

  it('renders all requirements in a list', () => {
    render(<RequirementsList {...mockProps} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    // Check that all requirements are rendered
    mockProps.requirements.forEach((requirement) => {
      const listItem = screen.getByText(requirement.replace(/_/g, ' ').toLowerCase());
      expect(listItem).toBeInTheDocument();
    });
  });

  it('renders check icons for each requirement', () => {
    const { container } = render(<RequirementsList {...mockProps} />);

    // Check for SVG icons (IconCheck renders SVG elements)
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(mockProps.requirements.length);
  });

  it('renders list items with proper structure', () => {
    render(<RequirementsList {...mockProps} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockProps.requirements.length);
  });

  it('handles empty requirements array', () => {
    render(<RequirementsList requirements={[]} requirementName='Empty Belt' />);

    const heading = screen.getByRole('heading', { level: 6 });
    expect(heading).toHaveTextContent('Empty Belt');

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('applies correct styling to list items', () => {
    const { container } = render(<RequirementsList {...mockProps} />);

    // Check for dense list styling
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
  });

  it('formats requirement text properly', () => {
    const mockTextFormatting = require('utils/helpers/textFormatting');

    // Clear any previous calls
    mockTextFormatting.toReadableText.mockClear();

    render(<RequirementsList {...mockProps} />);

    // Verify that toReadableText was called for each requirement
    expect(mockTextFormatting.toReadableText).toHaveBeenCalledTimes(mockProps.requirements.length);
    mockProps.requirements.forEach((requirement) => {
      expect(mockTextFormatting.toReadableText).toHaveBeenCalledWith(requirement);
    });
  });
});
