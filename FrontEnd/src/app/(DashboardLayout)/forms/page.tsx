import SSRWrapper from '../../../wrappers/SSRWrapper';
import FormsClient from './FormsClient';

export default async function FormsPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['form-definitions'],
          url: '/form-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <FormsClient />
    </SSRWrapper>
  );
}
