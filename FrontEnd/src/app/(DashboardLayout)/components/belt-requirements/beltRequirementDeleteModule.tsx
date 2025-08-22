import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'helpers/AxiosInstance';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

interface BeltRequirementDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  beltRequirement: BeltRequirements;
  refetchBeltRequirements: () => Promise<void>;
}

const BeltRequirementDeleteModule = ({
  open,
  handleClose,
  beltRequirement,
  refetchBeltRequirements,
}: BeltRequirementDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/belt-requirements/${beltRequirement.beltRank}`);
      await refetchBeltRequirements();
    } catch (error) {
      console.error('Error during belt requirement deletion:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Belt Requirement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this belt requirement?
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

export default BeltRequirementDeleteModule;
