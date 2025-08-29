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
  beltRank: string;
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
  declare name: string;
  @Column({ type: DataType.STRING(100) })
  declare korean: string;
  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  declare beltRank: string;
  @Column({ type: DataType.STRING })
  declare description: string;
  @Column({ type: DataType.STRING })
  declare position: string;
  @Column({ field: 'body_position', type: DataType.STRING })
  declare bodyPosition: string;
  @Column({ field: 'key_points', type: DataType.ARRAY(DataType.TEXT) })
  declare keyPoints: string[];
  @Column({ field: 'common_mistakes', type: DataType.ARRAY(DataType.TEXT) })
  declare commonMistakes: string[];
  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  declare applications: string[];
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
