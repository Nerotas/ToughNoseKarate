import SSRWrapper from '../../../wrappers/SSRWrapper';
import FormsClient from './FormsClient';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/forms');
export const revalidate = 60;

export default async function FormsPage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['form-definitions'],
          url: '/form-definitions',
          id: 'getAll',
        },
      ]}
      fallbackOnError={true}
    >
      <FormsClient />
    </SSRWrapper>
  );
}
