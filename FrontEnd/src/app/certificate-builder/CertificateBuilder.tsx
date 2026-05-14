'use client';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { useState } from 'react';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

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

const CertificateBuilder = () => {
  const [belt, setBelt] = useState('');
  const [studentName, setStudentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function generateCertificate() {
    try {
      setError('');
      setIsLoading(true);

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
      const rangeStartName = 200;
      const rangeEndName = 575;

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

      const rangeStartBelt = 275;
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

      const rangeStartMonth = 300;
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

      const rangeStartYear = 500;
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

      const rangeStartDay = 195;
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

      // Reset form
      setBelt('');
      setStudentName('');
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Certificate Builder
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            Create a TNK certificate with student name and belt rank. The current date will be
            automatically added.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='Student Name'
              fullWidth
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder='Enter student name'
              disabled={isLoading}
            />
            <TextField
              label='Belt Rank'
              fullWidth
              value={belt}
              onChange={(e) => setBelt(e.target.value)}
              placeholder='e.g., Yellow Belt, Black Belt'
              disabled={isLoading}
            />

            {error && (
              <Typography color='error' variant='body2'>
                {error}
              </Typography>
            )}

            <Button
              variant='contained'
              color='primary'
              onClick={generateCertificate}
              disabled={!studentName || !belt || isLoading}
              size='large'
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Generating...' : 'Download Certificate'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CertificateBuilder;
