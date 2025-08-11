'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { InstructorProfile } from '../models/Auth/Auth';

// Auth query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// Main auth hook
export const useAuth = () => {
  const queryClient = useQueryClient();

  // Profile query - this is our source of truth for authentication status
  const {
    data: instructor,
    isLoading,
    error,
    refetch: updateProfile,
  } = useQuery({
    queryKey: authKeys.profile(),
    queryFn: authService.getProfile,
    retry: false, // Don't retry on auth failures
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      // Update the profile query with the instructor data
      queryClient.setQueryData(authKeys.profile(), data.instructor);
      console.log(`✅ Login successful: ${data.instructor.email}`);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      console.log('✅ Logout successful');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Still clear queries even if backend call fails
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });

  // Refresh token mutation
  const refreshMutation = useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: () => {
      // Refresh the profile query to get updated data
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      console.log('✅ Token refreshed successfully');
    },
    onError: (error) => {
      console.error('Token refresh failed:', error);
      // Force logout on refresh failure
      logoutMutation.mutate();
    },
  });

  // Helper functions
  const login = async (email: string, password: string): Promise<void> => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshToken = async (): Promise<void> => {
    await refreshMutation.mutateAsync();
  };

  const isAuthenticated = !!instructor && !error;

  // Combined loading state
  const isAuthLoading = isLoading || loginMutation.isPending || logoutMutation.isPending;

  return {
    // State
    instructor: instructor || null,
    isAuthenticated,
    isLoading: isAuthLoading,

    // Actions
    login,
    logout,
    refreshToken,
    updateProfile,

    // Mutation states for more granular control
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isRefreshPending: refreshMutation.isPending,

    // Errors
    error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshMutation.error,
  };
};

// Type for the hook return value
export type UseAuthReturn = ReturnType<typeof useAuth>;
