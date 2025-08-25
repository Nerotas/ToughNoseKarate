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
import { IconShield, IconCheckbox, IconX, IconTarget, IconEdit } from '@tabler/icons-react';
import { BlockDefinition } from 'models/Blocks/Blocks';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import BlockDeleteModule from './blockDeleteModule';
import BlockEditModule from './blockEditModule';

const BlockCard = ({
  block,
  getBeltTextColor,
  refetchBlocks,
}: {
  block: BlockDefinition;
  getBeltTextColor: (color: string) => string;
  refetchBlocks: () => Promise<void>;
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
      <Grid size={{ xs: 12, md: 6 }} key={block.id}>
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
                  {block.blockName}
                </Typography>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  {block.technique}
                </Typography>
              </Box>
              <Chip
                icon={<IconShield />}
                label={block.beltRank}
                sx={{
                  backgroundColor: block.beltColor,
                  color: getBeltTextColor(block.beltColor as string),
                  fontWeight: 'bold',
                  border: block.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
              {isAuthenticated && instructor && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={'Edit'} icon={<IconEdit />} onClick={handleOpenEdit} />
                  <Chip label={'Delete'} icon={<IconX />} color='error' onClick={openDeleteModal} />
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Add Stance section */}
            {block.stance && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant='subtitle2'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconTarget size={16} color='blue' style={{ marginRight: 8 }} />
                  Stance:
                </Typography>
                <Typography variant='body2' sx={{ pl: 3 }}>
                  {block.stance}
                </Typography>
              </Box>
            )}

            {/* Add Execution section */}
            {block.execution && block.execution.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Execution Steps:
                </Typography>
                <List dense sx={{ pl: 2 }}>
                  {block.execution.map((step, index) => (
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
                {block.keyPoints?.map((point, index) => (
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
                {block.commonMistakes?.map((mistake, index) => (
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
                {block.applications?.map((app, index) => (
                  <Chip key={index} label={app} size='small' variant='outlined' color='primary' />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <BlockEditModule
        block={block}
        refetchBlocks={refetchBlocks}
        open={open}
        handleCloseEdit={handleCloseEdit}
      />
      {isDeleteModalOpen && (
        <BlockDeleteModule
          open={isDeleteModalOpen}
          handleClose={closeDeleteModal}
          block={block}
          refetchBlocks={refetchBlocks}
        />
      )}
    </>
  );
};

export default BlockCard;
