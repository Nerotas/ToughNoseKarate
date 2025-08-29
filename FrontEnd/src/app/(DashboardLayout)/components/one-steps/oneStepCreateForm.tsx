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
import { IconSwords, IconArrowRight, IconMessage2 } from '@tabler/icons-react';
import * as Yup from 'yup';
import { BELT_RANKS } from 'constants/data/BeltRanks';
import { oneStepCreationValidationSchema } from 'utils/validation/schemas';

type OneStepCreate = Omit<OneStepDefinition, 'id'> & { id?: string };

const defaultValues: OneStepCreate = {
  id: undefined,
  name: '',
  description: '',
  beltRank: '',
  beltColor: '',
  followUpBeltRank: '',
  followUpBeltColor: '',
  secondFollowUpBeltRank: '',
  secondFollowUpBeltColor: '',
  defense: [],
  keyPoints: [],
  commonMistakes: [],
  firstFollowUp: [],
  secondFollowUp: [],
  comment: '',
};

interface OneStepCreateFormProps {
  refetchOneSteps: () => Promise<void>;
  handleCloseCreate: () => void;
}

const OneStepCreateForm = ({ refetchOneSteps, handleCloseCreate }: OneStepCreateFormProps) => {
  const onSubmit = async (values: OneStepCreate) => {
    const { id, ...payload } = values;

    // Normalize array fields to ensure empty arrays are properly handled
    const normalizedPayload = {
      ...payload,
      defense: Array.isArray(payload.defense)
        ? payload.defense.filter((item) => item && item.trim())
        : [],
      keyPoints: Array.isArray(payload.keyPoints)
        ? payload.keyPoints.filter((item) => item && item.trim())
        : [],
      commonMistakes: Array.isArray(payload.commonMistakes)
        ? payload.commonMistakes.filter((item) => item && item.trim())
        : [],
      firstFollowUp: Array.isArray(payload.firstFollowUp)
        ? payload.firstFollowUp.filter((item) => item && item.trim())
        : [],
      secondFollowUp: Array.isArray(payload.secondFollowUp)
        ? payload.secondFollowUp.filter((item) => item && item.trim())
        : [],
    };

    await axiosInstance.post(`/onestep-definitions`, normalizedPayload);
    await refetchOneSteps();
    handleCloseCreate();
  };

  return (
    <Formik
      initialValues={defaultValues}
      oneStepCreationValidationSchema={oneStepCreationValidationSchema}
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
                <Typography variant='h6' gutterBottom>
                  <IconSwords size={24} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Defense Technique
                </Typography>
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
                <Typography variant='h6' gutterBottom>
                  <IconArrowRight size={24} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Follow-Up Techniques
                </Typography>

                <Stack spacing={3}>
                  {/* First Follow-up */}
                  <Box>
                    <Typography variant='subtitle1' gutterBottom>
                      First Follow-Up
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Field name='followUpBeltRank'>
                          {({ field }: any) => (
                            <FormControl fullWidth>
                              <InputLabel>Belt Rank</InputLabel>
                              <Select {...field} label='Belt Rank' value={field.value || ''}>
                                {BELT_RANKS.map((belt) => (
                                  <MenuItem key={belt.beltRank} value={belt.beltRank}>
                                    {belt.beltRank}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Field name='followUpBeltColor'>
                          {({ field }: any) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Belt Color'
                              placeholder='e.g., Yellow'
                              error={Boolean(errors.beltColor && touched.beltColor)}
                              helperText={
                                errors.beltColor && touched.beltColor ? errors.beltColor : ''
                              }
                              required
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid size={12}>
                        <FieldArray name='firstFollowUp'>
                          {({ push, remove }) => (
                            <Box>
                              <Typography variant='body2' gutterBottom>
                                Follow-Up Steps
                              </Typography>
                              <Stack spacing={2}>
                                {values.firstFollowUp?.map((_, index) => (
                                  <Box
                                    key={`first-follow-${index}`}
                                    display='flex'
                                    alignItems='center'
                                    gap={1}
                                  >
                                    <Field name={`firstFollowUp.${index}`}>
                                      {({ field }: any) => (
                                        <TextField
                                          {...field}
                                          fullWidth
                                          label={`Step #${index + 1}`}
                                          size='small'
                                        />
                                      )}
                                    </Field>
                                    <IconButton
                                      onClick={() => remove(index)}
                                      color='error'
                                      size='small'
                                    >
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
                                  Add Step
                                </Button>
                              </Stack>
                            </Box>
                          )}
                        </FieldArray>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Second Follow-up */}
                  <Box>
                    <Typography variant='subtitle1' gutterBottom>
                      Second Follow-Up
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Field name='secondFollowUpBeltRank'>
                          {({ field }: any) => (
                            <FormControl fullWidth>
                              <InputLabel>Belt Rank</InputLabel>
                              <Select {...field} label='Belt Rank' value={field.value || ''}>
                                {BELT_RANKS.map((belt) => (
                                  <MenuItem key={belt.beltRank} value={belt.beltRank}>
                                    {belt.beltRank}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Field name='secondFollowUpBeltColor'>
                          {({ field }: any) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Belt Color'
                              placeholder='e.g., Yellow'
                              error={Boolean(errors.beltColor && touched.beltColor)}
                              helperText={
                                errors.beltColor && touched.beltColor ? errors.beltColor : ''
                              }
                              required
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid size={12}>
                        <FieldArray name='secondFollowUp'>
                          {({ push, remove }) => (
                            <Box>
                              <Typography variant='body2' gutterBottom>
                                Follow-Up Steps
                              </Typography>
                              <Stack spacing={2}>
                                {values.secondFollowUp?.map((_, index) => (
                                  <Box
                                    key={`second-follow-${index}`}
                                    display='flex'
                                    alignItems='center'
                                    gap={1}
                                  >
                                    <Field name={`secondFollowUp.${index}`}>
                                      {({ field }: any) => (
                                        <TextField
                                          {...field}
                                          fullWidth
                                          label={`Step #${index + 1}`}
                                          size='small'
                                        />
                                      )}
                                    </Field>
                                    <IconButton
                                      onClick={() => remove(index)}
                                      color='error'
                                      size='small'
                                    >
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
                                  Add Step
                                </Button>
                              </Stack>
                            </Box>
                          )}
                        </FieldArray>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Grid>

              <Grid size={12}>
                <Typography variant='h6' gutterBottom>
                  <IconMessage2 size={24} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Comments
                </Typography>
                <Field name='comment'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Comments'
                      multiline
                      rows={3}
                      error={Boolean(errors.comment && touched.comment)}
                      helperText={errors.comment && touched.comment ? (errors as any).comment : ''}
                    />
                  )}
                </Field>
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
