export interface OneStepDefinition {
  id: number;
  name: string;
  description: string;
  beltRank: string;
  beltColor: string;
  followUpBeltRank: string;
  followUpBeltColor: string;
  secondFollowUpBeltRank: string;
  secondFollowUpBeltColor: string;
  defense: string[];
  keyPoints: string[];
  commonMistakes: string[];
  firstFollowUp: string[];
  secondFollowUp: string[];
  comment: string;
}
