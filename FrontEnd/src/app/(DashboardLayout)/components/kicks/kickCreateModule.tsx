import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import KickCreateForm from './kickCreateForm';

interface KickCreateModuleProps {
  open: boolean;
  refetchKicks: () => Promise<void>;
  handleCloseCreate: () => void;
}

const KickCreateModule = ({ open, refetchKicks, handleCloseCreate }: KickCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Kick</DialogTitle>
      <DialogContent>
        <KickCreateForm refetchKicks={refetchKicks} handleCloseCreate={handleCloseCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default KickCreateModule;
