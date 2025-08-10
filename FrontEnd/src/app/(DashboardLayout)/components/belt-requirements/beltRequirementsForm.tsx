import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { TextField, Button, Box, Typography, Grid, IconButton, Stack, Chip } from '@mui/material';
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

interface BeltRequirementsFormProps {
  beltRequirement: BeltRequirements;
  refetchBeltRequirements: () => Promise<void>;
  handleCloseEdit: () => void;
}

const BeltRequirementsForm = ({
  beltRequirement,
  refetchBeltRequirements,
  handleCloseEdit,
}: BeltRequirementsFormProps) => {
  const initialValues: BeltRequirements = {
    beltOrder: beltRequirement.beltOrder || 1,
    beltRank: beltRequirement.beltRank || '',
    forms: beltRequirement.forms || [],
    stances: beltRequirement.stances || [],
    blocks: beltRequirement.blocks || [],
    punches: beltRequirement.punches || [],
    kicks: beltRequirement.kicks || [],
    jumps: beltRequirement.jumps || [],
    falling: beltRequirement.falling || [],
    oneSteps: beltRequirement.oneSteps || [],
    selfDefense: beltRequirement.selfDefense || [],
    comments: beltRequirement.comments || '',
    color: beltRequirement.color || '',
    textColor: beltRequirement.textColor || '',
  };

  const onSubmit = async (values: BeltRequirements) => {
    await axiosInstance.patch(`/belt-Requirements/${values.beltRank}`, values);
    await refetchBeltRequirements();
    handleCloseEdit();
  };

  const ArrayFieldSection: React.FC<{
    name: string;
    title: string;
    placeholder?: string;
  }> = ({ name, title, placeholder }) => (
    <Grid size={12}>
      <FieldArray name={name}>
        {({ push, remove, form }) => {
          const list = (form.values as BeltRequirements)[name] as string[] | undefined;
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
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => remove(idx)}
                      aria-label={`remove-${name}-${idx}`}
                    >
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

              <Grid size={{ xs: 12, sm: 4 }}>
                <Field name='beltOrder'>
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Belt Order'
                      error={Boolean(errors.beltOrder && touched.beltOrder)}
                      helperText={errors.beltOrder && touched.beltOrder ? errors.beltOrder : ''}
                      required
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
                      error={Boolean(errors.beltRank && touched.beltRank)}
                      helperText={errors.beltRank && touched.beltRank ? errors.beltRank : ''}
                      required
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
                      helperText={errors.color && touched.color ? errors.color : ''}
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
                      helperText={errors.textColor && touched.textColor ? errors.textColor : ''}
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
                      helperText={errors.comments && touched.comments ? errors.comments : ''}
                    />
                  )}
                </Field>
              </Grid>

              {/* Requirements Sections */}
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

export default BeltRequirementsForm;
