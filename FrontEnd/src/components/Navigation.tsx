'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Chip,
} from '@mui/material';
import { AccountCircle, ExitToApp, Settings, AdminPanelSettings } from '@mui/icons-material';

const Navigation: React.FC = () => {
  const { instructor, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    router.push('/auth/login');
  };

  const handleProfile = () => {
    handleProfileMenuClose();
    router.push('/profile');
  };

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'error' : 'primary';
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <AdminPanelSettings /> : <AccountCircle />;
  };

  if (!isAuthenticated) {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Tough Nose Karate
          </Typography>
          <Button color='inherit' onClick={() => router.push('/auth/login')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Tough Nose Karate
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
          <Button color='inherit' onClick={() => router.push('/students')}>
            Students
          </Button>
          <Button color='inherit' onClick={() => router.push('/assessments')}>
            Assessments
          </Button>
          <Button color='inherit' onClick={() => router.push('/families')}>
            Families
          </Button>
          {instructor?.role === 'admin' && (
            <Button color='inherit' onClick={() => router.push('/admin')}>
              Admin
            </Button>
          )}
        </Box>

        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={getRoleIcon(instructor?.role || 'instructor')}
            label={instructor?.role?.toUpperCase()}
            color={getRoleColor(instructor?.role || 'instructor')}
            size='small'
            variant='outlined'
            sx={{ color: 'white', borderColor: 'white' }}
          />

          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls='profile-menu'
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {instructor ? getInitials(instructor.firstName, instructor.lastName) : 'U'}
            </Avatar>
          </IconButton>

          <Menu
            id='profile-menu'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem disabled>
              <Typography variant='subtitle2'>
                {instructor?.firstName} {instructor?.lastName}
              </Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant='body2' color='text.secondary'>
                {instructor?.email}
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleProfile}>
              <Settings sx={{ mr: 1 }} />
              Profile Settings
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
