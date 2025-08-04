import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

export interface FormDefinitionsAttributes {
  id: number;
  formName: string;
  koreanName?: string;
  meaning?: string;
  beltRank: string;
  beltColor: string;
  beltTextColor: string;
  difficultyLevel: number;
  description?: string;
  keyPoints?: string[]; // JSON array
}

@Table({
  tableName: 'form_definitions',
  timestamps: false,
})
export class FormDefinitions extends Model<FormDefinitionsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'form_name',
  })
  declare formName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'korean_name',
  })
  declare koreanName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare meaning?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'belt_rank',
  })
  declare beltRank: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'belt_color',
  })
  declare beltColor: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'belt_text_color',
  })
  declare beltTextColor: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'difficulty_level',
  })
  declare difficultyLevel: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: 'key_points',
  })
  declare keyPoints?: string[];
}

export default FormDefinitions;
