import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axiosInstance from 'helpers/AxiosInstance';
import { FormDefinitions } from 'models/Forms/FormDefinitions';

interface FormDeleteModuleProps {
  open: boolean;
  handleClose: () => void;
  form: FormDefinitions;
  refetchForms: () => Promise<void>;
}

const FormDeleteModule = ({ open, handleClose, form, refetchForms }: FormDeleteModuleProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/form-definitions/${form.id}`);
      await refetchForms();
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the form "{form.formName}"? This action cannot be undone.
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

export default FormDeleteModule;
