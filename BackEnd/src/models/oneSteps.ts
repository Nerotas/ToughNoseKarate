import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oneStepsAttributes {
  id?: number;
  studentid: number;
  step_1Left?: string;
  step_1Right?: string;
  step_1Followup?: string;
  step_2Left?: string;
  step_2Right?: string;
  step_2Followup?: string;
  step_3Left?: string;
  step_3Right?: string;
  step_3Followup?: string;
  step_4Left?: string;
  step_4Right?: string;
  step_4Followup?: string;
}

@Table({ tableName: 'one_steps', timestamps: false })
export class oneSteps
  extends Model<oneStepsAttributes, oneStepsAttributes>
  implements oneStepsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ field: 'step_1_left', allowNull: true, type: DataType.STRING(45) })
  step_1Left?: string;
  @Column({ field: 'step_1_right', allowNull: true, type: DataType.STRING(45) })
  step_1Right?: string;
  @Column({
    field: 'step_1_followup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  step_1Followup?: string;
  @Column({ field: 'step_2_left', allowNull: true, type: DataType.STRING(45) })
  step_2Left?: string;
  @Column({ field: 'step_2_right', allowNull: true, type: DataType.STRING(45) })
  step_2Right?: string;
  @Column({
    field: 'step_2_followup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  step_2Followup?: string;
  @Column({ field: 'step_3_left', allowNull: true, type: DataType.STRING(45) })
  step_3Left?: string;
  @Column({ field: 'step_3_right', allowNull: true, type: DataType.STRING(45) })
  step_3Right?: string;
  @Column({
    field: 'step_3_followup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  step_3Followup?: string;
  @Column({ field: 'step_4_left', allowNull: true, type: DataType.STRING(45) })
  step_4Left?: string;
  @Column({ field: 'step_4_right', allowNull: true, type: DataType.STRING(45) })
  step_4Right?: string;
  @Column({
    field: 'step_4_followup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  step_4Followup?: string;
}
