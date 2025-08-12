import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import OneStepCreateForm from './oneStepCreateForm';

interface OneStepCreateModuleProps {
  open: boolean;
  refetchOneSteps: () => Promise<void>;
  handleCloseCreate: () => void;
}

const OneStepCreateModule = ({
  open,
  refetchOneSteps,
  handleCloseCreate,
}: OneStepCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add One-Step</DialogTitle>
      <DialogContent>
        <OneStepCreateForm
          refetchOneSteps={refetchOneSteps}
          handleCloseCreate={handleCloseCreate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OneStepCreateModule;
