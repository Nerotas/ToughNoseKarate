import SSRWrapper from '../../../wrappers/SSRWrapper';
import KicksClient from './KicksClient';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/kicks');
export const revalidate = 60;

export default async function KicksPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['kicks-definitions'],
          url: '/kicks-definitions',
          id: 'getAll',
        },
      ]}
      fallbackOnError={true}
    >
      <KicksClient />
    </SSRWrapper>
  );
}
