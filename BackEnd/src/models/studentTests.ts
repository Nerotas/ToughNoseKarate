import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { students } from './students';
import { testResults } from './testResults';

export interface studentTestsAttributes {
  testid?: number;
  studentid: number;
  test_date: string;
  belt_from: string;
  belt_to: string;
  overall_score?: number;
  passed?: number;
  instructor_name?: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'student_tests', timestamps: true })
export class studentTests
  extends Model<studentTestsAttributes, studentTestsAttributes>
  implements studentTestsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  testid?: number;

  @ForeignKey(() => students)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentid!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  test_date!: string;

  @Column({ type: DataType.STRING(45), allowNull: false })
  belt_from!: string;

  @Column({ type: DataType.STRING(45), allowNull: false })
  belt_to!: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true })
  overall_score?: number;

  @Column({ type: DataType.TINYINT, defaultValue: 0 })
  passed?: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  instructor_name?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at?: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at?: Date;

  // Associations
  @BelongsTo(() => students)
  student?: students;

  @HasMany(() => testResults)
  test_results?: testResults[];
}
