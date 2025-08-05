import React from 'react';
import { Grid } from '@mui/material';
import StudentAssessmentForm from '../../../components/students/details/StudentAssessmentForm';
import { StudentAssessment } from '../../../../../models/Assessments/Assessments';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';

interface StudentAssessmentSectionProps {
  currentAssessment: StudentAssessment | null;
  beltRequirements: BeltRequirements[];
  assessmentLoading: boolean;
  assessmentError: any;
  savingAssessment: boolean;
  handleCreateAssessment: () => Promise<void>;
  handleCompleteAssessment: (passed: boolean, overallScore?: number) => Promise<void>;
  handleCancelAssessment: () => Promise<void>;
  onAssessmentUpdate: (assessment: StudentAssessment) => Promise<void>;
}

const StudentAssessmentSection: React.FC<StudentAssessmentSectionProps> = ({
  currentAssessment,
  beltRequirements,
  assessmentLoading,
  assessmentError,
  savingAssessment,
  handleCreateAssessment,
  handleCompleteAssessment,
  handleCancelAssessment,

  onAssessmentUpdate,
}) => {
  return (
    <StudentAssessmentForm
      currentAssessment={currentAssessment || null}
      beltRequirements={beltRequirements || []}
      assessmentLoading={assessmentLoading}
      assessmentError={assessmentError}
      savingAssessment={savingAssessment}
      handleCreateAssessment={handleCreateAssessment}
      handleCompleteAssessment={handleCompleteAssessment}
      handleCancelAssessment={handleCancelAssessment}
      onAssessmentUpdate={onAssessmentUpdate}
    />
  );
};

export default StudentAssessmentSection;
