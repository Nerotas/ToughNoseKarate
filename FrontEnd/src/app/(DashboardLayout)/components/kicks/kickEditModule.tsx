import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import KickDefinitionForm from './kickDefinitionForm';
import { KickDefinition } from 'models/Kicks/Kicks';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface KickEditModuleProps {
  open: boolean;
  kick: KickDefinition;
  refetchKicks: () => Promise<void>;
  handleCloseEdit: () => void;
}

const KickEditModule = ({ open, kick, refetchKicks, handleCloseEdit }: KickEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit Kick</DialogTitle>
        <DialogContent>
          <KickDefinitionForm
            kick={kick}
            refetchKicks={refetchKicks}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KickEditModule;
