'use client';
import { Grid, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { OneStepDefinition } from '../../../models/OneSteps/OneSteps';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';
import OneStepCard from '../components/one-steps/OneStepCard';
import { useAuth } from '../../../hooks/useAuth';
import React, { useState } from 'react';
import OneStepCreateModule from '../components/one-steps/oneStepCreateModule';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'success';
    case 'Intermediate':
      return 'warning';
    case 'Advanced':
      return 'error';
    default:
      return 'default';
  }
};

export default function OneStepsClient() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const {
    data: oneStepDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<OneStepDefinition[]>({
    apiLabel: 'onestep-definitions',
    url: '/onestep-definitions',
    id: 'getAll',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Use API data only
  const displayOneSteps = orderByBeltRank(oneStepDefinitions || [], (item) => item.beltRank);

  const refetchOneSteps = async () => {
    await refetch();
  };

  return (
    <PageContainer title='One-Step Sparring' description='Tang Soo Do One-Step Sparring Techniques'>
      {isPending && <Loading />}

      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            variant='h2'
            gutterBottom
            sx={{
              mb: 3,
              fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Tang Soo Do One-Step Sparring
          </Typography>
          {canCreate && (
            <Button variant='contained' color='primary' onClick={() => setIsCreateOpen(true)}>
              Add One-Step
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          One-steps teaches timing, distance, and the application of basic techniques in controlled
          combat scenarios. These sequences bridge the gap between basic techniques and free
          sparring.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Practice one-steps slowly first to master timing and
            distance. Always maintain control and safety when practicing with a partner.
          </Typography>
        </Alert>

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server. Displaying static
              one-step sparring data for demonstration.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {displayOneSteps?.map((oneStep) => (
            <OneStepCard
              key={oneStep.id}
              oneStep={oneStep}
              refetchOneSteps={refetchOneSteps}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <DashboardCard title='One-Step Sparring Training Guidelines'>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Partner Practice:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Start with slow, controlled movements' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Focus on proper distance and timing' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Switch roles between attacker/defender' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice both left and right sides' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Progression Training:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Master basic sequences first' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Add speed gradually' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Incorporate into free sparring' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice counter-counters' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Safety Guidelines:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Always wear appropriate protective gear' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Maintain control at all times' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Communicate with your partner' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Stop immediately if injury occurs' />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DashboardCard>
        </Box>

        {canCreate && (
          <OneStepCreateModule
            open={isCreateOpen}
            handleCloseCreate={() => setIsCreateOpen(false)}
            refetchOneSteps={refetchOneSteps}
          />
        )}
      </Box>
    </PageContainer>
  );
}
