import { render, screen, fireEvent } from '@testing-library/react';
import BuildCertificateButton from '../../../../../app/(DashboardLayout)/components/documents/BuildCertificateButton';

// Mock the BuildDocumentDialogue component
jest.mock('../../../../../app/(DashboardLayout)/components/documents/BuildDocumentDialogue', () => {
  return function MockBuildDocumentDialogue({ open, handleClose }: any) {
    return open ? (
      <div data-testid='build-document-dialog'>
        Build Document Dialog
        <button onClick={handleClose}>Close Dialog</button>
      </div>
    ) : null;
  };
});

describe('BuildCertificateButton Component', () => {
  it('renders the certificate card with correct content', () => {
    render(<BuildCertificateButton />);

    expect(screen.getByText('Build Certificate')).toBeInTheDocument();
    expect(
      screen.getByText('Edit and create a TNK certificate for a specific student.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
  });

  it('displays download icon in the button', () => {
    const { container } = render(<BuildCertificateButton />);

    // Check for the download icon (MUI DownloadIcon creates an SVG)
    const downloadIcon = container.querySelector('svg[data-testid="DownloadIcon"]');
    expect(downloadIcon).toBeInTheDocument();
  });

  it('opens dialog when button is clicked', () => {
    render(<BuildCertificateButton />);

    const downloadButton = screen.getByRole('button', { name: /download pdf/i });
    fireEvent.click(downloadButton);

    expect(screen.getByTestId('build-document-dialog')).toBeInTheDocument();
    expect(screen.getByText('Build Document Dialog')).toBeInTheDocument();
  });

  it('does not show dialog initially', () => {
    render(<BuildCertificateButton />);

    expect(screen.queryByTestId('build-document-dialog')).not.toBeInTheDocument();
  });

  it('closes dialog when close handler is called', () => {
    render(<BuildCertificateButton />);

    // Open dialog
    const downloadButton = screen.getByRole('button', { name: /download pdf/i });
    fireEvent.click(downloadButton);
    expect(screen.getByTestId('build-document-dialog')).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByRole('button', { name: /close dialog/i });
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('build-document-dialog')).not.toBeInTheDocument();
  });

  it('renders as a card with proper structure', () => {
    const { container } = render(<BuildCertificateButton />);

    // Check for card structure
    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();

    const cardContent = container.querySelector('.MuiCardContent-root');
    expect(cardContent).toBeInTheDocument();
  });

  it('has proper button styling and color', () => {
    render(<BuildCertificateButton />);

    const button = screen.getByRole('button', { name: /download pdf/i });
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('manages dialog state correctly', () => {
    render(<BuildCertificateButton />);

    // Initially closed
    expect(screen.queryByTestId('build-document-dialog')).not.toBeInTheDocument();

    // Open
    fireEvent.click(screen.getByRole('button', { name: /download pdf/i }));
    expect(screen.getByTestId('build-document-dialog')).toBeInTheDocument();

    // Close
    fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(screen.queryByTestId('build-document-dialog')).not.toBeInTheDocument();
  });
});
