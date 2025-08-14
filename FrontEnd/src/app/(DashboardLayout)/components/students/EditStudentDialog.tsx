import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import { Student, UpdateStudentRequest } from 'models/Students/Students';

interface EditStudentDialogProps {
  open: boolean;
  onClose: () => void;
  student: Student;
  beltRequirements: BeltRequirements[];
  onUpdate: (studentId: number, studentData: UpdateStudentRequest) => Promise<void>;
}

const studentValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required').max(45, 'First name too long'),
  lastName: Yup.string().required('Last name is required').max(45, 'Last name too long'),
  preferredName: Yup.string().max(45, 'Preferred name too long'),
  age: Yup.number().min(1, 'Age must be positive').max(150, 'Age must be reasonable'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().max(20, 'Phone number too long'),
  beltRank: Yup.string().required('Belt rank is required'),
  notes: Yup.string().max(500, 'Notes too long'),
});

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  open,
  onClose,
  student,
  beltRequirements,
  onUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: student.firstName || '',
    lastName: student.lastName || '',
    preferredName: student.preferredName || '',
    age: student.age || '',
    email: student.email || '',
    phone: student.phone || '',
    beltRank: student.beltRank || 'white',
    notes: student.notes || '',
    active: !!student.active,
    child: !!student.child,
    eligibleForTesting: !!student.eligibleForTesting,
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);

      const updateData: UpdateStudentRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        preferredName: values.preferredName || undefined,
        age: values.age ? parseInt(values.age) : undefined,
        email: values.email,
        phone: values.phone || undefined,
        beltRank: values.beltRank,
        notes: values.notes || undefined,
        active: values.active ? 1 : 0,
        child: values.child ? 1 : 0,
        eligibleForTesting: values.eligibleForTesting ? 1 : 0,
      };

      await onUpdate(student.studentid, updateData);
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h5'>
          Edit Student: {student.firstName} {student.lastName}
        </Typography>
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={studentValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid size={12}>
                  <Typography variant='h6' gutterBottom color='primary'>
                    Personal Information
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label='First Name'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    required
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
                    helperText={touched.preferredName && errors.preferredName}
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
                    inputProps={{ min: 1, max: 150 }}
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
                    fullWidth
                    label='Email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    required
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
                  />
                </Grid>

                {/* Training Information */}
                <Grid size={12}>
                  <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                    Training Information
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Belt Rank</InputLabel>
                    <Select
                      name='beltRank'
                      value={values.beltRank}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Belt Rank'
                    >
                      {beltRequirements
                        .sort((a, b) => a.beltOrder - b.beltOrder)
                        .map((belt) => (
                          <MenuItem key={belt.beltRank} value={belt.beltRank}>
                            {belt.beltRank} Belt
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Status Options */}
                <Grid size={12}>
                  <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                    Status & Settings
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.active}
                        onChange={(e) => setFieldValue('active', e.target.checked)}
                        name='active'
                      />
                    }
                    label='Active Student'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.child}
                        onChange={(e) => setFieldValue('child', e.target.checked)}
                        name='child'
                      />
                    }
                    label='Child Student'
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.eligibleForTesting}
                        onChange={(e) => setFieldValue('eligibleForTesting', e.target.checked)}
                        name='eligibleForTesting'
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
                    placeholder='Additional notes about the student...'
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditStudentDialog;
