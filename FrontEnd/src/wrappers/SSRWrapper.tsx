import { ReactNode } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { serverFetch } from '../hooks/useGet';

interface QueryConfig {
  queryKey: string[];
  url: string;
  enabled?: boolean;
  id?: string | number;
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
 *         { queryKey: ['stances-definitions'], url: '/stance-definitions', id: 'getAll' },
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
        // Use the same query key pattern as useGet: [apiLabel, id]
        const queryKey =
          query.queryKey.length === 1 ? [...query.queryKey, query.id ?? 'getAll'] : query.queryKey;

        if (fallbackOnError) {
          await queryClient.prefetchQuery({
            queryKey,
            queryFn: () => serverFetch(query.url),
          });
        } else {
          // fetchQuery rejects on error, allowing us to propagate it
          await queryClient.fetchQuery({
            queryKey,
            queryFn: () => serverFetch(query.url),
          });
        }
      } catch (error) {
        if (!fallbackOnError) {
          throw error;
        }
        // Silently fail and let client handle with fallback data
        console.warn(`Failed to prefetch query ${query.queryKey.join(',')}:`, error);
      }
    });

  // Wait for prefetch operations using allSettled, then if fallbackOnError=false and any failed, throw first error
  const results = await Promise.allSettled(prefetchPromises);
  if (!fallbackOnError) {
    const rejection = results.find((r) => r.status === 'rejected') as
      | PromiseRejectedResult
      | undefined;
    if (rejection) {
      throw rejection.reason;
    }
  }

  const state = dehydrate(queryClient);
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
