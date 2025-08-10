import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { SelfDefenseDefinition } from 'models/SelfDefense/SelfDefense';
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
  category: Yup.string()
    .oneOf(['Releases', 'Escapes', 'Submissions', 'Ground Control', 'Standing'])
    .required('Required'),
  difficulty: Yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced']).required('Required'),
  scenario: Yup.string().trim().max(500, 'Too long').optional(),
  technique: Yup.string().trim().max(500, 'Too long').optional(),
  setup: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  execution: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  safetyNotes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  applications: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  counters: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
});

interface SelfDefenseDefinitionFormProps {
  selfDefense: SelfDefenseDefinition;
  refetchSelfDefense: () => Promise<void>;
  handleCloseEdit: () => void;
}

const SelfDefenseDefinitionForm = ({
  selfDefense,
  refetchSelfDefense,
  handleCloseEdit,
}: SelfDefenseDefinitionFormProps) => {
  const initialValues: SelfDefenseDefinition = {
    id: selfDefense.id,
    name: selfDefense.name || '',
    korean: selfDefense.korean || '',
    description: selfDefense.description || '',
    belt: selfDefense.belt || '',
    beltColor: selfDefense.beltColor || '',
    category: selfDefense.category || 'Standing',
    difficulty: selfDefense.difficulty || 'Beginner',
    scenario: selfDefense.scenario || '',
    technique: selfDefense.technique || '',
    setup: selfDefense.setup || [],
    execution: selfDefense.execution || [],
    keyPoints: selfDefense.keyPoints || [],
    commonMistakes: selfDefense.commonMistakes || [],
    safetyNotes: selfDefense.safetyNotes || [],
    applications: selfDefense.applications || [],
    counters: selfDefense.counters || [],
  };

  const onSubmit = async (values: SelfDefenseDefinition) => {
    await axiosInstance.patch(`/self-defense-definitions/${values.id}`, values);
    await refetchSelfDefense();
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

              <Grid size={{ xs: 12, sm: 3 }}>
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

              <Grid size={{ xs: 12, sm: 3 }}>
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

              <Grid size={{ xs: 12, sm: 3 }}>
                <Field name='category'>
                  {({ field }: any) => (
                    <FormControl fullWidth error={Boolean(errors.category && touched.category)}>
                      <InputLabel>Category</InputLabel>
                      <Select {...field} label='Category' required>
                        <MenuItem value='Releases'>Releases</MenuItem>
                        <MenuItem value='Escapes'>Escapes</MenuItem>
                        <MenuItem value='Submissions'>Submissions</MenuItem>
                        <MenuItem value='Ground Control'>Ground Control</MenuItem>
                        <MenuItem value='Standing'>Standing</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <Field name='difficulty'>
                  {({ field }: any) => (
                    <FormControl fullWidth error={Boolean(errors.difficulty && touched.difficulty)}>
                      <InputLabel>Difficulty</InputLabel>
                      <Select {...field} label='Difficulty' required>
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
                <Field name='scenario'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Scenario'
                      multiline
                      rows={3}
                      error={Boolean(errors.scenario && touched.scenario)}
                      helperText={errors.scenario && touched.scenario ? errors.scenario : ''}
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
                      multiline
                      rows={3}
                      error={Boolean(errors.technique && touched.technique)}
                      helperText={errors.technique && touched.technique ? errors.technique : ''}
                    />
                  )}
                </Field>
              </Grid>

              {/* Setup */}
              <Grid size={12}>
                <FieldArray name='setup'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Setup
                      </Typography>
                      <Stack spacing={2}>
                        {values.setup?.map((_, index) => (
                          <Box key={`setup-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`setup.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Setup Step #${index + 1}`}
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
                          Add Setup Step
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Execution */}
              <Grid size={12}>
                <FieldArray name='execution'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Execution
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

              {/* Safety Notes */}
              <Grid size={12}>
                <FieldArray name='safetyNotes'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Safety Notes
                      </Typography>
                      <Stack spacing={2}>
                        {values.safetyNotes?.map((_, index) => (
                          <Box key={`safety-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`safetyNotes.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Safety Note #${index + 1}`}
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
                          Add Safety Note
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

              {/* Counters */}
              <Grid size={12}>
                <FieldArray name='counters'>
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant='subtitle1' gutterBottom>
                        Counters (Optional)
                      </Typography>
                      <Stack spacing={2}>
                        {values.counters?.map((_, index) => (
                          <Box key={`counter-${index}`} display='flex' alignItems='center' gap={1}>
                            <Field name={`counters.${index}`}>
                              {({ field }: any) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label={`Counter #${index + 1}`}
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
                          Add Counter
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

export default SelfDefenseDefinitionForm;
