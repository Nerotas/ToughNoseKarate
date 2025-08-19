import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import BuildDocumentDialogue from './BuildDocumentDialogue';

const BuildCertificateButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Build Certificate
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              Edit and create a TNK certificate for a specific student.
            </Typography>
            <Button
              onClick={() => setOpen(true)}
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
      <BuildDocumentDialogue open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default BuildCertificateButton;
