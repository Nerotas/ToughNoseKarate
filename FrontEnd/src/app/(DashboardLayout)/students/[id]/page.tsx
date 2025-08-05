import { Metadata } from 'next';
import StudentDetailClient from './StudentDetailClient';

// This generates metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Student ${id} - Tough Nose Karate`,
    description: `Student details and progress for student ID ${id}`,
  };
}

// Server component that passes the ID to the client component
export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudentDetailClient studentId={id} />;
}
