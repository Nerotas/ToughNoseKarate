import { Box, Grid, Typography, Chip } from '@mui/material';
import { IconUser, IconUsers } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { Student } from 'models/Students/Students';

interface StudentInformationProps {
  student: Student;
  beltColor: string;
  beltTextColor: string;
}

const StudentInformation = ({ student, beltColor, beltTextColor }: StudentInformationProps) => {
  const studentName = student.preferedName || student.firstName;

  return (
    <DashboardCard title='Student Information'>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconUser size={32} />
              <Box sx={{ ml: 2 }}>
                <Typography variant='h4'>
                  {studentName} {student.lastName}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Student ID: {student.studentid}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={student.active ? 'Active' : 'Inactive'}
                color={student.active ? 'success' : 'error'}
                variant={student.active ? 'filled' : 'outlined'}
              />
              <Chip
                label={student.child ? 'Child Student' : 'Adult Student'}
                color={student.child ? 'info' : 'default'}
                icon={student.child ? <IconUsers size={16} /> : undefined}
              />
              <Chip
                label={student.eligibleForTesting ? 'Ready for Testing' : 'Not Ready'}
                color={student.eligibleForTesting ? 'success' : 'default'}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6' sx={{ mb: 1 }}>
                Current Belt
              </Typography>
              <Chip
                label={`${student.beltRank} Belt`}
                sx={{
                  backgroundColor: beltColor,
                  color: beltTextColor,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  p: 2,
                  border: beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
};

export default StudentInformation;
