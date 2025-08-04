'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Instructor, instructors } from 'constants/data/Instructors';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const InstructorAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto 16px',
  border: `3px solid ${theme.palette.primary.main}`,
}));

export default function InstructorsClient() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign='center' mb={6}>
        <Typography variant='h2' component='h1' gutterBottom color='primary' fontWeight='bold'>
          Meet Our Instructors
        </Typography>
        <Typography variant='h5' color='text.secondary' sx={{ maxWidth: 800, mx: 'auto' }}>
          Our dedicated team of Tang Soo Do instructors brings decades of combined experience to
          guide your martial arts journey. All of our instructors are certified National Tang Soo Do
          Congress black belt practitioners with extensive training and teaching experience.
        </Typography>
      </Box>

      {/* School Philosophy Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 6, bgcolor: 'grey.50' }}>
        <Typography variant='h4' component='h2' gutterBottom color='primary' textAlign='center'>
          Our Teaching Philosophy
        </Typography>
        <Typography variant='body1' textAlign='center' sx={{ fontSize: '1.1rem' }}>
          At Tough Nose Karate, we believe in preserving the traditional values of Tang Soo Do
          combined with the teachings of the Torah while adapting our teaching methods to serve
          modern students. Our instructors emphasize:
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }} justifyContent='center' alignItems='center'>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box textAlign='center'>
              <Typography variant='h6' color='primary' gutterBottom>
                Respect & Discipline
              </Typography>
              <Typography variant='body2'>
                Building character through traditional martial arts values and mutual respect
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box textAlign='center'>
              <Typography variant='h6' color='primary' gutterBottom>
                Technical Excellence
              </Typography>
              <Typography variant='body2'>
                Precise instruction in authentic Tang Soo Do techniques and applications
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box textAlign='center'>
              <Typography variant='h6' color='primary' gutterBottom>
                Personal Growth
              </Typography>
              <Typography variant='body2'>
                Supporting each student's individual journey toward physical and mental development
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box textAlign='center'>
              <Typography variant='h6' color='primary' gutterBottom>
                Traditional Values
              </Typography>
              <Typography variant='body2'>
                The key to growth is to preserve the traditional values of the Torah \n into the
                practice of Tang Soo Do.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Instructors Grid */}
      <Grid container spacing={4}>
        {instructors.map((instructor: Instructor) => (
          <Grid size={{ xs: 12, md: 6 }} key={instructor.id}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Instructor Avatar/Image */}
                <InstructorAvatar
                  src={instructor.image || undefined}
                  alt={instructor.name}
                  sx={{ bgcolor: 'primary.main', color: 'white', fontSize: '2rem' }}
                >
                  {!instructor.image &&
                    instructor.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </InstructorAvatar>

                {/* Name and Title */}
                <Typography
                  variant='h5'
                  component='h3'
                  textAlign='center'
                  gutterBottom
                  color='primary'
                >
                  {instructor.name}
                </Typography>
                <Typography variant='h6' textAlign='center' color='text.secondary' gutterBottom>
                  {instructor.title}
                </Typography>

                {/* Rank and Experience */}
                <Box display='flex' justifyContent='center' gap={2} mb={2}>
                  <Chip label={instructor.rank} color='primary' variant='outlined' />
                  <Chip
                    label={`${instructor.yearsExperience} Years Experience`}
                    color='secondary'
                    variant='outlined'
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Bio */}
                <Typography variant='body2' paragraph>
                  {instructor.bio}
                </Typography>

                {/* Specialties */}
                <Typography variant='subtitle2' gutterBottom color='primary'>
                  Specialties:
                </Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap' mb={2}>
                  {instructor.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      size='small'
                      variant='filled'
                      color='primary'
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>

                {/* Certifications */}
                <Typography variant='subtitle2' gutterBottom color='primary'>
                  Certifications:
                </Typography>
                <Box>
                  {instructor.certifications.map((cert, index) => (
                    <Typography
                      key={index}
                      variant='body2'
                      color='text.secondary'
                      sx={{ fontSize: '0.85rem' }}
                    >
                      • {cert}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Paper
        elevation={3}
        sx={{ p: 4, mt: 6, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}
      >
        <Typography variant='h4' component='h2' gutterBottom>
          Ready to Begin Your Journey?
        </Typography>
        <Typography variant='body1' sx={{ fontSize: '1.1rem', mb: 2 }}>
          Our experienced instructors are here to guide you every step of the way. Whether you're a
          complete beginner or looking to advance your skills, we have the expertise to help you
          achieve your martial arts goals.
        </Typography>
        <Typography variant='body1' fontWeight='bold'>
          Contact us today to schedule your first class!
        </Typography>
      </Paper>
    </Container>
  );
}
