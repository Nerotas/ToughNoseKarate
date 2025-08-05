import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { IconAward } from '@tabler/icons-react';
import { Student } from 'models/Students/Students';

const TrainingInformation: React.FC<{
  student: Student;
}> = ({ student }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconAward size={20} />
            <Box sx={{ ml: 1 }}>Training Information</Box>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Start Date
              </Typography>
              <Typography variant='body1'>
                {new Date(student.startDateUTC).toLocaleDateString()}
              </Typography>
            </Box>

            {student.endDateUTC && (
              <Box>
                <Typography variant='subtitle2' color='text.secondary'>
                  End Date
                </Typography>
                <Typography variant='body1'>
                  {new Date(student.endDateUTC).toLocaleDateString()}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Last Test Date
              </Typography>
              <Typography variant='body1'>
                {student.lastTestUTC
                  ? new Date(student.lastTestUTC).toLocaleDateString()
                  : 'No test recorded'}
              </Typography>
            </Box>

            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Current Belt Rank
              </Typography>
              <Typography variant='body1'>{student.beltRank}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrainingInformation;
