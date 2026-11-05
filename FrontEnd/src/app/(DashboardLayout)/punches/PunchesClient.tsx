'use client';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  Divider,
} from '@mui/material';
import { IconHandStop, IconCheckbox, IconX, IconTarget } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { PunchDefinition } from '../../../models/Punches/Punches';
import useGet from '../../../hooks/useGet';
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';
import PunchCard from '../components/punches/punchCard';
import PunchGuideLines from '../components/punches/guidelines';
import { Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import PunchCreateModule from '../components/punches/punchCreateModule';
import React, { useState } from 'react';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';
import { getBeltTextColor } from '../../../utils/helpers/BeltColors';

const PunchesContent = ({
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
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            sx={{
              mb: 3,
              fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Tang Soo Do Punching Techniques
          </Typography>
          {onCreate && (
            <Button variant='contained' color='primary' onClick={onCreate}>
              Add Punch
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Master the fundamental punching techniques of Tang Soo Do. Each punch requires proper
          form, timing, and power generation through correct body mechanics.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Practice punches slowly first to master form, then
            gradually increase speed and power. Always punch with proper wrist alignment to prevent
            injury.
          </Typography>
        </Alert>

        {children}

        <Box sx={{ mt: 4 }}>
          <PunchGuideLines />
        </Box>
      </Box>
    </PageContainer>
  );
};

export const PunchesLoading = () => (
  <PunchesContent>
    <CardGridSkeleton label='Loading punches' />
  </PunchesContent>
);

export default function PunchesClient() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const { data, isPending, isError, refetch } = useGet<PunchDefinition[]>({
    apiLabel: 'punches-definitions',
    url: '/punches-definitions',
    id: 'getAll',
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const refetchPunches = async () => {
    await refetch();
  };
  const punchDefinitions = orderByBeltRank(data || [], (item) => item.beltRank);

  return (
    <PunchesContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Unable to load punches. Please try again.
          <Button color='inherit' onClick={refetchPunches}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <CardGridSkeleton label='Loading punches' />
      ) : (
        <Grid container spacing={3}>
          {punchDefinitions.map((punch) => (
            <PunchCard key={punch.id} punch={punch} refetchPunches={refetchPunches} />
          ))}
        </Grid>
      )}
      {canCreate && (
        <PunchCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchPunches={refetchPunches}
        />
      )}
    </PunchesContent>
  );
}
