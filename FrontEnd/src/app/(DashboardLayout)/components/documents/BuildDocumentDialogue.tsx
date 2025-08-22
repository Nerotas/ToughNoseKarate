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

function getDayWithSuffix(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

// Usage:

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
    const day = getDayWithSuffix(now.getDate());
    const year = now.getFullYear().toString().slice(-2);
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

    const rangeStartBelt = 275; // left boundary
    const rangeEndBelt = 500;

    const beltWidth = customFont.widthOfTextAtSize(belt, 20);
    const yBelt = rangeStartBelt + (rangeEndBelt - rangeStartBelt - beltWidth) / 2;

    page.drawText(`${belt}`, {
      x: 505,
      y: yBelt,
      size: 20,
      color: rgb(0, 0, 0),
      font: customFont,
      rotate: degrees(90),
    });

    const rangeStartMonth = 300; // left boundary
    const rangeEndMonth = 425;

    const monthWidth = customFont.widthOfTextAtSize(month, 16);
    const yMonth = rangeStartMonth + (rangeEndMonth - rangeStartMonth - monthWidth) / 2;

    page.drawText(`${month}`, {
      x: 460,
      y: yMonth,
      size: 16,
      color: rgb(0, 0, 0),
      font: customFont,
      rotate: degrees(90),
    });

    const rangeStartYear = 500; // left boundary
    const rangeEndYear = 505;

    const monthYearWidth = customFont.widthOfTextAtSize(month, 16);
    const yYear = rangeStartYear + (rangeEndYear - rangeStartYear - monthYearWidth) / 2;

    page.drawText(`${year}`, {
      x: 460,
      y: yYear,
      size: 16,
      color: rgb(0, 0, 0),
      font: customFont,
      rotate: degrees(90),
    });

    const rangeStartDay = 195; // left boundary
    const rangeEndDay = 200;

    const dayWidth = customFont.widthOfTextAtSize(day, 12);
    const yDay = rangeStartDay + (rangeEndDay - rangeStartDay - dayWidth) / 2;

    page.drawText(`${day}`, {
      x: 460,
      y: yDay,
      size: 12,
      color: rgb(0, 0, 0),
      font: customFont,
      rotate: degrees(90),
    });

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
    try {
      await addTextToCertificate();
      handleClose();
    } catch (err) {
      // Log and swallow errors so UI doesn't crash during PDF generation
      // Test suite asserts this console error is called
      // eslint-disable-next-line no-console
      console.error('Error generating certificate:', err);
    }
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
