export interface Instructor {
  id: number;
  name: string;
  title: string;
  rank: string;
  yearsExperience: number;
  specialties: string[];
  bio: string;
  image?: string;
  certifications: string[];
}

export const instructors: Instructor[] = [
  {
    id: 1,
    name: 'Raffi Erotas',
    title: 'Head Instructor & School Owner',
    rank: '3rd Degree Black Belt',
    yearsExperience: 29,
    specialties: ['Traditional Forms', 'Self-Defense', 'Competition Sparring'],
    bio: `Raffi Erotas began his Tang Soo Do journey at age 9 and has dedicated his life to preserving and teaching traditional Korean martial arts.
    He trained at Quartz Hill Karate with Master Roger Quinlan.
    Once accepted into the National Tang Soo Do Congress, he has continued to grow and develop his skills, training with the legendary Master Pat E. Johnson.
    He met Danielle Erotas at the Quartz Hill Karate and they have been married for 13 years.
    Together, they run Tough Nose Karate, where Raffi focuses on traditional forms and self-defense techniques.`,
    image: '/images/instructors/Raffi_001.jpg',
    certifications: [
      'National Tang Soo Do Congress Certified',
      'First Aid/CPR Certified',
      'Youth Instructor Certification',
    ],
  },
  {
    id: 2,
    name: 'Danielle Erotas',
    title: 'Senior Instructor',
    rank: '3rd Degree Black Belt',
    yearsExperience: 30,
    image: '/images/instructors/Danielle_001.jpg',
    specialties: ['Breaking Techniques', 'Forms', 'Precision Techniques', 'Conditioning'],
    bio: `Danielle Erotas began her martial arts journey at age 8 at Quartz Hill Karate, where she first met her future husband Raffi.
    With over 30 years of dedicated training, she has developed exceptional expertise in the more technical and physical aspects of Tang Soo Do.
    She has unique insights into body mechanics, leverage, and power generation.
    Danielle specializes in forms techniques and precision training, helping students understand the physics behind effective martial arts techniques.
    As a senior instructor of Tough Nose Karate, she brings both technical excellence and nurturing guidance to all her students.`,
    certifications: ['National Tang Soo Do Congress Certified'],
  },
  {
    id: 3,
    name: 'Andrew La Riva',
    title: 'Guest Instructor',
    rank: '3rd Degree Black Belt',
    yearsExperience: 30,
    specialties: ['Character Development', 'Self-Defense', 'Military Tactics'],
    image: '/images/instructors/Andrew_001.png',
    bio: `Andrew La Riva brings a unique combination of martial arts expertise and military background to Tough Nose Karate. With 30 years of Tang Soo Do experience, he specializes in youth development and character building.
    Mr. La Riva and Mr. Erotas met at Quartz Hill Karate, where they trained under Master Roger Quinlan and have been training partners ever since.
    His military background adds valuable insights into discipline, tactical thinking, and self-defense applications.
    Andrew has a special gift for breaking down complex martial arts concepts into age-appropriate lessons that young students can understand and apply.
    As a guest instructor, he focuses on anti-bullying strategies, confidence building, and teaching children how to carry themselves with respect and strength.
    His patient approach and creative teaching methods make him particularly effective with younger students who are just beginning their martial arts journey.`,
    certifications: ['National Tang Soo Do Congress Certified', 'Captain Military Rank'],
  },
];
