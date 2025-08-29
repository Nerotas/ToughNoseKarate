import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface kicksDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  beltRank: string;
  description: string;
  target: string;
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'kicks_definitions', timestamps: false })
export class kicksDefinitions
  extends Model<kicksDefinitionsAttributes, kicksDefinitionsAttributes>
  implements kicksDefinitionsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @Column({ type: DataType.STRING(100) })
  declare korean: string;

  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  declare beltRank: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare target: string;

  @Column({ type: DataType.JSONB })
  declare execution: string[];

  @Column({ field: 'key_points', type: DataType.JSONB })
  declare keyPoints: string[];

  @Column({ field: 'common_mistakes', type: DataType.JSONB })
  declare commonMistakes: string[];

  @Column({ type: DataType.JSONB })
  declare applications: string[];

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}
