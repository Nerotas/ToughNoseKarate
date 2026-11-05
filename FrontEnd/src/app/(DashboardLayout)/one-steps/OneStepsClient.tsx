'use client';
import { Grid, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { OneStepDefinition } from '../../../models/OneSteps/OneSteps';
import useGet from '../../../hooks/useGet';
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';
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

const OneStepsContent = ({
  children,
  onCreate,
}: {
  children: React.ReactNode;
  onCreate?: () => void;
}) => {
  return (
    <PageContainer>
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            variant='h2'
            component='h1'
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
          {onCreate && (
            <Button variant='contained' color='primary' onClick={onCreate}>
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

        {children}

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
      </Box>
    </PageContainer>
  );
};

export const OneStepsLoading = () => (
  <OneStepsContent>
    <CardGridSkeleton label='Loading one-step sparring' columns={{ xs: 12, lg: 6 }} />
  </OneStepsContent>
);

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
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const displayOneSteps = orderByBeltRank(oneStepDefinitions || [], (item) => item.beltRank);
  const refetchOneSteps = async () => {
    await refetch();
  };

  return (
    <OneStepsContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Unable to load one-step sparring. Please try again.
          <Button color='inherit' onClick={refetchOneSteps}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <CardGridSkeleton label='Loading one-step sparring' columns={{ xs: 12, lg: 6 }} />
      ) : (
        <Grid container spacing={3}>
          {displayOneSteps.map((oneStep) => (
            <OneStepCard
              key={oneStep.id}
              oneStep={oneStep}
              refetchOneSteps={refetchOneSteps}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </Grid>
      )}
      {canCreate && (
        <OneStepCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchOneSteps={refetchOneSteps}
        />
      )}
    </OneStepsContent>
  );
}
