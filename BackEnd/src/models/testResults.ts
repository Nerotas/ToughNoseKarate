import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { studentTests } from './studentTests';

export interface testResultsAttributes {
  result_id?: number;
  testid: number;
  category:
    | 'blocks'
    | 'kicks'
    | 'punches'
    | 'forms'
    | 'stances'
    | 'combinations'
    | 'falling'
    | 'one_steps';
  technique_name: string;
  score?: number;
  passed?: number;
  notes?: string;
  created_at?: Date;
}

@Table({ tableName: 'test_results', timestamps: false })
export class testResults
  extends Model<testResultsAttributes, testResultsAttributes>
  implements testResultsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  result_id?: number;

  @ForeignKey(() => studentTests)
  @Column({ type: DataType.INTEGER, allowNull: false })
  testid!: number;

  @Column({
    type: DataType.ENUM(
      'blocks',
      'kicks',
      'punches',
      'forms',
      'stances',
      'combinations',
      'falling',
      'one_steps',
    ),
    allowNull: false,
  })
  category!:
    | 'blocks'
    | 'kicks'
    | 'punches'
    | 'forms'
    | 'stances'
    | 'combinations'
    | 'falling'
    | 'one_steps';

  @Column({ type: DataType.STRING(100), allowNull: false })
  technique_name!: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true })
  score?: number;

  @Column({ type: DataType.TINYINT, defaultValue: 0 })
  passed?: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at?: Date;

  // Associations
  @BelongsTo(() => studentTests)
  test?: studentTests;
}
