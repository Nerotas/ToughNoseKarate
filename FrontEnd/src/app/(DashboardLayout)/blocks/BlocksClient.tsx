'use client';
import { Grid, Box, Typography, Alert } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import { BlockDefinition } from '../../../models/Blocks/Blocks';
import useGet from '../../../hooks/useGet';
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';

import { Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import BlockCard from '../components/blocks/blockCard';
import BlockCreateModule from '../components/blocks/blockCreateModule';
import BlockGuideLines from '../components/blocks/guidelines';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';

const BlocksContent = ({
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
            Tang Soo Do Blocking Techniques
          </Typography>
          {onCreate && (
            <Button variant='contained' color='primary' onClick={onCreate}>
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

        {children}

        <Box sx={{ mt: 4 }}>
          <BlockGuideLines />
        </Box>
      </Box>
    </PageContainer>
  );
};

export const BlocksLoading = () => (
  <BlocksContent>
    <CardGridSkeleton label='Loading blocks' />
  </BlocksContent>
);

export default function BlocksClient() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';
  const { data, isPending, isError, refetch } = useGet<BlockDefinition[]>({
    apiLabel: 'blocks-definitions',
    url: '/blocks-definitions',
    id: 'getAll',
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });
  const refetchBlocks = async () => {
    await refetch();
  };
  const blockDefinitions = orderByBeltRank(data || [], (item) => item.beltRank);

  return (
    <BlocksContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
      {isError && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Unable to load blocks. Please try again.
          <Button color='inherit' onClick={refetchBlocks}>
            Retry
          </Button>
        </Alert>
      )}
      {isPending ? (
        <CardGridSkeleton label='Loading blocks' />
      ) : (
        <Grid container spacing={3}>
          {blockDefinitions.map((block) => (
            <BlockCard key={block.id} block={block} refetchBlocks={refetchBlocks} />
          ))}
        </Grid>
      )}
      {canCreate && (
        <BlockCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchBlocks={refetchBlocks}
        />
      )}
    </BlocksContent>
  );
}
