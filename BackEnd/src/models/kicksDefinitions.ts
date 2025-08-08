import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface kicksDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  target: string;
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'kicks_definitions', timestamps: false })
export class kicksDefinitions
  extends Model<kicksDefinitionsAttributes, kicksDefinitionsAttributes>
  implements kicksDefinitionsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;

  @Column({ type: DataType.STRING(100) })
  name!: string;

  @Column({ type: DataType.STRING(100) })
  korean!: string;

  @Column({ type: DataType.STRING(45) })
  belt!: string;

  @Column({ field: 'belt_color', type: DataType.STRING(7) })
  beltColor!: string;

  @Column({ type: DataType.STRING })
  description!: string;

  @Column({ type: DataType.STRING })
  target!: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  execution!: string[];

  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  keyPoints!: string[];

  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  commonMistakes!: string[];

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  applications!: string[];

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}
