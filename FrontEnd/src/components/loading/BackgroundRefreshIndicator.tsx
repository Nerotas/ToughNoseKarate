'use client';

import { Box, CircularProgress } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useIsFetching } from '@tanstack/react-query';

export default function BackgroundRefreshIndicator() {
  const refreshingQueries = useIsFetching({
    predicate: (query) => query.state.data !== undefined,
  });

  if (refreshingQueries === 0) return null;

  return (
    <Box
      role='status'
      aria-label='Refreshing content'
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        p: 1.5,
        display: 'flex',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '50%',
        boxShadow: 2,
        zIndex: (theme) => theme.zIndex.snackbar,
        pointerEvents: 'none',
        animation: 'show-refresh 150ms ease 200ms both',
        '@keyframes show-refresh': { from: { opacity: 0 }, to: { opacity: 1 } },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          '& .MuiCircularProgress-root, & .MuiCircularProgress-circle': { animation: 'none' },
        },
      }}
    >
      <CircularProgress size={20} aria-hidden='true' />
      <Box component='span' sx={visuallyHidden}>
        Refreshing content
      </Box>
    </Box>
  );
}
