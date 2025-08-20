import { QueryClient } from '@tanstack/react-query';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const mockStudent = {
  studentid: 1,
  firstName: 'John',
  lastName: 'Doe',
  preferredName: 'Johnny',
  age: 25,
  beltRank: 'White',
  email: 'john.doe@example.com',
  phone: '555-1234',
  active: true,
  eligibleForTesting: false,
  child: false,
  startDateUTC: '2023-01-01T00:00:00.000Z',
  endDateUTC: null,
  lastTestUTC: null,
  notes: 'Test notes',
};

export const mockBeltRequirement = {
  beltOrder: 1,
  beltRank: 'White',
  forms: ['Form 1'],
  stances: ['Stance 1'],
  blocks: ['Block 1'],
  punches: ['Punch 1'],
  kicks: ['Kick 1'],
  jumps: [],
  falling: [],
  oneSteps: [],
  selfDefense: [],
  comments: 'Test comments',
  color: '#FFFFFF',
  textColor: '#000000',
};

export const mockPunch = {
  id: 1,
  name: 'Center Punch',
  korean: 'Ga Un De Ji Ru Gi',
  belt: 'White',
  beltColor: '#FFFFFF',
  description: 'A direct, linear punch',
  target: 'Solar plexus',
  execution: ['Step 1', 'Step 2'],
  keyPoints: ['Point 1', 'Point 2'],
  commonMistakes: ['Mistake 1'],
  applications: ['Application 1'],
};

export const mockBlock = {
  id: 1,
  blockName: 'Low Block',
  technique: 'Downward sweeping block',
  stance: 'front',
  belt: 'White',
  beltColor: '#FFFFFF',
  execution: ['Step 1', 'Step 2'],
  keyPoints: ['Point 1', 'Point 2'],
  commonMistakes: ['Mistake 1'],
  applications: ['Application 1'],
};

export const mockKick = {
  id: 1,
  name: 'Front Kick',
  korean: 'Ap Cha Gi',
  belt: 'White',
  beltColor: '#FFFFFF',
  description: 'A direct forward kick',
  target: 'Solar plexus',
  execution: ['Step 1', 'Step 2'],
  keyPoints: ['Point 1', 'Point 2'],
  commonMistakes: ['Mistake 1'],
  applications: ['Application 1'],
};

export const mockForm = {
  id: 1,
  formName: 'Geocho Hyung Il Bu',
  belt: 'White',
  beltColor: '#FFFFFF',
  description: 'First basic form',
  movements: 18,
  executionSteps: ['Step 1', 'Step 2'],
  keyPoints: ['Point 1', 'Point 2'],
  commonMistakes: ['Mistake 1'],
  applications: ['Application 1'],
};

export const mockAssessment = {
  assessmentId: 1,
  studentId: 1,
  instructorId: 1,
  assessmentDate: new Date(),
  targetBeltRank: 'Yellow',
  certificateName: 'John Doe',
  beltSize: 'M',
  overallScore: 85.5,
  passed: true,
  examinerNotes: 'Good performance',
  assessmentStatus: 'completed' as const,
};
