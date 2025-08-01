import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { toReadableText } from 'utils/helpers/textFormatting';
const RequirementsList = ({
  requirements,
  requirementName,
}: {
  requirements: string[];
  requirementName: string;
}) => (
  <>
    <Typography variant='h6' gutterBottom>
      {requirementName}
    </Typography>
    <List dense>
      {requirements.map((item: string, index: number) => (
        <ListItem key={index} sx={{ pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <IconCheck size={16} color='green' />
          </ListItemIcon>
          <ListItemText
            primary={toReadableText(item)}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      ))}
    </List>
  </>
);

export default RequirementsList;
