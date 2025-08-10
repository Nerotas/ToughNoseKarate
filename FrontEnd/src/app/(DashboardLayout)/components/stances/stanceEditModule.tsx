import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import StanceDefinitionForm from './stanceDefinitionForm';
import { StanceDefinition } from 'models/Stances/Stances';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface StanceEditModuleProps {
  open: boolean;
  stance: StanceDefinition;
  refetchStances: () => Promise<void>;
  handleCloseEdit: () => void;
}

const StanceEditModule = ({
  open,
  stance,
  refetchStances,
  handleCloseEdit,
}: StanceEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit Stance</DialogTitle>
        <DialogContent>
          <StanceDefinitionForm
            stance={stance}
            refetchStances={refetchStances}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StanceEditModule;
