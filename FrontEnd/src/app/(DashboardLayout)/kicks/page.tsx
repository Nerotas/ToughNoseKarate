import SSRWrapper from '../../../wrappers/SSRWrapper';
import KicksClient from './KicksClient';

export default async function KicksPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['kicks-definitions'],
          url: '/kicks-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <KicksClient />
    </SSRWrapper>
  );
}
