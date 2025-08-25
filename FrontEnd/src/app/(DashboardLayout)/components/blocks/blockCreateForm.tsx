import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { CreateBlockDefinitionDto } from 'models/Blocks/Blocks';
import * as Yup from 'yup';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface BlockCreateFormProps {
  refetchBlocks: () => Promise<void>;
  handleCloseCreate: () => void;
}

const validationSchema = Yup.object({
  blockName: Yup.string().required('Block name is required'),
  technique: Yup.string().required('Technique is required'),
  stance: Yup.string().required('Stance is required'),
  beltRank: Yup.string().required('Belt is required'),
  beltColor: Yup.string().required('Belt color is required'),
  execution: Yup.array().of(Yup.string()),
  keyPoints: Yup.array().of(Yup.string()),
  commonMistakes: Yup.array().of(Yup.string()),
  applications: Yup.array().of(Yup.string()),
});

const BlockCreateForm = ({ refetchBlocks, handleCloseCreate }: BlockCreateFormProps) => {
  const initialValues: CreateBlockDefinitionDto = {
    blockName: '',
    technique: '',
    stance: '',
    beltRank: '',
    beltColor: '',
    execution: [''],
    keyPoints: [''],
    commonMistakes: [''],
    applications: [''],
  };

  const onSubmit = async (values: CreateBlockDefinitionDto) => {
    // Filter out empty strings from arrays
    const cleanedValues = {
      ...values,
      execution: values.execution.filter((item) => item.trim() !== ''),
      keyPoints: values.keyPoints.filter((item) => item.trim() !== ''),
      commonMistakes: values.commonMistakes.filter((item) => item.trim() !== ''),
      applications: values.applications.filter((item) => item.trim() !== ''),
    };

    await axiosInstance.post('/blocks-definitions', cleanedValues);
    await refetchBlocks();
    handleCloseCreate();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
                <Field name='blockName'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Block Name'
                      error={Boolean(errors.blockName && touched.blockName)}
                      helperText={errors.blockName && touched.blockName ? errors.blockName : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='technique'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Technique'
                      error={Boolean(errors.technique && touched.technique)}
                      helperText={errors.technique && touched.technique ? errors.technique : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='stance'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Stance'
                      error={Boolean(errors.stance && touched.stance)}
                      helperText={errors.stance && touched.stance ? errors.stance : ''}
                      required
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='beltRank'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Rank'
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
                      label='Belt Color (Hex)'
                      error={Boolean(errors.beltColor && touched.beltColor)}
                      helperText={errors.beltColor && touched.beltColor ? errors.beltColor : ''}
                      placeholder='#FFFFFF'
                      required
                    />
                  )}
                </Field>
              </Grid>

              {/* Execution Steps */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Execution Steps
                </Typography>
                <FieldArray name='execution'>
                  {({ remove, push }) => (
                    <Box>
                      {values.execution.map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Field name={`execution.${index}`}>
                            {({ field }: any) => (
                              <TextField
                                {...field}
                                fullWidth
                                label={`Step ${index + 1}`}
                                variant='outlined'
                                sx={{ mr: 1 }}
                              />
                            )}
                          </Field>
                          <IconButton
                            onClick={() => remove(index)}
                            color='error'
                            aria-label='delete'
                            disabled={values.execution.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        onClick={() => push('')}
                        startIcon={<AddIcon />}
                        variant='outlined'
                        sx={{ mb: 2 }}
                      >
                        Add Execution Step
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Key Points */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Key Points
                </Typography>
                <FieldArray name='keyPoints'>
                  {({ remove, push }) => (
                    <Box>
                      {values.keyPoints.map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Field name={`keyPoints.${index}`}>
                            {({ field }: any) => (
                              <TextField
                                {...field}
                                fullWidth
                                label={`Key Point ${index + 1}`}
                                variant='outlined'
                                sx={{ mr: 1 }}
                              />
                            )}
                          </Field>
                          <IconButton
                            onClick={() => remove(index)}
                            color='error'
                            aria-label='delete'
                            disabled={values.keyPoints.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        onClick={() => push('')}
                        startIcon={<AddIcon />}
                        variant='outlined'
                        sx={{ mb: 2 }}
                      >
                        Add Key Point
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Common Mistakes */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Common Mistakes
                </Typography>
                <FieldArray name='commonMistakes'>
                  {({ remove, push }) => (
                    <Box>
                      {values.commonMistakes.map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Field name={`commonMistakes.${index}`}>
                            {({ field }: any) => (
                              <TextField
                                {...field}
                                fullWidth
                                label={`Common Mistake ${index + 1}`}
                                variant='outlined'
                                sx={{ mr: 1 }}
                              />
                            )}
                          </Field>
                          <IconButton
                            onClick={() => remove(index)}
                            color='error'
                            aria-label='delete'
                            disabled={values.commonMistakes.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        onClick={() => push('')}
                        startIcon={<AddIcon />}
                        variant='outlined'
                        sx={{ mb: 2 }}
                      >
                        Add Common Mistake
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Applications */}
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Applications
                </Typography>
                <FieldArray name='applications'>
                  {({ remove, push }) => (
                    <Box>
                      {values.applications.map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Field name={`applications.${index}`}>
                            {({ field }: any) => (
                              <TextField
                                {...field}
                                fullWidth
                                label={`Application ${index + 1}`}
                                variant='outlined'
                                sx={{ mr: 1 }}
                              />
                            )}
                          </Field>
                          <IconButton
                            onClick={() => remove(index)}
                            color='error'
                            aria-label='delete'
                            disabled={values.applications.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        onClick={() => push('')}
                        startIcon={<AddIcon />}
                        variant='outlined'
                        sx={{ mb: 2 }}
                      >
                        Add Application
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Submit Button */}
              <Grid size={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={handleCloseCreate} variant='outlined'>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Block'}
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

export default BlockCreateForm;
