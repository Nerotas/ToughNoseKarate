import type { ReactNode } from 'react';
import { getPrivatePageMetadata } from '../../metadata';

export const metadata = getPrivatePageMetadata(
  '/auth/login',
  'Instructor Login',
  'Sign in to access the Tough Nose Karate student management system.'
);

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
