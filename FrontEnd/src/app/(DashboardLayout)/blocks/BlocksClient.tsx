'use client';
import { Grid, Box, Typography, Alert } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import { BlockDefinition } from '../../../models/Blocks/Blocks';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';

import { Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import BlockCard from '../components/blocks/blockCard';
import BlockCreateModule from '../components/blocks/blockCreateModule';
import BlockGuideLines from '../components/blocks/guidelines';

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

export default function BlocksClient() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const {
    data: blockDefinitions,
    isPending,
    isError,
    refetch,
  } = useGet<BlockDefinition[]>({
    apiLabel: 'blocks-definitions',
    url: '/blocks-definitions',
    id: 'getAll',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  const refetchBlocks = async () => {
    await refetch();
  };

  return (
    <PageContainer title='Blocks' description='Tang Soo Do Blocking Techniques'>
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
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
            Tang Soo Do Blocking Techniques
          </Typography>
          {canCreate && (
            <Button variant='contained' color='primary' onClick={() => setIsCreateOpen(true)}>
              Add Block
            </Button>
          )}
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Master the essential blocking techniques of Tang Soo Do. Each block is designed to
          deflect, redirect, or stop incoming attacks while maintaining proper defensive
          positioning.
        </Typography>

        <Alert severity='info' sx={{ mb: 4 }}>
          <Typography variant='body2'>
            <strong>Training Tip:</strong> Practice blocks with proper stance and timing. A good
            block should deflect the attack while creating openings for counter-attacks. Focus on
            using the correct part of your arm or hand for each blocking technique.
          </Typography>
        </Alert>

        {isError && (
          <Alert severity='info' sx={{ mb: 4 }}>
            <Typography variant='body2'>
              <strong>Demo Mode:</strong> Unable to connect to the backend server. Displaying static
              block data for demonstration.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {isPending && <Loading />}

          {blockDefinitions &&
            blockDefinitions.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                getBeltTextColor={getBeltTextColor}
                refetchBlocks={refetchBlocks}
              />
            ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <BlockGuideLines />
        </Box>

        {canCreate && (
          <BlockCreateModule
            open={isCreateOpen}
            handleCloseCreate={() => setIsCreateOpen(false)}
            refetchBlocks={refetchBlocks}
          />
        )}
      </Box>
    </PageContainer>
  );
}
