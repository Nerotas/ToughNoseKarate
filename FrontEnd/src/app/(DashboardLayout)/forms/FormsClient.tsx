'use client';
import { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import { IconMan, IconChevronDown, IconPlayerPlay, IconBook } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import useGet from '../../../hooks/useGet';
import Loading from 'app/loading';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import { useAuth } from '../../../contexts/AuthContext';
import FormEditModule from '../components/forms/formEditModule';

const FormsClient = () => {
  const { isAuthenticated, instructor } = useAuth();
  const [editingForm, setEditingForm] = useState<FormDefinitions | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: forms,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useGet<FormDefinitions[]>({
    url: '/form-definitions',
    apiLabel: 'form-definitions',
    id: 'getAll',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Helper function to safely parse keyPoints
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

  const openEditModal = (form: FormDefinitions) => {
    setEditingForm(form);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingForm(null);
    setIsEditModalOpen(false);
  };

  const refetchForms = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Forms (Kata)' description='Tang Soo Do Forms and Patterns'>
      <Box>
        <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
          Tang Soo Do Forms (Hyung)
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Forms are choreographed sequences of martial arts techniques. They help develop proper
          technique, balance, timing, and mental discipline while preserving traditional martial
          arts knowledge. Every form is a simulation of real combat situations, allowing
          practitioners to refine their skills in a controlled environment. A master of forms can
          put their own personality into the movements, making each performance unique and telling
          an individual story.
        </Typography>
        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server.
            </Typography>
          </Alert>
        )}
        {(isLoading || isFetching) && <Loading />}
        <Grid container spacing={3}>
          {forms &&
            forms.map((form) => (
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

                    {isAuthenticated && instructor?.role === 'instructor' && (
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={() => openEditModal(form)}
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
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Form Training Tips
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' gutterBottom>
                    Practice Guidelines:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Start slowly and focus on correct technique' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Practice in front of a mirror when possible' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Count movements out loud initially' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Visualize opponents during practice' />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' gutterBottom>
                    Common Mistakes:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Rushing through movements' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Inconsistent stances' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Lack of focus and intensity' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Poor breathing coordination' />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Edit Modal */}
        {editingForm && (
          <FormEditModule
            open={isEditModalOpen}
            form={editingForm}
            refetchForms={refetchForms}
            handleCloseEdit={closeEditModal}
          />
        )}
      </Box>
    </PageContainer>
  );
};

export default FormsClient;
