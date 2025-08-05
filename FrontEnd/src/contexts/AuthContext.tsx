'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

// Define the Instructor type
export interface Instructor {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'instructor' | 'admin';
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

// Define the context type
interface AuthContextType {
  // State
  instructor: Instructor | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateProfile: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // Validate token by fetching profile
          const profile = await authService.getProfile();
          setInstructor(profile);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // Invalid token, remove it
        localStorage.removeItem('accessToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);

      // Store token
      localStorage.setItem('accessToken', response.access_token);

      // Set instructor data
      setInstructor(response.instructor);

      console.log(`✅ Login successful: ${response.instructor.email}`);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw for component error handling
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    setInstructor(null);

    // Optional: Call backend logout endpoint
    authService.logout().catch(console.error);

    console.log('✅ Logout successful');
  };

  // Refresh token function
  const refreshToken = async (): Promise<void> => {
    try {
      const response = await authService.refreshToken();
      localStorage.setItem('accessToken', response.access_token);
      console.log('✅ Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout(); // Force logout on refresh failure
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (): Promise<void> => {
    try {
      const profile = await authService.getProfile();
      setInstructor(profile);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    instructor,
    isAuthenticated: !!instructor,
    isLoading,
    login,
    logout,
    refreshToken,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export types for use in other components
export type { AuthContextType };
