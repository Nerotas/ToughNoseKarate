import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

type OneStepCreate = Omit<OneStepDefinition, 'id'> & { id?: string };

const defaultValues: OneStepCreate = {
  id: undefined,
  name: '',
  korean: '',
  description: '',
  beltRank: '',
  beltColor: '',
  attack: '',
  defense: [],
  keyPoints: [],
  commonMistakes: [],
  applications: [],
};

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  korean: Yup.string().trim().max(100, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  beltColor: Yup.string().trim().required('Required'),
  attack: Yup.string().trim().max(200, 'Too long').optional(),
  defense: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
});

interface OneStepCreateFormProps {
  refetchOneSteps: () => Promise<void>;
  handleCloseCreate: () => void;
}

const OneStepCreateForm = ({ refetchOneSteps, handleCloseCreate }: OneStepCreateFormProps) => {
  const onSubmit = async (values: OneStepCreate) => {
    const { id, ...payload } = values;
    await axiosInstance.post(`/onestep-definitions`, payload);
    await refetchOneSteps();
    handleCloseCreate();
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onSubmit(values);
          resetForm();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
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
                      required
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name && touched.name ? (errors as any).name : ''}
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
                      helperText={errors.korean && touched.korean ? (errors as any).korean : ''}
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
                        errors.description && touched.description ? (errors as any).description : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Belt Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='beltRank'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt'
                      placeholder='e.g., 8th Gup'
                      required
                      error={Boolean(errors.beltRank && touched.beltRank)}
                      helperText={
                        errors.beltRank && touched.beltRank ? (errors as any).beltRank : ''
                      }
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
                      required
                      error={Boolean(errors.beltColor && touched.beltColor)}
                      helperText={
                        errors.beltColor && touched.beltColor ? (errors as any).beltColor : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

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
                      helperText={errors.attack && touched.attack ? (errors as any).attack : ''}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='defense'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Defense'
                      multiline
                      rows={3}
                      error={Boolean(errors.defense && touched.defense)}
                      helperText={errors.defense && touched.defense ? (errors as any).defense : ''}
                    />
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

              <Grid size={12}>
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button onClick={handleCloseCreate} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create One-Step'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default OneStepCreateForm;
