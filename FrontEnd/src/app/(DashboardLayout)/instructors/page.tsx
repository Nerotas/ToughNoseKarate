import InstructorsClient from './InstructorsClient';
import { getPageMetadata } from '../metadata';

export const metadata = getPageMetadata('/instructors');

export default function InstructorsPage() {
  return <InstructorsClient />;
}
