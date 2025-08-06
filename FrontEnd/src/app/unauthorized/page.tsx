'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, CardContent, Typography, Button, Box, Alert } from '@mui/material';
import { Lock, Home, Login } from '@mui/icons-material';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box mb={3}>
            <Lock sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant='h4' component='h1' gutterBottom>
              Access Denied
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              You don't have permission to access this page.
            </Typography>
          </Box>

          <Alert severity='warning' sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant='body2'>
              This page requires special permissions. Please contact your administrator if you
              believe this is an error.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant='outlined' startIcon={<Home />} onClick={handleGoHome}>
              Go Home
            </Button>
            <Button variant='contained' startIcon={<Login />} onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UnauthorizedPage;
