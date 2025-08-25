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
  beltRank: string;
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
  declare name: string;

  @Column({ type: DataType.STRING(100) })
  declare korean: string;

  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  declare beltRank: string;

  @Column({ field: 'belt_color', type: DataType.STRING(7) })
  declare beltColor: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING(100) })
  declare category: string;

  @Column({ type: DataType.STRING(50) })
  declare difficulty: string;

  @Column({ type: DataType.STRING })
  declare scenario: string;

  @Column({ type: DataType.STRING })
  declare technique: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare setup: string[];

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare execution: string[];

  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  declare keyPoints: string[];

  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  declare commonMistakes: string[];

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare applications: string[];

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}
