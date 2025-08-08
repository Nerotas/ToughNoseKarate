import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const PunchGuideLines = () => (
  <DashboardCard title='Punching Training Guidelines'>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Form Practice:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice in slow motion first' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Focus on proper wrist alignment' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice chambering opposite hand' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Use mirror for form checking' />
          </ListItem>
        </List>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Power Development:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice hip rotation drills' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Focus on leg drive' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice on heavy bag' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Work on timing and distance' />
          </ListItem>
        </List>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Safety Guidelines:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Always warm up before practice' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Use proper protective gear' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Never punch without wrist support' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Progress gradually in power' />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  </DashboardCard>
);

export default PunchGuideLines;
