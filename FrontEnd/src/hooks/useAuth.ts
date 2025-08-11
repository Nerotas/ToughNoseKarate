'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { InstructorProfile } from '../models/Auth/Auth';
import { useEffect, useRef } from 'react';

// Auth query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => ['auth', 'profile'] as const,
};

// Main auth hook
export const useAuth = () => {
  const qc = useQueryClient();
  const initializedRef = useRef(false);

  // Lazy profile query – only enabled after first explicit load trigger
  const {
    data: instructor,
    isFetching: profileFetching,
    refetch: refetchProfile,
    status: profileStatus,
    error: profileError,
  } = useQuery({
    queryKey: authKeys.profile(),
    queryFn: authService.getProfile,
    enabled: false,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,
  });

  const primeProfile = async () => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      await refetchProfile();
    } else {
      await qc.invalidateQueries({ queryKey: authKeys.profile() });
      await refetchProfile();
    }
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: async (data) => {
      // Optimistically set instructor
      qc.setQueryData<InstructorProfile | null>(authKeys.profile(), {
        ...(data.instructor as any),
        isActive: true,
        createdAt: new Date(),
        // add other required fields with defaults if needed
      });
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.log(
          'Login success – optimistic set. Refetching profile for cookie confirmation...'
        );
      }
      await primeProfile(); // confirm cookie-based auth
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authService.logout().catch(() => undefined);
    },
    onSettled: () => {
      qc.setQueryData(authKeys.profile(), null);
    },
  });

  // Refresh token mutation
  const refreshMutation = useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: () => qc.invalidateQueries({ queryKey: authKeys.profile() }),
    onError: () => {
      qc.setQueryData(authKeys.profile(), null);
    },
  });

  // Helper functions
  const login = async (email: string, password: string): Promise<void> => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => logoutMutation.mutate();
  const refreshToken = () => refreshMutation.mutateAsync();

  const isAuthenticated = !!instructor && profileStatus !== 'error' && !logoutMutation.isPending;

  useEffect(() => {
    console.log('Profile query result:', instructor, profileStatus, profileError);
  }, [instructor, profileStatus, profileError]);

  useEffect(() => {
    if (instructor && Object.keys(instructor).length === 0) {
      // Treat empty object as unauthenticated
      qc.setQueryData(authKeys.profile(), null);
    }
  }, [instructor]);

  return {
    // State
    instructor: instructor || null,
    isAuthenticated,
    isAuthLoading:
      loginMutation.isPending ||
      profileFetching ||
      refreshMutation.isPending ||
      logoutMutation.isPending,

    // Actions
    login,
    logout,
    refreshToken,
    ensureProfile: primeProfile,

    // Errors
    loginError: loginMutation.error,
    profileError,
  };
};

// Type for the hook return value
export type UseAuthReturn = ReturnType<typeof useAuth>;
