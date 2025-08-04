'use client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import {
  IconArrowLeft,
  IconEdit,
  IconUser,
  IconCalendar,
  IconAward,
  IconUsers,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import useGet from '../../../../hooks/useGet';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import Loading from 'app/loading';

// Student interface for API data
interface Student {
  studentid: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
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

// Family/Parent interface for API data (based on the updated families VIEW)
interface Family {
  parentid?: number;
  studentid?: number;
  firstName: string; // Student first name
  lastName: string; // Student last name
  preferedName?: string; // Student preferred name
  parentFirstName?: string;
  parentLastName?: string;
  age?: number; // Student age
  beltRank?: string; // Student belt rank (updated field name)
  startDate: string; // Updated field name
  endDate?: string; // Updated field name
  lastTest?: string; // Updated field name
  email: string; // Student email
  phone?: string; // Student phone
  notes?: string; // Student notes
  active?: number; // Student active status
  eligibleForTesting?: number; // Student eligibility for testing
}

interface StudentDetailClientProps {
  studentId: string;
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

const StudentDetailClient: React.FC<StudentDetailClientProps> = ({ studentId }) => {
  const router = useRouter();

  // Fetch belt requirements for colors
  const {
    data: beltRequirements,
    isLoading: beltRequirementsLoading,
    error: beltRequirementsError,
  } = useGet<BeltRequirements[]>({
    apiLabel: 'belt-requirements',
    url: '/belt-Requirements',
    id: 'getAll',
    fallbackData: [],
    options: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Fetch specific student data
  const {
    data: student,
    isLoading: studentLoading,
    isFetching: studentFetching,
    error: studentError,
    isError: studentIsError,
  } = useGet<Student>({
    apiLabel: 'students',
    url: `/students/${studentId}`,
    id: `student-${studentId}`,
    fallbackData: undefined,
    options: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Fetch family/parent data if student is a child
  const {
    data: familyData,
    isLoading: familyLoading,
    isFetching: familyFetching,
    error: familyError,
    isError: familyIsError,
  } = useGet<Family[]>({
    apiLabel: 'families',
    url: `/families/student/${studentId}`,
    id: `family-student-${studentId}`,
    fallbackData: [],
    options: {
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: !!student && student.child === 1, // Only fetch if student is a child
    },
  });

  const handleBackToStudents = () => {
    router.push('/students');
  };

  const handleEditStudent = () => {
    // TODO: Open edit dialog or navigate to edit page
    console.log('Edit student:', studentId);
  };

  if (
    studentLoading ||
    beltRequirementsLoading ||
    studentFetching ||
    (student?.child === 1 && (familyLoading || familyFetching))
  ) {
    return (
      <PageContainer title='Student Details' description='View student information and progress'>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Loading />
        </Box>
      </PageContainer>
    );
  }

  if (studentIsError || !student) {
    return (
      <PageContainer title='Student Details' description='View student information and progress'>
        <Box>
          <Alert severity='error' sx={{ mb: 3 }}>
            {studentError ? 'Error loading student data.' : 'Student not found.'}
          </Alert>
          <Button startIcon={<IconArrowLeft />} onClick={handleBackToStudents}>
            Back to Students
          </Button>
        </Box>
      </PageContainer>
    );
  }

  const studentName = student.preferedName || student.firstName;
  const beltColor = getBeltColor(student.beltRank, beltRequirements || []);
  const beltTextColor = getBeltTextColor(student.beltRank, beltRequirements || []);

  // Debug logging for family data
  console.log('Student data:', student);
  console.log('Student ID from URL:', studentId);
  console.log('Is child:', student.child === 1);
  console.log('Family data:', familyData);
  console.log('Family loading:', familyLoading);
  console.log('Family error:', familyError);
  console.log(
    'Filtered family data:',
    familyData?.filter((f) => f.studentid === parseInt(studentId))
  );

  return (
    <PageContainer title='Student Details' description='View student information and progress'>
      <Box>
        {beltRequirementsError && (
          <Alert severity='warning' sx={{ mb: 3 }}>
            Unable to load belt requirements. Some features may not work correctly.
          </Alert>
        )}

        {/* Header with back button and edit */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Button startIcon={<IconArrowLeft />} onClick={handleBackToStudents}>
            Back to Students
          </Button>
          <Button variant='contained' startIcon={<IconEdit />} onClick={handleEditStudent}>
            Edit Student
          </Button>
        </Box>

        {/* Student Header Card */}
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

        {/* Student Details Grid */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Personal Information */}
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

                  {student.preferedName && (
                    <Box>
                      <Typography variant='subtitle2' color='text.secondary'>
                        Preferred Name
                      </Typography>
                      <Typography variant='body1'>{student.preferedName}</Typography>
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

          {/* Training Information */}
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

          {/* Parent/Guardian Information - Only show for child students */}
          {student.child === 1 && (
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

                  {familyIsError && (
                    <Alert severity='error' sx={{ mb: 2 }}>
                      Server error when loading family data. The families view may need to be
                      updated in the database.
                    </Alert>
                  )}

                  {(familyLoading || familyFetching) && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                      <Loading />
                    </Box>
                  )}

                  {!familyLoading && !familyFetching && familyData && familyData.length > 0 ? (
                    <Grid container spacing={2}>
                      {familyData
                        .filter((family) => family.studentid === parseInt(studentId)) // Filter by current student ID
                        .filter((family) => family.parentFirstName && family.parentLastName) // Only show entries with parent data
                        .map((family, index) => (
                          <Grid size={{ xs: 12, md: 6 }} key={family.parentid || index}>
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
                                {family.parentFirstName} {family.parentLastName}
                              </Typography>

                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography variant='body2' color='text.secondary'>
                                  <strong>Parent ID:</strong> {family.parentid || 'Not specified'}
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
                  ) : student.child === 1 && !familyLoading && !familyFetching ? (
                    <Alert severity='info'>
                      No parent/guardian information found for this student.
                    </Alert>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Notes */}
          {student.notes && (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Notes
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant='body1'>{student.notes}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default StudentDetailClient;
