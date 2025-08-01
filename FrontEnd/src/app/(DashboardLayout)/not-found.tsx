'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { IconKarate, IconHome, IconArrowLeft } from '@tabler/icons-react';
import { keyframes } from '@mui/system';
import Link from 'next/link';

// Karate kick animation
const karateKick = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-10deg) scale(1.1); }
  50% { transform: rotate(10deg) scale(1.2); }
  75% { transform: rotate(-5deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
`;

// Floating animation for belt
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export default function NotFound() {
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        {/* Animated Karate Icon */}
        <Box
          sx={{
            mb: 4,
            animation: `${karateKick} 2s ease-in-out infinite`,
          }}
        >
          <IconKarate size={120} color='#1976d2' />
        </Box>

        {/* 404 with martial arts styling */}
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #ff6b35)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          404
        </Typography>

        {/* Martial arts themed error message */}
        <Typography
          variant='h4'
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          Technique Not Found!
        </Typography>

        <Typography
          variant='h6'
          sx={{
            mb: 1,
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          "The page you seek is like a hidden technique..."
        </Typography>

        <Typography
          variant='body1'
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: '500px',
          }}
        >
          This page has mastered the art of invisibility. Even our black belt developers can't find
          it! Let's get you back to training.
        </Typography>

        {/* Floating belt divider */}
        <Box
          sx={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #000000, #8B4513, #FFD700)',
            borderRadius: '2px',
            mb: 4,
            animation: `${float} 3s ease-in-out infinite`,
          }}
        />

        {/* Action buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <Button
            variant='contained'
            size='large'
            startIcon={<IconHome />}
            component={Link}
            href='/'
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #21CBF3)',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #0288d1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 10px 2px rgba(25, 118, 210, .4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Return to Dojo
          </Button>

          <Button
            variant='outlined'
            size='large'
            startIcon={<IconArrowLeft />}
            onClick={() => window.history.back()}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Previous Stance
          </Button>
        </Stack>

        {/* Martial arts wisdom */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.05)',
            border: '1px solid rgba(25, 118, 210, 0.2)',
            maxWidth: '600px',
          }}
        >
          <Typography
            variant='body2'
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              mb: 1,
            }}
          >
            <strong>Martial Arts Wisdom:</strong>
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
            }}
          >
            "A true martial artist adapts to any situation. When the path is blocked, find another
            way. When a technique fails, learn from it. When a page is missing, return to basics and
            start again."
          </Typography>
        </Box>

        {/* Error code for developers */}
        <Typography
          variant='caption'
          sx={{
            mt: 4,
            color: 'text.disabled',
            fontFamily: 'monospace',
          }}
        >
          Error Code: 404 | Page Status: Missing in Action | Belt Level: Invisible
        </Typography>
      </Box>
    </Container>
  );
}
