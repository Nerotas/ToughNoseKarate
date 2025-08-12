import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import StanceCreateForm from './stanceCreateForm';

interface StanceCreateModuleProps {
  open: boolean;
  refetchStances: () => Promise<void>;
  handleCloseCreate: () => void;
}

const StanceCreateModule = ({
  open,
  refetchStances,
  handleCloseCreate,
}: StanceCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Stance</DialogTitle>
      <DialogContent>
        <StanceCreateForm refetchStances={refetchStances} handleCloseCreate={handleCloseCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default StanceCreateModule;
