import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface parentMappingAttributes {
  idparentMapping?: number;
  parentid: number;
  studentid: number;
}

@Table({ tableName: 'parent_mapping', timestamps: false })
export class parentMapping
  extends Model<parentMappingAttributes, parentMappingAttributes>
  implements parentMappingAttributes
{
  @Column({
    field: 'idparent_mapping',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare idparentMapping?: number;
  @Column({ type: DataType.INTEGER })
  declare parentid: number;
  @Column({ type: DataType.INTEGER })
  declare studentid: number;
}
