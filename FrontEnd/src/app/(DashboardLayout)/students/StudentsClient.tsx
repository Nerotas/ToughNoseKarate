'use client';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconUser, IconAward, IconEdit, IconEye, IconPlus, IconArrowUp } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import useGet from '../../../hooks/useGet';
import { BeltRequirements } from '../../../models/BeltRequirements/BeltRequirements';
import { useState } from 'react';
import Loading from 'app/loading';
import AddStudentModule from '../components/students/AddStudentModule';
import EditStudentModule from '../components/students/EditStudentModule';
import PromoteStudentDialog from '../components/students/PromoteStudentDialog';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { Student, StudentDisplay } from 'models/Students/Students';

// Import Student interface from shared models

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

// Helper function to get promoted student with next belt and today's test date

const StudentsClient = () => {
  const router = useRouter();

  // State for toggling between active and inactive students
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  // State for Add Student dialog
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  // State for Edit Student dialog
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentDisplay | null>(null);

  // State for Promote Student dialog
  const [promoteStudentOpen, setPromoteStudentOpen] = useState(false);
  const [studentToPromote, setStudentToPromote] = useState<StudentDisplay | null>(null);

  // Fetch belt requirements for colors and progression
  const {
    data: beltRequirements,
    isLoading: beltRequirementsLoading,
    isFetching: beltRequirementsFetching,
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

  // Use the new useGet hook to fetch students from API
  const {
    data: apiStudents,
    isLoading,
    isFetching,
    error,
    isError,
    refetch: refetchStudents,
  } = useGet<Student[]>({
    apiLabel: 'students',
    url: '/students',
    id: 'getAll',
    fallbackData: [],
    options: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  const promoteStudent = async (student: Student) => {
    // Sort belt requirements by beltOrder to ensure correct progression
    const sortedBelts = (beltRequirements || []).sort((a, b) => a.beltOrder - b.beltOrder);

    const currentIndex = sortedBelts.findIndex(
      (belt) => belt.beltRank.toLowerCase() === (student.beltRank ?? '').toLowerCase()
    );

    let nextBeltRank: string;
    if (currentIndex !== -1 && currentIndex < sortedBelts.length - 1) {
      nextBeltRank = sortedBelts[currentIndex + 1].beltRank;
    } else {
      // If not found or is the highest belt, keep current belt
      nextBeltRank =
        currentIndex === -1 ? 'Black Belt' : sortedBelts[sortedBelts.length - 1].beltRank;
    }

    await axiosInstance.patch(`/students/${student.studentid}`, {
      firstName: student.firstName,
      lastName: student.lastName,
      preferredName: student.preferredName,
      age: student.age,
      beltRank: nextBeltRank,
      lastTestUTC: new Date().toISOString(),
      active: student.active,
      child: student.child,
      eligibleForTesting: student.eligibleForTesting,
    });

    refetchStudents();
  };

  // Function to transform API student data to display format
  const transformStudent = (student: Student): StudentDisplay => {
    return new StudentDisplay({
      ...student,
      id: student.studentid ?? 0,
      name: `${student.preferredName || student.firstName} ${student.lastName}`,
      currentBelt: `${student.beltRank} Belt`,
      beltColor: getBeltColor(student.beltRank ?? '', beltRequirements || []),
      age: student.age || 0,
      joinDate: student.startDateUTC,
      lastTest: student.lastTestUTC || null,
      isChild: !!student.child,
      isActive: !!student.active,
      eligibleForTesting: student.eligibleForTesting ?? 0,
    });
  };

  // Transform API data to display format
  const allStudents: StudentDisplay[] = (apiStudents || []).map(transformStudent);

  // Filter students based on active/inactive toggle
  const students: StudentDisplay[] = showActiveOnly
    ? allStudents.filter((student) => student.isActive)
    : allStudents.filter((student) => !student.isActive);

  // Handler for when a new student is added
  const handleStudentAdded = () => {
    refetchStudents(); // Refetch students to include the newly added student
  };

  // Handler for when a student is updated
  const handleStudentUpdated = () => {
    refetchStudents(); // Refetch students to include the updated student data
  };

  // Handler to view student details
  const handleViewStudent = (student: Student) => {
    router.push(`/students/${student.studentid}`);
  };

  // Handler to promote a student to the next belt
  const handlePromoteStudent = (student: Student) => {
    setStudentToPromote(transformStudent(student));
    setPromoteStudentOpen(true);
  };

  // Handler to close promote student dialog
  const handlePromoteStudentClose = () => {
    setPromoteStudentOpen(false);
    setStudentToPromote(null);
  };

  // Handler to open add student dialog
  const handleAddStudentClick = () => {
    setAddStudentOpen(true);
  };

  // Handler to open edit student dialog
  const handleEditStudentClick = (student: Student) => {
    setSelectedStudent(transformStudent(student));
    setEditStudentOpen(true);
  };

  // Handler to close edit student dialog
  const handleEditStudentClose = () => {
    setEditStudentOpen(false);
    setSelectedStudent(null);
  };

  // DataGrid column definitions
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Student',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
          <Box>
            <Typography variant='subtitle2' fontWeight='bold'>
              {params.row.name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Age: {params.row.age}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'currentBelt',
      headerName: 'Current Belt',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.row.currentBelt}
          sx={{
            backgroundColor: params.row.beltColor,
            color: getBeltTextColor(params.row.beltRank, beltRequirements || []),
            fontWeight: 'bold',
            border: params.row.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
          }}
        />
      ),
    },
    {
      field: 'eligibleForTesting',
      headerName: 'Test Eligibility',
      width: 280,
      flex: 0.8,
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ py: 0.5 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            Last Test: {new Date(params.row.lastTest).toLocaleDateString()}
          </Typography>
          <Chip
            label={params.row.eligibleForTesting ? 'Ready for Testing' : 'Not Ready'}
            size='small'
            color={params.row.eligibleForTesting ? 'success' : 'default'}
          />
        </Box>
      ),
    },
    {
      field: 'isChild',
      headerName: 'Child Student?',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ py: 0.5 }}>
          <Chip
            label={params.row.isChild ? 'Yes' : 'No'}
            size='small'
            color={params.row.isChild ? 'success' : 'default'}
          />
        </Box>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ py: 0.5 }}>
          <Chip
            label={params.row.isActive ? 'Active' : 'Inactive'}
            size='small'
            color={params.row.isActive ? 'success' : 'error'}
            variant={params.row.isActive ? 'filled' : 'outlined'}
          />
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      minWidth: 140,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size='small'
            color='primary'
            onClick={() => handleViewStudent(params.row)}
            title='View student details'
          >
            <IconEye size={16} />
          </IconButton>
          <IconButton
            size='small'
            color='secondary'
            onClick={() => handleEditStudentClick(params.row)}
          >
            <IconEdit size={16} />
          </IconButton>
          <IconButton
            size='small'
            color='success'
            onClick={() => handlePromoteStudent(params.row)}
            title='Promote to next belt'
          >
            <IconArrowUp size={16} />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (isLoading || beltRequirementsLoading || isFetching || beltRequirementsFetching) {
    return (
      <PageContainer title='Students' description='Student Management and Progress Tracking'>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Loading />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title='Students' description='Student Management and Progress Tracking'>
      <Box>
        {(isError || beltRequirementsError) && (
          <Alert severity='warning' sx={{ mb: 3 }}>
            Unable to connect to the backend. Displaying sample data.
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant='h2'>Student Management</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  color='primary'
                />
              }
              label={showActiveOnly ? 'Active Students' : 'Inactive Students'}
              sx={{ ml: 2 }}
            />
          </Box>
          <Button
            variant='contained'
            startIcon={<IconPlus />}
            sx={{ height: 'fit-content' }}
            onClick={handleAddStudentClick}
          >
            Add New Student
          </Button>
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Track student progress, belt advancement, and attendance records. Use the toggle above to
          switch between active and inactive students.
        </Typography>

        {/* Summary Cards */}
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
                  {allStudents.length}
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
                  {students.filter((student) => student.isChild).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Student DataGrid */}
        <DashboardCard
          title={`Student Roster - ${showActiveOnly ? 'Active' : 'Inactive'} Students`}
        >
          <Box sx={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={students}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              getRowHeight={() => 'auto'}
              sx={{
                border: 0,
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'grey.50',
                  borderBottom: '2px solid rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'action.hover',
                },
                '& .MuiDataGrid-virtualScroller': {
                  // Ensure the scroller has enough space
                  minHeight: '400px',
                },
              }}
            />
          </Box>
        </DashboardCard>

        {/* Add Student Dialog */}
        <AddStudentModule
          open={addStudentOpen}
          onClose={() => setAddStudentOpen(false)}
          beltRequirements={beltRequirements || []}
          onStudentAdded={handleStudentAdded}
        />

        {/* Edit Student Dialog */}
        <EditStudentModule
          open={editStudentOpen}
          onClose={handleEditStudentClose}
          student={selectedStudent}
          beltRequirements={beltRequirements || []}
          onStudentUpdated={handleStudentUpdated}
        />

        {/* Promote Student Dialog */}
        <PromoteStudentDialog
          open={promoteStudentOpen}
          onClose={handlePromoteStudentClose}
          student={studentToPromote as StudentDisplay | null}
          beltRequirements={beltRequirements || []}
          onConfirm={promoteStudent as (student: StudentDisplay) => Promise<void>}
        />
      </Box>
    </PageContainer>
  );
};

export default StudentsClient;
