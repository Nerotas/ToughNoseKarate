'use client';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import useGet from 'hooks/useGet';
import { BeltRequirements as BeltRequirementsType } from 'models/BeltRequirements/BeltRequirements';
import Loading from 'app/loading';
import BeltRequirementCard from '../components/belt-requirements/beltRequirementCard';

const BeltRequirements = () => {
  // Use the custom useGet hook - will use SSR data if available, fallback if not
  const {
    data: beltRequirements,
    isPending,
    refetch,
  } = useGet<BeltRequirementsType[]>({
    apiLabel: 'belt-requirements',
    url: '/belt-requirements',
    id: 'getAll',
    fallbackData: [], // Empty array as fallback, will use static data instead
    options: {
      staleTime: 60 * 1000, // 60 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Use API data if available, otherwise use static data
  const displayBeltRequirements =
    beltRequirements && beltRequirements.length > 0 ? beltRequirements : [];

  const refetchBeltRequirements = async () => {
    await refetch();
  };

  return (
    <PageContainer
      title='Belt Requirements'
      description='Tang Soo Do Belt Progression Requirements'
    >
      <Box>
        <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
          Tang Soo Do Belt Requirements
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Progress through the traditional Tang Soo Do belt system. Each belt level builds upon the
          previous, requiring mastery of techniques, forms, and philosophy.
        </Typography>

        <Grid container spacing={3}>
          {isPending && <Loading />}

          {displayBeltRequirements.map((belt) => (
            <BeltRequirementCard
              key={`${belt.beltOrder}_${belt.beltRank}`}
              belt={belt}
              refetchBeltRequirements={refetchBeltRequirements}
            />
          ))}
        </Grid>

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
};

export default BeltRequirements;
