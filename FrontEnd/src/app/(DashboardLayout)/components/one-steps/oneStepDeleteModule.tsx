import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { OneStepDefinition } from 'models/OneSteps/OneSteps';

interface OneStepDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  oneStep: OneStepDefinition;
  refetchOneSteps: () => Promise<void>;
}

const OneStepDeleteModule = ({
  open,
  handleClose,
  oneStep,
  refetchOneSteps,
}: OneStepDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/onestep-definitions/${oneStep.id}`);
      await refetchOneSteps();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete One-Step</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the one-step "{oneStep.name}"? This action cannot be
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

export default OneStepDeleteModule;
