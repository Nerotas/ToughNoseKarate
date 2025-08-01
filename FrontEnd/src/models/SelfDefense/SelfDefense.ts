export interface SelfDefenseDefinition {
  id: string;
  name: string;
  korean?: string;
  description: string;
  belt: string;
  beltColor: string;
  category: 'Releases' | 'Escapes' | 'Submissions' | 'Ground Control' | 'Standing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  technique: string;
  setup: string[];
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  safetyNotes: string[];
  applications: string[];
  counters?: string[];
}
