import React from 'react';
import Menuitems from './MenuItems';
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

const SidebarItems = () => {
  const pathname = usePathname();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {Menuitems.map(item => {
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
      </List>
    </Box>
  );
};

export default SidebarItems;
