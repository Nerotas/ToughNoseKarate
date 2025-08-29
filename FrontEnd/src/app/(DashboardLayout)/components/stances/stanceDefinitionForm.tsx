import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { StanceDefinition } from 'models/Stances/Stances';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack, Chip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  korean: Yup.string().trim().max(100, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  position: Yup.string().trim().max(500, 'Too long').optional(),
  bodyPosition: Yup.string().trim().max(500, 'Too long').optional(),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
});

interface StanceDefinitionFormProps {
  stance: StanceDefinition;
  refetchStances: () => Promise<void>;
  handleCloseEdit: () => void;
}

const StanceDefinitionForm = ({
  stance,
  refetchStances,
  handleCloseEdit,
}: StanceDefinitionFormProps) => {
  const initialValues: StanceDefinition = {
    id: stance.id,
    name: stance.name || '',
    korean: stance.korean || '',
    description: stance.description || '',
    beltRank: stance.beltRank || '',
    position: stance.position || '',
    bodyPosition: stance.bodyPosition || '',
    keyPoints: stance.keyPoints || [],
    commonMistakes: stance.commonMistakes || [],
    applications: stance.applications || [],
  };

  const onSubmit = async (values: StanceDefinition) => {
    await axiosInstance.patch(`/stance-definitions/${values.id}`, values);
    await refetchStances();
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

              {/* Technical Details */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Technical Details
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='position'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Position'
                      multiline
                      rows={3}
                      error={Boolean(errors.position && touched.position)}
                      helperText={errors.position && touched.position ? errors.position : ''}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='bodyPosition'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Body Position'
                      multiline
                      rows={3}
                      error={Boolean(errors.bodyPosition && touched.bodyPosition)}
                      helperText={
                        errors.bodyPosition && touched.bodyPosition ? errors.bodyPosition : ''
                      }
                    />
                  )}
                </Field>
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

export default StanceDefinitionForm;
