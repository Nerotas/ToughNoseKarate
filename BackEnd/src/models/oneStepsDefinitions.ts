import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oneStepsDefinitionsAttributes {
  id?: number;
  name: string;
  korean: string;
  belt: string;
  beltColor: string;
  description: string;
  attack: string;
  defense: object;
  keyPoints: object;
  commonMistakes: object;
  applications: object;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'one_steps_definitions', timestamps: false })
export class oneStepsDefinitions
  extends Model<oneStepsDefinitionsAttributes, oneStepsDefinitionsAttributes>
  implements oneStepsDefinitionsAttributes
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
  attack!: string;

  @Column({ type: DataType.JSON })
  defense!: object;

  @Column({ field: 'key_points', type: DataType.JSON })
  keyPoints!: object;

  @Column({ field: 'common_mistakes', type: DataType.JSON })
  commonMistakes!: object;

  @Column({ type: DataType.JSON })
  applications!: object;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: true })
  declare createdAt?: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updatedAt?: Date;
}

export default oneStepsDefinitions;
