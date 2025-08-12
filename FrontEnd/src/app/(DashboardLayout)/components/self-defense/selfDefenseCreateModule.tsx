import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import SelfDefenseCreateForm from 'app/(DashboardLayout)/components/self-defense/selfDefenseCreateForm';

interface SelfDefenseCreateModuleProps {
  open: boolean;
  refetchSelfDefense: () => Promise<void>;
  handleCloseCreate: () => void;
}

const SelfDefenseCreateModule = ({
  open,
  refetchSelfDefense,
  handleCloseCreate,
}: SelfDefenseCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Self Defense Technique</DialogTitle>
      <DialogContent>
        <SelfDefenseCreateForm
          refetchSelfDefense={refetchSelfDefense}
          handleCloseCreate={handleCloseCreate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SelfDefenseCreateModule;
