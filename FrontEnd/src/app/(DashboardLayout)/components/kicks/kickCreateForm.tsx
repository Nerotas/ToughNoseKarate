import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { KickDefinition } from 'models/Kicks/Kicks';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { getBeltColor, getBeltTextColor } from 'utils/helpers/BeltColors';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

type KickCreate = Omit<KickDefinition, 'id'> & { id?: string };

const defaultValues: KickCreate = {
  id: undefined,
  name: '',
  korean: '',
  description: '',
  beltRank: '',
  target: '',
  execution: [],
  keyPoints: [],
  commonMistakes: [],
  applications: [],
};

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  korean: Yup.string().trim().max(100, 'Too long').optional(),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  target: Yup.string().trim().max(200, 'Too long').optional(),
  execution: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
});

interface KickCreateFormProps {
  refetchKicks: () => Promise<void>;
  handleCloseCreate: () => void;
}

const KickCreateForm = ({ refetchKicks, handleCloseCreate }: KickCreateFormProps) => {
  const onSubmit = async (values: KickCreate) => {
    const { id, ...payload } = values;
    const payloadWithColors = {
      ...payload,
      beltColor: getBeltColor(values.beltRank),
      beltTextColor: getBeltTextColor(values.beltRank),
    };
    await axiosInstance.post(`/kicks-definitions`, payloadWithColors);
    await refetchKicks();
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

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='target'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Target'
                      multiline
                      rows={2}
                      error={Boolean((errors as any).target && (touched as any).target)}
                      helperText={
                        (errors as any).target && (touched as any).target
                          ? (errors as any).target
                          : ''
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
                <Field name='technique'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Technique'
                      multiline
                      rows={3}
                      error={Boolean((errors as any).technique && (touched as any).technique)}
                      helperText={
                        (errors as any).technique && (touched as any).technique
                          ? (errors as any).technique
                          : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field name='bodyMechanics'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Body Mechanics'
                      multiline
                      rows={3}
                      error={Boolean(
                        (errors as any).bodyMechanics && (touched as any).bodyMechanics
                      )}
                      helperText={
                        (errors as any).bodyMechanics && (touched as any).bodyMechanics
                          ? (errors as any).bodyMechanics
                          : ''
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
                <FieldArray name='execution'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Execution Steps
                      </Typography>
                      <Stack spacing={2}>
                        {values.execution?.map((_, index) => (
                          <Box key={`exec-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`execution.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Execution Step #${index + 1}`}
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

              <Grid size={12}>
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button onClick={handleCloseCreate} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Kick'}
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

export default KickCreateForm;
