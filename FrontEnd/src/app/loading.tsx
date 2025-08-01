'use client';

import { Container, Box } from '@mui/material';
import { IconKarate } from '@tabler/icons-react';
import { keyframes } from '@mui/system';

// Spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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
        <IconKarate
          size={48}
          style={{
            animation: `${spin} 2s linear infinite`,
          }}
        />
      </Box>
    </Container>
  );
};

export default Loading;
