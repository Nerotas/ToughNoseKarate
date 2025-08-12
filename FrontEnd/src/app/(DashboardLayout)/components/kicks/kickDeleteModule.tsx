import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'helpers/AxiosInstance';
import { KickDefinition } from 'models/Kicks/Kicks';

interface KickDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  kick: KickDefinition;
  refetchKicks: () => Promise<void>;
}

const KickDeleteModule = ({ open, handleClose, kick, refetchKicks }: KickDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/kicks-definitions/${kick.id}`);
      await refetchKicks();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Kick</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the kick "{kick.name}"? This action cannot be undone.
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

export default KickDeleteModule;
