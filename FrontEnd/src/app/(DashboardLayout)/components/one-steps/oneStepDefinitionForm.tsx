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

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  korean: Yup.string().trim().max(100, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  belt: Yup.string().trim().required('Required'),
  beltColor: Yup.string().trim().required('Required'),
  attack: Yup.string().trim().max(200, 'Too long').optional(),
  defense: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  difficulty: Yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced']).required('Required'),
});

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
    korean: oneStep.korean || '',
    description: oneStep.description || '',
    belt: oneStep.belt || '',
    beltColor: oneStep.beltColor || '',
    attack: oneStep.attack || '',
    defense: oneStep.defense || [],
    keyPoints: oneStep.keyPoints || [],
    commonMistakes: oneStep.commonMistakes || [],
    applications: oneStep.applications || [],
    difficulty: oneStep.difficulty || 'Beginner',
  };

  const onSubmit = async (values: OneStepDefinition) => {
    await axiosInstance.patch(`/onestep-definitions/${values.id}`, values);
    await refetchOneSteps();
    handleCloseEdit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='korean'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Korean Name'
                      error={Boolean(errors.korean && touched.korean)}
                      helperText={errors.korean && touched.korean ? errors.korean : ''}
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
                <Field name='belt'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt'
                      placeholder='e.g., 8th Gup'
                      error={Boolean(errors.belt && touched.belt)}
                      helperText={errors.belt && touched.belt ? errors.belt : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='beltColor'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Color'
                      placeholder='e.g., Yellow'
                      error={Boolean(errors.beltColor && touched.beltColor)}
                      helperText={errors.beltColor && touched.beltColor ? errors.beltColor : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='difficulty'>
                  {({ field }: any) => (
                    <FormControl fullWidth error={Boolean(errors.difficulty && touched.difficulty)}>
                      <InputLabel>Difficulty</InputLabel>
                      <Select {...field} label='Difficulty'>
                        <MenuItem value='Beginner'>Beginner</MenuItem>
                        <MenuItem value='Intermediate'>Intermediate</MenuItem>
                        <MenuItem value='Advanced'>Advanced</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              {/* Technical Details */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Technical Details
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='attack'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Attack'
                      multiline
                      rows={3}
                      error={Boolean(errors.attack && touched.attack)}
                      helperText={errors.attack && touched.attack ? errors.attack : ''}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
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

              {/* Applications */}
              <Grid size={12}>
                <FieldArray name='applications'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Applications
                      </Typography>
                      <Stack spacing={2}>
                        {values.applications?.map((_, index) => (
                          <Box key={`app-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`applications.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Application #${index + 1}`}
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
                          Add Application
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
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
