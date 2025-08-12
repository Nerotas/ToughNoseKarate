import { Grid, Card, CardContent, Box, Chip, Typography, Button } from '@mui/material';
import { IconAward } from '@tabler/icons-react';
import RequirementsList from './RequirementsList';
import { useState } from 'react';
import BeltRequirementsEditModule from './beltRequirementsEditModule';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import { useAuth } from 'hooks/useAuth';
import BeltRequirementDeleteModule from './beltRequirementDeleteModule';

interface BeltRequirementCardProps {
  belt: BeltRequirements;
  refetchBeltRequirements: () => Promise<void>;
}

const BeltRequirementCard = ({ belt, refetchBeltRequirements }: BeltRequirementCardProps) => {
  const { isAuthenticated, instructor } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
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
              <RequirementsList requirements={belt.selfDefense} requirementName='Self Defense' />
            )}
            {belt.comments && (
              <Typography variant='body2' sx={{ mt: 2 }}>
                {belt.comments}
              </Typography>
            )}

            {isAuthenticated &&
              (instructor?.role === 'instructor' || instructor?.role === 'admin') && (
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      color='primary'
                      onClick={openEditModal}
                      fullWidth
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      color='error'
                      onClick={openDeleteModal}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
          </CardContent>
        </Card>
      </Grid>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <BeltRequirementsEditModule
          open={isEditModalOpen}
          beltRequirement={belt}
          refetchBeltRequirements={refetchBeltRequirements}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <BeltRequirementDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          refetchBeltRequirements={refetchBeltRequirements}
          beltRequirement={belt}
        />
      )}
    </>
  );
};

export default BeltRequirementCard;
