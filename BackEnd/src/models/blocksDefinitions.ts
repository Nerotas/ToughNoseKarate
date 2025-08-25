import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

export interface BlocksDefinitionsAttributes {
  id?: number;
  blockName: string;
  technique: string;
  stance: string;
  beltRank: string;
  beltColor: string;
  execution: string[];
  keyPoints: string[];
  commonMistakes: string[];
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'blocks_definitions',
  timestamps: true,
  underscored: true,
})
export class blocksDefinitions extends Model<BlocksDefinitionsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    field: 'block_name',
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare blockName: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  declare technique: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare stance: string;

  @Column({
    field: 'belt',
    type: DataType.STRING(45),
    allowNull: false,
  })
  declare beltRank: string;

  @Column({
    field: 'belt_color',
    type: DataType.STRING(7),
    allowNull: false,
  })
  declare beltColor: string;

  // FIXED: PostgreSQL _text array
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
    defaultValue: [],
  })
  declare execution: string[];

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

export default blocksDefinitions;
