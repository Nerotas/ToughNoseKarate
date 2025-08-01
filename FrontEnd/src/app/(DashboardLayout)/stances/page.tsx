import SSRWrapper from '../../../wrappers/SSRWrapper';
import StancesClient from './StancesClient';

/**
 * Server-side rendered Stances page with pre-fetched data
 * Uses the reusable SSRWrapper to handle data fetching and hydration
 */
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
