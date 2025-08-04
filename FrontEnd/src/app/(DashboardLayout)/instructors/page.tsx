import { Metadata } from 'next';
import InstructorsClient from './InstructorsClient';

export const metadata: Metadata = {
  title: 'Our Instructors - Tough Nose Karate',
  description:
    'Meet our experienced Tang Soo Do instructors dedicated to teaching traditional martial arts with modern training methods.',
  keywords:
    'martial arts instructors, Tang Soo Do masters, karate teachers, martial arts training, Tough Nose Karate staff',
};

export default function InstructorsPage() {
  return <InstructorsClient />;
}
