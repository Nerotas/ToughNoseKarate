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
import { IconHandStop, IconCheckbox, IconX, IconTarget, IconEdit } from '@tabler/icons-react';
import { size } from 'lodash';
import { PunchDefinition } from 'models/Punches/Punches';
import PunchEditModule from './punchEditModule';
import PunchDeleteModule from './punchDeleteModule';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';

const PunchCard = ({
  punch,
  getBeltTextColor,
  refetchPunches,
}: {
  punch: PunchDefinition;
  getBeltTextColor: (color: string) => string;
  refetchPunches: () => Promise<void>;
}) => {
  const { isAuthenticated, instructor } = useAuth();

  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
                label={punch.beltRank}
                sx={{
                  backgroundColor: punch.beltColor,
                  color: getBeltTextColor(punch.beltColor as string),
                  fontWeight: 'bold',
                  border: punch.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
              {isAuthenticated && instructor && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={'Edit'} icon={<IconEdit />} onClick={handleOpenEdit} />
                  <Chip label={'Delete'} icon={<IconX />} color='error' onClick={openDeleteModal} />
                </Box>
              )}
            </Box>

            <Typography variant='body2' paragraph>
              {punch.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Add Target section */}
            {punch.target && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant='subtitle2'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconTarget size={16} color='blue' style={{ marginRight: 8 }} />
                  Target:
                </Typography>
                <Typography variant='body2' sx={{ pl: 3 }}>
                  {punch.target}
                </Typography>
              </Box>
            )}

            {/* Add Execution section */}
            {punch.execution && punch.execution.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Execution Steps:
                </Typography>
                <List dense sx={{ pl: 2 }}>
                  {punch.execution.map((step, index) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0.25 }}>
                      <ListItemText
                        primary={`${index + 1}. ${step}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

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
                {punch.keyPoints?.map((point, index) => (
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
                {punch.commonMistakes?.map((mistake, index) => (
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

            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Applications:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {punch.applications?.map((app, index) => (
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
      {isDeleteModalOpen && (
        <PunchDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          punch={punch}
          refetchPunches={refetchPunches}
        />
      )}
    </>
  );
};

export default PunchCard;
