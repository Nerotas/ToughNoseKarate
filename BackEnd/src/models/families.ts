import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface familiesAttributes {
  parentid?: number;
  studentid?: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
  parentFirstName?: string;
  parentLastName?: string;
  age?: number;
  beltRank?: string;
  startDate: string;
  endDate?: string;
  lastTest?: string;
  email: string;
  phone?: string;
  notes?: string;
  active?: number;
  eligibleForTesting?: number;
}

@Table({
  tableName: 'families',
  timestamps: false,
  comment: 'VIEW',
})
export class families
  extends Model<familiesAttributes, familiesAttributes>
  implements familiesAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  declare parentid?: number;

  @Column({ type: DataType.INTEGER, defaultValue: '0', primaryKey: true })
  declare studentid?: number;

  @Column({ type: DataType.STRING(45) })
  declare firstName: string;

  @Column({ type: DataType.STRING(45) })
  declare lastName: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare preferredName?: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare parentFirstName?: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare parentLastName?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare age?: number;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare beltRank?: string;

  @Column({ type: DataType.STRING(45) })
  declare startDate: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare endDate?: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare lastTest?: string;

  @Column({ type: DataType.STRING(45) })
  declare email: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare phone?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  declare notes?: string;

  @Column({ type: DataType.TINYINT, defaultValue: '1' })
  declare active?: number;

  @Column({ allowNull: true, type: DataType.TINYINT })
  declare eligibleForTesting?: number;
}
