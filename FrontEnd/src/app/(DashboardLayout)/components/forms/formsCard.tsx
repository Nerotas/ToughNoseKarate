import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { IconMan, IconPlayerPlay, IconChevronDown } from '@tabler/icons-react';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import FormEditModule from './formEditModule';
import FormDeleteModule from './formDeleteModule';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

interface FormsCardProps {
  form: FormDefinitions;
  refetchForms: () => Promise<void>;
}

const FormsCard = ({ form, refetchForms }: FormsCardProps) => {
  // Helper function to safely parse keyPoints

  const { isAuthenticated, instructor } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getKeyPoints = (keyPoints: any): string[] => {
    if (!keyPoints) return [];
    if (Array.isArray(keyPoints)) return keyPoints;
    if (typeof keyPoints === 'string') {
      try {
        const parsed = JSON.parse(keyPoints);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
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

  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 6 }} key={form.id}>
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
                  {form.formName}
                </Typography>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  {form.koreanName}
                </Typography>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  {form.meaning}
                </Typography>
              </Box>
              <Chip
                icon={<IconMan />}
                label={form.beltRank}
                sx={{
                  backgroundColor: form.beltColor,
                  color: form.beltTextColor,
                  fontWeight: 'bold',
                  border: form.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
            </Box>

            <Typography variant='body2' paragraph>
              {form.description}
            </Typography>

            <Box sx={{ mb: 2 }}>
              {form.videoLink ? (
                <Button
                  variant='outlined'
                  startIcon={<IconPlayerPlay />}
                  size='small'
                  sx={{ mr: 1 }}
                  href={form.videoLink}
                  component='a'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Watch Video
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  startIcon={<IconPlayerPlay />}
                  size='small'
                  sx={{ mr: 1 }}
                  disabled
                >
                  Watch Video
                </Button>
              )}
            </Box>

            <Accordion>
              <AccordionSummary expandIcon={<IconChevronDown />}>
                <Typography variant='subtitle2'>Key Points</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {getKeyPoints(form.keyPoints).map((point, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemText
                        primary={`• ${point}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

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
        <FormEditModule
          open={isEditModalOpen}
          form={form}
          refetchForms={refetchForms}
          handleCloseEdit={closeEditModal}
        />
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <FormDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          form={form}
          refetchForms={refetchForms}
        />
      )}
    </>
  );
};

export default FormsCard;
