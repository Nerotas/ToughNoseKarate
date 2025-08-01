export interface KickDefinition {
  id: string;
  name: string;
  korean: string;
  description: string;
  belt: string;
  beltColor: string;
  technique: string;
  bodyMechanics: string;
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  targetAreas: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
