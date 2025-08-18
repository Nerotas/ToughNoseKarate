import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { IconUser, IconAward } from '@tabler/icons-react';
import { Student } from 'models/Students/Students';

interface SummaryCardProps {
  students: Student[];
  showActiveOnly: boolean;
  allStudents: number;
}

const SummaryCard = ({ students, showActiveOnly, allStudents }: SummaryCardProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconUser size={24} />
              <Typography variant='h6' sx={{ ml: 1 }}>
                {showActiveOnly ? 'Active Students' : 'Inactive Students'}
              </Typography>
            </Box>
            <Typography variant='h3' color='primary'>
              {students.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconAward size={24} />
              <Typography variant='h6' sx={{ ml: 1 }}>
                Ready for Testing
              </Typography>
            </Box>
            <Typography variant='h3' color='success.main'>
              {students.filter((student) => student.eligibleForTesting).length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconUser size={24} />
              <Typography variant='h6' sx={{ ml: 1 }}>
                Total Students
              </Typography>
            </Box>
            <Typography variant='h3' color='info.main'>
              {allStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconAward size={24} />
              <Typography variant='h6' sx={{ ml: 1 }}>
                Children
              </Typography>
            </Box>
            <Typography variant='h3' color='warning.main'>
              {students.filter((student) => student.child).length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCard;
