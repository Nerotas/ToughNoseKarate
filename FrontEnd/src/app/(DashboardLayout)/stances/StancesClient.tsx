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

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

export default function StancesClient() {
  const { isAuthenticated, instructor } = useAuth();
  const [editingStance, setEditingStance] = useState<StanceDefinition | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Use the custom useGet hook - will use SSR data if available, fallback if not
  const {
    data: stancesDefinitions,
    isLoading,
    isFetching,
    error,
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

  // Use API data only
  const displayStances = stancesDefinitions || [];

  const openEditModal = (stance: StanceDefinition) => {
    setEditingStance(stance);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingStance(null);
    setIsEditModalOpen(false);
  };

  const refetchStances = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Stances' description='Tang Soo Do Basic Stances and Positions'>
      {isLoading || (isFetching && <Loading />)}

      <Box>
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
          Tang Soo Do Stances
        </Typography>

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
            <Grid size={{ xs: 12, md: 6 }} key={stance.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant='h5' gutterBottom>
                        {stance.name}
                      </Typography>
                      <Typography variant='h6' color='text.secondary' gutterBottom>
                        {`(${stance.korean})`}{' '}
                      </Typography>
                    </Box>
                    <Chip
                      icon={<IconBrandTorchain />}
                      label={stance.belt}
                      sx={{
                        backgroundColor: stance.beltColor,
                        color: getBeltTextColor(stance.beltColor),
                        fontWeight: 'bold',
                        border: stance.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  </Box>

                  <Typography variant='body2' paragraph>
                    {stance.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Foot Position:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {stance.position}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Body Position:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {stance.bodyPosition}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='subtitle2'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconCheckbox size={16} color='green' style={{ marginRight: 8 }} />
                      Key Points:
                    </Typography>
                    <List dense sx={{ pl: 2 }}>
                      {stance.keyPoints.map((point, index) => (
                        <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemText
                            primary={`• ${point}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='subtitle2'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconX size={16} color='red' style={{ marginRight: 8 }} />
                      Common Mistakes:
                    </Typography>
                    <List dense sx={{ pl: 2 }}>
                      {stance.commonMistakes.map((mistake, index) => (
                        <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemText
                            primary={`• ${mistake}`}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Typography variant='subtitle2' gutterBottom>
                      Applications:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {stance.applications.map((app, index) => (
                        <Chip
                          key={index}
                          label={app}
                          size='small'
                          variant='outlined'
                          color='primary'
                        />
                      ))}
                    </Box>
                  </Box>

                  {isAuthenticated &&
                    (instructor?.role === 'instructor' || instructor?.role === 'admin') && (
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={() => openEditModal(stance)}
                        >
                          Edit
                        </Button>
                      </Box>
                    )}
                </CardContent>
              </Card>
            </Grid>
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
      </Box>

      {/* Edit Modal */}
      {editingStance && (
        <StanceEditModule
          open={isEditModalOpen}
          stance={editingStance}
          refetchStances={refetchStances}
          handleCloseEdit={closeEditModal}
        />
      )}
    </PageContainer>
  );
}
