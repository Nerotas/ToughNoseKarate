export const LoadingSnippet: string[] = [
  'Rolling out the mats',
  'Tying our belts',
  'You gotta be kidding me!',
  'A Black Belt is a white belt that never gave up!',
  'True power comes from technique',
  'Bowing into the instructor',
  'Practicing horse stance',
  'Sharpening focus – eyes front',
  'Polishing forms',
  'Aligning our stances',
  'Stretching hamstrings – flexibility first',
  'Breathing in… breathing out…',
  'Calibrating kiai 🔊',
  'Sweeping the dojo for bugs 🧹',
  'Balance before power',
  'Mind like water',
  'Checking sparring gear',
  'Light on the feet, strong in the core',
  'Black belt mindset, every day',
  'Focus. Respect. Discipline.',
  'Warming up front kicks (Ap Chagi)',
  'Hands up, chin down',
  'Strong stance, calm mind',
];

export const randomSnippet = (): string =>
  LoadingSnippet[Math.floor(Math.random() * LoadingSnippet.length)];
