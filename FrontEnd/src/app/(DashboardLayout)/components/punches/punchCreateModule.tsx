import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PunchCreateForm from './punchCreateForm';

interface PunchCreateModuleProps {
  open: boolean;
  refetchPunches: () => Promise<void>;
  handleCloseCreate: () => void;
}

const PunchCreateModule = ({ open, refetchPunches, handleCloseCreate }: PunchCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Punch</DialogTitle>
      <DialogContent>
        <PunchCreateForm refetchPunches={refetchPunches} handleCloseCreate={handleCloseCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default PunchCreateModule;
