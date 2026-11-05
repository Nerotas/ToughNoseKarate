import StudentsClient from './StudentsClient';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { getPrivatePageMetadata } from '../metadata';

export const metadata = getPrivatePageMetadata(
  '/students',
  'Students',
  'Student management and progress tracking for authorized instructors.'
);

export default function StudentsPage() {
  return (
    <ProtectedRoute requiredRole='instructor'>
      <StudentsClient />
    </ProtectedRoute>
  );
}
