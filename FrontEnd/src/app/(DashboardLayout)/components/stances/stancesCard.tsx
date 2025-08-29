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
import { IconBrandTorchain, IconCheckbox, IconX } from '@tabler/icons-react';
import { useAuth } from 'hooks/useAuth';
import { StanceDefinition } from 'models/Stances/Stances';
import { useState } from 'react';
import StanceEditModule from './stanceEditModule';
import StanceDeleteModule from './stanceDeleteModule';
import { getBeltColor, getBeltTextColor } from 'utils/helpers/BeltColors';

interface StancesCardProps {
  stance: StanceDefinition;
  refetchStances: () => Promise<void>;
}

const StancesCard = ({ stance, refetchStances }: StancesCardProps) => {
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
      {' '}
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
                  {`(${stance.korean})`}{' '}
                </Typography>
              </Box>
              <Chip
                icon={<IconBrandTorchain />}
                label={stance.beltRank}
                sx={{
                  backgroundColor: getBeltColor(stance.beltRank),
                  color: getBeltTextColor(stance.beltRank),
                  fontWeight: 'bold',
                  border: getBeltTextColor(stance.beltRank),
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
        <StanceEditModule
          open={isEditModalOpen}
          stance={stance}
          refetchStances={refetchStances}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <StanceDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          stance={stance}
          refetchStances={refetchStances}
        />
      )}
    </>
  );
};

export default StancesCard;
