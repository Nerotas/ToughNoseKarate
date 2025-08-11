'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress, Box, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'instructor' | 'admin';
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = '/auth/login',
}) => {
  const { isAuthenticated, isAuthLoading, instructor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to complete
    console.log('instructor', instructor);
    console.log('isAuthenticated', isAuthenticated);

    if (isAuthLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      console.log('🔒 Access denied: User not authenticated');
      router.push(fallbackPath);
      return;
    }

    // Check role requirements
    if (requiredRole && instructor?.role !== requiredRole && instructor?.role !== 'admin') {
      console.log(
        `🔒 Access denied: Required role '${requiredRole}', user has '${instructor?.role}'`
      );
      router.push('/unauthorized');
      return;
    }

    // Check if instructor or role is missing
    if (!instructor || !instructor.role) {
      console.log('🔒 Access denied: User not authenticated or role missing');
      router.push(fallbackPath);
      return;
    }

    console.log(`✅ Access granted: User ${instructor?.email} (${instructor?.role})`);
  }, [isAuthenticated, isAuthLoading, instructor, requiredRole, router, fallbackPath]);

  // Show loading spinner while checking authentication
  if (isAuthLoading) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='50vh'
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant='h6' color='text.secondary'>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Check role-based access
  if (requiredRole && instructor?.role !== requiredRole && instructor?.role !== 'admin') {
    return null;
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;

// Convenience components for specific roles
export const InstructorRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole='instructor'>{children}</ProtectedRoute>
);

export const AdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole='admin'>{children}</ProtectedRoute>
);
