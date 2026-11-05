import CertificateBuilder from './CertificateBuilder';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getPrivatePageMetadata } from '../(DashboardLayout)/metadata';

export const metadata = getPrivatePageMetadata(
  '/certificate-builder',
  'Certificate Builder',
  'Create karate certificates with an authorized Tough Nose Karate account.'
);

export default function CertificateBuilderPage() {
  return (
    <ProtectedRoute>
      <CertificateBuilder />
    </ProtectedRoute>
  );
}
