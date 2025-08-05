import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import StudentAssessmentForm from '../../../components/students/details/StudentAssessmentForm';
import { StudentAssessment } from '../../../../../models/Assessments/Assessments';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';

interface AssessmentDialogProps {
  open: boolean;
  onClose: () => void;
  editingAssessment: StudentAssessment | null;
  beltRequirements: BeltRequirements[];
  assessmentLoading: boolean;
  assessmentError: any;
  savingAssessment: boolean;
  handleCreateAssessment: () => Promise<void>;
  handleCompleteAssessment: (passed: boolean, overallScore?: number) => Promise<void>;
  handleCancelAssessment: () => Promise<void>;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({
  open,
  onClose,
  editingAssessment,
  beltRequirements,
  assessmentLoading,
  assessmentError,
  savingAssessment,
  handleCreateAssessment,
  handleCompleteAssessment,
  handleCancelAssessment,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogTitle>
        {editingAssessment ? 'Edit Assessment' : 'Create Assessment'}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <IconX />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {open && (
          <StudentAssessmentForm
            currentAssessment={editingAssessment}
            beltRequirements={beltRequirements}
            assessmentLoading={assessmentLoading}
            assessmentError={assessmentError}
            savingAssessment={savingAssessment}
            handleCreateAssessment={handleCreateAssessment}
            handleCompleteAssessment={handleCompleteAssessment}
            handleCancelAssessment={handleCancelAssessment}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentDialog;
