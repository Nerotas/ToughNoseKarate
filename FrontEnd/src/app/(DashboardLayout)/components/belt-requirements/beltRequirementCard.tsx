import { Grid, Card, CardContent, Box, Chip, Typography, Button } from '@mui/material';
import { IconAward } from '@tabler/icons-react';
import RequirementsList from './RequirementsList';
import { useState } from 'react';
import BeltRequirementsEditModule from './beltRequirementsEditModule';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

interface BeltRequirementCardProps {
  belt: BeltRequirements;
  isAuthenticated: boolean;
  instructor: any;
  refetchBeltRequirements: () => Promise<void>;
}

const BeltRequirementCard = ({
  belt,
  isAuthenticated,
  instructor,
  refetchBeltRequirements,
}: BeltRequirementCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' size='small' color='primary' onClick={openEditModal}>
                    Edit
                  </Button>
                </Box>
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
    </>
  );
};

export default BeltRequirementCard;
