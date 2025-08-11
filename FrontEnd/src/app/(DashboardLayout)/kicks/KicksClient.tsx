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
import { IconRun, IconCheckbox, IconX, IconTarget, IconFlag } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { KickDefinition } from '../../../models/Kicks/Kicks';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';
import { useAuth } from '../../../hooks/useAuth';
import KickEditModule from '../components/kicks/kickEditModule';

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

export default function KicksClient() {
  const { isAuthenticated, instructor } = useAuth();
  const [editingKick, setEditingKick] = useState<KickDefinition | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
  const displayKicks = kickDefinitions || [];

  const openEditModal = (kick: KickDefinition) => {
    setEditingKick(kick);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingKick(null);
    setIsEditModalOpen(false);
  };

  const refetchKicks = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Kicks' description='Tang Soo Do Kicking Techniques'>
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
          Tang Soo Do Kicking Techniques
        </Typography>

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
            <Grid size={{ xs: 12, md: 6 }} key={kick.id}>
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
                        {kick.name}
                      </Typography>
                      <Typography variant='h6' color='text.secondary' gutterBottom>
                        {`(${kick.korean})`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Chip
                        icon={<IconRun />}
                        label={kick.belt}
                        sx={{
                          backgroundColor: kick.beltColor,
                          color: getBeltTextColor(kick.beltColor),
                          fontWeight: 'bold',
                          border: kick.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                        }}
                      />
                      <Chip
                        icon={<IconFlag />}
                        label={kick.difficulty}
                        color={getDifficultyColor(kick.difficulty)}
                        size='small'
                      />
                    </Box>
                  </Box>

                  <Typography variant='body2' paragraph>
                    {kick.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Technique:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {kick.technique}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Body Mechanics:
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {kick.bodyMechanics}
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
                      {kick.keyPoints.map((point, index) => (
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
                      {kick.commonMistakes.map((mistake, index) => (
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

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='subtitle2'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconTarget size={16} color='orange' style={{ marginRight: 8 }} />
                      Target Areas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {kick.targetAreas?.map((target, index) => (
                        <Chip
                          key={index}
                          label={target}
                          size='small'
                          variant='outlined'
                          sx={{ color: 'orange' }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant='subtitle2' gutterBottom>
                      Applications:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {kick.applications.map((app, index) => (
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
                          onClick={() => openEditModal(kick)}
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

        {/* Edit Modal */}
        {editingKick && (
          <KickEditModule
            open={isEditModalOpen}
            kick={editingKick}
            refetchKicks={refetchKicks}
            handleCloseEdit={closeEditModal}
          />
        )}
      </Box>
    </PageContainer>
  );
}
