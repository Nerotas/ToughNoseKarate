import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface beltRequirementsAttributes {
  beltOrder: number;
  beltRank: string;
  forms: object;
  stances: object;
  blocks: object;
  punches: object;
  kicks: object;
  jumps: object;
  falling: object;
  oneSteps: object;
  selfDefense: object;
  comments?: string;
  color?: string;
  textColor?: string;
}

@Table({ tableName: 'belt_requirements', timestamps: false })
export class beltRequirements
  extends Model<beltRequirementsAttributes, beltRequirementsAttributes>
  implements beltRequirementsAttributes
{
  @Column({ field: 'belt_order', primaryKey: true, type: DataType.INTEGER })
  beltOrder!: number;
  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  beltRank!: string;
  @Column({ type: DataType.JSON })
  forms!: object;
  @Column({ type: DataType.JSON })
  stances!: object;
  @Column({ type: DataType.JSON })
  blocks!: object;
  @Column({ type: DataType.JSON })
  punches!: object;
  @Column({ type: DataType.JSON })
  kicks!: object;
  @Column({ type: DataType.JSON })
  jumps!: object;
  @Column({ type: DataType.JSON })
  falling!: object;
  @Column({ field: 'one_steps', type: DataType.JSON })
  oneSteps!: object;
  @Column({ field: 'self_defense', type: DataType.JSON })
  selfDefense!: object;
  @Column({ allowNull: true, type: DataType.STRING })
  comments?: string;
  @Column({
    allowNull: true,
    type: DataType.STRING(7),
    comment: 'Hex color code for belt background',
  })
  color?: string;
  @Column({
    field: 'text_color',
    allowNull: true,
    type: DataType.STRING(7),
    comment: 'Hex color code for belt text',
  })
  textColor?: string;
}
