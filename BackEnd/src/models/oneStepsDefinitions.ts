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
  description: string;
  followUpBeltRank: string;
  secondFollowUpBeltRank: string;
  defense: string[];
  keyPoints: string[];
  commonMistakes: string[];
  firstFollowUp: string[];
  secondFollowUp: string[];
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

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ field: 'follow_up_belt_rank', type: DataType.STRING(45) })
  declare followUpBeltRank: string;

  @Column({ field: 'second_follow_up_belt_rank', type: DataType.STRING(45) })
  declare secondFollowUpBeltRank: string;


  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: [] })
  declare defense: string[];

  @Column({
    field: 'key_points',
    type: DataType.ARRAY(DataType.TEXT),
    defaultValue: [],
  })
  declare keyPoints: string[];

  @Column({
    field: 'common_mistakes',
    type: DataType.ARRAY(DataType.TEXT),
    defaultValue: [],
  })
  declare commonMistakes: string[];

  @Column({
    field: 'first_follow_up',
    type: DataType.ARRAY(DataType.TEXT),
    defaultValue: [],
  })
  declare firstFollowUp: string[];

  @Column({
    field: 'second_follow_up',
    type: DataType.ARRAY(DataType.TEXT),
    defaultValue: [],
  })
  declare secondFollowUp: string[];

  @Column({ type: DataType.TEXT, allowNull: true })
  declare comment: string;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}

export default oneStepsDefinitions;
