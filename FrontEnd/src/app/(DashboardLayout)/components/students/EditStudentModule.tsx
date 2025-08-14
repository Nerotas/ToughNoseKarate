import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Card,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { Student } from 'models/Students/Students';

interface EditStudentModuleProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  beltRequirements: BeltRequirements[];
  onStudentUpdated?: () => void;
}

interface StudentFormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  age: number | '';
  beltRank: string;
  email: string;
  phone: string;
  notes: string;
  active: boolean;
  child: boolean;
  eligibleForTesting: boolean;
  lastTestUTC: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  preferredName: Yup.string().max(50, 'Preferred name must be less than 50 characters'),
  age: Yup.number()
    .nullable()
    .min(1, 'Age must be at least 1')
    .max(100, 'Age must be less than 100'),
  beltRank: Yup.string().required('Belt rank is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(
    /^[\+]?[1-9][\d]{0,15}$|^[(]?[\d]{3}[)]?[-.\s]?[\d]{3}[-.\s]?[\d]{4}$/,
    'Invalid phone number format'
  ),
  notes: Yup.string().max(500, 'Notes must be less than 500 characters'),
  active: Yup.boolean().required(),
  child: Yup.boolean().required(),
  eligibleForTesting: Yup.boolean().required(),
  lastTestUTC: Yup.string().required('Last test date is required'),
});

const EditStudentModule = ({
  open,
  onClose,
  student,
  beltRequirements,
  onStudentUpdated,
}: EditStudentModuleProps) => {
  const [error, setError] = useState<string | null>(null);

  // Create initial values from student data
  const getInitialValues = (): StudentFormData => {
    if (!student) {
      return {
        firstName: '',
        lastName: '',
        preferredName: '',
        age: '',
        beltRank: 'white',
        email: '',
        phone: '',
        notes: '',
        active: true,
        child: false,
        eligibleForTesting: false,
        lastTestUTC: new Date().toISOString().split('T')[0], // Default to today
      };
    }

    return {
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      preferredName: student.preferredName || '',
      age: student.age || '',
      beltRank: student.beltRank || 'white',
      email: student.email || '',
      phone: student.phone || '',
      notes: student.notes || '',
      active: !!student.active,
      child: !!student.child,
      eligibleForTesting: !!student.eligibleForTesting,
      lastTestUTC: student.lastTestUTC
        ? new Date(student.lastTestUTC).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    };
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!student) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h5' component='div'>
          Edit Student: {student.firstName} {student.lastName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          key={student.studentid} // Force re-render when student changes
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setStatus, setSubmitting }): Promise<void> => {
            setError(null);

            try {
              // Prepare the data for API submission
              const submitData = {
                ...values,
                age: values.age === '' ? null : Number(values.age),
                active: values.active ? 1 : 0,
                child: values.child ? 1 : 0,
                eligibleForTesting: values.eligibleForTesting ? 1 : 0,
                lastTestUTC: new Date(values.lastTestUTC).toISOString(),
              };

              const response = await axiosInstance.patch(
                `/v1/students/${student.studentid}`,
                submitData
              );

              if (response.status !== 200) {
                throw new Error('Failed to update student');
              }

              // Only run these after successful PATCH completion
              setStatus({ success: true });

              // Call the callback to refresh student list
              if (onStudentUpdated) {
                onStudentUpdated();
              }

              onClose();
            } catch (err) {
              setError('Failed to update student. Please try again.');
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Personal Information */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary'>
                        Personal Information
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label='First Name'
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label='Last Name'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Preferred Name'
                        name='preferredName'
                        value={values.preferredName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.preferredName && Boolean(errors.preferredName)}
                        helperText={
                          (touched.preferredName && errors.preferredName) ||
                          'Optional - if different from first name'
                        }
                        variant='outlined'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Age'
                        name='age'
                        type='number'
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.age && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                        variant='outlined'
                        inputProps={{ min: 1, max: 100 }}
                      />
                    </Grid>

                    {/* Contact Information */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Contact Information
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label='Email'
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Phone'
                        name='phone'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        variant='outlined'
                        placeholder='(555) 123-4567'
                      />
                    </Grid>

                    {/* Martial Arts Information */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Martial Arts Information
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl
                        fullWidth
                        required
                        error={touched.beltRank && Boolean(errors.beltRank)}
                      >
                        <InputLabel>Current Belt Rank</InputLabel>
                        <Select
                          name='beltRank'
                          value={values.beltRank}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label='Current Belt Rank'
                        >
                          {beltRequirements
                            .sort((a, b) => a.beltOrder - b.beltOrder)
                            .map((belt) => (
                              <MenuItem key={belt.beltRank} value={belt.beltRank}>
                                {belt.beltRank} Belt
                              </MenuItem>
                            ))}
                        </Select>
                        {touched.beltRank && errors.beltRank && (
                          <Typography variant='caption' color='error' sx={{ mt: 0.5, ml: 2 }}>
                            {errors.beltRank}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label='Last Test Date'
                        name='lastTestUTC'
                        type='date'
                        value={values.lastTestUTC}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastTestUTC && Boolean(errors.lastTestUTC)}
                        helperText={touched.lastTestUTC && errors.lastTestUTC}
                        variant='outlined'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    {/* Settings */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Settings
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            name='child'
                            checked={values.child}
                            onChange={(e) => setFieldValue('child', e.target.checked)}
                            color='primary'
                          />
                        }
                        label='Child Student'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            name='active'
                            checked={values.active}
                            onChange={(e) => setFieldValue('active', e.target.checked)}
                            color='primary'
                          />
                        }
                        label='Active Student'
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            name='eligibleForTesting'
                            checked={values.eligibleForTesting}
                            onChange={(e) => setFieldValue('eligibleForTesting', e.target.checked)}
                            color='success'
                          />
                        }
                        label='Eligible for Testing'
                      />
                    </Grid>

                    {/* Notes */}
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label='Notes'
                        name='notes'
                        multiline
                        rows={3}
                        value={values.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.notes && Boolean(errors.notes)}
                        helperText={touched.notes && errors.notes}
                        variant='outlined'
                        placeholder='Any additional notes about the student...'
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <Grid container justifyContent='space-between'>
                      <Grid>
                        <Button onClick={handleClose} disabled={isSubmitting}>
                          Cancel
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          type='submit'
                          variant='contained'
                          disabled={!(isValid && dirty) || isSubmitting}
                        >
                          {isSubmitting ? 'Updating Student...' : 'Update Student'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentModule;
