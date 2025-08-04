import SSRWrapper from '../../../wrappers/SSRWrapper';
import PunchesClient from './PunchesClient';

export default async function PunchesPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['punches-definitions', 'getAll'],
          url: '/punches-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <PunchesClient />
    </SSRWrapper>
  );
}
