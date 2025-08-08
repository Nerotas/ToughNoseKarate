import { Model, Table, Column, DataType } from 'sequelize-typescript';

export interface PunchesDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  target: string | null;
  execution?: string | null; // text column (optional)
  keyPoints: string[]; // CHANGED: array
  commonMistakes: string[]; // CHANGED: array
  applications: string[]; // CHANGED: array
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'punches_definitions', timestamps: false })
export class punchesDefinitions
  extends Model<PunchesDefinitionsAttributes, PunchesDefinitionsAttributes>
  implements PunchesDefinitionsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @Column({ type: DataType.STRING(100) })
  declare korean: string;

  @Column({ type: DataType.STRING(45) })
  declare belt: string;

  @Column({ field: 'belt_color', type: DataType.STRING(7) })
  declare beltColor: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare target: string | null;

  // If your DB column is TEXT (not JSON), keep TEXT here
  @Column({ type: DataType.TEXT, allowNull: true })
  declare execution: string | null;

  // CHANGED: use ARRAY(TEXT) to match Postgres _text columns
  @Column({
    field: 'key_points',
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
    defaultValue: [],
  })
  declare keyPoints: string[];

  @Column({
    field: 'common_mistakes',
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
    defaultValue: [],
  })
  declare commonMistakes: string[];

  @Column({
    field: 'applications',
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
    defaultValue: [],
  })
  declare applications: string[];

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}
