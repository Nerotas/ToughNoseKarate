'use client';
import { Grid, Box, Typography, Button, Card, CardContent, Skeleton, Alert } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import useGet from 'hooks/useGet';
import { BeltRequirements as BeltRequirementsType } from 'models/BeltRequirements/BeltRequirements';
import BeltRequirementCard from '../components/belt-requirements/beltRequirementCard';
import { useAuth } from '../../../hooks/useAuth';
import React, { useState } from 'react';
import BeltRequirementsCreateModule from '../components/belt-requirements/beltRequirementsCreateModule';

const BeltRequirementsContent = ({
  children,
  onCreate,
}: {
  children: React.ReactNode;
  onCreate?: () => void;
}) => (
  <PageContainer>
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h2' component='h1' gutterBottom sx={{ mb: 3 }}>
          Tang Soo Do Belt Requirements
        </Typography>
        {onCreate && (
          <Button variant='contained' color='primary' onClick={onCreate}>
            Add Requirement
          </Button>
        )}
      </Box>

      <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
        Progress through the traditional Tang Soo Do belt system. Each belt level builds upon the
        previous, requiring mastery of techniques, forms, and philosophy.
      </Typography>

      {children}

      <Box sx={{ mt: 4 }}>
        <DashboardCard title='Testing Information'>
          <Typography variant='body1' paragraph>
            Students only test <strong>when they are ready.</strong> The instructor will determine
            readiness based on mastery of required techniques, forms, and overall performance.
          </Typography>
          <Typography variant='body1' paragraph>
            <strong>Testing Schedule:</strong> Belt tests are held every 2-3 months.
          </Typography>
        </DashboardCard>
      </Box>
    </Box>
  </PageContainer>
);

const BeltRequirementsSkeleton = () => (
  <Grid
    container
    spacing={3}
    role='status'
    aria-label='Loading belt requirements'
    aria-busy='true'
    sx={{ minHeight: '100vh' }}
  >
    {Array.from({ length: 6 }, (_, index) => (
      <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index} aria-hidden='true'>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ minHeight: 520 }}>
            <Skeleton variant='rounded' width={100} height={32} animation={false} sx={{ mb: 2 }} />
            {Array.from({ length: 4 }, (_, section) => (
              <Box key={section} sx={{ mb: 2 }}>
                <Skeleton width='35%' height={28} animation={false} />
                <Skeleton width='85%' height={32} animation={false} />
                <Skeleton width='70%' height={32} animation={false} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export const BeltRequirementsLoading = () => (
  <BeltRequirementsContent>
    <BeltRequirementsSkeleton />
  </BeltRequirementsContent>
);

const BeltRequirements = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';

  const {
    data: beltRequirements,
    isPending,
    isError,
    refetch,
  } = useGet<BeltRequirementsType[]>({
    apiLabel: 'belt-requirements',
    url: '/belt-requirements',
    id: 'getAll',
    options: {
      // Override the provider's empty placeholder so initial requests stay pending.
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  const displayBeltRequirements = [...(beltRequirements ?? [])].sort(
    (a, b) => a.beltOrder - b.beltOrder
  );

  const refetchBeltRequirements = async () => {
    await refetch();
  };

  return (
    <BeltRequirementsContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          Unable to load belt requirements. Please try again.
          <Button color='inherit' onClick={refetchBeltRequirements}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <BeltRequirementsSkeleton />
      ) : (
        <Grid container spacing={3}>
          {displayBeltRequirements.map((belt) => (
            <BeltRequirementCard
              key={`${belt.beltOrder}_${belt.beltRank}`}
              belt={belt}
              refetchBeltRequirements={refetchBeltRequirements}
            />
          ))}
        </Grid>
      )}

      {canCreate && (
        <BeltRequirementsCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchBeltRequirements={refetchBeltRequirements}
        />
      )}
    </BeltRequirementsContent>
  );
};

export default BeltRequirements;
