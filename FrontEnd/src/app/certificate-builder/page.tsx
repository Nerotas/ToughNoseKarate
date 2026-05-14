'use client';

import CertificateBuilder from './CertificateBuilder';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function CertificateBuilderPage() {
  return (
    <ProtectedRoute>
      <CertificateBuilder />
    </ProtectedRoute>
  );
}
