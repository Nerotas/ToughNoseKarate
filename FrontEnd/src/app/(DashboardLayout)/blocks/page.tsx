import SSRWrapper from '../../../wrappers/SSRWrapper';
import BlocksClient from './BlocksClient';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/blocks');
export const revalidate = 60;

export default async function BlocksPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['blocks-definitions', 'getAll'],
          url: '/blocks-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <BlocksClient />
    </SSRWrapper>
  );
}
