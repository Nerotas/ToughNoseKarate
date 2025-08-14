'use client';
import { useState } from 'react';
import { StudentAssessment } from '../../../../models/Assessments/Assessments';
import { studentsService } from '../../../../services/studentsService';
import { studentAssessmentsService } from '../../../../services/studentAssessmentsService';
import StudentAssessmentForm from '../../components/students/details/StudentAssessmentForm';
import EditStudentDialog from '../../components/students/EditStudentDialog';
import Loading from 'app/loading';
import {
  Box,
  Button,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { IconArrowLeft, IconEdit, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import PageContainer from '../../components/container/PageContainer';
import useGet from '../../../../hooks/useGet';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import { TestHistory } from '../../../../models/StudentTests/StudentTests';
import {
  StudentDetailClientProps,
  Family,
  Student,
  UpdateStudentRequest,
} from 'models/Students/Students';
import StudentInformation from 'app/(DashboardLayout)/components/students/details/StudentInformation';
import { getBeltColor, getBeltTextColor } from 'helpers/BeltColors';
import PersonalInformation from 'app/(DashboardLayout)/components/students/details/PersonalInformation';
import TrainingInformation from 'app/(DashboardLayout)/components/students/details/TrainingInformation';
import ParentGuardianInformation from 'app/(DashboardLayout)/components/students/details/ParentGuardianInformation';
import TestingHistory from 'app/(DashboardLayout)/components/students/details/TestingHistory';

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
    refetch: studentRefetch,
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

  // Fetch current assessment (single assessment)
  const {
    data: currentAssessment,
    isLoading: assessmentLoading,
    error: assessmentError,
    refetch: refetchAssessment,
  } = useGet<StudentAssessment | null>({
    apiLabel: 'current-assessment',
    url: `/student-assessments/student/${studentId}/current`,
    id: `current-assessment-${studentId}`,
    fallbackData: null,
  });

  // Assessment state
  const [assessmentDialogOpen, setAssessmentDialogOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<StudentAssessment | null>(null);

  // Edit student state
  const [editStudentDialogOpen, setEditStudentDialogOpen] = useState(false);

  // Handle student update
  const handleStudentUpdate = async (studentId: number, updatedData: UpdateStudentRequest) => {
    try {
      await studentsService.updateStudent(studentId, updatedData);
      await studentRefetch(); // Refetch updated student data
      setEditStudentDialogOpen(false);
    } catch (error) {
      console.error('Failed to update student:', error);
      // You might want to show a toast notification here
    }
  };

  const handleEditStudent = () => {
    setEditStudentDialogOpen(true);
  };

  const [savingAssessment, setSavingAssessment] = useState(false);

  // Assessment handlers
  const handleCreateAssessment = async () => {
    try {
      setSavingAssessment(true);
      await studentAssessmentsService.createAssessment({
        student_id: parseInt(studentId),
        assessment_date: new Date().toISOString(),
        assessment_status: 'in_progress',
        target_belt_rank: student?.beltRank,
      });
      await refetchAssessment();
    } catch (error) {
      console.error('Error creating assessment:', error);
    } finally {
      setSavingAssessment(false);
    }
  };

  const handleCompleteAssessment = async (passed: boolean, overallScore?: number) => {
    if (!currentAssessment) return;

    try {
      setSavingAssessment(true);
      await studentAssessmentsService.completeAssessment(currentAssessment.assessment_id, {
        passed,
        overall_score: overallScore || (passed ? 80 : 60),
      });
      await refetchAssessment();
    } catch (error) {
      console.error('Error completing assessment:', error);
    } finally {
      setSavingAssessment(false);
    }
  };

  const handleCancelAssessment = async () => {
    if (!currentAssessment) return;

    if (
      !confirm('Are you sure you want to cancel this assessment? This action cannot be undone.')
    ) {
      return;
    }

    try {
      setSavingAssessment(true);
      await studentAssessmentsService.cancelAssessment(
        currentAssessment.assessment_id,
        'Cancelled by user'
      );
      await refetchAssessment();
    } catch (error) {
      console.error('Error cancelling assessment:', error);
    } finally {
      setSavingAssessment(false);
    }
  };

  const handleAssessmentUpdate = async (assessment: StudentAssessment) => {
    await refetchAssessment();
  };

  const handleBackToStudents = () => {
    router.push('/students'); // or whatever your students route is
  };

  if (
    studentLoading ||
    beltRequirementsLoading ||
    studentFetching ||
    assessmentLoading ||
    (student?.child && (familyLoading || familyFetching))
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
        <StudentInformation student={student} beltColor={beltColor} beltTextColor={beltTextColor} />

        {/* Student Details Grid */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Personal Information */}
          <PersonalInformation student={student} />
          {/* Training Information */}
          <TrainingInformation student={student} />
          {/* Parent/Guardian Information - Only show for child students */}
          {student.child && family && (
            <ParentGuardianInformation
              student={student}
              studentId={studentId}
              family={family}
              familyLoading={familyLoading}
              familyFetching={familyFetching}
              familyError={familyError}
            />
          )}

          <StudentAssessmentForm
            currentAssessment={currentAssessment || null}
            beltRequirements={beltRequirements || []}
            assessmentLoading={assessmentLoading}
            assessmentError={assessmentError}
            savingAssessment={savingAssessment}
            handleCreateAssessment={handleCreateAssessment}
            handleCompleteAssessment={handleCompleteAssessment}
            handleCancelAssessment={handleCancelAssessment}
            onAssessmentUpdate={handleAssessmentUpdate}
          />
          {/* Test History */}
          {testHistory && (
            <TestingHistory
              testHistory={testHistory}
              testHistoryLoading={testHistoryLoading}
              beltRequirements={beltRequirements || []}
              testHistoryError={testHistoryError}
            />
          )}
        </Grid>
      </Box>

      {/* Edit Student Dialog */}
      <EditStudentDialog
        open={editStudentDialogOpen}
        onClose={() => setEditStudentDialogOpen(false)}
        student={student}
        beltRequirements={beltRequirements || []}
        onUpdate={handleStudentUpdate}
      />
    </PageContainer>
  );
};

export default StudentDetailClient;
