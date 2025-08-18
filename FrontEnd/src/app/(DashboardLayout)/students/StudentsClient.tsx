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
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetter } from '@mui/x-data-grid';
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
import { Student } from 'models/Students/Students';
import { getBeltColor, getBeltTextColor } from 'helpers/Student';
import SummaryCard from '../components/students/SummaryCard';

const StudentsClient = () => {
  const router = useRouter();

  // State for toggling between active and inactive students
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  // State for Add Student dialog
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  // State for Edit Student dialog
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // State for Promote Student dialog
  const [promoteStudentOpen, setPromoteStudentOpen] = useState(false);

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
    isError,
    refetch,
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

  // Transform API data to display format
  const allStudents: Student[] = apiStudents || [];

  // Filter students based on active/inactive toggle
  const students: Student[] = showActiveOnly
    ? allStudents.filter((student) => student.active)
    : allStudents.filter((student) => !student.active);

  const refetchStudents = async () => {
    await refetch();
  };

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
    setSelectedStudent(student);
    setPromoteStudentOpen(true);
  };

  // Handler to close promote student dialog
  const handlePromoteStudentClose = () => {
    setPromoteStudentOpen(false);
    setSelectedStudent(null);
  };

  // Handler to open add student dialog
  const handleAddStudentClick = () => {
    setAddStudentOpen(true);
  };

  // Handler to open edit student dialog
  const handleEditStudentClick = (student: Student) => {
    setSelectedStudent(student);
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
              {`${params.row.preferredName || params.row.firstName} ${params.row.lastName}`}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Age: {params.row.age}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'beltRank',
      headerName: 'Current Belt',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const beltColor = getBeltColor(params.row.beltRank ?? '', beltRequirements || []);
        return (
          <Chip
            label={`${params.row.beltRank} Belt`}
            sx={{
              backgroundColor: beltColor,
              color: getBeltTextColor(params.row.beltRank, beltRequirements || []),
              fontWeight: 'bold',
              border: beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
            }}
          />
        );
      },
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
            Last Test: {new Date(params.row.lastTestUTC).toLocaleDateString()}
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
      field: 'child',
      headerName: 'Child Student?',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ py: 0.5 }}>
          <Chip
            label={params.row.child ? 'Yes' : 'No'}
            size='small'
            color={params.row.child ? 'success' : 'default'}
          />
        </Box>
      ),
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ py: 0.5 }}>
          <Chip
            label={params.row.active ? 'Active' : 'Inactive'}
            size='small'
            color={params.row.active ? 'success' : 'error'}
            variant={params.row.active ? 'filled' : 'outlined'}
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
        <SummaryCard
          students={students}
          showActiveOnly={showActiveOnly}
          allStudents={allStudents.length || 0}
        />

        {/* Loader */}
        {(isLoading || beltRequirementsLoading || isFetching || beltRequirementsFetching) && (
          <Loading />
        )}

        {/* Student DataGrid */}
        <DashboardCard
          title={`Student Roster - ${showActiveOnly ? 'Active' : 'Inactive'} Students`}
        >
          <Box sx={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={students}
              columns={columns}
              getRowId={(row) => row.studentid}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
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
          student={selectedStudent as Student | null}
          beltRequirements={beltRequirements || []}
          refetchStudents={refetchStudents}
        />
      </Box>
    </PageContainer>
  );
};

export default StudentsClient;
