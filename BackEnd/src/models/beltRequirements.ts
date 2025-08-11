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
  declare beltOrder: number;
  @Column({ field: 'belt_rank', type: DataType.STRING(45) })
  declare beltRank: string;
  @Column({ type: DataType.JSON })
  declare forms: object;
  @Column({ type: DataType.JSON })
  declare stances: object;
  @Column({ type: DataType.JSON })
  declare blocks: object;
  @Column({ type: DataType.JSON })
  declare punches: object;
  @Column({ type: DataType.JSON })
  declare kicks: object;
  @Column({ type: DataType.JSON })
  declare jumps: object;
  @Column({ type: DataType.JSON })
  declare falling: object;
  @Column({ field: 'one_steps', type: DataType.JSON })
  declare oneSteps: object;
  @Column({ field: 'self_defense', type: DataType.JSON })
  declare selfDefense: object;
  @Column({ allowNull: true, type: DataType.STRING })
  declare comments?: string;
  @Column({
    allowNull: true,
    type: DataType.STRING(7),
    comment: 'Hex color code for belt background',
  })
  declare color?: string;
  @Column({
    field: 'text_color',
    allowNull: true,
    type: DataType.STRING(7),
    comment: 'Hex color code for belt text',
  })
  declare textColor?: string;
}
