import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BuildDocumentDialogue from '../BuildDocumentDialogue';

// Mock pdf-lib
jest.mock('pdf-lib', () => ({
  PDFDocument: {
    load: jest.fn(),
  },
  degrees: jest.fn((angle) => angle),
  rgb: jest.fn((r, g, b) => ({ r, g, b })),
}));

// Mock @pdf-lib/fontkit
jest.mock('@pdf-lib/fontkit', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

describe('BuildDocumentDialogue', () => {
  const defaultProps = {
    open: true,
    handleClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog when open is true', () => {
    render(<BuildDocumentDialogue {...defaultProps} />);

    expect(screen.getByText('Build Certificate')).toBeInTheDocument();
    expect(screen.getByLabelText('Student Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Belt')).toBeInTheDocument();
  });

  it('should not render dialog when open is false', () => {
    render(<BuildDocumentDialogue {...defaultProps} open={false} />);

    expect(screen.queryByText('Build Certificate')).not.toBeInTheDocument();
  });

  it('should call handleClose when cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<BuildDocumentDialogue {...defaultProps} handleClose={handleClose} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should update student name input', async () => {
    const user = userEvent.setup();
    render(<BuildDocumentDialogue {...defaultProps} />);

    const studentNameInput = screen.getByLabelText('Student Name');
    await user.type(studentNameInput, 'John Doe');

    expect(studentNameInput).toHaveValue('John Doe');
  });

  it('should update belt input', async () => {
    const user = userEvent.setup();
    render(<BuildDocumentDialogue {...defaultProps} />);

    const beltInput = screen.getByLabelText('Belt');
    await user.type(beltInput, 'Black Belt');

    expect(beltInput).toHaveValue('Black Belt');
  });

  it('should have build button initially disabled when fields are empty', () => {
    render(<BuildDocumentDialogue {...defaultProps} />);

    const buildButton = screen.getByText('Build');
    expect(buildButton).toBeDisabled();
  });

  it('should enable build button when both fields are filled', async () => {
    const user = userEvent.setup();
    render(<BuildDocumentDialogue {...defaultProps} />);

    const studentNameInput = screen.getByLabelText('Student Name');
    const beltInput = screen.getByLabelText('Belt');

    await user.type(studentNameInput, 'John Doe');
    await user.type(beltInput, 'Black Belt');

    const buildButton = screen.getByText('Build');
    expect(buildButton).toBeEnabled();
  });

  it('should handle PDF generation and download', async () => {
    const user = userEvent.setup();

    // Mock PDF-related objects
    const mockPage = {
      drawText: jest.fn(),
    };

    const mockFont = {
      widthOfTextAtSize: jest.fn(() => 100),
    };

    const mockPdfDoc = {
      getPages: jest.fn(() => [mockPage]),
      registerFontkit: jest.fn(),
      embedFont: jest.fn(() => Promise.resolve(mockFont)),
      save: jest.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
    };

    // Mock fetch responses
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
      })
      .mockResolvedValueOnce({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
      });

    // Mock PDFDocument.load
    const { PDFDocument } = require('pdf-lib');
    PDFDocument.load.mockResolvedValue(mockPdfDoc);

    render(<BuildDocumentDialogue {...defaultProps} />);

    // Fill in the form
    const studentNameInput = screen.getByLabelText('Student Name');
    const beltInput = screen.getByLabelText('Belt');

    await user.type(studentNameInput, 'John Doe');
    await user.type(beltInput, 'Black Belt');

    // Click build button
    const buildButton = screen.getByText('Build');
    fireEvent.click(buildButton);

    // Wait for PDF generation to complete
    await waitFor(() => {
      expect(mockPdfDoc.save).toHaveBeenCalled();
    });

    // Verify PDF generation steps
    expect(global.fetch).toHaveBeenCalledWith('/documents/Certificate.pdf');
    expect(global.fetch).toHaveBeenCalledWith('/fonts/samurai.ttf');
    expect(PDFDocument.load).toHaveBeenCalled();
    expect(mockPdfDoc.registerFontkit).toHaveBeenCalled();
    expect(mockPdfDoc.embedFont).toHaveBeenCalled();
    expect(mockPage.drawText).toHaveBeenCalledTimes(4); // Name, belt, month, day
  });

  it('should handle errors during PDF generation', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Mock fetch to throw error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<BuildDocumentDialogue {...defaultProps} />);

    // Fill in the form
    const studentNameInput = screen.getByLabelText('Student Name');
    const beltInput = screen.getByLabelText('Belt');

    await user.type(studentNameInput, 'John Doe');
    await user.type(beltInput, 'Black Belt');

    // Click build button
    const buildButton = screen.getByText('Build');
    fireEvent.click(buildButton);

    // Wait for error to be handled
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error generating certificate:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('should close dialog after successful PDF generation', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    // Mock successful PDF generation
    const mockPdfDoc = {
      getPages: jest.fn(() => [{ drawText: jest.fn() }]),
      registerFontkit: jest.fn(),
      embedFont: jest.fn(() => Promise.resolve({ widthOfTextAtSize: jest.fn(() => 100) })),
      save: jest.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    });

    const { PDFDocument } = require('pdf-lib');
    PDFDocument.load.mockResolvedValue(mockPdfDoc);

    render(<BuildDocumentDialogue {...defaultProps} handleClose={handleClose} />);

    // Fill in the form
    const studentNameInput = screen.getByLabelText('Student Name');
    const beltInput = screen.getByLabelText('Belt');

    await user.type(studentNameInput, 'John Doe');
    await user.type(beltInput, 'Black Belt');

    // Click build button
    const buildButton = screen.getByText('Build');
    fireEvent.click(buildButton);

    // Wait for completion and dialog close
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
