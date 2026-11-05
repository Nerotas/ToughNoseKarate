'use client';

import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material';
import type { GridProps } from '@mui/material';

export const CardGridSkeleton = ({
  label = 'Loading content',
  columns = { xs: 12, md: 6 },
}: {
  label?: string;
  columns?: GridProps['size'];
}) => (
  <Grid
    container
    spacing={3}
    role='status'
    aria-label={label}
    aria-busy='true'
    sx={{ minHeight: '100vh' }}
  >
    {Array.from({ length: 6 }, (_, index) => (
      <Grid size={columns} key={index} aria-hidden='true'>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ minHeight: 400 }}>
            <Skeleton width='65%' height={36} animation={false} sx={{ mb: 2 }} />
            <Skeleton variant='rounded' width={100} height={24} animation={false} sx={{ mb: 3 }} />
            {Array.from({ length: 3 }, (_, section) => (
              <Box key={section} sx={{ mb: 2 }}>
                <Skeleton width='35%' height={24} animation={false} />
                <Skeleton width='90%' height={24} animation={false} />
                <Skeleton width='75%' height={24} animation={false} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default function PageLoadingSkeleton() {
  return (
    <Box>
      <Box aria-hidden='true'>
        <Skeleton width='60%' height={48} animation={false} sx={{ mb: 3 }} />
        <Skeleton width='95%' height={24} animation={false} />
        <Skeleton width='75%' height={24} animation={false} sx={{ mb: 4 }} />
      </Box>
      <CardGridSkeleton label='Loading page' />
    </Box>
  );
}
