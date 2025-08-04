'use client';
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
} from '@mui/material';
import { IconHandStop, IconCheckbox, IconX, IconTarget } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { PunchDefinition } from '../../../models/Punches/Punches';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

export default function PunchesClient() {
  const {
    data: punchDefinitions,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGet<PunchDefinition[]>({
    apiLabel: 'punches-definitions',
    url: '/punches-definitions',
    id: 'getAll',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <PageContainer title='Punches' description='Tang Soo Do Punching Techniques'>
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
          Tang Soo Do Punching Techniques
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Master the fundamental punching techniques of Tang Soo Do. Each punch requires proper
          form, timing, and power generation through correct body mechanics.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Practice punches slowly first to master form, then
            gradually increase speed and power. Always punch with proper wrist alignment to prevent
            injury.
          </Typography>
        </Alert>

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server. Displaying static
              punch data for demonstration.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {punchDefinitions &&
            punchDefinitions.map((punch) => (
              <Grid size={{ xs: 12, md: 6 }} key={punch.id}>
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
                          {punch.name}
                        </Typography>
                        <Typography variant='h6' color='text.secondary' gutterBottom>
                          {`(${punch.korean})`}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<IconHandStop />}
                        label={punch.belt}
                        sx={{
                          backgroundColor: punch.beltColor,
                          color: getBeltTextColor(punch.beltColor),
                          fontWeight: 'bold',
                          border: punch.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                        }}
                      />
                    </Box>

                    <Typography variant='body2' paragraph>
                      {punch.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant='subtitle2' gutterBottom>
                        Technique:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {punch.technique}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant='subtitle2' gutterBottom>
                        Body Mechanics:
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {punch.bodyMechanics}
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
                        {punch.keyPoints.map((point, index) => (
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
                        {punch.commonMistakes.map((mistake, index) => (
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
                        {punch.targetAreas &&
                          punch.targetAreas.map((target: string, index: number) => (
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
                        {punch.applications.map((app, index) => (
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <DashboardCard title='Punching Training Guidelines'>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Form Practice:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice in slow motion first' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Focus on proper wrist alignment' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice chambering opposite hand' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Use mirror for form checking' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Power Development:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice hip rotation drills' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Focus on leg drive' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Practice on heavy bag' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Work on timing and distance' />
                  </ListItem>
                </List>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Safety Guidelines:
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Always warm up before practice' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Use proper protective gear' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Never punch without wrist support' />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary='Progress gradually in power' />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DashboardCard>
        </Box>
      </Box>
    </PageContainer>
  );
}
