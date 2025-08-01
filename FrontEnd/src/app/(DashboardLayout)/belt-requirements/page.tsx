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
import { beltLevels } from 'constants/data/beltRequirements';

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
