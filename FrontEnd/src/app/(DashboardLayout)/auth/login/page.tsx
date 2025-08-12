'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'hooks/useAuth';

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setLoginError(null);
      await login(values.email, values.password);

      // Redirect to students page on successful login
      router.push('/students');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h4' component='h1' gutterBottom>
              Instructor Login
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Sign in to access the student management system
            </Typography>
          </Box>

          {loginError && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {loginError}
            </Alert>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Box mb={3}>
                  <Field
                    as={TextField}
                    name='email'
                    label='Email Address'
                    type='email'
                    fullWidth
                    variant='outlined'
                    error={touched.email && !!errors.email}
                    helperText={<ErrorMessage name='email' />}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Email color='action' />
                        </InputAdornment>
                      ),
                    }}
                    placeholder='instructor@toughnosekarate.com'
                  />
                </Box>

                <Box mb={3}>
                  <Field
                    as={TextField}
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant='outlined'
                    error={touched.password && !!errors.password}
                    helperText={<ErrorMessage name='password' />}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Lock color='action' />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge='end'
                            aria-label='toggle password visibility'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder='Enter your password'
                  />
                </Box>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  size='large'
                  disabled={isSubmitting}
                  sx={{ mt: 2, mb: 2, py: 1.5 }}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>
            )}
          </Formik>

          <Box mt={3} textAlign='center'>
            <Typography variant='body2' color='text.secondary'>
              Need help? Contact the system administrator
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
