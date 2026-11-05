This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Belt requirements loading

The [belt requirements page](./src/app/(DashboardLayout)/belt-requirements/BeltsClient.tsx)
uses responsive card skeletons for both server-side loading and the initial client request.
The loading grid reserves at least one viewport of space to keep Testing Information below
the fold. Cached or server-prefetched requirements render immediately and remain visible
during background refreshes. This query explicitly disables the provider's empty-array placeholder:
React Query treats placeholder data as a successful result, which bypasses the pending skeleton
layout. Do not add fallback data or another placeholder to this query.

## Server rendering and search metadata

Valid configuration is checked in the root server layout. Runtime validation still reports
client configuration failures, but must not hide the initial page behind a mount-only loader:
that prevents useful server-rendered content from reaching crawlers and delays first paint.
Public technique pages prefetch and hydrate their query data and revalidate every 60 seconds.
Server fetch failures are logged; existing client retry/error behavior remains available.

The [shared metadata](./src/app/(DashboardLayout)/metadata.tsx) targets **Plano, TX**, without
publishing a street address. Server routes own page titles, descriptions, canonical URLs, and
social previews; do not add competing head tags to client containers. The homepage includes
general Organization and WebSite structured data with a Plano service area, not an
address-dependent LocalBusiness rich-result claim.

[The sitemap](./src/app/sitemap.ts) includes the ten public content routes on the canonical
`https://toughnosekarate.com` host. Account, student, document, certificate, login, and
access-denied routes are excluded and marked `noindex`. [Robots rules](./src/app/robots.ts)
allow crawling so those `noindex` directives can actually be read; robots rules are not
authorization controls.

Public SSR prefetching must not be used for session-specific student data. Student queries
run only inside the authorized client view, and the auth profile query disables the provider's
empty-array placeholder so anonymous server renders are not mistaken for signed-in sessions.

After deployment, submit `/sitemap.xml` in Google Search Console and inspect the homepage and
public technique URLs. These changes improve crawlability and search signals, not guaranteed
rankings or local-pack eligibility.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
