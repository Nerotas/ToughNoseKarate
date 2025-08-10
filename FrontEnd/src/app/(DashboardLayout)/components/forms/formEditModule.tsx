import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormDefinitionForm from './formDefinitionForm';
import { FormDefinitions } from 'models/Forms/FormDefinitions';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface FormEditModuleProps {
  open: boolean;
  form: FormDefinitions;
  refetchForms: () => Promise<void>;
  handleCloseEdit: () => void;
}

const FormEditModule = ({ open, form, refetchForms, handleCloseEdit }: FormEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit Form</DialogTitle>
        <DialogContent>
          <FormDefinitionForm
            form={form}
            refetchForms={refetchForms}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormEditModule;
