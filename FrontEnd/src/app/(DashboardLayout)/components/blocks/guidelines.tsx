import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const BlockGuideLines = () => (
  <DashboardCard title='Blocking Training Guidelines'>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Form Practice:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice blocks in slow motion first' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Focus on proper arm positioning' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Maintain strong defensive stance' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice blocking angles' />
          </ListItem>
        </List>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Effectiveness Training:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice timing with partner' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Work on deflection angles' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Practice counter-attack combinations' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Focus on distance and positioning' />
          </ListItem>
        </List>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='subtitle2' gutterBottom>
          Safety Guidelines:
        </Typography>
        <List dense>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Always warm up forearms and wrists' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Use proper conditioning' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Block with correct arm surface' />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary='Start with light contact' />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  </DashboardCard>
);

export default BlockGuideLines;
