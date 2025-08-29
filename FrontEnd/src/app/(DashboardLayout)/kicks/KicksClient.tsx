'use client';
import { Grid, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { KickDefinition } from '../../../models/Kicks/Kicks';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';
import { useAuth } from '../../../hooks/useAuth';
import React, { useState } from 'react';
import KickCreateModule from '../components/kicks/kickCreateModule';
import KickCard from '../components/kicks/kickCard';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';
import { getBeltTextColor } from '../../../utils/helpers/BeltColors';

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

export default function KicksClient() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const {
    data: kickDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<KickDefinition[]>({
    apiLabel: 'kicks-definitions',
    url: '/kicks-definitions',
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
  const displayKicks = orderByBeltRank(kickDefinitions || [], (item) => item.beltRank);

  const refetchKicks = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Kicks' description='Tang Soo Do Kicking Techniques'>
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
            Tang Soo Do Kicking Techniques
          </Typography>
          {canCreate && (
            <Button variant='contained' color='primary' onClick={() => setIsCreateOpen(true)}>
              Add Kick
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Master the powerful kicking techniques of Tang Soo Do. Kicks are the signature techniques
          of Korean martial arts, requiring flexibility, balance, and precise timing.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Start with low kicks and gradually increase height.
            Always warm up thoroughly and stretch before practicing kicks to prevent injury.
          </Typography>
        </Alert>

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server.
            </Typography>
          </Alert>
        )}

        {isPending && <Loading />}

        <Grid container spacing={3}>
          {displayKicks.map((kick) => (
            <KickCard
              key={kick.id}
              kick={kick}
              refetchKicks={refetchKicks}
              getDifficultyColor={getDifficultyColor}
              getBeltTextColor={getBeltTextColor}
            />
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <DashboardCard title='Kicking Training Guidelines'>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Flexibility Training:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Dynamic warm-up before kicking' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Daily leg stretching routine' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice high kicks gradually' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Cool down with static stretches' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Technique Development:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice against heavy bag' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Work on balance and timing' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Start with low, controlled kicks' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Focus on proper chamber position' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Safety Guidelines:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Never kick without warming up' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Use proper protective gear' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Progress gradually in height' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Stop if you feel pain' />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DashboardCard>
        </Box>

        {canCreate && (
          <KickCreateModule
            open={isCreateOpen}
            handleCloseCreate={() => setIsCreateOpen(false)}
            refetchKicks={refetchKicks}
          />
        )}
      </Box>
    </PageContainer>
  );
}
