import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BlockForm from './blockForm';
import { BlockDefinition } from 'models/Blocks/Blocks';

interface BlockEditModuleProps {
  open: boolean;
  block: BlockDefinition;
  refetchBlocks: () => Promise<void>;
  handleCloseEdit: () => void;
}

const BlockEditModule = ({ open, block, refetchBlocks, handleCloseEdit }: BlockEditModuleProps) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseEdit} maxWidth='md' fullWidth>
        <DialogTitle>Edit Block</DialogTitle>
        <DialogContent>
          <BlockForm
            block={block}
            refetchBlocks={refetchBlocks}
            handleCloseEdit={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlockEditModule;
