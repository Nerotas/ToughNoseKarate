import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'helpers/AxiosInstance';
import { PunchDefinition } from 'models/Punches/Punches';

interface PunchDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  punch: PunchDefinition;
  refetchPunches: () => Promise<void>;
}

const PunchDeleteModule = ({
  open,
  handleClose,
  punch,
  refetchPunches,
}: PunchDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/punches-definitions/${punch.id}`);
      await refetchPunches();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Punch</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the punch "{punch.name}"? This action cannot be undone.
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

export default PunchDeleteModule;
