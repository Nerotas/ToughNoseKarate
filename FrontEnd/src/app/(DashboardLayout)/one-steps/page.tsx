import SSRWrapper from '../../../wrappers/SSRWrapper';
import OneStepsClient from './OneStepsClient';

export default async function OneStepsPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['onestep-definitions', 'getAll'],
          url: '/onestep-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <OneStepsClient />
    </SSRWrapper>
  );
}
