'use client';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PageContainer from '../components/container/PageContainer';
import BuildCertificateButton from '../components/documents/BuildCertificateButton';

const DocumentsClient = () => (
  <PageContainer title='Documents' description='Useful TNK Documents'>
    <Box>
      <Typography variant='h2' sx={{ mb: 3 }}>
        Document Management
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Testing Application
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Download the official TNK testing application PDF.
              </Typography>
              <Button
                component='a'
                href='/documents/TNK_Testing_Application.pdf'
                download
                variant='contained'
                color='primary'
                startIcon={<DownloadIcon />}
                sx={{ mt: 1 }}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Certificate
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Download the official TNK certificate PDF.
              </Typography>
              <Button
                component='a'
                href='/documents/Certificate.pdf'
                download
                variant='contained'
                color='primary'
                startIcon={<DownloadIcon />}
                sx={{ mt: 1 }}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <BuildCertificateButton />
      </Grid>
      <Typography variant='body1' sx={{ mt: 4, color: 'text.secondary' }}>
        Manage and organize your TNK documents effectively.
      </Typography>
    </Box>
  </PageContainer>
);

export default DocumentsClient;
