import HomeClient from './HomeClient';
import { getPageMetadata, homeStructuredData } from './metadata';

export const metadata = getPageMetadata('/');

export default function HomePage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <HomeClient />
    </>
  );
}
