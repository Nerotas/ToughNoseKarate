import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  beltOrder: Yup.number().min(1, 'Must be at least 1').required('Required'),
  beltRank: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  forms: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  stances: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  blocks: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  punches: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  kicks: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  jumps: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  falling: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  oneSteps: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  selfDefense: Yup.array(Yup.string().trim().max(100, 'Too long')).default([]),
  comments: Yup.string().trim().max(500, 'Too long').optional(),
  color: Yup.string().trim().max(7, 'Must be hex color').optional(),
  textColor: Yup.string().trim().max(7, 'Must be hex color').optional(),
});

const defaultValues: BeltRequirements = {
  beltOrder: 1,
  beltRank: '',
  forms: [],
  stances: [],
  blocks: [],
  punches: [],
  kicks: [],
  jumps: [],
  falling: [],
  oneSteps: [],
  selfDefense: [],
  comments: '',
  color: '',
  textColor: '',
};

interface BeltRequirementsCreateFormProps {
  refetchBeltRequirements: () => Promise<void>;
  handleCloseCreate: () => void;
}

const BeltRequirementsCreateForm = ({
  refetchBeltRequirements,
  handleCloseCreate,
}: BeltRequirementsCreateFormProps) => {
  const onSubmit = async (values: BeltRequirements) => {
    await axiosInstance.post(`/belt-requirements`, values);
    await refetchBeltRequirements();
    handleCloseCreate();
  };

  type ArrayFieldNames = keyof Pick<
    BeltRequirements,
    | 'forms'
    | 'stances'
    | 'blocks'
    | 'punches'
    | 'kicks'
    | 'jumps'
    | 'falling'
    | 'oneSteps'
    | 'selfDefense'
  >;

  const ArrayFieldSection: React.FC<{
    name: ArrayFieldNames;
    title: string;
    placeholder?: string;
  }> = ({ name, title, placeholder }) => (
    <Grid size={12}>
      <FieldArray name={name}>
        {({ push, remove, form }) => {
          const list = form.values[name] as string[] | undefined;
          return (
            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle1' gutterBottom>
                {title}
              </Typography>
              <Stack spacing={1}>
                {list?.map((_, idx) => (
                  <Box key={`${name}-${idx}`} display='flex' gap={1} alignItems='center'>
                    <Field name={`${name}.${idx}`}>
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          fullWidth
                          size='small'
                          label={`${title} #${idx + 1}`}
                          placeholder={placeholder}
                        />
                      )}
                    </Field>
                    <IconButton size='small' color='error' onClick={() => remove(idx)}>
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<AddIcon />}
                  onClick={() => push('')}
                >
                  Add {title.replace(/s$/, '')}
                </Button>
              </Stack>
            </Box>
          );
        }}
      </FieldArray>
    </Grid>
  );

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
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Basic Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='beltOrder'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Belt Order'
                      required
                      error={Boolean(errors.beltOrder && touched.beltOrder)}
                      helperText={
                        errors.beltOrder && touched.beltOrder ? (errors as any).beltOrder : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <Field name='beltRank'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Rank'
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
                <Field name='color'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Belt Color (Hex)'
                      placeholder='#000000'
                      error={Boolean(errors.color && touched.color)}
                      helperText={errors.color && touched.color ? (errors as any).color : ''}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='textColor'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Text Color (Hex)'
                      placeholder='#FFFFFF'
                      error={Boolean(errors.textColor && touched.textColor)}
                      helperText={
                        errors.textColor && touched.textColor ? (errors as any).textColor : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='comments'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Comments'
                      error={Boolean(errors.comments && touched.comments)}
                      helperText={
                        errors.comments && touched.comments ? (errors as any).comments : ''
                      }
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                  Requirements
                </Typography>
              </Grid>

              <ArrayFieldSection name='forms' title='Forms' />
              <ArrayFieldSection name='stances' title='Stances' />
              <ArrayFieldSection name='blocks' title='Blocks' />
              <ArrayFieldSection name='punches' title='Punches' />
              <ArrayFieldSection name='kicks' title='Kicks' />
              <ArrayFieldSection name='jumps' title='Jumps' />
              <ArrayFieldSection name='falling' title='Falling Techniques' />
              <ArrayFieldSection name='oneSteps' title='One Steps' />
              <ArrayFieldSection name='selfDefense' title='Self Defense' />

              <Grid size={12}>
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button onClick={handleCloseCreate} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Belt Requirements'}
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

export default BeltRequirementsCreateForm;
