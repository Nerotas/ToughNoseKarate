import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import { getBeltColor, getBeltTextColor } from 'utils/helpers/BeltColors';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  formName: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  koreanName: Yup.string().trim().max(100, 'Too long').optional(),
  meaning: Yup.string().trim().max(500, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  difficultyLevel: Yup.number().min(1).max(10).required('Required'),
  keyPoints: Yup.array().of(Yup.string().trim().max(500, 'Too long')).default([]),
  videoLink: Yup.string().trim().url('Must be a valid URL').optional(),
});

const defaultValues: Omit<FormDefinitions, 'id' | 'beltColor' | 'beltTextColor'> & { id?: number } =
  {
    id: undefined,
    formName: '',
    koreanName: '',
    meaning: '',
    beltRank: '',
    difficultyLevel: 1,
    description: '',
    keyPoints: [],
    videoLink: '',
  };

interface FormCreateFormProps {
  refetchForms: () => Promise<void>;
  handleCloseCreate: () => void;
}

const FormCreateForm = ({ refetchForms, handleCloseCreate }: FormCreateFormProps) => {
  const onSubmit = async (values: typeof defaultValues) => {
    const payload: FormDefinitions = {
      ...values,
      beltColor: getBeltColor(values.beltRank),
      beltTextColor: getBeltTextColor(values.beltRank),
    } as FormDefinitions;
    await axiosInstance.post(`/form-definitions`, payload);
    await refetchForms();
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
                <Field name='formName'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Form Name'
                      required
                      error={Boolean(errors.formName && touched.formName)}
                      helperText={
                        errors.formName && touched.formName ? (errors as any).formName : ''
                      }
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
                      helperText={
                        errors.koreanName && touched.koreanName ? (errors as any).koreanName : ''
                      }
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
                      helperText={errors.meaning && touched.meaning ? (errors as any).meaning : ''}
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
                      label='Belt Rank'
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
                      type='number'
                      label='Difficulty Level'
                      inputProps={{ min: 1, max: 10 }}
                      required
                      error={Boolean(errors.difficultyLevel && touched.difficultyLevel)}
                      helperText={
                        errors.difficultyLevel && touched.difficultyLevel
                          ? (errors as any).difficultyLevel
                          : 'Scale from 1-10'
                      }
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
                      helperText={
                        errors.videoLink && touched.videoLink ? (errors as any).videoLink : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <FieldArray name='keyPoints'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Key Points
                      </Typography>
                      <Stack spacing={2}>
                        {values.keyPoints &&
                          values.keyPoints.map((_, index) => (
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
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button onClick={handleCloseCreate} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Form'}
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

export default FormCreateForm;
