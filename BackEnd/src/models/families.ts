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
  preferedName?: string;
  parentFirstName?: string;
  parentLastName?: string;
  age?: number;
  rank?: string;
  startDateUtc: string;
  endDateUtc?: string;
  email: string;
  phone?: string;
  notes?: string;
  active?: number;
}

@Table({ tableName: 'families', timestamps: false, comment: 'VIEW' })
export class families
  extends Model<familiesAttributes, familiesAttributes>
  implements familiesAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  parentid?: number;
  @Column({ type: DataType.INTEGER, defaultValue: '0' })
  studentid?: number;
  @Column({ type: DataType.STRING(45) })
  firstName!: string;
  @Column({ type: DataType.STRING(45) })
  lastName!: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  preferedName?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  parentFirstName?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  parentLastName?: string;
  @Column({ allowNull: true, type: DataType.INTEGER })
  age?: number;
  @Column({ type: DataType.STRING(45), defaultValue: 'white' })
  rank?: string;
  @Column({ field: 'startDateUTC', type: DataType.STRING(45) })
  startDateUtc!: string;
  @Column({ field: 'endDateUTC', allowNull: true, type: DataType.STRING(45) })
  endDateUtc?: string;
  @Column({ type: DataType.STRING(45) })
  email!: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  phone?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;
  @Column({ type: DataType.TINYINT, defaultValue: '1' })
  active?: number;
}
