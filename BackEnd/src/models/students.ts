import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface studentsAttributes {
  studentid?: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
  age?: number;
  beltRank?: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active?: number;
  child?: number;
  lastTestUTC?: string;
  eligibleForTesting?: number;
}

@Table({ tableName: 'students', timestamps: false })
export class students
  extends Model<studentsAttributes, studentsAttributes>
  implements studentsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  studentid?: number;
  @Column({ type: DataType.STRING(45) })
  firstName!: string;
  @Column({ type: DataType.STRING(45) })
  lastName!: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  preferedName?: string;
  @Column({ allowNull: true, type: DataType.INTEGER })
  age?: number;
  @Column({ type: DataType.STRING(45), defaultValue: 'white' })
  beltRank?: string;
  @Column({ field: 'startDateUTC', type: DataType.STRING(45) })
  startDateUTC!: string;
  @Column({ field: 'endDateUTC', allowNull: true, type: DataType.STRING(45) })
  endDateUTC?: string;
  @Column({ type: DataType.STRING(45) })
  email!: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  phone?: string;
  @Column({ allowNull: true, type: DataType.TEXT })
  notes?: string;
  @Column({ type: DataType.TINYINT, defaultValue: '1' })
  active?: number;
  @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: '0' })
  child?: number;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  lastTestUTC?: string;
  @Column({ type: DataType.TINYINT, defaultValue: '0' })
  eligibleForTesting?: number;
}
