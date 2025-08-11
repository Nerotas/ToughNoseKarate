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
import KickEditModule from '../components/kicks/kickEditModule';
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

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
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
                  label={kick.belt}
                  sx={{
                    backgroundColor: kick.beltColor,
                    color: getBeltTextColor(kick.beltColor),
                    fontWeight: 'bold',
                    border: kick.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                  }}
                />
                <Chip
                  icon={<IconFlag />}
                  label={kick.difficulty}
                  color={getDifficultyColor(kick.difficulty)}
                  size='small'
                />
              </Box>
            </Box>

            <Typography variant='body2' paragraph>
              {kick.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Technique:
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {kick.technique}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Body Mechanics:
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {kick.bodyMechanics}
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

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='subtitle2'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconTarget size={16} color='orange' style={{ marginRight: 8 }} />
                Target Areas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {kick.targetAreas?.map((target, index) => (
                  <Chip
                    key={index}
                    label={target}
                    size='small'
                    variant='outlined'
                    sx={{ color: 'orange' }}
                  />
                ))}
              </Box>
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
        <KickEditModule
          open={isEditModalOpen}
          kick={kick}
          refetchKicks={refetchKicks}
          handleCloseEdit={closeEditModal}
        />
      )}
    </>
  );
};

export default KickCard;
