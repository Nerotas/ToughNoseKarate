import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PunchForm from './punchForm';
import { PunchDefinition } from 'models/Punches/Punches';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface PunchEditModuleProps {
  open: boolean;
  punch: PunchDefinition;
  refetchPunches: () => Promise<void>;
  handleCloseEdit: () => void;
}

const PunchEditModule = ({
  open,
  punch,
  refetchPunches,
  handleCloseEdit,
}: PunchEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit}>
        <DialogTitle>Edit Punch</DialogTitle>
        <DialogContent>
          <PunchForm punch={punch} refetchPunches={refetchPunches} handleCloseEdit={handleCloseEdit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PunchEditModule;
