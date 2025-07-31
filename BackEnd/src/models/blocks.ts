import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface blocksAttributes {
  id?: number;
  studentid: number;
  low?: string;
  knifeHand?: string;
  high?: string;
  inside?: string;
  outside?: string;
  lowChop?: string;
  highChop?: string;
  doubleBlockPunch?: string;
  doubleBlock?: string;
}

@Table({ tableName: 'blocks', timestamps: false })
export class blocks
  extends Model<blocksAttributes, blocksAttributes>
  implements blocksAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  low?: string;
  @Column({ field: 'knife_hand', allowNull: true, type: DataType.STRING(45) })
  knifeHand?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  high?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  inside?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  outside?: string;
  @Column({ field: 'low_chop', allowNull: true, type: DataType.STRING(45) })
  lowChop?: string;
  @Column({ field: 'high_chop', allowNull: true, type: DataType.STRING(45) })
  highChop?: string;
  @Column({
    field: 'double_block_punch',
    allowNull: true,
    type: DataType.STRING(45),
  })
  doubleBlockPunch?: string;
  @Column({ field: 'double_block', allowNull: true, type: DataType.STRING(45) })
  doubleBlock?: string;
}
