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
import { mockBeltRequirementsData } from 'constants/data/mockBeltRequirements';
import RequirementsList from '../components/belt-requirements/RequirementsList';
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
          {mockBeltRequirementsData.map((belt) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={`${belt.order}_${belt.beltRank}`}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip
                      icon={<IconAward />}
                      label={belt.beltRank}
                      sx={{
                        backgroundColor: belt.color,
                        color: belt.textColor,
                        fontWeight: 'bold',
                        border: belt.color === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  </Box>

                  {belt.forms.length > 0 && (
                    <RequirementsList requirements={belt.forms} requirementName='Forms' />
                  )}
                  {belt.blocks.length > 0 && (
                    <RequirementsList requirements={belt.blocks} requirementName='Blocks' />
                  )}
                  {belt.punches.length > 0 && (
                    <RequirementsList requirements={belt.punches} requirementName='Punches' />
                  )}
                  {belt.kicks.length > 0 && (
                    <RequirementsList requirements={belt.kicks} requirementName='Kicks' />
                  )}
                  {belt.jumps.length > 0 && (
                    <RequirementsList requirements={belt.jumps} requirementName='Jumps' />
                  )}
                  {belt.falling.length > 0 && (
                    <RequirementsList requirements={belt.falling} requirementName='Falling' />
                  )}
                  {belt.oneSteps.length > 0 && (
                    <RequirementsList requirements={belt.oneSteps} requirementName='One Steps' />
                  )}
                  {belt.selfDefense.length > 0 && (
                    <RequirementsList
                      requirements={belt.selfDefense}
                      requirementName='Self Defense'
                    />
                  )}
                  {belt.comments && (
                    <Typography variant='body2' sx={{ mt: 2, color: 'text.secondary' }}>
                      Comments: {belt.comments}
                    </Typography>
                  )}
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
