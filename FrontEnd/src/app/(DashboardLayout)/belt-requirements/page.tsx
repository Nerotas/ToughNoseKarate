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
  ListItemIcon,
} from '@mui/material';
import { IconAward, IconCheck } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';

const beltLevels = [
  {
    belt: 'White Belt',
    color: '#FFFFFF',
    textColor: '#000000',
    requirements: [
      'Basic stances: Attention, Ready, Horse, Forward',
      'Basic blocks: High block, Middle block, Low block',
      'Basic punches: Straight punch, Reverse punch',
      'Basic kicks: Front kick, Roundhouse kick',
      'First form: Kicho Hyung Il Bu',
    ],
  },
  {
    belt: 'Yellow Belt',
    color: '#FFD700',
    textColor: '#000000',
    requirements: [
      'All white belt requirements',
      'Side kick, Back kick',
      'Knife hand strike, Ridge hand strike',
      'Second form: Kicho Hyung E Bu',
      'Basic one-step sparring (1-5)',
    ],
  },
  {
    belt: 'Orange Belt',
    color: '#FFA500',
    textColor: '#FFFFFF',
    requirements: [
      'All previous belt requirements',
      'Hook kick, Crescent kick',
      'Elbow strikes (horizontal, vertical)',
      'Third form: Kicho Hyung Sam Bu',
      'One-step sparring (6-10)',
      'Basic self-defense techniques',
    ],
  },
  {
    belt: 'Green Belt',
    color: '#008000',
    textColor: '#FFFFFF',
    requirements: [
      'All previous belt requirements',
      'Advanced kicks: Axe kick, Spinning heel kick',
      'Advanced hand techniques: Spear hand, Hammer fist',
      'Fourth form: Pyung Ahn Cho Dan',
      'Free sparring basics',
      'Breaking techniques (1 board)',
    ],
  },
  {
    belt: 'Blue Belt',
    color: '#0000FF',
    textColor: '#FFFFFF',
    requirements: [
      'All previous belt requirements',
      'Jumping kicks: Jumping front kick, Jumping side kick',
      'Combination techniques',
      'Fifth form: Pyung Ahn E Dan',
      'Intermediate free sparring',
      'Self-defense against grabs',
    ],
  },
  {
    belt: 'Brown Belt',
    color: '#8B4513',
    textColor: '#FFFFFF',
    requirements: [
      'All previous belt requirements',
      'Advanced spinning kicks',
      'Pressure point techniques',
      'Sixth form: Pyung Ahn Sam Dan',
      'Advanced free sparring',
      'Breaking techniques (2-3 boards)',
      'Teaching assistance',
    ],
  },
  {
    belt: 'Black Belt (1st Dan)',
    color: '#000000',
    textColor: '#FFFFFF',
    requirements: [
      'Master all previous requirements',
      'All eight basic forms',
      'Advanced self-defense',
      'Advanced breaking techniques',
      'Demonstrate teaching ability',
      'Physical and mental discipline',
      'Leadership qualities',
    ],
  },
];

const BeltRequirements = () => {
  return (
    <PageContainer
      title='Belt Requirements'
      description='Tang Soo Do Belt Progression Requirements'
    >
      <Box>
        <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
          Tang Soo Do Belt Requirements
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Progress through the traditional Tang Soo Do belt system. Each belt level builds upon the
          previous, requiring mastery of techniques, forms, and philosophy.
        </Typography>

        <Grid container spacing={3}>
          {beltLevels.map((belt) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={belt.belt}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip
                      icon={<IconAward />}
                      label={belt.belt}
                      sx={{
                        backgroundColor: belt.color,
                        color: belt.textColor,
                        fontWeight: 'bold',
                        border: belt.color === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  </Box>

                  <Typography variant='h6' gutterBottom>
                    Requirements:
                  </Typography>

                  <List dense>
                    {belt.requirements.map((requirement, reqIndex) => (
                      <ListItem key={reqIndex} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color='green' />
                        </ListItemIcon>
                        <ListItemText
                          primary={requirement}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <DashboardCard title='Testing Information'>
            <Typography variant='body1' paragraph>
              <strong>Testing Schedule:</strong> Belt tests are held every 3-4 months, typically on
              the last Saturday of the testing month.
            </Typography>
            <Typography variant='body1' paragraph>
              <strong>Minimum Training Time:</strong> Students must train for a minimum number of
              classes between belt levels:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary='White to Yellow: 20 classes (2-3 months)' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Yellow to Orange: 25 classes (3 months)' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Orange to Green: 30 classes (4 months)' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Green to Blue: 35 classes (5 months)' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Blue to Brown: 40 classes (6 months)' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Brown to Black: 50+ classes (8-12 months)' />
              </ListItem>
            </List>
          </DashboardCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BeltRequirements;
