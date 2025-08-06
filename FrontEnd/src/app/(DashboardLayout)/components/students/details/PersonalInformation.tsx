import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { IconUser } from '@tabler/icons-react';
import { Student } from 'models/Students/Students';

const PersonalInformation = ({ student }: { student: Student }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconUser size={20} />
            <Box sx={{ ml: 1 }}>Personal Information</Box>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Full Name
              </Typography>
              <Typography variant='body1'>
                {student.firstName} {student.lastName}
              </Typography>
            </Box>

            {student.preferredName && (
              <Box>
                <Typography variant='subtitle2' color='text.secondary'>
                  Preferred Name
                </Typography>
                <Typography variant='body1'>{student.preferredName}</Typography>
              </Box>
            )}

            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Age
              </Typography>
              <Typography variant='body1'>{student.age || 'Not specified'}</Typography>
            </Box>

            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                Email
              </Typography>
              <Typography variant='body1'>{student.email}</Typography>
            </Box>

            {student.phone && (
              <Box>
                <Typography variant='subtitle2' color='text.secondary'>
                  Phone
                </Typography>
                <Typography variant='body1'>{student.phone}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PersonalInformation;
