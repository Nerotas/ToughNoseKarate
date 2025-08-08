import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { IconHandStop, IconCheckbox, IconX, IconTarget } from '@tabler/icons-react';
import { getBeltTextColor } from 'helpers/BeltColors';
import { size } from 'lodash';
import { PunchDefinition } from 'models/Punches/Punches';
import PunchEditModule from './punchEditModule';
import { useState } from 'react';

const PunchCard = ({
  punch,
  getBeltTextColor,
  refetchPunches,
}: {
  punch: PunchDefinition;
  getBeltTextColor: (color: string) => string;
  refetchPunches: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }} key={punch.id}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant='h5' gutterBottom>
                  {punch.name}
                </Typography>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  {`(${punch.korean})`}
                </Typography>
              </Box>
              <Chip
                icon={<IconHandStop />}
                label={punch.belt}
                sx={{
                  backgroundColor: punch.beltColor,
                  color: getBeltTextColor(punch.beltColor),
                  fontWeight: 'bold',
                  border: punch.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
            </Box>

            <Typography variant='body2' paragraph>
              {punch.description}
            </Typography>

            {size(punch.technique) > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Technique:
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {punch.technique}
                </Typography>
              </Box>
            )}

            {size(punch.bodyMechanics) > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Body Mechanics:
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {punch.bodyMechanics}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='subtitle2'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconCheckbox size={16} color='green' style={{ marginRight: 8 }} />
                Key Points:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                {punch.keyPoints.map((point, index) => (
                  <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                    <ListItemText
                      primary={`• ${point}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='subtitle2'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconX size={16} color='red' style={{ marginRight: 8 }} />
                Common Mistakes:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                {punch.commonMistakes.map((mistake, index) => (
                  <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                    <ListItemText
                      primary={`• ${mistake}`}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='subtitle2'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconTarget size={16} color='orange' style={{ marginRight: 8 }} />
                Target Areas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {punch.targetAreas &&
                  punch.targetAreas.map((target: string, index: number) => (
                    <Chip
                      key={index}
                      label={target}
                      size='small'
                      variant='outlined'
                      sx={{ color: 'orange' }}
                    />
                  ))}
              </Box>
            </Box>

            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Applications:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {punch.applications.map((app, index) => (
                  <Chip key={index} label={app} size='small' variant='outlined' color='primary' />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <PunchEditModule
        punch={punch}
        refetchPunches={refetchPunches}
        open={open}
        handleCloseEdit={handleCloseEdit}
      />
    </>
  );
};

export default PunchCard;
