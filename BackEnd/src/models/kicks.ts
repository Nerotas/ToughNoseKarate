import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface kicksAttributes {
  id?: number;
  studentid: number;
  front?: string;
  round?: string;
  side?: string;
  steppingKick?: string;
  slideUpKick?: string;
  doubleRound?: string;
  insideCrescent?: string;
  outsideCrescent?: string;
  spinBack?: string;
  stepBack?: string;
  spinOutsideCrescent?: string;
  hook?: string;
  heel?: string;
  jumpPhase_1?: string;
  jumpPhase_2?: string;
  jumpPhase_3?: string;
  jumpPhase_4?: string;
  jumpPhase_5?: string;
  jumpPhase_6?: string;
}

@Table({ tableName: 'kicks', timestamps: false })
export class kicks
  extends Model<kicksAttributes, kicksAttributes>
  implements kicksAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  front?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  round?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  side?: string;
  @Column({
    field: 'stepping_kick',
    allowNull: true,
    type: DataType.STRING(45),
  })
  steppingKick?: string;
  @Column({
    field: 'slide_up_kick',
    allowNull: true,
    type: DataType.STRING(45),
  })
  slideUpKick?: string;
  @Column({ field: 'double_round', allowNull: true, type: DataType.STRING(45) })
  doubleRound?: string;
  @Column({
    field: 'inside_crescent',
    allowNull: true,
    type: DataType.STRING(45),
  })
  insideCrescent?: string;
  @Column({
    field: 'outside_crescent',
    allowNull: true,
    type: DataType.STRING(45),
  })
  outsideCrescent?: string;
  @Column({ field: 'spin_back', allowNull: true, type: DataType.STRING(45) })
  spinBack?: string;
  @Column({ field: 'step_back', allowNull: true, type: DataType.STRING(45) })
  stepBack?: string;
  @Column({
    field: 'spin_outside_crescent',
    allowNull: true,
    type: DataType.STRING(45),
  })
  spinOutsideCrescent?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  hook?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  heel?: string;
  @Column({ field: 'jump_phase_1', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_1?: string;
  @Column({ field: 'jump_phase_2', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_2?: string;
  @Column({ field: 'jump_phase_3', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_3?: string;
  @Column({ field: 'jump_phase_4', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_4?: string;
  @Column({ field: 'jump_phase_5', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_5?: string;
  @Column({ field: 'jump_phase_6', allowNull: true, type: DataType.STRING(45) })
  jumpPhase_6?: string;
}
