import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { PunchDefinition } from 'models/Punches/Punches';
import { validationSchema } from 'utils/helpers/Punches';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack, Chip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface PunchFormProps {
  punch: PunchDefinition;
  refetchPunches: () => Promise<void>;
  handleCloseEdit: () => void;
}

const PunchForm = ({ punch, refetchPunches, handleCloseEdit }: PunchFormProps) => {
  const initialValues: PunchDefinition = {
    id: punch.id,
    name: punch.name || '',
    korean: punch.korean || '',
    description: punch.description || '',
    beltRank: punch.beltRank || '',
    beltColor: punch.beltColor || '',
    target: punch.target || '',
    execution: punch.execution || [],
    keyPoints: punch.keyPoints || [],
    commonMistakes: punch.commonMistakes || [],
    applications: punch.applications || [],
  };

  const onSubmit = async (values: PunchDefinition) => {
    await axiosInstance.patch(`/punches-definitions/${values.id}`, values);
    await refetchPunches();
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

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='beltRank'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt'
                      placeholder='e.g., 8th Gup'
                      error={Boolean(errors.beltRank && touched.beltRank)}
                      helperText={errors.beltRank && touched.beltRank ? errors.beltRank : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
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

              {/* Technical Details */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Technical Details
                </Typography>
              </Grid>

              <Grid size={12}>
                <Field name='target'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Target'
                      placeholder='Target area'
                      error={Boolean(errors.target && touched.target)}
                      helperText={errors.target && touched.target ? errors.target : ''}
                    />
                  )}
                </Field>
              </Grid>

              {/* Execution Steps */}
              <Grid size={12}>
                <FieldArray name='execution'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Execution Steps
                      </Typography>
                      <Stack spacing={2}>
                        {values.execution?.map((_, index) => (
                          <Box key={`ex-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`execution.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Step #${index + 1}`}
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
                          Add Execution Step
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Array fields */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Training Details
                </Typography>
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
                                  label={`Mistake #${index + 1}`}
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
                          Add Mistake
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
                          <Box key={`ap-${index}`} display='flex' alignItems='center' gap={1}>
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

              {/* Submit Button */}
              <Grid size={12}>
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button onClick={handleCloseEdit} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default PunchForm;
