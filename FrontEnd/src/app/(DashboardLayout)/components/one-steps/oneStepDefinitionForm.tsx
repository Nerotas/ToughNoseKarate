import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { OneStepDefinition } from 'models/OneSteps/OneSteps';
import axiosInstance from 'utils/helpers/AxiosInstance';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';
import { BELT_RANKS } from 'constants/data/BeltRanks';
import { oneStepUpdateValidationSchema } from 'utils/validation/schemas';

interface OneStepDefinitionFormProps {
  oneStep: OneStepDefinition;
  refetchOneSteps: () => Promise<void>;
  handleCloseEdit: () => void;
}

const OneStepDefinitionForm = ({
  oneStep,
  refetchOneSteps,
  handleCloseEdit,
}: OneStepDefinitionFormProps) => {
  const initialValues: OneStepDefinition = {
    id: oneStep.id,
    name: oneStep.name || '',
    description: oneStep.description || '',
    beltRank: oneStep.beltRank || '',
    followUpBeltRank: oneStep.followUpBeltRank || '',
    secondFollowUpBeltRank: oneStep.secondFollowUpBeltRank || '',
    defense: oneStep.defense || [],
    keyPoints: oneStep.keyPoints || [],
    commonMistakes: oneStep.commonMistakes || [],
    firstFollowUp: oneStep.firstFollowUp || [],
    secondFollowUp: oneStep.secondFollowUp || [],
    comment: oneStep.comment || '',
  };

  const onSubmit = async (values: OneStepDefinition) => {
    // Normalize array fields to ensure empty arrays are properly handled
    const normalizedValues = {
      ...values,
      defense: Array.isArray(values.defense)
        ? values.defense.filter((item) => item && item.trim())
        : [],
      keyPoints: Array.isArray(values.keyPoints)
        ? values.keyPoints.filter((item) => item && item.trim())
        : [],
      commonMistakes: Array.isArray(values.commonMistakes)
        ? values.commonMistakes.filter((item) => item && item.trim())
        : [],
      firstFollowUp: Array.isArray(values.firstFollowUp)
        ? values.firstFollowUp.filter((item) => item && item.trim())
        : [],
      secondFollowUp: Array.isArray(values.secondFollowUp)
        ? values.secondFollowUp.filter((item) => item && item.trim())
        : [],
    };

    await axiosInstance.patch(`/onestep-definitions/${values.id}`, normalizedValues);
    await refetchOneSteps();
    handleCloseEdit();
  };

  return (
    <Formik
      initialValues={initialValues}
      oneStepUpdateValidationSchema={oneStepUpdateValidationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Basic Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='name'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Name'
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name && touched.name ? errors.name : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Field name='description'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Description'
                      multiline
                      rows={3}
                      error={Boolean(errors.description && touched.description)}
                      helperText={
                        errors.description && touched.description ? errors.description : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              {/* Belt Information */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Belt Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='beltRank'>
                  {({ field }: any) => (
                    <FormControl fullWidth>
                      <InputLabel>Belt Rank</InputLabel>
                      <Select {...field} label='Belt Rank' value={field.value || ''}>
                        {BELT_RANKS.map((belt) => (
                          <MenuItem key={belt.beltRank} value={belt.beltRank}>
                            {belt.beltRank}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='followUpBeltRank'>
                  {({ field }: any) => (
                    <FormControl fullWidth>
                      <InputLabel>First Follow-Up Belt Rank</InputLabel>
                      <Select
                        {...field}
                        label='First Follow-Up Belt Rank'
                        value={field.value || ''}
                      >
                        {BELT_RANKS.map((belt) => (
                          <MenuItem key={belt.beltRank} value={belt.beltRank}>
                            {belt.beltRank}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='secondFollowUpBeltRank'>
                  {({ field }: any) => (
                    <FormControl fullWidth>
                      <InputLabel>Second Follow-Up Belt Rank</InputLabel>
                      <Select
                        {...field}
                        label='Second Follow-Up Belt Rank'
                        value={field.value || ''}
                      >
                        {BELT_RANKS.map((belt) => (
                          <MenuItem key={belt.beltRank} value={belt.beltRank}>
                            {belt.beltRank}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <FieldArray name='defense'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Defense Steps
                      </Typography>
                      <Stack spacing={2}>
                        {values.defense?.map((_, index) => (
                          <Box key={`def-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`defense.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Defense Step #${index + 1}`}
                                  size='small'
                                />
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)} color='error' size='small'>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => push('')}
                          variant='outlined'
                          size='small'
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          Add Defense Step
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Key Points */}
              <Grid size={12}>
                <FieldArray name='keyPoints'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Key Points
                      </Typography>
                      <Stack spacing={2}>
                        {values.keyPoints?.map((_, index) => (
                          <Box key={`kp-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`keyPoints.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Key Point #${index + 1}`}
                                  size='small'
                                />
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)} color='error' size='small'>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => push('')}
                          variant='outlined'
                          size='small'
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          Add Key Point
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Common Mistakes */}
              <Grid size={12}>
                <FieldArray name='commonMistakes'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Common Mistakes
                      </Typography>
                      <Stack spacing={2}>
                        {values.commonMistakes?.map((_, index) => (
                          <Box key={`cm-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`commonMistakes.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Common Mistake #${index + 1}`}
                                  size='small'
                                />
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)} color='error' size='small'>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => push('')}
                          variant='outlined'
                          size='small'
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          Add Common Mistake
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* First Follow-Up */}
              <Grid size={12}>
                <FieldArray name='firstFollowUp'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        First Follow-Up Steps
                      </Typography>
                      <Stack spacing={2}>
                        {values.firstFollowUp?.map((_, index) => (
                          <Box key={`ffu-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`firstFollowUp.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`First Follow-Up Step #${index + 1}`}
                                  size='small'
                                />
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)} color='error' size='small'>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => push('')}
                          variant='outlined'
                          size='small'
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          Add First Follow-Up Step
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Second Follow-Up */}
              <Grid size={12}>
                <FieldArray name='secondFollowUp'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Second Follow-Up Steps
                      </Typography>
                      <Stack spacing={2}>
                        {values.secondFollowUp?.map((_, index) => (
                          <Box key={`sfu-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`secondFollowUp.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Second Follow-Up Step #${index + 1}`}
                                  size='small'
                                />
                              )}
                            </Field>
                            <IconButton onClick={() => remove(index)} color='error' size='small'>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => push('')}
                          variant='outlined'
                          size='small'
                          sx={{ alignSelf: 'flex-start' }}
                        >
                          Add Second Follow-Up Step
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Comment */}
              <Grid size={12}>
                <Field name='comment'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Additional Comments'
                      multiline
                      rows={3}
                      error={Boolean(errors.comment && touched.comment)}
                      helperText={errors.comment && touched.comment ? errors.comment : ''}
                    />
                  )}
                </Field>
              </Grid>

              {/* Submit Buttons */}
              <Grid size={12}>
                <Stack direction='row' spacing={2} sx={{ mt: 3 }}>
                  <Button type='submit' variant='contained' disabled={isSubmitting} size='large'>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant='outlined'
                    onClick={handleCloseEdit}
                    size='large'
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default OneStepDefinitionForm;
