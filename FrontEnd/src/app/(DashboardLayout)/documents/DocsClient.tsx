'use client';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import Link from 'next/link';

const DocumentsClient = () => {
  return (
    <PageContainer title='Documents' description='Useful TNK Documents'>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant='h2'>Document Management</Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant='h6'>Testing Application</Typography>
                <Typography variant='body2' color='text.secondary'>
                  <Button
                    component='a'
                    href='/documents/TNK_Testing_Application.pdf'
                    download
                    variant='contained'
                    color='primary'
                  >
                    Download Document
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Manage and organize your TNK documents effectively.
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default DocumentsClient;
