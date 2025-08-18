import SSRWrapper from '../../../wrappers/SSRWrapper';
import BlocksClient from './BlocksClient';

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
