import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocumentsClient from '../../../app/(DashboardLayout)/documents/DocsClient';

// Mock PageContainer
jest.mock('../../../app/(DashboardLayout)/components/container/PageContainer', () => {
  return function MockPageContainer({ children, title, description }: any) {
    return (
      <div data-testid='page-container' data-title={title} data-description={description}>
        {children}
      </div>
    );
  };
});

// Mock BuildCertificateButton
jest.mock('../../../app/(DashboardLayout)/components/documents/BuildCertificateButton', () => {
  return function MockBuildCertificateButton() {
    return <div data-testid='build-certificate-button'>Build Certificate Button</div>;
  };
});

describe('DocumentsClient Component', () => {
  it('renders the documents page correctly', () => {
    render(<DocumentsClient />);

    expect(screen.getByTestId('page-container')).toBeInTheDocument();
    expect(screen.getByText('Document Management')).toBeInTheDocument();
  });

  it('displays the correct page title and description', () => {
    render(<DocumentsClient />);

    const pageContainer = screen.getByTestId('page-container');
    expect(pageContainer).toHaveAttribute('data-title', 'Documents');
    expect(pageContainer).toHaveAttribute('data-description', 'Useful TNK Documents');
  });

  it('renders the testing application card', () => {
    render(<DocumentsClient />);

    expect(screen.getByText('Testing Application')).toBeInTheDocument();
    expect(
      screen.getByText('Download the official TNK testing application PDF.')
    ).toBeInTheDocument();
  });

  it('renders the certificate card', () => {
    render(<DocumentsClient />);

    expect(screen.getByText('Certificate')).toBeInTheDocument();
    expect(screen.getByText('Download the official TNK certificate PDF.')).toBeInTheDocument();
  });

  it('has download links for both documents', () => {
    render(<DocumentsClient />);

    const downloadButtons = screen.getAllByText('Download PDF');
    expect(downloadButtons).toHaveLength(2);

    // Check for the testing application download link specifically
    const links = screen.getAllByRole('link', { name: /download pdf/i });
    expect(links).toHaveLength(2);

    // Find the testing application link by its href
    const testingAppLink = links.find(
      (link) => link.getAttribute('href') === '/documents/TNK_Testing_Application.pdf'
    );
    expect(testingAppLink).toBeInTheDocument();
    expect(testingAppLink).toHaveAttribute('download');

    // Find the certificate link by its href
    const certificateLink = links.find(
      (link) => link.getAttribute('href') === '/documents/Certificate.pdf'
    );
    expect(certificateLink).toBeInTheDocument();
    expect(certificateLink).toHaveAttribute('download');
  });

  it('includes the build certificate button component', () => {
    render(<DocumentsClient />);

    expect(screen.getByTestId('build-certificate-button')).toBeInTheDocument();
  });

  it('displays the description text at the bottom', () => {
    render(<DocumentsClient />);

    expect(
      screen.getByText('Manage and organize your TNK documents effectively.')
    ).toBeInTheDocument();
  });

  it('has proper grid layout structure', () => {
    const { container } = render(<DocumentsClient />);

    // Check for MUI Grid container
    const gridContainer = container.querySelector('.MuiGrid-container');
    expect(gridContainer).toBeInTheDocument();
  });

  it('has elevated cards for documents', () => {
    const { container } = render(<DocumentsClient />);

    // Check for MUI Cards with elevation
    const cards = container.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThanOrEqual(2); // At least 2 cards for the documents
  });

  it('has download icons on the buttons', () => {
    render(<DocumentsClient />);

    // Check that download buttons are actually anchor elements, not button elements
    const downloadLinks = screen.getAllByRole('link', { name: /download pdf/i });
    downloadLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });

    // Check for download icons within the links
    const downloadIcons = screen.getAllByTestId('DownloadIcon');
    expect(downloadIcons).toHaveLength(2);
  });
});
