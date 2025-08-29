import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { StanceDefinition } from 'models/Stances/Stances';

interface StanceDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  stance: StanceDefinition;
  refetchStances: () => Promise<void>;
}

const StanceDeleteModule = ({
  open,
  handleClose,
  stance,
  refetchStances,
}: StanceDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/stance-definitions/${stance.id}`);
      await refetchStances();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Stance</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the stance "{stance.name}"? This action cannot be undone.
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

export default StanceDeleteModule;
