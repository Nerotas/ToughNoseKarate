import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface stancesAttributes {
  id?: number;
  studentid: number;
  front?: string;
  back?: string;
  straddle?: string;
  fighting?: string;
  junBi?: string;
  bowing?: string;
  shifting?: string;
  comments?: string;
}

@Table({ tableName: 'stances', timestamps: false })
export class stances
  extends Model<stancesAttributes, stancesAttributes>
  implements stancesAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  front?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  back?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  straddle?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  fighting?: string;
  @Column({ field: 'jun_bi', allowNull: true, type: DataType.STRING(45) })
  junBi?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  bowing?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  shifting?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  comments?: string;
}
