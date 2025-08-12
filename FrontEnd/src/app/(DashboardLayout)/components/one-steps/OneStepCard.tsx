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
import { IconSwords, IconFlag, IconShield, IconCheckbox, IconX } from '@tabler/icons-react';
import { getBeltTextColor } from 'helpers/BeltColors';
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
const OneStepCard = ({
  oneStep,
  refetchOneSteps,
  getBeltTextColor,
  getDifficultyColor,
}: OneStepCard) => {
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
                {oneStep.sequence?.map((step, index) => (
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

            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Applications:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {oneStep.applications?.map((app, index) => (
                  <Chip key={index} label={app} size='small' variant='outlined' color='primary' />
                ))}
              </Box>
            </Box>

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
