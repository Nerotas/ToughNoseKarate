import SSRWrapper from '../../../wrappers/SSRWrapper';
import BeltsClient from './BeltsClient';

/**
 * Server-side rendered Stances page with pre-fetched data
 * Uses the reusable SSRWrapper to handle data fetching and hydration
 */

//NOTE: This could a static page, but we are using SSR to ensure data is always fresh
// and to handle any potential dynamic content in the future.
// This is also for consitency with other pages that require SSR and to all @nerotas to practice SSR patterns

export default async function BeltsPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['belt-requirements'],
          url: '/belt-requirements',
        },
      ]}
      fallbackOnError={true}
    >
      <BeltsClient />
    </SSRWrapper>
  );
}
