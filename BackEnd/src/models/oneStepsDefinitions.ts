import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oneStepsDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  beltRank: string;
  beltColor: string;
  description: string;
  attack: string;
  defense: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'one_steps_definitions', timestamps: false })
export class oneStepsDefinitions
  extends Model<oneStepsDefinitionsAttributes, oneStepsDefinitionsAttributes>
  implements oneStepsDefinitionsAttributes
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

  @Column({ type: DataType.STRING })
  declare attack: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare defense: string[];

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

export default oneStepsDefinitions;
