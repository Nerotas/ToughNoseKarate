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
  beltRank: string;
  beltColor: string;
  description: string;
  followUpBeltRank: string;
  followUpBeltColor: string;
  defense: string[];
  keyPoints: string[];
  commonMistakes: string[];
  FirstFollowUp: string[];
  SecondFollowUp: string[];
  comment: string;
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

  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  declare beltRank: string;

  @Column({ field: 'belt_color', type: DataType.STRING(7) })
  declare beltColor: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ field: 'follow_up_belt_rank', type: DataType.STRING(45) })
  declare followUpBeltRank: string;

  @Column({ field: 'follow_up_belt_color', type: DataType.STRING(7) })
  declare followUpBeltColor: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare defense: string[];

  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  declare keyPoints: string[];

  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  declare commonMistakes: string[];

  @Column({ field: 'first_follow_up', type: DataType.ARRAY(DataType.TEXT) })
  declare FirstFollowUp: string[];

  @Column({ field: 'second_follow_up', type: DataType.ARRAY(DataType.TEXT) })
  declare SecondFollowUp: string[];

  @Column({ type: DataType.TEXT, allowNull: true })
  declare comment: string;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}

export default oneStepsDefinitions;
