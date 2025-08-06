import React from 'react';
import {
  Box,
  Drawer,
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
import { Menuitems } from './MenuItems';
import Logo from '../shared/logo/Logo';

interface MenuItemType {
  id?: string;
  title?: string;
  icon?: React.ComponentType<{ stroke?: number; size?: string }>;
  href?: string;
  subheader?: string;
  navlabel?: boolean;
}

interface SimpleSidebarProps {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const SimpleSidebar = ({
  isSidebarOpen,
  isMobileSidebarOpen,
  onSidebarClose,
}: SimpleSidebarProps) => {
  const pathname = usePathname();
  const sidebarWidth = '270px';

  const renderMenuItems = () => {
    return Menuitems.map((item: MenuItemType) => {
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
    }).filter(Boolean);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 1 }}>{renderMenuItems()}</List>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant='permanent'
        open={isSidebarOpen}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant='temporary'
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SimpleSidebar;
