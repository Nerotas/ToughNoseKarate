import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

export interface studentsAttributes {
  studentid?: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
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
  declare studentid?: number;
  @Column({ field: 'firstname', type: DataType.STRING(45) })
  declare firstName: string;
  @Column({ field: 'lastname', type: DataType.STRING(45) })
  declare lastName: string;
  @Column({
    field: 'preferredname',
    allowNull: true,
    type: DataType.STRING(45),
  })
  declare preferredName?: string;
  @Column({ allowNull: true, type: DataType.INTEGER })
  declare age?: number;
  @Column({
    field: 'beltrank',
    type: DataType.STRING(45),
    defaultValue: 'white',
  })
  declare beltRank?: string;
  @Column({ field: 'startdateutc', type: DataType.STRING(45) })
  declare startDateUTC: string;
  @Column({ field: 'enddateutc', allowNull: true, type: DataType.STRING(45) })
  declare endDateUTC?: string;
  @Column({ type: DataType.STRING(45) })
  declare email: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  declare phone?: string;
  @Column({ allowNull: true, type: DataType.TEXT })
  declare notes?: string;
  @Column({ field: 'active', type: DataType.TINYINT, defaultValue: 1 })
  declare active?: number;
  @Column({
    field: 'child',
    allowNull: true,
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  declare child?: number;
  @Column({ field: 'lasttestutc', allowNull: true, type: DataType.STRING(45) })
  declare lastTestUTC?: string;
  @Column({
    field: 'eligiblefortesting',
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  declare eligibleForTesting?: number;
}
