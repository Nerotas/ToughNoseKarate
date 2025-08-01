export interface StanceDefinition {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  position: string;
  bodyPosition: string;
  keyPoints: string[]; // Array of key points
  commonMistakes: string[]; // Array of common mistakes
  applications: string[]; // Array of applications
  createdAt?: Date;
  updatedAt?: Date;
}
