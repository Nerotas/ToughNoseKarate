'use client';
import { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  Divider,
  Button,
} from '@mui/material';
import { IconBrandTorchain, IconCheckbox, IconX } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { StanceDefinition } from 'models/Stances/Stances';
import useGet from '../../../hooks/useGet';
import Loading from 'app/loading';
import { useAuth } from '../../../hooks/useAuth';
import StanceEditModule from '../components/stances/stanceEditModule';
import StanceCreateModule from '../components/stances/stanceCreateModule';
import StancesCard from '../components/stances/stancesCard';

export default function StancesClient() {
  // Use the custom useGet hook - will use SSR data if available, fallback if not
  const {
    data: stancesDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<StanceDefinition[]>({
    apiLabel: 'stance-definitions',
    url: '/stance-Definitions',
    id: 'getAll',
    fallbackData: [], // Empty array as fallback, will use static data instead
    options: {
      staleTime: 60 * 1000, // 60 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';

  // Use API data only
  const displayStances = stancesDefinitions || [];

  const getBeltTextColor = (beltColor: string) => {
    return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
  };
  const refetchStances = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Stances' description='Tang Soo Do Basic Stances and Positions'>
      {isPending && <Loading />}
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
            Stances
          </Typography>
          {canCreate && (
            <Button variant='contained' color='primary' onClick={() => setIsCreateOpen(true)}>
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

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server. Displaying static
              stance data for demonstration.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {displayStances.map((stance) => (
            <StancesCard
              key={stance.id}
              stance={stance}
              refetchStances={refetchStances}
              getBeltTextColor={getBeltTextColor}
            />
          ))}
        </Grid>

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
        {canCreate && (
          <StanceCreateModule
            open={isCreateOpen}
            handleCloseCreate={() => setIsCreateOpen(false)}
            refetchStances={refetchStances}
          />
        )}
      </Box>
    </PageContainer>
  );
}
