import { ReactNode } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { serverFetch } from '../hooks/useGet';
import ClientHydrationWrapper from './ClientHydrationWrapper';

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
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
        // while fetching data, assume it is any empty array
        placeholderData: [],
        // by default data is fresh for 60 seconds
        staleTime: 60 * 1000,
        enabled: true,
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientHydrationWrapper dehydratedState={dehydratedState}>{children}</ClientHydrationWrapper>
  );
}
