import React from 'react';
import { Menuitems, AuthMenuItems } from './MenuItems';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../shared/logo/Logo';
import { useAuth } from '../../../../contexts/AuthContext';

const SidebarItems = () => {
  const pathname = usePathname();
  const { isAuthenticated, instructor } = useAuth();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {Menuitems.map((item) => {
          if (item.subheader) {
            return (
              <React.Fragment key={item.subheader}>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant='caption'
                  sx={{
                    px: 3,
                    py: 1,
                    color: 'text.secondary',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                  }}
                >
                  {item.subheader}
                </Typography>
              </React.Fragment>
            );
          }

          if (!item.icon || !item.href || !item.title) {
            return null;
          }

          const Icon = item.icon;
          const isSelected = pathname === item.href;

          return (
            <ListItem key={item.id} disablePadding sx={{ px: 2 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <Icon stroke={1.5} size='1.3rem' />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        }).filter(Boolean)}

        {isAuthenticated &&
          AuthMenuItems.map((item) => {
            if (item.subheader) {
              return (
                <React.Fragment key={item.subheader}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant='caption'
                    sx={{
                      px: 3,
                      py: 1,
                      color: 'text.secondary',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    }}
                  >
                    {item.subheader}
                  </Typography>
                </React.Fragment>
              );
            }

            if (!item.icon || !item.href || !item.title) {
              return null;
            }

            const Icon = item.icon;
            const isSelected = pathname === item.href;

            return (
              <ListItem key={item.id} disablePadding sx={{ px: 2 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isSelected}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <Icon stroke={1.5} size='1.3rem' />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          }).filter(Boolean)}

        {/* Admin-only menu items */}
        {/* {isAuthenticated && instructor?.role === 'admin' && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='caption'
              sx={{
                px: 3,
                py: 1,
                color: 'text.secondary',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              ADMIN
            </Typography>
            <ListItem disablePadding sx={{ px: 2 }}>
              <ListItemButton
                component={Link}
                href='/admin/instructors'
                selected={pathname === '/admin/instructors'}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <Typography>👥</Typography>
                </ListItemIcon>
                <ListItemText primary='Manage Instructors' />
              </ListItemButton>
            </ListItem>
          </>
        )} */}

        {/* User info section at bottom */}
        {isAuthenticated && (
          <Box sx={{ mt: 'auto', p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant='caption' color='text.secondary' display='block'>
              Signed in as
            </Typography>
            <Typography variant='body2' fontWeight='medium'>
              {instructor?.firstName} {instructor?.lastName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {instructor?.role?.toUpperCase()} • {instructor?.email}
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default SidebarItems;
