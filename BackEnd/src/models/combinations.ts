import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface combinationsAttributes {
  id?: number;
  studentid: number;
  kicking?: string;
  hands?: string;
  fighting?: string;
  basics?: string;
}

@Table({ tableName: 'combinations', timestamps: false })
export class combinations
  extends Model<combinationsAttributes, combinationsAttributes>
  implements combinationsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  kicking?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  hands?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  fighting?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  basics?: string;
}
