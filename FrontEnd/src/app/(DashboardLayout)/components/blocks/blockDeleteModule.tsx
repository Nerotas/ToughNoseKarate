import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { BlockDefinition } from 'models/Blocks/Blocks';

interface BlockDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  block: BlockDefinition;
  refetchBlocks: () => Promise<void>;
}

const BlockDeleteModule = ({ open, handleClose, block, refetchBlocks }: BlockDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/blocks-definitions/${block.id}`);
      await refetchBlocks();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Block</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the block "{block.blockName}"? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDeleteModule;
