import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { IconClipboardData, IconPlus, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { StudentAssessment } from '../../../../../models/Assessments/Assessments';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';
import AssessmentDialog from './AssessmentDialog';
import { getBeltColor, getBeltTextColor } from 'utils/helpers/BeltColors';

interface StudentAssessmentFormProps {
  currentAssessment: StudentAssessment | null;
  beltRequirements: BeltRequirements[];
  assessmentLoading: boolean;
  assessmentError: any;
  savingAssessment: boolean;
  handleCreateAssessment: () => Promise<void>;
  handleCompleteAssessment: (passed: boolean, overallScore?: number) => Promise<void>;
  handleCancelAssessment: () => Promise<void>;
  onAssessmentUpdate?: (assessment: StudentAssessment) => Promise<void>;
}

const StudentAssessmentForm: React.FC<StudentAssessmentFormProps> = ({
  currentAssessment,
  beltRequirements,
  assessmentLoading,
  assessmentError,
  savingAssessment,
  handleCreateAssessment,
  handleCompleteAssessment,
  handleCancelAssessment,
  onAssessmentUpdate,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<StudentAssessment | null>(null);

  const openEditDialog = (assessment: StudentAssessment) => {
    setEditingAssessment(assessment);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingAssessment(null);
  };

  return (
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
              <IconClipboardData size={20} />
              <Box sx={{ ml: 1 }}>Current Assessment</Box>
            </Typography>
            {!currentAssessment && (
              <Button
                variant='contained'
                size='small'
                startIcon={<IconPlus />}
                onClick={handleCreateAssessment}
                disabled={savingAssessment}
              >
                Start New Assessment
              </Button>
            )}
          </Box>
          <Divider sx={{ mb: 2 }} />

          {assessmentError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              Failed to load assessment data
            </Alert>
          )}

          {assessmentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : currentAssessment ? (
            <Box>
              {/* Assessment Status */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Assessment Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Assessment Date
                      </Typography>
                      <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                        {currentAssessment.assessment_date
                          ? new Date(currentAssessment.assessment_date).toLocaleDateString()
                          : 'Not specified'}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Target Belt
                      </Typography>
                      {currentAssessment.target_belt_rank ? (
                        <Chip
                          label={currentAssessment.target_belt_rank}
                          size='small'
                          sx={{
                            backgroundColor: getBeltColor(currentAssessment.target_belt_rank),
                            color: getBeltTextColor(currentAssessment.target_belt_rank),
                            fontWeight: 'bold',
                            mt: 0.5,
                          }}
                        />
                      ) : (
                        <Typography variant='body1' color='text.secondary'>
                          Not specified
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Status
                      </Typography>
                      <Chip
                        label={currentAssessment.assessment_status?.replace('_', ' ') || 'Unknown'}
                        color={
                          currentAssessment.assessment_status === 'completed'
                            ? 'success'
                            : currentAssessment.assessment_status === 'in_progress'
                              ? 'warning'
                              : currentAssessment.assessment_status === 'cancelled'
                                ? 'error'
                                : 'default'
                        }
                        size='small'
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Overall Score
                      </Typography>
                      {currentAssessment.overall_score !== null &&
                      currentAssessment.overall_score !== undefined ? (
                        (() => {
                          const score = Number(currentAssessment.overall_score);
                          if (Number.isNaN(score)) {
                            return (
                              <Typography variant='body1' color='text.secondary'>
                                Invalid score
                              </Typography>
                            );
                          }
                          return (
                            <Typography
                              variant='h6'
                              color={score >= 70 ? 'success.main' : 'error.main'}
                              sx={{ fontWeight: 'bold' }}
                            >
                              {score.toFixed(1)}%
                            </Typography>
                          );
                        })()
                      ) : (
                        <Typography variant='body1' color='text.secondary'>
                          Not scored
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                {/* Result */}
                {currentAssessment.passed !== null && currentAssessment.passed !== undefined && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      Result
                    </Typography>
                    <Chip
                      label={currentAssessment.passed ? 'PASSED' : 'FAILED'}
                      color={currentAssessment.passed ? 'success' : 'error'}
                      variant='filled'
                      sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                    />
                  </Box>
                )}

                {/* Examiner Notes */}
                {currentAssessment.examiner_notes && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      Examiner Notes
                    </Typography>
                    <Typography variant='body1'>{currentAssessment.examiner_notes}</Typography>
                  </Box>
                )}
              </Box>

              {/* Assessment Actions */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant='outlined'
                  startIcon={<IconEdit />}
                  onClick={() => openEditDialog(currentAssessment)}
                  disabled={savingAssessment || currentAssessment.assessment_status === 'completed'}
                >
                  Edit Assessment
                </Button>

                {currentAssessment.assessment_status === 'in_progress' && (
                  <>
                    <Button
                      variant='contained'
                      color='success'
                      startIcon={<IconCheck />}
                      onClick={() => handleCompleteAssessment(true)}
                      disabled={savingAssessment}
                    >
                      Mark as Passed
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      startIcon={<IconX />}
                      onClick={() => handleCompleteAssessment(false)}
                      disabled={savingAssessment}
                    >
                      Mark as Failed
                    </Button>
                    <Button
                      variant='outlined'
                      color='warning'
                      startIcon={<IconX />}
                      onClick={handleCancelAssessment}
                      disabled={savingAssessment}
                    >
                      Cancel Assessment
                    </Button>
                  </>
                )}
              </Box>

              {/* Show detailed assessment categories when in progress */}

              {currentAssessment.assessment_status === 'in_progress' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                    Assessment Progress
                  </Typography>
                  <Alert severity='info' sx={{ mb: 2 }}>
                    Use the "Edit Assessment" button to input scores for different categories
                    (Forms, One Steps, Kicks, etc.)
                  </Alert>

                  {/* Quick scoring summary */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Forms Score
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.pyong_an_cho_dan || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          One Steps
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.traditional_1 || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Kicks
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.front_kick || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Stances
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.stance_front || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant='h6' color='text.secondary' sx={{ mb: 1 }}>
                No Active Assessment
              </Typography>
              <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                Start a new assessment to track this student's progress toward their next belt rank.
              </Typography>
              <Button
                variant='contained'
                size='large'
                startIcon={<IconPlus />}
                onClick={handleCreateAssessment}
                disabled={savingAssessment}
              >
                Start New Assessment
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <AssessmentDialog
        editDialogOpen={editDialogOpen}
        closeEditDialog={closeEditDialog}
        editingAssessment={editingAssessment}
        beltRequirements={beltRequirements}
        onAssessmentUpdate={onAssessmentUpdate}
      />
    </Grid>
  );
};

export default StudentAssessmentForm;
