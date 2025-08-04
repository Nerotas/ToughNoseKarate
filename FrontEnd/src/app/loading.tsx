'use client';

import { Container, Box } from '@mui/material';
import { IconKarate } from '@tabler/icons-react';

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
      </Box>
    </Container>
  );
};

export default Loading;
