import SSRWrapper from '../../../wrappers/SSRWrapper';
import PunchesClient from './PunchesClient';

export default async function PunchesPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['punch-definitions'],
          url: '/punch-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <PunchesClient />
    </SSRWrapper>
  );
}
