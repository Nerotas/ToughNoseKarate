import SSRWrapper from '../../../wrappers/SSRWrapper';
import StudentsClient from './StudentsClient';
import ProtectedRoute from '../../../components/ProtectedRoute';

/**
 * Server-side rendered Students page with pre-fetched data
 * Uses the reusable SSRWrapper to handle data fetching and hydration
 */

//NOTE: This could a static page, but we are using SSR to ensure data is always fresh
// and to handle any potential dynamic content in the future.
// This is also for consitency with other pages that require SSR and to all @nerotas to practice SSR patterns

export default async function StudentsPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['students', 'getAll'],
          url: '/students',
        },
        {
          queryKey: ['belt-requirements', 'getAll'],
          url: '/belt-requirements',
        },
      ]}
      fallbackOnError={true}
    >
      <ProtectedRoute requiredRole='instructor'>
        <StudentsClient />
      </ProtectedRoute>
    </SSRWrapper>
  );
}
