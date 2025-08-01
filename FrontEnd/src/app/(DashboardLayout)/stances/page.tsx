import SSRWrapper from '../../../wrappers/SSRWrapper';
import StancesClient from './StancesClient';

/**
 * Server-side rendered Stances page with pre-fetched data
 * Uses the reusable SSRWrapper to handle data fetching and hydration
 */

//NOTE: This could a static page, but we are using SSR to ensure data is always fresh
// and to handle any potential dynamic content in the future.
// This is also for consitency with other pages that require SSR and to all @nerotas to practice SSR patterns

export default async function StancesPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['stances-definitions'],
          url: '/stance-Definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <StancesClient />
    </SSRWrapper>
  );
}
