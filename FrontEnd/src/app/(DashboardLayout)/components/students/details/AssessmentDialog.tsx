import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Button,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { StudentAssessment } from '../../../../../models/Assessments/Assessments';
import { Formik } from 'formik';
import {
  assessmentValidationSchema,
  getInitialValues,
  getTargetBeltRequirements,
} from 'helpers/Student';
import { studentAssessmentsService } from 'services/studentAssessmentsService';

interface AssessmentDialogProps {
  editDialogOpen: boolean;
  closeEditDialog: () => void;
  editingAssessment: StudentAssessment | null;
  beltRequirements: any[];
  onAssessmentUpdate?: (assessment: StudentAssessment) => Promise<void>;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({
  editDialogOpen,
  closeEditDialog,
  editingAssessment,
  beltRequirements,
  onAssessmentUpdate,
}) => {
  return (
    <Dialog open={editDialogOpen} onClose={closeEditDialog} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h5'>Edit Assessment</Typography>
      </DialogTitle>

      <Formik
        initialValues={getInitialValues(editingAssessment)}
        validationSchema={assessmentValidationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            if (!editingAssessment) return;

            // Prepare form data for submission
            const updateData = {
              ...values,
              assessment_date: new Date(values.assessment_date).toISOString(),
              // Convert null values to undefined to match the API interface
              geocho_hyung_il_bu: values.geocho_hyung_il_bu || undefined,
              geocho_hyung_il_bu_sahm_gup: values.geocho_hyung_il_bu_sahm_gup || undefined,
              geocho_hyung_yi_bu: values.geocho_hyung_yi_bu || undefined,
              geocho_hyung_yi_bu_sahm_gup: values.geocho_hyung_yi_bu_sahm_gup || undefined,
              geocho_hyung_sahm_bu: values.geocho_hyung_sahm_bu || undefined,
              pyong_an_cho_dan: values.pyong_an_cho_dan || undefined,
              pyong_an_yi_dan: values.pyong_an_yi_dan || undefined,
              pyong_an_sahm_dan: values.pyong_an_sahm_dan || undefined,
              pyong_an_sa_dan: values.pyong_an_sa_dan || undefined,
              pyong_an_oh_dan: values.pyong_an_oh_dan || undefined,
              bassai: values.bassai || undefined,
              traditional_1: values.traditional_1 || undefined,
              traditional_2: values.traditional_2 || undefined,
              traditional_3: values.traditional_3 || undefined,
              traditional_4: values.traditional_4 || undefined,
              made_up_1: values.made_up_1 || undefined,
              made_up_2: values.made_up_2 || undefined,
              made_up_3: values.made_up_3 || undefined,
              made_up_4: values.made_up_4 || undefined,
              three_steps_1: values.three_steps_1 || undefined,
              three_steps_2: values.three_steps_2 || undefined,
              three_steps_3: values.three_steps_3 || undefined,
              three_steps_4: values.three_steps_4 || undefined,
              front_kick: values.front_kick || undefined,
              side_kick: values.side_kick || undefined,
              roundhouse_kick: values.roundhouse_kick || undefined,
              back_kick: values.back_kick || undefined,
              hook_kick: values.hook_kick || undefined,
              upper_cut: values.upper_cut || undefined,
              hook_punch: values.hook_punch || undefined,
              spin_bottom_fist: values.spin_bottom_fist || undefined,
              charging_punch: values.charging_punch || undefined,
              slide_up_jab_punch: values.slide_up_jab_punch || undefined,
              chop_low: values.chop_low || undefined,
              chop_high: values.chop_high || undefined,
              spearhand: values.spearhand || undefined,
              stepping_kick: values.stepping_kick || undefined,
              slide_up_kick: values.slide_up_kick || undefined,
              spin_back_kick: values.spin_back_kick || undefined,
              inside_crescent_kick: values.inside_crescent_kick || undefined,
              outside_crescent_kick: values.outside_crescent_kick || undefined,
              spin_outside_crescent_kick: values.spin_outside_crescent_kick || undefined,
              jump_spin_outside_crescent: values.jump_spin_outside_crescent || undefined,
              spin_heel_kick: values.spin_heel_kick || undefined,
              studder_step_kick: values.studder_step_kick || undefined,
              butterfly_kick: values.butterfly_kick || undefined,
              stance_front: values.stance_front || undefined,
              stance_back: values.stance_back || undefined,
              stance_straddle: values.stance_straddle || undefined,
              stance_shifting: values.stance_shifting || undefined,
              low_block: values.low_block || undefined,
              knife_hand_block: values.knife_hand_block || undefined,
              high_block: values.high_block || undefined,
              inside_block: values.inside_block || undefined,
              outside_block: values.outside_block || undefined,
              block_punch: values.block_punch || undefined,
              double_block: values.double_block || undefined,
              double_block_punch: values.double_block_punch || undefined,
              center_punch: values.center_punch || undefined,
              reverse_punch: values.reverse_punch || undefined,
              jab: values.jab || undefined,
              overall_score: values.overall_score || undefined,
            };

            // Update the assessment
            await studentAssessmentsService.updateAssessment(
              editingAssessment.assessment_id,
              updateData
            );

            // Call the onUpdate callback if provided
            if (onAssessmentUpdate && editingAssessment) {
              const updatedAssessment: StudentAssessment = {
                ...editingAssessment,
                ...updateData,
                // Convert back to the expected types
                geocho_hyung_il_bu: updateData.geocho_hyung_il_bu || undefined,
                geocho_hyung_il_bu_sahm_gup: updateData.geocho_hyung_il_bu_sahm_gup || undefined,
                geocho_hyung_yi_bu: updateData.geocho_hyung_yi_bu || undefined,
                geocho_hyung_yi_bu_sahm_gup: updateData.geocho_hyung_yi_bu_sahm_gup || undefined,
                geocho_hyung_sahm_bu: updateData.geocho_hyung_sahm_bu || undefined,
                pyong_an_cho_dan: updateData.pyong_an_cho_dan || undefined,
                pyong_an_yi_dan: updateData.pyong_an_yi_dan || undefined,
                pyong_an_sahm_dan: updateData.pyong_an_sahm_dan || undefined,
                pyong_an_sa_dan: updateData.pyong_an_sa_dan || undefined,
                pyong_an_oh_dan: updateData.pyong_an_oh_dan || undefined,
                bassai: updateData.bassai || undefined,
                traditional_1: updateData.traditional_1 || undefined,
                traditional_2: updateData.traditional_2 || undefined,
                traditional_3: updateData.traditional_3 || undefined,
                traditional_4: updateData.traditional_4 || undefined,
                made_up_1: updateData.made_up_1 || undefined,
                made_up_2: updateData.made_up_2 || undefined,
                made_up_3: updateData.made_up_3 || undefined,
                made_up_4: updateData.made_up_4 || undefined,
                three_steps_1: updateData.three_steps_1 || undefined,
                three_steps_2: updateData.three_steps_2 || undefined,
                three_steps_3: updateData.three_steps_3 || undefined,
                three_steps_4: updateData.three_steps_4 || undefined,
                front_kick: updateData.front_kick || undefined,
                side_kick: updateData.side_kick || undefined,
                roundhouse_kick: updateData.roundhouse_kick || undefined,
                back_kick: updateData.back_kick || undefined,
                hook_kick: updateData.hook_kick || undefined,
                upper_cut: updateData.upper_cut || undefined,
                hook_punch: updateData.hook_punch || undefined,
                spin_bottom_fist: updateData.spin_bottom_fist || undefined,
                charging_punch: updateData.charging_punch || undefined,
                slide_up_jab_punch: updateData.slide_up_jab_punch || undefined,
                chop_low: updateData.chop_low || undefined,
                chop_high: updateData.chop_high || undefined,
                spearhand: updateData.spearhand || undefined,
                stepping_kick: updateData.stepping_kick || undefined,
                slide_up_kick: updateData.slide_up_kick || undefined,
                spin_back_kick: updateData.spin_back_kick || undefined,
                inside_crescent_kick: updateData.inside_crescent_kick || undefined,
                outside_crescent_kick: updateData.outside_crescent_kick || undefined,
                spin_outside_crescent_kick: updateData.spin_outside_crescent_kick || undefined,
                jump_spin_outside_crescent: updateData.jump_spin_outside_crescent || undefined,
                spin_heel_kick: updateData.spin_heel_kick || undefined,
                studder_step_kick: updateData.studder_step_kick || undefined,
                butterfly_kick: updateData.butterfly_kick || undefined,
                stance_front: updateData.stance_front || undefined,
                stance_back: updateData.stance_back || undefined,
                stance_straddle: updateData.stance_straddle || undefined,
                stance_shifting: updateData.stance_shifting || undefined,
                low_block: updateData.low_block || undefined,
                knife_hand_block: updateData.knife_hand_block || undefined,
                high_block: updateData.high_block || undefined,
                inside_block: updateData.inside_block || undefined,
                outside_block: updateData.outside_block || undefined,
                block_punch: updateData.block_punch || undefined,
                double_block: updateData.double_block || undefined,
                double_block_punch: updateData.double_block_punch || undefined,
                center_punch: updateData.center_punch || undefined,
                reverse_punch: updateData.reverse_punch || undefined,
                jab: updateData.jab || undefined,
                overall_score: updateData.overall_score || undefined,
              };
              await onAssessmentUpdate(updatedAssessment);
            }

            setStatus({ success: true });
            closeEditDialog();
          } catch (error) {
            console.error('Error updating assessment:', error);
            setStatus({ error: 'Failed to update assessment. Please try again.' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setFieldValue,
        }) => {
          // Get target belt requirements for filtering fields
          const targetBelt = getTargetBeltRequirements(values.target_belt_rank, beltRequirements);

          return (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                {status?.error && (
                  <Alert severity='error' sx={{ mb: 2 }}>
                    {status.error}
                  </Alert>
                )}

                <Grid container spacing={3}>
                  {/* Basic Assessment Info */}
                  <Grid size={12}>
                    <Typography variant='h6' gutterBottom color='primary'>
                      Assessment Information
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Assessment Date'
                      name='assessment_date'
                      type='date'
                      value={values.assessment_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.assessment_date && Boolean(errors.assessment_date)}
                      helperText={touched.assessment_date && errors.assessment_date}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl
                      fullWidth
                      error={touched.target_belt_rank && Boolean(errors.target_belt_rank)}
                    >
                      <InputLabel>Target Belt Rank</InputLabel>
                      <Select
                        name='target_belt_rank'
                        value={values.target_belt_rank}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Target Belt Rank'
                      >
                        {beltRequirements
                          .sort((a, b) => a.beltOrder - b.beltOrder)
                          .map((belt) => (
                            <MenuItem key={belt.beltRank} value={belt.beltRank}>
                              {belt.beltRank} Belt
                            </MenuItem>
                          ))}
                      </Select>
                      {touched.target_belt_rank && errors.target_belt_rank && (
                        <Typography variant='caption' color='error' sx={{ mt: 0.5, ml: 2 }}>
                          {errors.target_belt_rank}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Show belt requirements summary */}
                  {targetBelt && (
                    <Grid size={12}>
                      <Alert severity='info' sx={{ mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: 1 }}>
                          Requirements for {targetBelt.beltRank} Belt:
                        </Typography>
                        <Typography variant='body2'>
                          Forms: {targetBelt.forms.join(', ') || 'None'} • Stances:{' '}
                          {targetBelt.stances.join(', ') || 'None'} • Blocks:{' '}
                          {targetBelt.blocks.join(', ') || 'None'} • Punches:{' '}
                          {targetBelt.punches.join(', ') || 'None'} • Kicks:{' '}
                          {targetBelt.kicks.join(', ') || 'None'} • One Steps:{' '}
                          {[...targetBelt.selfDefense, ...targetBelt.oneSteps].join(', ') || 'None'}
                        </Typography>
                      </Alert>
                    </Grid>
                  )}

                  {/* Forms Section - Show all forms */}
                  <>
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Forms (Hyungs) - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'geocho_hyung_il_bu', label: 'Geocho Hyung Il Bu' },
                      {
                        name: 'geocho_hyung_il_bu_sahm_gup',
                        label: 'Geocho Hyung Il Bu (Sahm Gup)',
                      },
                      { name: 'geocho_hyung_yi_bu', label: 'Geocho Hyung Yi Bu' },
                      {
                        name: 'geocho_hyung_yi_bu_sahm_gup',
                        label: 'Geocho Hyung Yi Bu (Sahm Gup)',
                      },
                      { name: 'geocho_hyung_sahm_bu', label: 'Geocho Hyung Sahm Bu' },
                      { name: 'pyong_an_cho_dan', label: 'Pyong An Cho Dan' },
                      { name: 'pyong_an_yi_dan', label: 'Pyong An Yi Dan' },
                      { name: 'pyong_an_sahm_dan', label: 'Pyong An Sahm Dan' },
                      { name: 'pyong_an_sa_dan', label: 'Pyong An Sa Dan' },
                      { name: 'pyong_an_oh_dan', label: 'Pyong An Oh Dan' },
                      { name: 'bassai', label: 'Bassai' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}
                  </>

                  {/* One Steps Section - Show all one steps fields */}
                  <>
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        One Steps - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'traditional_1', label: 'Traditional 1' },
                      { name: 'traditional_2', label: 'Traditional 2' },
                      { name: 'traditional_3', label: 'Traditional 3' },
                      { name: 'traditional_4', label: 'Traditional 4' },
                      { name: 'made_up_1', label: 'Made Up 1' },
                      { name: 'made_up_2', label: 'Made Up 2' },
                      { name: 'made_up_3', label: 'Made Up 3' },
                      { name: 'made_up_4', label: 'Made Up 4' },
                      { name: 'three_steps_1', label: 'Three Steps 1' },
                      { name: 'three_steps_2', label: 'Three Steps 2' },
                      { name: 'three_steps_3', label: 'Three Steps 3' },
                      { name: 'three_steps_4', label: 'Three Steps 4' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}
                  </>

                  {/* Techniques Section - Show all available techniques */}
                  <>
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Kicks - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'front_kick', label: 'Front Kick' },
                      { name: 'side_kick', label: 'Side Kick' },
                      { name: 'roundhouse_kick', label: 'Roundhouse Kick' },
                      { name: 'back_kick', label: 'Back Kick' },
                      { name: 'hook_kick', label: 'Hook Kick' },
                      { name: 'upper_cut', label: 'Upper Cut' },
                      { name: 'stepping_kick', label: 'Stepping Kick' },
                      { name: 'slide_up_kick', label: 'Slide Up Kick' },
                      { name: 'spin_back_kick', label: 'Spin Back Kick' },
                      { name: 'inside_crescent_kick', label: 'Inside Crescent Kick' },
                      { name: 'outside_crescent_kick', label: 'Outside Crescent Kick' },
                      { name: 'spin_outside_crescent_kick', label: 'Spin Outside Crescent Kick' },
                      { name: 'jump_spin_outside_crescent', label: 'Jump Spin Outside Crescent' },
                      { name: 'spin_heel_kick', label: 'Spin Heel Kick' },
                      { name: 'studder_step_kick', label: 'Studder Step Kick' },
                      { name: 'butterfly_kick', label: 'Butterfly Kick' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}

                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Stances - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'stance_front', label: 'Front Stance' },
                      { name: 'stance_back', label: 'Back Stance' },
                      { name: 'stance_straddle', label: 'Straddle Stance' },
                      { name: 'stance_shifting', label: 'Shifting Stance' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}

                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Blocks - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'low_block', label: 'Low Block' },
                      { name: 'knife_hand_block', label: 'Knife Hand Block' },
                      { name: 'high_block', label: 'High Block' },
                      { name: 'inside_block', label: 'Inside Block' },
                      { name: 'outside_block', label: 'Outside Block' },
                      { name: 'block_punch', label: 'Block Punch' },
                      { name: 'double_block', label: 'Double Block' },
                      { name: 'double_block_punch', label: 'Double Block Punch' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}

                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Punches - Score 0-10
                      </Typography>
                    </Grid>

                    {[
                      { name: 'center_punch', label: 'Center Punch' },
                      { name: 'reverse_punch', label: 'Reverse Punch' },
                      { name: 'jab', label: 'Jab' },
                      { name: 'hook_punch', label: 'Hook Punch' },
                      { name: 'spin_bottom_fist', label: 'Spin Bottom Fist' },
                      { name: 'charging_punch', label: 'Charging Punch' },
                      { name: 'slide_up_jab_punch', label: 'Slide Up Jab Punch' },
                      { name: 'chop_low', label: 'Chop Low' },
                      { name: 'chop_high', label: 'Chop High' },
                      { name: 'spearhand', label: 'Spearhand' },
                      { name: 'block_punch_combo', label: 'Block Punch Combo' },
                      { name: 'double_block_punch_combo', label: 'Double Block Punch Combo' },
                    ].map((field) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          type='number'
                          value={values[field.name as keyof typeof values] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched[field.name as keyof typeof touched] &&
                            Boolean(errors[field.name as keyof typeof errors])
                          }
                          helperText={
                            touched[field.name as keyof typeof touched] &&
                            errors[field.name as keyof typeof errors]
                          }
                          inputProps={{ min: 0, max: 10, step: 0.1 }}
                        />
                      </Grid>
                    ))}
                  </>

                  {/* Overall Assessment */}
                  <Grid size={12}>
                    <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                      Overall Assessment
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Overall Score (0-100%)'
                      name='overall_score'
                      type='number'
                      value={values.overall_score || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.overall_score && Boolean(errors.overall_score)}
                      helperText={touched.overall_score && errors.overall_score}
                      inputProps={{ min: 0, max: 100, step: 0.1 }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label='Examiner Notes'
                      name='examiner_notes'
                      multiline
                      rows={3}
                      value={values.examiner_notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.examiner_notes && Boolean(errors.examiner_notes)}
                      helperText={touched.examiner_notes && errors.examiner_notes}
                      placeholder='Additional notes about the assessment...'
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={closeEditDialog} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type='submit' variant='contained' disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Assessment'}
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AssessmentDialog;
