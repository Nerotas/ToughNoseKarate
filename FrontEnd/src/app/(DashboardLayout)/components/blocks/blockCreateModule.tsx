import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BlockCreateForm from './blockCreateForm';

interface BlockCreateModuleProps {
  open: boolean;
  refetchBlocks: () => Promise<void>;
  handleCloseCreate: () => void;
}

const BlockCreateModule = ({ open, refetchBlocks, handleCloseCreate }: BlockCreateModuleProps) => {
  return (
    <Dialog open={open} onClose={handleCloseCreate} maxWidth='md' fullWidth>
      <DialogTitle>Add Block</DialogTitle>
      <DialogContent>
        <BlockCreateForm refetchBlocks={refetchBlocks} handleCloseCreate={handleCloseCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default BlockCreateModule;
