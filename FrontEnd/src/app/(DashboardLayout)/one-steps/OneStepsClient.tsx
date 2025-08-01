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
import {
  IconSwords,
  IconCheckbox,
  IconX,
  IconTarget,
  IconFlag,
  IconShield,
} from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { OneStepDefinition } from '../../../models/OneSteps/OneSteps';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';

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
  const {
    data: oneStepDefinitions,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGet<OneStepDefinition[]>({
    apiLabel: 'one-steps-definitions',
    url: '/one-steps-definitions',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Use API data only
  const displayOneSteps = oneStepDefinitions || [];

  return (
    <PageContainer title='One-Step Sparring' description='Tang Soo Do One-Step Sparring Techniques'>
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
          Tang Soo Do One-Step Sparring
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          One-step sparring (Il Su Sik) teaches timing, distance, and the application of basic
          techniques in controlled combat scenarios. These sequences bridge the gap between basic
          techniques and free sparring.
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
          {displayOneSteps.map((oneStep) => (
            <Grid size={{ xs: 12, lg: 6 }} key={oneStep.id}>
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
                        {oneStep.name}
                      </Typography>
                      <Typography variant='h6' color='text.secondary' gutterBottom>
                        {`(${oneStep.korean})`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Chip
                        icon={<IconSwords />}
                        label={oneStep.belt}
                        sx={{
                          backgroundColor: oneStep.beltColor,
                          color: getBeltTextColor(oneStep.beltColor),
                          fontWeight: 'bold',
                          border: oneStep.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                        }}
                      />
                      <Chip
                        icon={<IconFlag />}
                        label={oneStep.difficulty}
                        color={getDifficultyColor(oneStep.difficulty)}
                        size='small'
                      />
                    </Box>
                  </Box>

                  <Typography variant='body2' paragraph>
                    {oneStep.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Attack:
                    </Typography>
                    <Typography variant='body2' color='error.main'>
                      {oneStep.attack}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle2' gutterBottom>
                      Defense:
                    </Typography>
                    <Typography variant='body2' color='primary.main'>
                      {oneStep.defense}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='subtitle2'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconShield size={16} color='blue' style={{ marginRight: 8 }} />
                      Sequence:
                    </Typography>
                    <List dense sx={{ pl: 2 }}>
                      {oneStep.sequence.map((step, index) => (
                        <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                          <ListItemText
                            primary={`${index + 1}. ${step}`}
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
                      <IconCheckbox size={16} color='green' style={{ marginRight: 8 }} />
                      Key Points:
                    </Typography>
                    <List dense sx={{ pl: 2 }}>
                      {oneStep.keyPoints.map((point, index) => (
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
                      {oneStep.commonMistakes.map((mistake, index) => (
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
                      {oneStep.applications.map((app, index) => (
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
}
