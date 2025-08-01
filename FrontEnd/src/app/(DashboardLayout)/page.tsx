'use client';
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Chip,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import {
  IconUsers,
  IconHeart,
  IconChevronRight,
  IconCalendar,
  IconMenorah,
} from '@tabler/icons-react';
import { keyframes } from '@emotion/react';
import Image from 'next/image';
import PageContainer from './components/container/PageContainer';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 193, 7, 0.6);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Dashboard = () => {
  const theme = useTheme();

  const handleEmailClick = () => {
    window.open('mailto:toughnosekarate@gmail.com?subject=NewStudentInquiry');
  };

  return (
    <PageContainer
      title='Tough Nose Karate Studio'
      description='Master the Art of Martial Arts with Master Erotas'
    >
      <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            mb: 4,
            color: 'white',
            minHeight: '600px',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
              backgroundSize: '50px 50px',
            }}
          />

          <Container sx={{ position: 'relative', py: 6 }}>
            <Grid container spacing={4} alignItems='center'>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    animation: `${slideInLeft} 1s ease-out`,
                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    TOUGH NOSE
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2rem', md: '3rem' },
                      mb: 1,
                      color: theme.palette.warning.main,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    KARATE STUDIO
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      mb: 3,
                      opacity: 0.9,
                      fontStyle: 'italic',
                    }}
                  >
                    "Tough nose for the people with a stiff neck"
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      animation: `${fadeInUp} 1s ease-out 0.2s both`,
                    }}
                  >
                    Learn Self-Defense, Discipline, and Confidence in a Frum environment with Raffi
                    Erotas
                  </Typography>
                  <Box
                    sx={{
                      animation: `${fadeInUp} 1s ease-out 0.4s both`,
                    }}
                  >
                    <Button
                      variant='contained'
                      size='large'
                      endIcon={<IconChevronRight />}
                      href={'/belt-requirements'}
                      sx={{
                        backgroundColor: theme.palette.warning.main,
                        color: 'black',
                        px: 4,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        mr: 2,
                        mb: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.warning.dark,
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[8],
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Begin Your Journey
                    </Button>
                    <Button
                      variant='outlined'
                      size='large'
                      startIcon={<IconCalendar />}
                      onClick={handleEmailClick}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        mb: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Schedule Trial
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    animation: `${slideInRight} 1s ease-out`,
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      animation: `${floatAnimation} 3s ease-in-out infinite`,
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        animation: `${pulseGlow} 2s ease-in-out infinite`,
                        border: `4px solid ${theme.palette.warning.main}`,
                        maxWidth: '400px',
                        width: '100%',
                      }}
                    >
                      <Image
                        src='/images/profile/Raffi_Kick.jpg'
                        alt='Erotas performing a legendary Kick'
                        width={400}
                        height={500}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Training Programs */}
        <Grid container spacing={3} sx={{ mb: 6 }} justifyContent='center' alignItems='stretch'>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box
                  sx={{
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    animation: `${floatAnimation} 2s ease-in-out infinite 1s`,
                  }}
                >
                  <IconHeart size={40} color={theme.palette.info.main} />
                </Box>
                <Typography variant='h5' fontWeight='bold' sx={{ mb: 2 }}>
                  Family Classes
                </Typography>
                <Typography color='text.secondary' sx={{ mb: 2 }}>
                  Fun, safe, and engaging classes designed for families to train together
                </Typography>
                <Chip label='All Ages' color='info' size='small' />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box
                  sx={{
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    animation: `${floatAnimation} 2s ease-in-out infinite 1s`,
                  }}
                >
                  <IconMenorah size={40} color={theme.palette.info.main} />
                </Box>
                <Typography variant='h5' fontWeight='bold' sx={{ mb: 2 }}>
                  Adult Classes
                </Typography>
                <Typography color='text.secondary' sx={{ mb: 2 }}>
                  Engaging and challenging classes for adults to improve fitness and skills
                </Typography>
                <Chip label='Men and boys above Bar Mitzvah' color='info' size='small' />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Paper
          elevation={4}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            borderRadius: '15px',
            p: 4,
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              fontSize: '120px',
              opacity: 0.1,
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            🥋
          </Box>

          <Typography variant='h4' fontWeight='bold' sx={{ mb: 2 }}>
            Traditional Karate with a Modern Perspective
          </Typography>
          <Typography variant='h6' sx={{ mb: 4, opacity: 0.9 }}>
            Join our dojo and unlock your potential with the world's most innovative karate
            techniques
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Button
              variant='contained'
              size='large'
              startIcon={<IconCalendar />}
              onClick={handleEmailClick}
              sx={{
                backgroundColor: theme.palette.warning.main,
                color: 'black',
                px: 6,
                py: 2,
                fontSize: '1.3rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: theme.palette.warning.dark,
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Book Free Trial Class
            </Button>
            <Button
              variant='outlined'
              size='large'
              startIcon={<IconUsers />}
              href='/instructors'
              component='a'
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Meet Our Instructors
            </Button>
          </Stack>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
