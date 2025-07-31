import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface fallingAttributes {
  id?: number;
  studentid: number;
  back?: string;
  front?: string;
  roll?: string;
  forwardRoll?: string;
}

@Table({ tableName: 'falling', timestamps: false })
export class falling
  extends Model<fallingAttributes, fallingAttributes>
  implements fallingAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  back?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  front?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  roll?: string;
  @Column({ field: 'forward_roll', allowNull: true, type: DataType.STRING(45) })
  forwardRoll?: string;
}
