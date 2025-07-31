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
import { IconBrandTorchain, IconCheckbox, IconX } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';

const stances = [
  {
    id: 1,
    name: 'Attention Stance',
    korean: 'Charyot Sogi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'The formal attention stance used at the beginning and end of class.',
    position: 'Feet together, heels touching, toes pointed outward at 45 degrees',
    bodyPosition: 'Stand straight, shoulders back, arms at sides, hands in fists',
    keyPoints: [
      'Heels together, toes apart',
      'Weight evenly distributed',
      'Straight posture',
      'Eyes forward',
      'Relaxed but alert',
    ],
    commonMistakes: ['Feet too far apart', 'Slouching shoulders', 'Looking down', 'Tense muscles'],
    applications: ['Formal greeting', 'Beginning/end of forms', 'Showing respect'],
  },
  {
    id: 2,
    name: 'Ready Stance',
    korean: 'Joon Bi Sogi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'The preparatory stance used before beginning techniques or forms.',
    position: 'Feet shoulder-width apart, toes pointing forward',
    bodyPosition: 'Hands in fists at belt level, elbows slightly bent',
    keyPoints: [
      'Feet parallel, shoulder-width apart',
      'Slight bend in knees',
      'Fists at waist level',
      'Elbows close to body',
      'Balanced weight distribution',
    ],
    commonMistakes: [
      'Feet too wide or narrow',
      'Hands too high or low',
      'Locking knees',
      'Leaning forward or back',
    ],
    applications: [
      'Starting position for techniques',
      'Forms preparation',
      'Sparring ready position',
    ],
  },
  {
    id: 3,
    name: 'Horse Stance',
    korean: 'Kima Sogi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'A strong, stable stance that builds leg strength and balance.',
    position: 'Feet wide apart (2-3 shoulder widths), toes pointing forward',
    bodyPosition: 'Squat down with thighs parallel to ground, back straight',
    keyPoints: [
      'Wide stance for stability',
      'Thighs parallel to floor',
      'Knees over toes',
      'Straight back',
      'Even weight distribution',
    ],
    commonMistakes: [
      'Knees caving inward',
      'Leaning forward',
      'Not squatting low enough',
      'Toes pointing outward',
    ],
    applications: ['Strength training', 'Blocking techniques', 'Stable striking platform'],
  },
  {
    id: 4,
    name: 'Front Stance',
    korean: 'Ap Koobi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'An offensive stance that provides forward momentum and power.',
    position: 'One leg forward, one leg back, both feet pointing forward',
    bodyPosition: '70% weight on front leg, 30% on back leg, knee over ankle',
    keyPoints: [
      'Long stance (2-3 foot lengths)',
      'Both feet pointing forward',
      'Front knee bent, back leg straight',
      'Weight mostly on front leg',
      'Hip square to front',
    ],
    commonMistakes: [
      'Stance too short or long',
      'Back foot turned out',
      'Weight evenly distributed',
      'Hip turned sideways',
    ],
    applications: ['Punching techniques', 'Forward attacks', 'Advancing movements'],
  },
  {
    id: 5,
    name: 'Back Stance',
    korean: 'Dwit Koobi',
    belt: 'Yellow Belt',
    beltColor: '#FFD700',
    description: 'A defensive stance that allows quick retreating and counter-attacks.',
    position: 'One leg forward, one leg back at 90-degree angle',
    bodyPosition: '30% weight on front leg, 70% on back leg',
    keyPoints: [
      'L-shaped foot position',
      'Weight mostly on back leg',
      'Front leg light and mobile',
      'Both knees bent',
      'Side-facing body position',
    ],
    commonMistakes: [
      'Too much weight on front leg',
      'Feet not at 90 degrees',
      'Standing too upright',
      'Back leg too straight',
    ],
    applications: ['Blocking techniques', 'Defensive movements', 'Quick counter-attacks'],
  },
  {
    id: 6,
    name: 'Cat Stance',
    korean: 'Beom Sogi',
    belt: 'Orange Belt',
    beltColor: '#FFA500',
    description:
      'A mobile stance with most weight on the back leg, allowing quick front leg techniques.',
    position: 'Front foot barely touching ground, all weight on back leg',
    bodyPosition: 'Back leg deeply bent, front foot on ball of foot only',
    keyPoints: [
      '90-95% weight on back leg',
      'Front foot touching lightly',
      'Low center of gravity',
      'Ready to kick with front leg',
      'Balanced and mobile',
    ],
    commonMistakes: [
      'Too much weight on front foot',
      'Not low enough',
      'Front foot flat on ground',
      'Back leg not bent enough',
    ],
    applications: ['Quick front kicks', 'Evasive movements', 'Defensive positioning'],
  },
];

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

const Stances = () => {
  return (
    <PageContainer title='Stances' description='Tang Soo Do Basic Stances and Positions'>
      <Box>
        <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
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

        <Grid container spacing={3}>
          {stances.map((stance) => (
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
                        {stance.korean}
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
    </PageContainer>
  );
};

export default Stances;
