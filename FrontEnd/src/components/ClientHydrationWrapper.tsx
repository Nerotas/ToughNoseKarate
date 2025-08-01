'use client';

import { ReactNode } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';

interface ClientHydrationWrapperProps {
  children: ReactNode;
  dehydratedState: any;
}

/**
 * Client-side wrapper for HydrationBoundary to ensure it runs in the correct context
 * Note: QueryClientProvider is already provided at the root level in providers.tsx
 */
export default function ClientHydrationWrapper({
  children,
  dehydratedState,
}: ClientHydrationWrapperProps) {
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
