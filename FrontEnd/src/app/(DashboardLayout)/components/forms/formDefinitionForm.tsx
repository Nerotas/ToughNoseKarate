import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack, Chip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  formName: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  koreanName: Yup.string().trim().max(100, 'Too long').optional(),
  meaning: Yup.string().trim().max(500, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  beltColor: Yup.string().trim().required('Required'),
  beltTextColor: Yup.string().trim().required('Required'),
  difficultyLevel: Yup.number()
    .min(1, 'Must be at least 1')
    .max(10, 'Must be at most 10')
    .required('Required'),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  videoLink: Yup.string().trim().url('Must be a valid URL').optional(),
});

interface FormDefinitionFormProps {
  form: FormDefinitions;
  refetchForms: () => Promise<void>;
  handleCloseEdit: () => void;
}

const FormDefinitionForm = ({ form, refetchForms, handleCloseEdit }: FormDefinitionFormProps) => {
  const initialValues: FormDefinitions = {
    id: form.id,
    formName: form.formName || '',
    koreanName: form.koreanName || '',
    meaning: form.meaning || '',
    beltRank: form.beltRank || '',
    beltColor: form.beltColor || '',
    beltTextColor: form.beltTextColor || '',
    difficultyLevel: form.difficultyLevel || 1,
    description: form.description || '',
    keyPoints: form.keyPoints || [],
    videoLink: form.videoLink || '',
  };

  const onSubmit = async (values: FormDefinitions) => {
    await axiosInstance.patch(`/form-definitions/${values.id}`, values);
    await refetchForms();
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
                <Field name='formName'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Form Name'
                      error={Boolean(errors.formName && touched.formName)}
                      helperText={errors.formName && touched.formName ? errors.formName : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='koreanName'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Korean Name'
                      error={Boolean(errors.koreanName && touched.koreanName)}
                      helperText={errors.koreanName && touched.koreanName ? errors.koreanName : ''}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Field name='meaning'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Meaning'
                      multiline
                      rows={2}
                      error={Boolean(errors.meaning && touched.meaning)}
                      helperText={errors.meaning && touched.meaning ? errors.meaning : ''}
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
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Rank'
                      placeholder='e.g., 8th Gup'
                      error={Boolean(errors.beltRank && touched.beltRank)}
                      helperText={errors.beltRank && touched.beltRank ? errors.beltRank : ''}
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
                <Field name='beltTextColor'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Text Color'
                      placeholder='e.g., #000000'
                      error={Boolean(errors.beltTextColor && touched.beltTextColor)}
                      helperText={
                        errors.beltTextColor && touched.beltTextColor ? errors.beltTextColor : ''
                      }
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
                <Field name='difficultyLevel'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Difficulty Level'
                      type='number'
                      inputProps={{ min: 1, max: 10 }}
                      error={Boolean(errors.difficultyLevel && touched.difficultyLevel)}
                      helperText={
                        errors.difficultyLevel && touched.difficultyLevel
                          ? errors.difficultyLevel
                          : 'Scale from 1-10'
                      }
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='videoLink'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Video Link'
                      placeholder='https://...'
                      error={Boolean(errors.videoLink && touched.videoLink)}
                      helperText={errors.videoLink && touched.videoLink ? errors.videoLink : ''}
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

export default FormDefinitionForm;
