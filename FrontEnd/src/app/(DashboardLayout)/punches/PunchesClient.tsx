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
import Loading from '../../../app/loading';
import PunchCard from '../components/punches/punchCard';
import PunchGuideLines from '../components/punches/guidelines';

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

export default function PunchesClient() {
  const {
    data: punchDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<PunchDefinition[]>({
    apiLabel: 'punches-definitions',
    url: '/punches-definitions',
    id: 'getAll',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  const refetchPunches = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Punches' description='Tang Soo Do Punching Techniques'>
      <Box>
        <Typography
          variant='h2'
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

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server. Displaying static
              punch data for demonstration.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {isPending && <Loading />}

          {punchDefinitions &&
            punchDefinitions.map((punch) => (
              <PunchCard
                key={punch.id}
                punch={punch}
                getBeltTextColor={getBeltTextColor}
                refetchPunches={refetchPunches}
              />
            ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <PunchGuideLines />
        </Box>
      </Box>
    </PageContainer>
  );
}
