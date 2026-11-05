import SelfDefenseClient from './SelfDefenseClient';
import SSRWrapper from '../../../wrappers/SSRWrapper';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/self-defense');
export const revalidate = 60;

export default async function SelfDefensePage() {
  return (
    <SSRWrapper
      queries={[
        {
          queryKey: ['self-defense-definitions', 'getAll'],
          url: '/self-defense-definitions',
        },
      ]}
      fallbackOnError={true}
    >
      <SelfDefenseClient />
    </SSRWrapper>
  );
}
