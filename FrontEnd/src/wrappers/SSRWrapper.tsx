import { ReactNode } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { serverFetch } from '../hooks/useGet';

interface QueryConfig {
  queryKey: string[];
  url: string;
  enabled?: boolean;
}

interface SSRWrapperProps {
  children: ReactNode;
  queries: QueryConfig[];
  fallbackOnError?: boolean;
}

/**
 * Reusable SSR wrapper that pre-fetches data on the server and hydrates it on the client
 *
 * @param children - The client component to wrap
 * @param queries - Array of queries to prefetch on the server
 * @param fallbackOnError - Whether to silently fail and let client handle errors (default: true)
 *
 * @example
 * ```tsx
 * export default async function StancesPage() {
 *   return (
 *     <SSRWrapper
 *       queries={[
 *         { queryKey: ['stances-definitions'], url: '/stance-Definitions' },
 *         { queryKey: ['belt-requirements'], url: '/belt-requirements' }
 *       ]}
 *     >
 *       <StancesClient />
 *     </SSRWrapper>
 *   );
 * }
 * ```
 */
export default async function SSRWrapper({
  children,
  queries,
  fallbackOnError = true,
}: SSRWrapperProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  // Pre-fetch all queries on the server
  const prefetchPromises = queries
    .filter((query) => query.enabled !== false)
    .map(async (query) => {
      try {
        await queryClient.prefetchQuery({
          queryKey: query.queryKey,
          queryFn: () => serverFetch(query.url),
        });
      } catch (error) {
        if (!fallbackOnError) {
          throw error;
        }
        // Silently fail and let client handle with fallback data
        console.warn(`Failed to prefetch query ${query.queryKey.join(',')}:`, error);
      }
    });

  // Wait for all prefetch operations to complete
  await Promise.allSettled(prefetchPromises);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
