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
  ListItemIcon,
  Button,
} from '@mui/material';
import { IconAward, IconCheck } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import RequirementsList from '../components/belt-requirements/RequirementsList';
import useGet from 'hooks/useGet';
import { BeltRequirements as BeltRequirementsType } from 'models/BeltRequirements/BeltRequirements';
import Loading from 'app/loading';
import { useAuth } from '../../../hooks/useAuth';
import BeltRequirementsEditModule from '../components/belt-requirements/beltRequirementsEditModule';

const BeltRequirements = () => {
  const { isAuthenticated, instructor } = useAuth();
  const [editingBeltRequirement, setEditingBeltRequirement] = useState<BeltRequirementsType | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Use the custom useGet hook - will use SSR data if available, fallback if not
  const {
    data: beltRequirements,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useGet<BeltRequirementsType[]>({
    apiLabel: 'belt-requirements',
    url: '/belt-requirements',
    id: 'getAll',
    fallbackData: [], // Empty array as fallback, will use static data instead
    options: {
      staleTime: 60 * 1000, // 60 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Use API data if available, otherwise use static data
  const displayBeltRequirements =
    beltRequirements && beltRequirements.length > 0 ? beltRequirements : [];

  const openEditModal = (beltRequirement: BeltRequirementsType) => {
    setEditingBeltRequirement(beltRequirement);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingBeltRequirement(null);
    setIsEditModalOpen(false);
  };

  const refetchBeltRequirements = async () => {
    await refetch();
  };

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
          {isLoading || (isFetching && <Loading />)}

          {displayBeltRequirements.map((belt) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={`${belt.beltOrder}_${belt.beltRank}`}>
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
                    <Typography variant='body2' sx={{ mt: 2 }}>
                      {belt.comments}
                    </Typography>
                  )}

                  {isAuthenticated &&
                    (instructor?.role === 'instructor' || instructor?.role === 'admin') && (
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={() => openEditModal(belt)}
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
          <DashboardCard title='Testing Information'>
            <Typography variant='body1' paragraph>
              Students only test <strong>when they are ready.</strong> The instructor will determine
              readiness based on mastery of required techniques, forms, and overall performance.
            </Typography>
            <Typography variant='body1' paragraph>
              <strong>Testing Schedule:</strong> Belt tests are held every 2-3 months.
            </Typography>
          </DashboardCard>
        </Box>

        {/* Edit Modal */}
        {editingBeltRequirement && (
          <BeltRequirementsEditModule
            open={isEditModalOpen}
            beltRequirement={editingBeltRequirement}
            refetchBeltRequirements={refetchBeltRequirements}
            handleCloseEdit={closeEditModal}
          />
        )}
      </Box>
    </PageContainer>
  );
};

export default BeltRequirements;
