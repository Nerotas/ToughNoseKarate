'use client';
import { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fab,
} from '@mui/material';
import {
  IconArrowLeft,
  IconEdit,
  IconUser,
  IconCalendar,
  IconAward,
  IconUsers,
  IconTrophy,
  IconClipboardData,
  IconSettings,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import useGet from '../../../../hooks/useGet';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import { TestHistory } from '../../../../models/StudentTests/StudentTests';
import { BeltProgression } from '../../../../models/BeltProgression/BeltProgression';
import { beltProgressionService } from '../../../../services/beltProgressionService';
import EditCurrentBeltProgressForm, {
  BeltProgressionFormData,
} from '../../components/students/EditCurrentBeltProgressForm';
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

  // Fetch family data for child students
  const {
    data: family,
    isLoading: familyLoading,
    isFetching: familyFetching,
    error: familyError,
  } = useGet<Family[]>({
    apiLabel: 'families',
    url: `/families/student/${studentId}`,
    id: `family-${studentId}`,
    fallbackData: [],
  });

  // Fetch test history
  const {
    data: testHistory,
    isLoading: testHistoryLoading,
    error: testHistoryError,
  } = useGet<TestHistory>({
    apiLabel: 'student-tests',
    url: `/student-tests/student/${studentId}/history`,
    id: `test-history-${studentId}`,
    fallbackData: {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      averageScore: 0,
      tests: [],
    },
  });

  // Fetch belt progression data
  const {
    data: beltProgressions,
    isLoading: beltProgressionLoading,
    error: beltProgressionError,
    refetch: refetchBeltProgressions,
  } = useGet<BeltProgression[]>({
    apiLabel: 'belt-progression',
    url: `/belt-progression/student/${studentId}`,
    id: `belt-progressions-${studentId}`,
    fallbackData: [],
  });

  // Fetch current belt
  const {
    data: currentBelt,
    isLoading: currentBeltLoading,
    error: currentBeltError,
    refetch: refetchCurrentBelt,
  } = useGet<BeltProgression | null>({
    apiLabel: 'current-belt',
    url: `/belt-progression/student/${studentId}/current`,
    id: `current-belt-${studentId}`,
    fallbackData: null,
  });

  // Edit belt progression state
  const [editBeltProgressionOpen, setEditBeltProgressionOpen] = useState(false);
  const [savingBeltProgression, setSavingBeltProgression] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingProgression, setEditingProgression] = useState<BeltProgression | null>(null);

  const handleEditStudent = () => {
    // TODO: Open edit dialog or navigate to edit page
  };

  const handleCloseBeltProgressionEdit = () => {
    setEditBeltProgressionOpen(false);
  };

  // Belt progression handlers
  const handleCreateBeltProgression = () => {
    setIsCreateMode(true);
    setEditingProgression(null);
    setEditBeltProgressionOpen(true);
  };

  const handleEditBeltProgression = (progression?: BeltProgression) => {
    setIsCreateMode(false);
    setEditingProgression(progression || currentBelt || null);
    setEditBeltProgressionOpen(true);
  };

  const handleSaveBeltProgression = async (formData: BeltProgressionFormData) => {
    setSavingBeltProgression(true);
    try {
      if (isCreateMode) {
        // Create new belt progression
        await beltProgressionService.createProgression({
          studentid: parseInt(studentId),
          belt_rank: formData.belt_rank,
          promoted_date: formData.promoted_date,
          promoted_by: formData.promoted_by,
          is_current: formData.is_current ? 1 : 0,
          ceremony_date: formData.ceremony_date || undefined,
          belt_certificate_number: formData.belt_certificate_number || undefined,
          notes: formData.notes || undefined,
        });
      } else if (editingProgression) {
        // Update existing belt progression
        await beltProgressionService.updateProgression(editingProgression.progression_id, {
          belt_rank: formData.belt_rank,
          promoted_date: formData.promoted_date,
          promoted_by: formData.promoted_by,
          is_current: formData.is_current ? 1 : 0,
          ceremony_date: formData.ceremony_date || undefined,
          belt_certificate_number: formData.belt_certificate_number || undefined,
          notes: formData.notes || undefined,
        });
      }

      // Refresh data and close dialog
      await Promise.all([refetchBeltProgressions(), refetchCurrentBelt()]);
      setEditBeltProgressionOpen(false);
      setEditingProgression(null);
      setIsCreateMode(false);
    } catch (error) {
      console.error('Error saving belt progression:', error);
      // Show error in console for now - could add toast notification later
    } finally {
      setSavingBeltProgression(false);
    }
  };

  const handleDeleteBeltProgression = async (progressionId: number) => {
    if (!confirm('Are you sure you want to delete this belt progression entry?')) {
      return;
    }

    try {
      await beltProgressionService.deleteProgression(progressionId);
      await Promise.all([refetchBeltProgressions(), refetchCurrentBelt()]);
    } catch (error) {
      console.error('Error deleting belt progression:', error);
      // Show error in console for now - could add toast notification later
    }
  };

  const handleBackToStudents = () => {
    router.push('/students'); // or whatever your students route is
  };

  if (
    studentLoading ||
    beltRequirementsLoading ||
    studentFetching ||
    beltProgressionLoading ||
    currentBeltLoading ||
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

          {/* Belt Progression Management */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconTrophy size={20} />
                    <Box sx={{ ml: 1 }}>Belt Progression</Box>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='contained'
                      size='small'
                      startIcon={<IconPlus />}
                      onClick={handleCreateBeltProgression}
                    >
                      Add Belt
                    </Button>
                    {currentBelt && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<IconSettings />}
                        onClick={() => handleEditBeltProgression(currentBelt)}
                      >
                        Edit Current
                      </Button>
                    )}
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {(beltProgressionError || currentBeltError) && (
                  <Alert severity='error' sx={{ mb: 2 }}>
                    {beltProgressionError?.message ||
                      currentBeltError?.message ||
                      'Failed to load belt progression data'}
                  </Alert>
                )}

                {beltProgressionLoading || currentBeltLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : currentBelt ? (
                  <Box>
                    {/* Current Belt Information */}
                    <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 'bold' }}>
                      Current Belt
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                            Belt Rank
                          </Typography>
                          <Chip
                            label={currentBelt.belt_rank}
                            sx={{
                              backgroundColor: getBeltColor(
                                currentBelt.belt_rank,
                                beltRequirements || []
                              ),
                              color: getBeltTextColor(
                                currentBelt.belt_rank,
                                beltRequirements || []
                              ),
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              p: 2,
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box>
                          <Typography variant='body2' color='text.secondary'>
                            Promoted Date
                          </Typography>
                          <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                            {new Date(currentBelt.promoted_date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box>
                          <Typography variant='body2' color='text.secondary'>
                            Promoted By
                          </Typography>
                          <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                            {currentBelt.promoted_by || 'Not specified'}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box>
                          <Typography variant='body2' color='text.secondary'>
                            Time in Belt
                          </Typography>
                          <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                            {(() => {
                              const promoted = new Date(currentBelt.promoted_date);
                              const now = new Date();
                              const diffTime = Math.abs(now.getTime() - promoted.getTime());
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              return `${diffDays} days`;
                            })()}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Additional Details */}
                      {(currentBelt.ceremony_date ||
                        currentBelt.belt_certificate_number ||
                        currentBelt.notes) && (
                        <Grid size={{ xs: 12 }}>
                          <Divider sx={{ my: 2 }} />
                          <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
                            Additional Information
                          </Typography>
                          <Grid container spacing={2}>
                            {currentBelt.ceremony_date && (
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography variant='body2' color='text.secondary'>
                                  Ceremony Date
                                </Typography>
                                <Typography variant='body1'>
                                  {new Date(currentBelt.ceremony_date).toLocaleDateString()}
                                </Typography>
                              </Grid>
                            )}
                            {currentBelt.belt_certificate_number && (
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography variant='body2' color='text.secondary'>
                                  Certificate Number
                                </Typography>
                                <Typography variant='body1'>
                                  {currentBelt.belt_certificate_number}
                                </Typography>
                              </Grid>
                            )}
                            {currentBelt.notes && (
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography variant='body2' color='text.secondary'>
                                  Notes
                                </Typography>
                                <Typography variant='body1'>{currentBelt.notes}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </Grid>

                    {/* Belt History */}
                    {beltProgressions && beltProgressions.length > 1 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 'bold' }}>
                          Belt History
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Belt Rank</TableCell>
                                <TableCell>Promoted Date</TableCell>
                                <TableCell>Promoted By</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align='right'>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {beltProgressions?.map((progression) => (
                                <TableRow key={progression.progression_id}>
                                  <TableCell>
                                    <Chip
                                      size='small'
                                      label={progression.belt_rank}
                                      sx={{
                                        backgroundColor: getBeltColor(
                                          progression.belt_rank,
                                          beltRequirements || []
                                        ),
                                        color: getBeltTextColor(
                                          progression.belt_rank,
                                          beltRequirements || []
                                        ),
                                        fontWeight: 'bold',
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {new Date(progression.promoted_date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    {progression.promoted_by || 'Not specified'}
                                  </TableCell>
                                  <TableCell>
                                    {progression.is_current ? (
                                      <Chip size='small' label='Current' color='primary' />
                                    ) : (
                                      <Chip size='small' label='Historical' variant='outlined' />
                                    )}
                                  </TableCell>
                                  <TableCell align='right'>
                                    <Button
                                      size='small'
                                      startIcon={<IconEdit />}
                                      onClick={() => handleEditBeltProgression(progression)}
                                    >
                                      Edit
                                    </Button>
                                    {!progression.is_current && (
                                      <Button
                                        size='small'
                                        color='error'
                                        startIcon={<IconX />}
                                        onClick={() =>
                                          handleDeleteBeltProgression(progression.progression_id)
                                        }
                                        sx={{ ml: 1 }}
                                      >
                                        Delete
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                      No belt progression found for this student.
                    </Typography>
                    <Button
                      variant='contained'
                      startIcon={<IconPlus />}
                      onClick={handleCreateBeltProgression}
                    >
                      Add First Belt
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Test History */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <IconClipboardData size={20} />
                  <Box sx={{ ml: 1 }}>Test History</Box>
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {testHistoryLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : testHistoryError ? (
                  <Alert severity='error'>Failed to load test history</Alert>
                ) : testHistory && testHistory.tests.length > 0 ? (
                  <Box>
                    {/* Test Summary */}
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                        Test Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6, sm: 3 }}>
                          <Typography variant='h4' color='primary'>
                            {testHistory.totalTests}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Total Tests
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                          <Typography variant='h4' color='success.main'>
                            {testHistory.passedTests}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Passed Tests
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                          <Typography variant='h4' color='error.main'>
                            {testHistory.failedTests}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Failed Tests
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                          <Typography variant='h4' color='info.main'>
                            {testHistory.averageScore?.toFixed(1)}%
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Average Score
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Test Details */}
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                      Test History Details
                    </Typography>
                    <TableContainer component={Paper} variant='outlined'>
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Test Date</TableCell>
                            <TableCell>Belt From</TableCell>
                            <TableCell>Belt To</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Instructor</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {testHistory.tests.map((test) => (
                            <TableRow key={test.testid}>
                              <TableCell>{new Date(test.test_date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Chip
                                  label={test.belt_from}
                                  size='small'
                                  sx={{
                                    backgroundColor: getBeltColor(
                                      test.belt_from,
                                      beltRequirements || []
                                    ),
                                    color: getBeltTextColor(test.belt_from, beltRequirements || []),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={test.belt_to}
                                  size='small'
                                  sx={{
                                    backgroundColor: getBeltColor(
                                      test.belt_to,
                                      beltRequirements || []
                                    ),
                                    color: getBeltTextColor(test.belt_to, beltRequirements || []),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant='body2'
                                  color={
                                    test.overall_score && test.overall_score >= 70
                                      ? 'success.main'
                                      : 'error.main'
                                  }
                                >
                                  {test.overall_score?.toFixed(1)}%
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={test.passed ? 'Passed' : 'Failed'}
                                  color={test.passed ? 'success' : 'error'}
                                  size='small'
                                />
                              </TableCell>
                              <TableCell>{test.instructor_name || 'N/A'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  <Alert severity='info'>No test history found for this student.</Alert>
                )}
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

        {/* Edit Belt Progression Dialog */}
        <EditCurrentBeltProgressForm
          open={editBeltProgressionOpen}
          onClose={handleCloseBeltProgressionEdit}
          onSave={handleSaveBeltProgression}
          currentBelt={editingProgression || undefined}
          beltRequirements={beltRequirements || []}
          studentId={studentId}
          loading={savingBeltProgression}
        />
      </Box>
    </PageContainer>
  );
};

export default StudentDetailClient;
