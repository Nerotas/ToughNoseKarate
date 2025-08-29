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
import axiosInstance from 'utils/helpers/AxiosInstance';
import { Student, StudentFormData } from 'models/Students/Students';
import { editValidationSchema, getEditStudentInitialValues } from 'utils/helpers/Student';
import { BELT_RANKS } from 'constants/data/BeltRanks';

interface EditStudentModuleProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  onStudentUpdated?: () => void;
}

const EditStudentModule = ({
  open,
  onClose,
  student,
  onStudentUpdated,
}: EditStudentModuleProps) => {
  const [error, setError] = useState<string | null>(null);

  // Create initial values from student data

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
          initialValues={getEditStudentInitialValues(student)}
          validationSchema={editValidationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setStatus, setSubmitting }): Promise<void> => {
            setError(null);

            try {
              // Prepare the data for API submission
              const submitData: StudentFormData = {
                ...values,
                age: values.age === 0 ? null : Number(values.age),
                active: !!values.active,
                child: !!values.child,
                eligibleForTesting: !!values.eligibleForTesting,
                lastTestUTC: values.lastTestUTC ? new Date(values.lastTestUTC).toISOString() : null,
              };

              const response = await axiosInstance.patch(
                `/students/${student.studentid}`,
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
                          {BELT_RANKS.map((belt) => (
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
