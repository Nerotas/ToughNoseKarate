'use client';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Button,
} from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import useGet from '../../../hooks/useGet';
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import FormsCard from '../components/forms/formsCard';
import { useAuth } from '../../../hooks/useAuth';
import React, { useState } from 'react';
import FormCreateModule from '../components/forms/formCreateModule';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';

const FormsContent = ({
  children,
  onCreate,
}: {
  children: React.ReactNode;
  onCreate?: () => void;
}) => {
  return (
    <PageContainer>
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h2' component='h1' gutterBottom sx={{ mb: 3 }}>
            Tang Soo Do Forms (Hyung)
          </Typography>
          {onCreate && (
            <Button variant='contained' color='primary' onClick={onCreate}>
              Add Form
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Forms are choreographed sequences of martial arts techniques. They help develop proper
          technique, balance, timing, and mental discipline while preserving traditional martial
          arts knowledge. Every form is a simulation of real combat situations, allowing
          practitioners to refine their skills in a controlled environment. A master of forms can
          put their own personality into the movements, making each performance unique and telling
          an individual story.
        </Typography>
        {children}

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
      </Box>
    </PageContainer>
  );
};

export const FormsLoading = () => (
  <FormsContent>
    <CardGridSkeleton label='Loading forms' />
  </FormsContent>
);

const FormsClient = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const { data, isPending, isError, refetch } = useGet<FormDefinitions[]>({
    url: '/form-definitions',
    apiLabel: 'form-definitions',
    id: 'getAll',
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const refetchForms = async () => {
    await refetch();
  };
  const forms = orderByBeltRank(data || [], (item) => item.beltRank);

  return (
    <FormsContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Unable to load forms. Please try again.
          <Button color='inherit' onClick={refetchForms}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <CardGridSkeleton label='Loading forms' />
      ) : (
        <Grid container spacing={3}>
          {forms.map((form) => (
            <FormsCard key={form.id} form={form} refetchForms={refetchForms} />
          ))}
        </Grid>
      )}
      {canCreate && (
        <FormCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchForms={refetchForms}
        />
      )}
    </FormsContent>
  );
};

export default FormsClient;
