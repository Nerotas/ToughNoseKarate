import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface parentsAttributes {
  parentid?: number;
  firstName?: string;
  lastName?: string;
}

@Table({ tableName: 'parents', timestamps: false })
export class parents
  extends Model<parentsAttributes, parentsAttributes>
  implements parentsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  parentid?: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  firstName?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  lastName?: string;
}
