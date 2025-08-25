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
import { IconRun, IconFlag, IconCheckbox, IconX, IconTarget } from '@tabler/icons-react';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import KickEditModule from './kickEditModule';
import KickDeleteModule from './kickDeleteModule';
import { KickDefinition } from 'models/Kicks/Kicks';

interface KickCardProps {
  kick: KickDefinition;
  refetchKicks: () => Promise<void>;
  getDifficultyColor: (difficulty: string) => 'success' | 'warning' | 'error' | 'default';
  getBeltTextColor: (beltColor: string) => string;
}

const KickCard = ({ kick, refetchKicks, getDifficultyColor, getBeltTextColor }: KickCardProps) => {
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
      <Grid size={{ xs: 12, md: 6 }} key={kick.id}>
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
                  {kick.name}
                </Typography>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  {`(${kick.korean})`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip
                  icon={<IconRun />}
                  label={kick.beltRank}
                  sx={{
                    backgroundColor: kick.beltColor,
                    color: getBeltTextColor(kick.beltColor),
                    fontWeight: 'bold',
                    border: kick.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                  }}
                />
              </Box>
            </Box>

            <Typography variant='body2' paragraph>
              {kick.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Target:
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {kick.target}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Execution:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                {kick.execution?.map((step, index) => (
                  <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                    <ListItemText
                      primary={`• ${step}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
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
                {kick.keyPoints.map((point, index) => (
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
                {kick.commonMistakes.map((mistake, index) => (
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
                {kick.applications.map((app, index) => (
                  <Chip key={index} label={app} size='small' variant='outlined' color='primary' />
                ))}
              </Box>
            </Box>

            {isAuthenticated &&
              (instructor?.role === 'instructor' || instructor?.role === 'admin') && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button variant='outlined' size='small' color='primary' onClick={openEditModal}>
                    Edit
                  </Button>
                  <Button variant='outlined' size='small' color='error' onClick={openDeleteModal}>
                    Delete
                  </Button>
                </Box>
              )}
          </CardContent>
        </Card>
      </Grid>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <KickEditModule
          open={isEditModalOpen}
          kick={kick}
          refetchKicks={refetchKicks}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <KickDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          kick={kick}
          refetchKicks={refetchKicks}
        />
      )}
    </>
  );
};

export default KickCard;
