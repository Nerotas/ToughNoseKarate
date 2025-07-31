import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface punchesAttributes {
  id?: number;
  studentid: number;
  center?: string;
  reverse?: string;
  jab?: string;
  side?: string;
  charging?: string;
  slideUpJab?: string;
  slideUpPunch?: string;
  spinBottomFist?: string;
}

@Table({ tableName: 'punches', timestamps: false })
export class punches
  extends Model<punchesAttributes, punchesAttributes>
  implements punchesAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  center?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  reverse?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  jab?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  side?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  charging?: string;
  @Column({ field: 'slide_up_jab', allowNull: true, type: DataType.STRING(45) })
  slideUpJab?: string;
  @Column({
    field: 'slide_up_punch',
    allowNull: true,
    type: DataType.STRING(45),
  })
  slideUpPunch?: string;
  @Column({
    field: 'spin_bottom_fist',
    allowNull: true,
    type: DataType.STRING(45),
  })
  spinBottomFist?: string;
}
