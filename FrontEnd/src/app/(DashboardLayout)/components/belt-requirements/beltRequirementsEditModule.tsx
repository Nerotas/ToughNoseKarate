import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BeltRequirementsForm from './beltRequirementsForm';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface BeltRequirementsEditModuleProps {
  open: boolean;
  beltRequirement: BeltRequirements;
  refetchBeltRequirements: () => Promise<void>;
  handleCloseEdit: () => void;
}

const BeltRequirementsEditModule = ({
  open,
  beltRequirement,
  refetchBeltRequirements,
  handleCloseEdit,
}: BeltRequirementsEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='lg' fullWidth>
        <DialogTitle>Edit Belt Requirements</DialogTitle>
        <DialogContent>
          <BeltRequirementsForm
            beltRequirement={beltRequirement}
            refetchBeltRequirements={refetchBeltRequirements}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BeltRequirementsEditModule;
