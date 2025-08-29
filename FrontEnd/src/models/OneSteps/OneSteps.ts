export interface OneStepDefinition {
  id: number;
  name: string;
  description: string;
  beltRank: string;
  followUpBeltRank: string;
  secondFollowUpBeltRank: string;
  defense: string[];
  keyPoints: string[];
  commonMistakes: string[];
  firstFollowUp: string[];
  secondFollowUp: string[];
  comment: string;
}
