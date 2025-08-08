import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface stanceDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  position: string;
  bodyPosition: string;
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'stance_definitions', timestamps: false })
export class stanceDefinitions
  extends Model<stanceDefinitionsAttributes, stanceDefinitionsAttributes>
  implements stanceDefinitionsAttributes
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
  position!: string;
  @Column({ field: 'body_position', type: DataType.STRING })
  bodyPosition!: string;
  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  keyPoints!: string[];
  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  commonMistakes!: string[];
  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  applications!: string[];
  @Column({
    field: 'created_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt?: Date;
  @Column({
    field: 'updated_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt?: Date;
}
