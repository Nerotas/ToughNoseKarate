import SSRWrapper from '../../../wrappers/SSRWrapper';
import PunchesClient from './PunchesClient';

export default async function PunchesPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['punches-definitions'],
          url: '/punches-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <PunchesClient />
    </SSRWrapper>
  );
}
