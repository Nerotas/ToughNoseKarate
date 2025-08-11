'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { InstructorProfile } from '../models/Auth/Auth';
import { useRef } from 'react';

// Auth query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// Main auth hook
export const useAuth = () => {
  const queryClient = useQueryClient();

  // Guards against concurrent force logout / refresh loops
  const forcingLogoutRef = useRef(false);
  const refreshInFlightRef = useRef(false);

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

  // Centralized force logout (used by explicit logout and refresh failure)
  const forceLogout = async (reason?: string) => {
    if (forcingLogoutRef.current) return;
    forcingLogoutRef.current = true;
    try {
      // Cancel any pending auth queries first to avoid refetch-after-clear race
      await queryClient.cancelQueries({ queryKey: authKeys.all });
      // Best‑effort backend logout (ignore errors)
      try {
        await authService.logout();
      } catch {}
      // Clear cached user
      queryClient.setQueryData(authKeys.profile(), null);
      // Optionally remove all auth queries (after nulling)
      queryClient.removeQueries({ queryKey: authKeys.all });
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.log('🔒 Forced logout', reason ? `(${reason})` : '');
      }
    } finally {
      forcingLogoutRef.current = false;
    }
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      // Update the profile query with the instructor data
      queryClient.setQueryData<InstructorProfile | null>(
        authKeys.profile(),
        data.instructor as any
      );
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.log(`✅ Login successful: ${data.instructor.email}`);
      }
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await forceLogout('user_initiated');
    },
  });

  // Refresh token mutation
  const refreshMutation = useMutation({
    mutationFn: async () => {
      if (refreshInFlightRef.current) return;
      refreshInFlightRef.current = true;
      try {
        await authService.refreshToken();
      } finally {
        refreshInFlightRef.current = false;
      }
    },
    onSuccess: () => {
      // Refresh the profile query to get updated data
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.log('✅ Token refreshed');
      }
    },
    onError: async (err) => {
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.warn('🔁 Refresh failed, forcing logout', err);
      }
      await forceLogout('refresh_failed');
    },
  });

  // Helper functions
  const login = async (email: string, password: string): Promise<void> => {
    await loginMutation.mutateAsync({ email, password });
    // Optionally refetch to confirm cookie-based profile
    await updateProfile();
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshToken = async (): Promise<void> => {
    await refreshMutation.mutateAsync();
  };

  const isAuthenticated = !!instructor && !error;

  // Combined loading state
  const isAuthLoading =
    isLoading || loginMutation.isPending || logoutMutation.isPending || refreshMutation.isPending;

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
