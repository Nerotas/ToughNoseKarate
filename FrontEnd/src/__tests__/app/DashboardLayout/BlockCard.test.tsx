import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlockCard from '../../components/blocks/blockCard';
import React from 'react';

jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = require('../../../../hooks/useAuth').useAuth;

const baseBlock = {
  id: 1,
  blockName: 'High Block',
  technique: 'Upper Defense',
  belt: 'White',
  beltColor: '#FFFFFF',
  stance: 'Front Stance',
  execution: ['Raise arm', 'Rotate wrist'],
  keyPoints: ['Keep elbow in', 'Strong stance'],
  commonMistakes: ['Dropping elbow', 'Leaning forward'],
  applications: ['Deflect punch', 'Create opening'],
};

const getBeltTextColor = (color: string) => (color === '#FFFFFF' ? '#000000' : '#FFFFFF');

const refetchBlocks = jest.fn().mockResolvedValue(undefined);

describe('BlockCard', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders full block data', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, instructor: { role: 'admin' } });
    render(
      <BlockCard
        block={baseBlock as any}
        getBeltTextColor={getBeltTextColor}
        refetchBlocks={refetchBlocks}
      />
    );

    expect(screen.getByText('High Block')).toBeInTheDocument();
    expect(screen.getByText('Upper Defense')).toBeInTheDocument();
    expect(screen.getByText('Front Stance')).toBeInTheDocument();
    expect(screen.getByText('1. Raise arm')).toBeInTheDocument();
    expect(screen.getByText('2. Rotate wrist')).toBeInTheDocument();
    expect(screen.getByText('• Keep elbow in')).toBeInTheDocument();
    expect(screen.getByText('• Dropping elbow')).toBeInTheDocument();
    expect(screen.getByText('Deflect punch')).toBeInTheDocument();
    expect(screen.getByText('Create opening')).toBeInTheDocument();
  });

  it('shows edit and delete chips for authenticated instructor', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, instructor: { role: 'admin' } });
    render(
      <BlockCard
        block={baseBlock as any}
        getBeltTextColor={getBeltTextColor}
        refetchBlocks={refetchBlocks}
      />
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('hides edit/delete when not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, instructor: null });
    render(
      <BlockCard
        block={baseBlock as any}
        getBeltTextColor={getBeltTextColor}
        refetchBlocks={refetchBlocks}
      />
    );
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('opens edit dialog when Edit is clicked', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, instructor: { role: 'admin' } });
    render(
      <BlockCard
        block={baseBlock as any}
        getBeltTextColor={getBeltTextColor}
        refetchBlocks={refetchBlocks}
      />
    );
    fireEvent.click(screen.getByText('Edit'));
    // Dialog title from BlockEditModule
    expect(screen.getByText('Edit Block')).toBeInTheDocument();
  });
});
