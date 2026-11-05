import { Metadata } from 'next';
import StudentDetailClient from './StudentDetailClient';
import ProtectedRoute from 'components/ProtectedRoute';
import { getPrivatePageMetadata } from '../../metadata';

// This generates metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return getPrivatePageMetadata(
    `/students/${encodeURIComponent(id)}`,
    `Student ${id}`,
    `Student details and progress for student ID ${id}`
  );
}

// Server component that passes the ID to the client component
export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ProtectedRoute requiredRole='instructor'>
      <StudentDetailClient studentId={id} />{' '}
    </ProtectedRoute>
  );
}
