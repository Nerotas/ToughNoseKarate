import {
  getInitialValues,
  getTargetBeltRequirements,
  getBeltColor,
  getBeltTextColor,
  getNextBeltRank,
  getEditStudentInitialValues,
} from '../Student';
import { StudentAssessment } from '../../../models/Assessments/Assessments';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';
import { mockStudents } from 'testingUtils/MockData/mockStudents';

describe('Student helpers', () => {
  const mockAssessment: StudentAssessment = {
    assessment_id: 1,
    student_id: 1,
    target_belt_rank: 'Gold White', // Specify the target belt rank
    assessment_date: '2023-01-01',
    assessment_status: 'completed',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    overall_score: 8,
    passed: true,
    geocho_hyung_il_bu: 1,
    geocho_hyung_il_bu_sahm_gup: 2, // Use non-zero value so it doesn't become null
    geocho_hyung_yi_bu: undefined,
    geocho_hyung_yi_bu_sahm_gup: undefined,
    geocho_hyung_sahm_bu: undefined,
    pyong_an_cho_dan: undefined,
    pyong_an_yi_dan: undefined,
    pyong_an_sahm_dan: undefined,
    pyong_an_sa_dan: undefined,
    pyong_an_oh_dan: undefined,
    bassai: undefined,
    traditional_1: undefined,
    traditional_2: undefined,
    traditional_3: undefined,
    traditional_4: undefined,
    made_up_1: undefined,
    made_up_2: undefined,
    made_up_3: undefined,
    made_up_4: undefined,
    three_steps_1: undefined,
    three_steps_2: undefined,
    three_steps_3: undefined,
    three_steps_4: undefined,
    front_kick: 3,
    side_kick: 2, // Use non-zero value so it doesn't become null
    roundhouse_kick: undefined,
    back_kick: undefined,
  };

  describe('getInitialValues', () => {
    it('should return default values when assessment is null', () => {
      const result = getInitialValues(null);

      expect(result.assessment_date).toBe(new Date().toISOString().split('T')[0]);
      expect(result.target_belt_rank).toBe('');
      expect(result.geocho_hyung_il_bu).toBeNull();
      expect(result.front_kick).toBeNull();
      expect(result.pyong_an_cho_dan).toBeNull();
    });

    it('should return assessment values when assessment is provided', () => {
      const result = getInitialValues(mockAssessment);

      expect(result.target_belt_rank).toBe('Gold White');
      expect(result.geocho_hyung_il_bu).toBe(1);
      expect(result.geocho_hyung_il_bu_sahm_gup).toBe(2);
      expect(result.front_kick).toBe(3);
      expect(result.side_kick).toBe(2);
      expect(result.roundhouse_kick).toBeNull();
    });

    it('should format assessment_date correctly when assessment is provided', () => {
      const result = getInitialValues(mockAssessment);

      expect(result.assessment_date).toBe('2023-01-01');
    });
  });

  describe('getTargetBeltRequirements', () => {
    it('should return correct belt requirements for existing belt rank', () => {
      const result = getTargetBeltRequirements('Gold White', mockBeltRequirements);

      expect(result).toEqual(mockBeltRequirements[1]);
      expect(result?.beltRank).toBe('Gold White');
      expect(result?.color).toBe('#FFD700');
    });

    it('should return null for non-existing belt rank', () => {
      const result = getTargetBeltRequirements('Purple', mockBeltRequirements);

      expect(result).toBeNull();
    });

    it('should handle case-insensitive belt rank matching', () => {
      const result = getTargetBeltRequirements('gold white', mockBeltRequirements);

      expect(result).toEqual(mockBeltRequirements[1]);
    });

    it('should handle empty belt rank', () => {
      const result = getTargetBeltRequirements('', mockBeltRequirements);

      expect(result).toBeNull();
    });

    it('should handle empty belt requirements array', () => {
      const result = getTargetBeltRequirements('Gold White', []);

      expect(result).toBeNull();
    });
  });

  describe('getBeltColor', () => {
    it('should return correct color for existing belt rank', () => {
      const result = getBeltColor('White');

      expect(result).toBe('#FFFFFF');
    });

    it('should return default grey color for non-existing belt rank', () => {
      const result = getBeltColor('Silver');

      expect(result).toBe('#757575');
    });

    it('should handle case-insensitive belt rank matching', () => {
      const result = getBeltColor('gold');

      expect(result).toBe('#FFD700');
    });

    it('should return default color for empty belt rank', () => {
      const result = getBeltColor('');

      expect(result).toBe('#757575');
    });
  });

  describe('getBeltTextColor', () => {
    it('should return correct text color for existing belt rank', () => {
      const result = getBeltTextColor('1st Black');

      expect(result).toBe('#FFFFFF');
    });

    it('should return default white text color for non-existing belt rank', () => {
      const result = getBeltTextColor('Silver');

      expect(result).toBe('#FFFFFF');
    });

    it('should handle case-insensitive belt rank matching', () => {
      const result = getBeltTextColor('white');

      expect(result).toBe('#000000');
    });

    it('should return default text color for empty belt rank', () => {
      const result = getBeltTextColor('');

      expect(result).toBe('#FFFFFF');
    });
  });

  describe('getNextBeltRank', () => {
    it('should return next belt rank in sequence', () => {
      const result = getNextBeltRank('White');

      expect(result).toBe('Gold White');
    });

    it('should return next belt rank for middle ranks', () => {
      const result = getNextBeltRank('Gold White');

      expect(result).toBe('Gold');
    });

    it('should return highest belt rank for highest belt rank', () => {
      const result = getNextBeltRank('1st Black');

      expect(result).toBe('1st Black');
    });

    it('should handle case-insensitive belt rank matching', () => {
      const result = getNextBeltRank('white');

      expect(result).toBe('Gold White');
    });

    it('should return highest belt rank for non-existing belt rank', () => {
      const result = getNextBeltRank('Silver');

      expect(result).toBe('1st Black');
    });

    it('should return highest belt rank for empty belt rank', () => {
      const result = getNextBeltRank('');

      expect(result).toBe('1st Black');
    });
  });

  describe('getEditStudentInitialValues', () => {
    it('should return correct form data when student is provided', () => {
      const result = getEditStudentInitialValues(mockStudents[0]);

      expect(result.firstName).toBe('Jacob');
      expect(result.lastName).toBe('Smith');
      expect(result.email).toBe('nerotas7@gmail.com');
      expect(result.phone).toBe('661-305-9259');
      expect(result.beltRank).toBe('Green'); // Use the actual belt rank from mockStudents[0]
    });

    it('should return default values when student is null', () => {
      const result = getEditStudentInitialValues(null);

      expect(result.firstName).toBe('');
      expect(result.lastName).toBe('');
      expect(result.email).toBe('');
      expect(result.phone).toBe('');
      expect(result.beltRank).toBe('white');
    });

    it('should format lastTestUTC correctly when student is provided', () => {
      const studentWithLastTest = {
        ...mockStudents[0],
        lastTestUTC: '2023-12-25T10:00:00Z',
      };

      const result = getEditStudentInitialValues(studentWithLastTest);

      expect(result.lastTestUTC).toBe('2023-12-25');
    });

    it('should handle student with null lastTestUTC', () => {
      const studentWithNullLastTest = {
        ...mockStudents[0],
        lastTestUTC: null as any,
      };

      const result = getEditStudentInitialValues(studentWithNullLastTest);

      expect(result.lastTestUTC).toBe(new Date().toISOString().split('T')[0]);
    });

    it('should handle student with missing properties gracefully', () => {
      const partialStudent = {
        studentid: 1,
        firstName: 'Jane',
        lastName: 'Smith',
      } as any;

      const result = getEditStudentInitialValues(partialStudent);

      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Smith');
      expect(result.email).toBe('');
      expect(result.phone).toBe('');
      expect(result.beltRank).toBe('white');
    });
  });
});
