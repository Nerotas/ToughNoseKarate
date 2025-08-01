import { Metadata } from 'next';
import SelfDefenseClient from './SelfDefenseClient';

export const metadata: Metadata = {
  title: 'Self-Defense & Ground Work - Tough Nose Karate',
  description:
    'Learn essential self-defense techniques, escapes, and ground work for real-world situations through the Tang Soo Do curriculum.',
  keywords: 'self-defense, ground work, martial arts, Tang Soo Do, escapes, submissions, grappling',
};

export default function SelfDefensePage() {
  return <SelfDefenseClient />;
}
