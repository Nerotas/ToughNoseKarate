export interface PunchDefinition {
  id: number;
  name: string | null;
  korean: string | null;
  description: string | null;
  belt: string | null;
  beltColor: string | null;
  target: string | null;
  execution: string[] | null;
  keyPoints: string[] | null;
  commonMistakes: string[] | null;
  applications: string[] | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export type PunchCreate = Omit<PunchDefinition, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
};
