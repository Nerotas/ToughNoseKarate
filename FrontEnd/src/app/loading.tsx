'use client';

import { Container, Box, Typography } from '@mui/material';
import { IconKarate } from '@tabler/icons-react';
import { randomSnippet } from 'constants/data/LoadingSnippets';

const Loading = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <Box
          sx={{
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(-360deg)',
              },
            },
          }}
        >
          <IconKarate size={48} />
        </Box>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ ml: 2 }}
          aria-live='polite'
          suppressHydrationWarning
        >
          {randomSnippet()}
        </Typography>
      </Box>
    </Container>
  );
};

export default Loading;
