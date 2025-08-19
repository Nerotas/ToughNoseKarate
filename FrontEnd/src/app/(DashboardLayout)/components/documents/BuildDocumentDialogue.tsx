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
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

interface BuildDocumentDialogueProps {
  open: boolean;
  handleClose: () => void;
}

const BuildDocumentDialogue = ({ open, handleClose }: BuildDocumentDialogueProps) => {
  const [belt, setBelt] = useState('');
  const [studentName, setStudentName] = useState('');

  async function addTextToCertificate() {
    // Fetch the blank PDF
    const response = await fetch('/documents/Certificate.pdf');
    const existingPdfBytes = await response.arrayBuffer();

    // Load PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch('/fonts/samurai.ttf').then((res) => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Get first page
    const page = pdfDoc.getPages()[0];

    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const day = now.getDate();
    const year = now.getFullYear();

    const fontSize = 24;
    const rangeStartName = 200; // left boundary
    const rangeEndName = 575; // right boundary

    const textWidth = customFont.widthOfTextAtSize(studentName, fontSize);
    const yName = rangeStartName + (rangeEndName - rangeStartName - textWidth) / 2;

    page.drawText(`${studentName}`, {
      x: 325,
      y: yName,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: customFont,
      rotate: degrees(90),
    });

    // page.drawText(`${belt}`, {
    //   x: 325, // adjust as needed
    //   y: 700, // adjust as needed
    //   size: 24,
    //   color: rgb(0, 0, 0),
    //   font: customFont,
    //   rotate: degrees(90),
    // });

    // page.drawText(`${month}`, {
    //   x: 500, // adjust as needed
    //   y: 300, // adjust as needed
    //   size: 12,
    //   color: rgb(0, 0, 0),
    //   font: customFont,
    //   rotate: degrees(90),
    // });

    // page.drawText(`${day}`, {
    //   x: 500, // adjust as needed
    //   y: 300, // adjust as needed
    //   size: 12,
    //   color: rgb(0, 0, 0),
    //   font: customFont,
    //   rotate: degrees(90),
    // });

    // page.drawText(`${year}`, {
    //   x: 500, // adjust as needed
    //   y: 300, // adjust as needed
    //   size: 12,
    //   color: rgb(0, 0, 0),
    //   font: customFont,
    //   rotate: degrees(90),
    // });

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
          label='New Rank'
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
