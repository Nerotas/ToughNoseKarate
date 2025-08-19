import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

interface BuildDocumentDialogueProps {
  open: boolean;
  handleClose: () => void;
}

const BuildDocumentDialogue = ({ open, handleClose }: BuildDocumentDialogueProps) => {
  const [belt, setBelt] = useState('');
  const [studentName, setStudentName] = useState('');

  async function addTextToCertificate() {
    // Fetch the blank PDF
    const response = await fetch('/documents/Certificate_Preview.pdf');
    const existingPdfBytes = await response.arrayBuffer();

    // Load PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get first page
    const page = pdfDoc.getPages()[0];

    // Add text at (x, y) coordinates
    page.drawText(`${studentName}`, {
      x: 100, // adjust as needed
      y: 500, // adjust as needed
      size: 24,
      color: rgb(0, 0, 0),
    });

    page.drawText(`${belt}`, {
      x: 500, // adjust as needed
      y: 500, // adjust as needed
      size: 24,
      color: rgb(0, 0, 0),
    });

    // More text can be added similarly...

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Certificate_Completed.pdf';
    link.click();
  }

  const handleBuild = async () => {
    await addTextToCertificate();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Build Document</DialogTitle>
      <DialogContent>
        <DialogContentText>Customize and build your TNK document.</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='Document belt'
          type='text'
          fullWidth
          variant='outlined'
          value={belt}
          onChange={(e) => setBelt(e.target.value)}
        />
        <TextField
          margin='dense'
          label='Student Name'
          type='text'
          fullWidth
          variant='outlined'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleBuild} color='primary' disabled={!belt || !studentName}>
          Build Document
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuildDocumentDialogue;
