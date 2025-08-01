'use client';

import { Container, Box } from '@mui/material';
import { IconKarate } from '@tabler/icons-react';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
  return (
    <Container>
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='200px'>
        <Box
          sx={{
            animation: `${spin} 2s linear infinite`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconKarate size={48} />
        </Box>
      </Box>
    </Container>
  );
};

export default Loader;
