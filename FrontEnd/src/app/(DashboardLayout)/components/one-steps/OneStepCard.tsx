import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import {
  IconSwords,
  IconFlag,
  IconShield,
  IconCheckbox,
  IconX,
  IconArrowRight,
} from '@tabler/icons-react';
import { getBeltTextColor } from 'utils/helpers/BeltColors';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import OneStepEditModule from './oneStepEditModule';
import OneStepDeleteModule from './oneStepDeleteModule';
import { OneStepDefinition } from 'models/OneSteps/OneSteps';

interface OneStepCard {
  oneStep: OneStepDefinition;
  refetchOneSteps: () => Promise<void>;
  getBeltTextColor: (beltColor: string) => string;
  getDifficultyColor: (difficulty: string) => 'success' | 'warning' | 'error' | 'default';
}
const OneStepCard = ({ oneStep, refetchOneSteps, getBeltTextColor }: OneStepCard) => {
  const { isAuthenticated, instructor } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
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
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip
                  icon={<IconSwords />}
                  label={oneStep.beltRank}
                  sx={{
                    backgroundColor: oneStep.beltColor,
                    color: getBeltTextColor(oneStep.beltColor),
                    fontWeight: 'bold',
                    border: oneStep.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                  }}
                />
              </Box>
            </Box>

            <Typography variant='body2' paragraph>
              {oneStep.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='subtitle2'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconShield size={16} color='green' style={{ marginRight: 8 }} />
                Defense:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                {oneStep.defense?.map((point, index) => (
                  <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                    <ListItemText
                      primary={`• ${point}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {oneStep.firstFollowUp && oneStep.firstFollowUp.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconArrowRight size={16} color='blue' style={{ marginRight: 8 }} />
                    First Follow-Up:
                  </Typography>
                  {oneStep.followUpBeltRank && (
                    <Chip
                      icon={<IconSwords />}
                      label={oneStep.followUpBeltRank}
                      size='small'
                      sx={{
                        backgroundColor: oneStep.followUpBeltColor,
                        color: getBeltTextColor(oneStep.followUpBeltColor),
                        fontWeight: 'bold',
                        border: oneStep.followUpBeltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  )}
                </Box>
                <List dense sx={{ pl: 2 }}>
                  {oneStep.firstFollowUp?.map((point, index) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                      <ListItemText
                        primary={`• ${point}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {oneStep.secondFollowUp && oneStep.secondFollowUp.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconArrowRight size={16} color='purple' style={{ marginRight: 8 }} />
                    Second Follow-Up:
                  </Typography>
                  {oneStep.secondFollowUpBeltRank && (
                    <Chip
                      icon={<IconSwords />}
                      label={oneStep.secondFollowUpBeltRank}
                      size='small'
                      sx={{
                        backgroundColor: oneStep.secondFollowUpBeltColor,
                        color: getBeltTextColor(oneStep.secondFollowUpBeltColor),
                        fontWeight: 'bold',
                        border:
                          oneStep.secondFollowUpBeltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  )}
                </Box>
                <List dense sx={{ pl: 2 }}>
                  {oneStep.secondFollowUp?.map((point, index) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                      <ListItemText
                        primary={`• ${point}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

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
                {oneStep.keyPoints?.map((point, index) => (
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
                {oneStep.commonMistakes?.map((mistake, index) => (
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

            {oneStep.comment && (
              <Typography variant='body2' color='text.secondary'>
                {oneStep.comment}
              </Typography>
            )}
            {isAuthenticated &&
              (instructor?.role === 'instructor' || instructor?.role === 'admin') && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
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
        <OneStepEditModule
          open={isEditModalOpen}
          oneStep={oneStep}
          refetchOneSteps={refetchOneSteps}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <OneStepDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          oneStep={oneStep}
          refetchOneSteps={refetchOneSteps}
        />
      )}
    </>
  );
};

export default OneStepCard;
