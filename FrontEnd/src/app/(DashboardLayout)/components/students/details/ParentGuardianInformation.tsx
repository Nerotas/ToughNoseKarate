import { Grid, Card, CardContent, Typography, Box, Divider, Alert } from '@mui/material';
import { IconUsers } from '@tabler/icons-react';
import Loading from 'app/loading';
import { Family, Student } from 'models/Students/Students';

interface ParentGuardianInformationProps {
  student: Student;
  studentId: string;
  family: Family[];
  familyLoading: boolean;
  familyFetching: boolean;
  familyError: any;
}

const ParentGuardianInformation: React.FC<ParentGuardianInformationProps> = ({
  student,
  studentId,
  family,
  familyLoading,
  familyFetching,
  familyError,
}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconUsers size={20} />
            <Box sx={{ ml: 1 }}>Parent/Guardian Information</Box>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {familyError && (
            <Alert severity='warning' sx={{ mb: 2 }}>
              Unable to load parent/guardian information. Error:{' '}
              {familyError.message || 'Server error'}
            </Alert>
          )}

          {(familyLoading || familyFetching) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <Loading />
            </Box>
          )}

          {!familyLoading && !familyFetching && family && family.length > 0 ? (
            <Grid container spacing={2}>
              {family
                .filter((f: Family) => f.studentid === parseInt(studentId)) // Filter by current student ID
                .filter((f: Family) => f.parentFirstName && f.parentLastName) // Only show entries with parent data
                .map((f: Family, index: number) => (
                  <Grid size={{ xs: 12, md: 6 }} key={f.parentid || index}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
                        {f.parentFirstName} {f.parentLastName}
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant='body2' color='text.secondary'>
                          <strong>Parent ID:</strong> {f.parentid || 'Not specified'}
                        </Typography>
                        {/* Note: The families view doesn't contain parent contact info, only student contact info */}
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ fontStyle: 'italic' }}
                        >
                          Contact information is managed separately from parent records.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          ) : student.child && !familyLoading && !familyFetching ? (
            <Alert severity='info'>No parent/guardian information found for this student.</Alert>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ParentGuardianInformation;
