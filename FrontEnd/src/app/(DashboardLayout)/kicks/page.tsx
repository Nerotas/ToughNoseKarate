import SSRWrapper from '../../../wrappers/SSRWrapper';
import KicksClient from './KicksClient';

export default async function KicksPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['kick-definitions'],
          url: '/kick-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <KicksClient />
    </SSRWrapper>
  );
}
