export interface BlockDefinition {
  id?: number;
  blockName: string;
  description: string;
  technique: string;
  stance: string;
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBlockDefinitionDto {
  blockName: string;
  description: string;
  technique: string;
  stance: string;
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
}

export interface UpdateBlockDefinitionDto {
  id: number;
  blockName?: string;
  description?: string;
  technique?: string;
  stance?: string;
  execution?: string[];
  keyPoints?: string[];
  commonMistakes?: string[];
  applications?: string[];
}
