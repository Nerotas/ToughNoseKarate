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
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import axiosInstance from 'utils/helpers/AxiosInstance';

interface AddStudentModuleProps {
  open: boolean;
  onClose: () => void;
  beltRequirements: BeltRequirements[];
  onStudentAdded?: () => void;
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
});

const AddStudentModule = ({
  open,
  onClose,
  beltRequirements,
  onStudentAdded,
}: AddStudentModuleProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues: StudentFormData = {
    firstName: '',
    lastName: '',
    preferredName: '',
    age: '',
    beltRank: 'white', // Use lowercase to match database default
    email: '',
    phone: '',
    notes: '',
    active: true,
    child: false,
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h5' component='div'>
          Add New Student
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setStatus, setSubmitting }): Promise<void> => {
            setError(null);

            try {
              // Prepare the data for API submission
              const submitData = {
                ...values,
                // normalize optional strings
                preferredName: values.preferredName.trim() || null,
                phone: values.phone.trim() || null,
                notes: values.notes.trim() || null,
                age: values.age === '' ? null : Number(values.age),
                // KEEP booleans as booleans (no 0/1)
                active: values.active,
                child: values.child,
                eligibleForTesting: false,
                startDateUTC: new Date().toISOString(),
              };

              const response = await axiosInstance.post('/students', submitData);

              if (response.status !== 201) {
                throw new Error('Failed to add student');
              }

              // Only run these after successful POST completion
              resetForm();
              setStatus({ success: true });

              // Call the callback to refresh student list
              if (onStudentAdded) {
                onStudentAdded();
              }

              onClose();
            } catch (err) {
              setError('Failed to add student. Please try again.');
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
                        <InputLabel>Starting Belt Rank</InputLabel>
                        <Select
                          name='beltRank'
                          value={values.beltRank}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label='Starting Belt Rank'
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

                    {/* Settings */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Settings
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
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

                    <Grid size={{ xs: 12, sm: 6 }}>
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
                          {isSubmitting ? 'Adding Student...' : 'Add Student'}
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

export default AddStudentModule;
