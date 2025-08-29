import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { BlockDefinition } from 'models/Blocks/Blocks';
import * as Yup from 'yup';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack, Chip } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getBeltColor } from 'utils/helpers/BeltColors';

interface BlockFormProps {
  block: BlockDefinition;
  refetchBlocks: () => Promise<void>;
  handleCloseEdit: () => void;
}

const validationSchema = Yup.object({
  blockName: Yup.string().required('Block name is required'),
  technique: Yup.string().required('Technique is required'),
  stance: Yup.string().required('Stance is required'),
  beltRank: Yup.string().required('Belt is required'),
  execution: Yup.array().of(Yup.string()),
  keyPoints: Yup.array().of(Yup.string()),
  commonMistakes: Yup.array().of(Yup.string()),
  applications: Yup.array().of(Yup.string()),
});

const BlockForm = ({ block, refetchBlocks, handleCloseEdit }: BlockFormProps) => {
  const initialValues: BlockDefinition = {
    id: block.id,
    blockName: block.blockName || '',
    technique: block.technique || '',
    stance: block.stance || '',
    beltRank: block.beltRank || '',
    execution: block.execution || [],
    keyPoints: block.keyPoints || [],
    commonMistakes: block.commonMistakes || [],
    applications: block.applications || [],
  };

  const onSubmit = async (values: BlockDefinition) => {
    // Calculate beltColor from beltRank before submitting
    const updatedValues = {
      ...values,
      beltColor: getBeltColor(values.beltRank),
    };
    await axiosInstance.patch(`/blocks-definitions/${values.id}`, updatedValues);
    await refetchBlocks();
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
                  <Button onClick={handleCloseEdit} variant='outlined'>
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

export default BlockForm;
