import SSRWrapper from '../../../wrappers/SSRWrapper';
import OneStepsClient from './OneStepsClient';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/one-steps');
export const revalidate = 60;

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
