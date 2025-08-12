import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'helpers/AxiosInstance';
import { SelfDefenseDefinition } from 'models/SelfDefense/SelfDefense';

interface SelfDefenseDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  selfDefense: SelfDefenseDefinition;
  refetchSelfDefense: () => Promise<void>;
}

const SelfDefenseDeleteModule = ({
  open,
  handleClose,
  selfDefense,
  refetchSelfDefense,
}: SelfDefenseDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/self-defense-definitions/${selfDefense.id}`);
      await refetchSelfDefense();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Self-Defense Technique</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the self-defense technique "{selfDefense.name}"? This
          action cannot be undone.
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

export default SelfDefenseDeleteModule;
