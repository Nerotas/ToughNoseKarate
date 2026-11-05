import type { ReactNode } from 'react';
import { getPrivatePageMetadata } from '../(DashboardLayout)/metadata';

export const metadata = getPrivatePageMetadata(
  '/unauthorized',
  'Access Denied',
  'This page requires an authorized Tough Nose Karate account.'
);

export default function UnauthorizedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
