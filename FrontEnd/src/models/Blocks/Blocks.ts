export interface BlockDefinition {
  id?: number;
  blockName: string;
  technique: string;
  stance: string;
  beltRank: string;

  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBlockDefinitionDto {
  blockName: string;
  technique: string;
  stance: string;
  beltRank: string;

  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
}

export interface UpdateBlockDefinitionDto {
  id: number;
  blockName?: string;
  technique?: string;
  stance?: string;
  beltRank?: string;
  execution?: string[];
  keyPoints?: string[];
  commonMistakes?: string[];
  applications?: string[];
}
