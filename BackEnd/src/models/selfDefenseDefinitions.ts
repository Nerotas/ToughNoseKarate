import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface selfDefenseDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  category: string;
  difficulty: string;
  scenario: string;
  technique: string;
  setup: string[];
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'self_defense_definitions', timestamps: false })
export class selfDefenseDefinitions
  extends Model<
    selfDefenseDefinitionsAttributes,
    selfDefenseDefinitionsAttributes
  >
  implements selfDefenseDefinitionsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @Column({ type: DataType.STRING(100) })
  korean!: string;

  @Column({ type: DataType.STRING(45) })
  belt!: string;

  @Column({ field: 'belt_color', type: DataType.STRING(7) })
  beltColor!: string;

  @Column({ type: DataType.STRING })
  description!: string;

  @Column({ type: DataType.STRING(100) })
  category!: string;

  @Column({ type: DataType.STRING(50) })
  difficulty!: string;

  @Column({ type: DataType.STRING })
  scenario!: string;

  @Column({ type: DataType.STRING })
  technique!: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  setup!: string[];

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  execution!: string[];

  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  keyPoints!: string[];

  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  commonMistakes!: string[];

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  applications!: string[];

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}
