import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import OneStepDefinitionForm from './oneStepDefinitionForm';
import { OneStepDefinition } from 'models/OneSteps/OneSteps';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface OneStepEditModuleProps {
  open: boolean;
  oneStep: OneStepDefinition;
  refetchOneSteps: () => Promise<void>;
  handleCloseEdit: () => void;
}

const OneStepEditModule = ({
  open,
  oneStep,
  refetchOneSteps,
  handleCloseEdit,
}: OneStepEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit One Step</DialogTitle>
        <DialogContent>
          <OneStepDefinitionForm
            oneStep={oneStep}
            refetchOneSteps={refetchOneSteps}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OneStepEditModule;
