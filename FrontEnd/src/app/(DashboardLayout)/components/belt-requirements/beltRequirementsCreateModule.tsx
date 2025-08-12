import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BeltRequirementsCreateForm from './beltRequirementsCreateForm';

interface BeltRequirementsCreateModuleProps {
  open: boolean;
  refetchBeltRequirements: () => Promise<void>;
  handleCloseCreate: () => void;
}

const BeltRequirementsCreateModule = ({
  open,
  refetchBeltRequirements,
  handleCloseCreate,
}: BeltRequirementsCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Belt Requirements</DialogTitle>
      <DialogContent>
        <BeltRequirementsCreateForm
          refetchBeltRequirements={refetchBeltRequirements}
          handleCloseCreate={handleCloseCreate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BeltRequirementsCreateModule;
