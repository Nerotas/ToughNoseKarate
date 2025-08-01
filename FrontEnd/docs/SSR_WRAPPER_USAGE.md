# SSR Wrapper Usage Guide

The `SSRWrapper` component provides a reusable way to add server-side rendering and data pre-fetching to any page in your application.

## Basic Usage

### 1. Create a Client Component

First, create a client component (with `'use client'`) that contains your UI logic:

```tsx
// StancesClient.tsx
'use client';
import useGet from '../../../hooks/useGet';

export default function StancesClient() {
  const { data, isLoading, isError } = useGet({
    apiLabel: 'stances-definitions',
    url: '/stance-Definitions',
    fallbackData: [],
  });

  // Your component logic here...
}
```

### 2. Create a Server Component Page

Then create your page as a server component that uses the SSR wrapper:

```tsx
// page.tsx (NO 'use client' directive)
import SSRWrapper from '../../../components/SSRWrapper';
import StancesClient from './StancesClient';

export default async function StancesPage() {
  return (
    <SSRWrapper queries={[{ queryKey: ['stances-definitions'], url: '/stance-Definitions' }]}>
      <StancesClient />
    </SSRWrapper>
  );
}
```

## Advanced Usage

### Multiple Queries

Pre-fetch multiple APIs for a single page:

```tsx
export default async function StudentsPage() {
  return (
    <SSRWrapper
      queries={[
        { queryKey: ['students'], url: '/students' },
        { queryKey: ['belt-requirements'], url: '/belt-requirements' },
        { queryKey: ['forms'], url: '/forms' },
      ]}
    >
      <StudentsClient />
    </SSRWrapper>
  );
}
```

### Conditional Queries

Disable certain queries based on conditions:

```tsx
export default async function ConditionalPage() {
  return (
    <SSRWrapper
      queries={[
        { queryKey: ['always-fetch'], url: '/always' },
        {
          queryKey: ['conditional'],
          url: '/conditional',
          enabled: process.env.NODE_ENV === 'production',
        },
      ]}
    >
      <ConditionalClient />
    </SSRWrapper>
  );
}
```

### Error Handling

Control how errors are handled:

```tsx
export default async function CriticalPage() {
  return (
    <SSRWrapper
      queries={[{ queryKey: ['critical-data'], url: '/critical' }]}
      fallbackOnError={false} // Will throw errors instead of falling back
    >
      <CriticalClient />
    </SSRWrapper>
  );
}
```

## Benefits

1. **SEO Optimized**: Data is pre-rendered on the server
2. **Fast Initial Load**: No loading spinners for cached data
3. **Automatic Fallback**: Gracefully handles API failures
4. **Reusable**: Same pattern across all pages
5. **Type Safe**: Full TypeScript support
6. **React Query Integration**: Seamless hydration

## How It Works

1. **Server**: Pre-fetches data using your `serverFetch` function
2. **Hydration**: Dehydrates the query cache and sends it to the client
3. **Client**: React Query automatically uses the pre-fetched data
4. **Fallback**: If server fetch fails, client uses your `useGet` fallback data

This pattern gives you the best of both worlds: fast SSR performance with robust client-side error handling!
