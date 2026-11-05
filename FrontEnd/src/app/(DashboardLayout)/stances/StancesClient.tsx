'use client';
import { useState, type ReactNode } from 'react';
import { Grid, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { StanceDefinition } from 'models/Stances/Stances';
import useGet from '../../../hooks/useGet';
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';
import { useAuth } from '../../../hooks/useAuth';
import StanceCreateModule from '../components/stances/stanceCreateModule';
import StancesCard from '../components/stances/stancesCard';
import { orderByBeltRank } from 'utils/helpers/orderByBeltRank';

const StancesContent = ({ children, onCreate }: { children: ReactNode; onCreate?: () => void }) => {
  return (
    <PageContainer>
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h2' component='h1' gutterBottom sx={{ mb: 3 }}>
            Stances
          </Typography>
          {onCreate && (
            <Button variant='contained' color='primary' onClick={onCreate}>
              Add Stance
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Proper stances form the foundation of all Tang Soo Do techniques. They provide stability,
          power generation, and mobility for effective martial arts practice.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Practice holding each stance for 30-60 seconds to build
            leg strength and muscle memory. Focus on proper form over duration.
          </Typography>
        </Alert>

        {children}

        <Box sx={{ mt: 4 }}>
          <DashboardCard title='Stance Training Guidelines'>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Daily Practice:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Hold each stance for 30-60 seconds' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice transitions between stances' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Focus on one stance per week for mastery' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Use a mirror to check form' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Strength Building:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Horse stance: 1-3 minutes daily' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Front stance lunges: 10-20 reps each leg' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Back stance holds: 30-45 seconds' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Cat stance balance: 15-30 seconds' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Testing Criteria:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Proper foot positioning' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Correct weight distribution' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Stable and balanced posture' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Ability to hold stance for required time' />
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

export const StancesLoading = () => (
  <StancesContent>
    <CardGridSkeleton label='Loading stances' />
  </StancesContent>
);

export default function StancesClient() {
  const {
    data: stancesDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<StanceDefinition[]>({
    apiLabel: 'stance-definitions',
    url: '/stance-Definitions',
    id: 'getAll',
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const displayStances = orderByBeltRank(stancesDefinitions || [], (item) => item.beltRank);
  const refetchStances = async () => {
    await refetch();
  };

  return (
    <StancesContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Unable to load stances. Please try again.
          <Button color='inherit' onClick={refetchStances}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <CardGridSkeleton label='Loading stances' />
      ) : (
        <Grid container spacing={3}>
          {displayStances.map((stance) => (
            <StancesCard key={stance.id} stance={stance} refetchStances={refetchStances} />
          ))}
        </Grid>
      )}
      {canCreate && (
        <StanceCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchStances={refetchStances}
        />
      )}
    </StancesContent>
  );
}
