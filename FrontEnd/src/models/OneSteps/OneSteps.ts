export interface OneStepDefinition {
  id: string;
  name: string;
  korean: string;
  description: string;
  belt: string;
  beltColor: string;
  attack: string;
  defense: string;
  sequence: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
