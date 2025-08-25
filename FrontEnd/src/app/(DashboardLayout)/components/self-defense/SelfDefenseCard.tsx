import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { SelfDefenseDefinition } from 'models/SelfDefense/SelfDefense';
import { useState } from 'react';
import SelfDefenseEditModule from './selfDefenseEditModule';
import SelfDefenseDeleteModule from './selfDefenseDeleteModule';

interface SelfDefenseCardProps {
  selfDefense: SelfDefenseDefinition;
  refetchSelfDefense: () => Promise<void>;
}

const SelfDefenseCard = ({ selfDefense, refetchSelfDefense }: SelfDefenseCardProps) => {
  const { isAuthenticated, instructor } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Releases':
      case 'Escapes':
        return <SecurityIcon />;
      case 'Submissions':
      case 'Ground Control':
        return <FitnessCenter />;
      case 'Standing':
        return <PsychologyIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  return (
    <>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={selfDefense.id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box display='flex' alignItems='center' gap={1} mb={2}>
              {getCategoryIcon(selfDefense.category)}
              <Typography variant='h6' component='h3'>
                {selfDefense.name}
              </Typography>
            </Box>

            {selfDefense.korean && (
              <Typography variant='body2' color='text.secondary' mb={1}>
                {selfDefense.korean}
              </Typography>
            )}

            <Typography variant='body2' paragraph>
              {selfDefense.description}
            </Typography>

            <Box display='flex' gap={1} mb={2} flexWrap='wrap'>
              <Chip
                label={selfDefense.beltRank}
                sx={{
                  backgroundColor: selfDefense.beltColor,
                  color:
                    selfDefense.beltColor === '#FFFFFF' ||
                    selfDefense.beltColor === '#FFD700' ||
                    selfDefense.beltColor === '#FFA500'
                      ? '#000000'
                      : '#FFFFFF',
                }}
                size='small'
              />
              <Chip label={selfDefense.category} color='primary' size='small' />
              <Chip
                label={selfDefense.difficulty}
                color={getDifficultyColor(selfDefense.difficulty) as any}
                size='small'
              />
            </Box>

            <Typography variant='body2' color='text.secondary' mb={1}>
              <strong>Scenario:</strong> {selfDefense.scenario}
            </Typography>

            <Typography variant='body2' color='text.secondary' mb={2}>
              <strong>Technique:</strong> {selfDefense.technique}
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='subtitle2'>Setup & Execution</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box mb={2}>
                  <Typography variant='subtitle2' gutterBottom>
                    Setup:
                  </Typography>
                  <List dense>
                    {selfDefense.setup.map((step, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={`${index + 1}. ${step}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box mb={2}>
                  <Typography variant='subtitle2' gutterBottom>
                    Execution:
                  </Typography>
                  <List dense>
                    {selfDefense.execution.map((step, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={`${index + 1}. ${step}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='subtitle2'>Key Points & Mistakes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box mb={2}>
                  <Typography variant='subtitle2' gutterBottom>
                    Key Points:
                  </Typography>
                  <List dense>
                    {selfDefense.keyPoints.map((point, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={`• ${point}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box mb={2}>
                  <Typography variant='subtitle2' gutterBottom>
                    Common Mistakes:
                  </Typography>
                  <List dense>
                    {selfDefense.commonMistakes.map((mistake, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={`• ${mistake}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='subtitle2'>Applications</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {selfDefense.applications.map((application, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`• ${application}`} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

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
        <SelfDefenseEditModule
          open={isEditModalOpen}
          selfDefense={selfDefense}
          refetchSelfDefense={refetchSelfDefense}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <SelfDefenseDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          selfDefense={selfDefense}
          refetchSelfDefense={refetchSelfDefense}
        />
      )}
    </>
  );
};

export default SelfDefenseCard;
