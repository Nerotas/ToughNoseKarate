import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { students } from './students';
import { studentTests } from './studentTests';

export interface beltProgressionAttributes {
  progression_id?: number;
  studentid: number;
  belt_rank: string;
  promoted_date: string;
  promoted_by?: string;
  testid?: number;
  is_current?: number;
  ceremony_date?: string;
  belt_certificate_number?: string;
  notes?: string;
  created_at?: Date;
}

@Table({ tableName: 'belt_progression', timestamps: false })
export class beltProgression
  extends Model<beltProgressionAttributes, beltProgressionAttributes>
  implements beltProgressionAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  progression_id?: number;

  @ForeignKey(() => students)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentid!: number;

  @Column({ type: DataType.STRING(45), allowNull: false })
  belt_rank!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  promoted_date!: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  promoted_by?: string;

  @ForeignKey(() => studentTests)
  @Column({ type: DataType.INTEGER, allowNull: true })
  testid?: number;

  @Column({ type: DataType.TINYINT, defaultValue: 1 })
  is_current?: number;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  ceremony_date?: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  belt_certificate_number?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at?: Date;

  // Associations
  @BelongsTo(() => students)
  student?: students;

  @BelongsTo(() => studentTests)
  test?: studentTests;
}
