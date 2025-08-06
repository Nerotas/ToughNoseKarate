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
interface Student {
  studentid: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
  age?: number;
  beltRank: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active: number;
  child: number;
  lastTestUTC?: string;
  eligibleForTesting: number;
}

interface PromoteStudentDialogProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  beltRequirements: BeltRequirements[];
  onConfirm: (student: Student) => Promise<void>;
}

// Helper function to get belt color from belt requirements data
const getBeltColor = (beltRank: string, beltRequirements: BeltRequirements[]): string => {
  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.color || '#757575'; // Default grey if not found
};

// Helper function to get belt text color from belt requirements data
const getBeltTextColor = (beltRank: string, beltRequirements: BeltRequirements[]): string => {
  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.textColor || '#FFFFFF'; // Default white if not found
};

// Helper function to get next belt rank
const getNextBeltRank = (currentBelt: string, beltRequirements: BeltRequirements[]): string => {
  const sortedBelts = beltRequirements.sort((a, b) => a.beltOrder - b.beltOrder);
  const currentIndex = sortedBelts.findIndex(
    (belt) => belt.beltRank.toLowerCase() === currentBelt.toLowerCase()
  );

  if (currentIndex !== -1 && currentIndex < sortedBelts.length - 1) {
    return sortedBelts[currentIndex + 1].beltRank;
  }

  // If not found or is the highest belt, keep current belt
  return currentIndex === -1 ? 'Black Belt' : sortedBelts[sortedBelts.length - 1].beltRank;
};

const PromoteStudentDialog: React.FC<PromoteStudentDialogProps> = ({
  open,
  onClose,
  student,
  beltRequirements,
  onConfirm,
}) => {
  const [isPromoting, setIsPromoting] = useState(false);

  if (!student) return null;

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
      await onConfirm(student);
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
