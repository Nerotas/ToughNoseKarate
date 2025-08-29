'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { IconArrowRight, IconAward } from '@tabler/icons-react';
import { useState } from 'react';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

// Student interface for API data
import { Student } from 'models/Students/Students';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { getBeltColor, getBeltTextColor, getNextBeltRank } from 'utils/helpers/Student';

interface PromoteStudentDialogProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  beltRequirements: BeltRequirements[];
  refetchStudents: () => Promise<void>;
}

const PromoteStudentDialog: React.FC<PromoteStudentDialogProps> = ({
  open,
  onClose,
  student,
  beltRequirements,
  refetchStudents,
}) => {
  const [isPromoting, setIsPromoting] = useState(false);

  if (!student) return null;

  const promoteStudent = async (student: Student) => {
    // Sort belt requirements by beltOrder to ensure correct progression
    const sortedBelts = (beltRequirements || []).slice().sort((a, b) => a.beltOrder - b.beltOrder);

    const currentIndex = sortedBelts.findIndex(
      (belt) => belt.beltRank.toLowerCase() === (student.beltRank ?? '').toLowerCase()
    );

    let nextBeltRank: string;
    if (currentIndex !== -1 && currentIndex < sortedBelts.length - 1) {
      nextBeltRank = sortedBelts[currentIndex + 1].beltRank;
    } else {
      nextBeltRank =
        currentIndex === -1
          ? sortedBelts[0]?.beltRank || student.beltRank || ''
          : sortedBelts[sortedBelts.length - 1].beltRank;
    }

    // Avoid sending same belt (no-op)
    if (nextBeltRank === student.beltRank) {
      console.info('No promotion needed (already highest or unknown).');
      return;
    }

    const id = student.studentid || null;
    if (id == null) {
      console.error('Cannot promote: missing studentid');
      return;
    }

    const res = await axiosInstance.patch(`/students/${id}`, {
      beltRank: nextBeltRank,
      lastTestUTC: new Date().toISOString(),
      eligibleForTesting: false,
    });

    if (!res.data?.updated) {
      console.warn('Promotion update reported not updated', res.data);
    }

    await refetchStudents();
  };

  const nextBeltRank = getNextBeltRank(student.beltRank, beltRequirements);
  const currentBeltColor = getBeltColor(student.beltRank, beltRequirements);
  const currentBeltTextColor = getBeltTextColor(student.beltRank, beltRequirements);
  const nextBeltColor = getBeltColor(nextBeltRank, beltRequirements);
  const nextBeltTextColor = getBeltTextColor(nextBeltRank, beltRequirements);
  const isAtHighestBelt = nextBeltRank === student.beltRank;

  const handleConfirm = async () => {
    if (isAtHighestBelt) return;

    setIsPromoting(true);
    try {
      await promoteStudent(student);
      onClose();
    } catch (error) {
      console.error('Error promoting student:', error);
    } finally {
      setIsPromoting(false);
    }
  };

  const studentName = student.preferredName || student.firstName;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconAward size={24} />
          <Typography variant='h6'>Promote Student</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant='body1' sx={{ mb: 2 }}>
            Are you sure you want to promote{' '}
            <strong>
              {studentName} {student.lastName}
            </strong>{' '}
            to the next belt rank?
          </Typography>

          {isAtHighestBelt ? (
            <Alert severity='info' sx={{ mb: 2 }}>
              This student is already at the highest belt rank and cannot be promoted further.
            </Alert>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  p: 3,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Current Belt
                  </Typography>
                  <Chip
                    label={`${student.beltRank} Belt`}
                    sx={{
                      backgroundColor: currentBeltColor,
                      color: currentBeltTextColor,
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      border: currentBeltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                    }}
                  />
                </Box>

                <IconArrowRight size={24} color='#666' />

                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mb: 1, display: 'block' }}
                  >
                    New Belt
                  </Typography>
                  <Chip
                    label={`${nextBeltRank} Belt`}
                    sx={{
                      backgroundColor: nextBeltColor,
                      color: nextBeltTextColor,
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      border: nextBeltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', p: 2, borderRadius: 1 }}>
                <Typography variant='body2'>
                  <strong>Test Date:</strong> {new Date().toLocaleDateString()}
                </Typography>
                <Typography variant='body2' sx={{ mt: 0.5 }}>
                  The promotion will be recorded with today's date as the test date.
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={isPromoting}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleConfirm}
          disabled={isPromoting || isAtHighestBelt}
          startIcon={isPromoting ? <CircularProgress size={16} /> : <IconAward size={16} />}
        >
          {isPromoting ? 'Promoting...' : 'Confirm Promotion'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromoteStudentDialog;
