import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormCreateForm from './formCreateForm';

interface FormCreateModuleProps {
  open: boolean;
  refetchForms: () => Promise<void>;
  handleCloseCreate: () => void;
}

const FormCreateModule = ({ open, refetchForms, handleCloseCreate }: FormCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Form</DialogTitle>
      <DialogContent>
        <FormCreateForm refetchForms={refetchForms} handleCloseCreate={handleCloseCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default FormCreateModule;
