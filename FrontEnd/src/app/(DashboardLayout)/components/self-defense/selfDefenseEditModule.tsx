import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import SelfDefenseDefinitionForm from './selfDefenseDefinitionForm';
import { SelfDefenseDefinition } from 'models/SelfDefense/SelfDefense';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface SelfDefenseEditModuleProps {
  open: boolean;
  selfDefense: SelfDefenseDefinition;
  refetchSelfDefense: () => Promise<void>;
  handleCloseEdit: () => void;
}

const SelfDefenseEditModule = ({
  open,
  selfDefense,
  refetchSelfDefense,
  handleCloseEdit,
}: SelfDefenseEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit Self Defense</DialogTitle>
        <DialogContent>
          <SelfDefenseDefinitionForm
            selfDefense={selfDefense}
            refetchSelfDefense={refetchSelfDefense}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelfDefenseEditModule;
