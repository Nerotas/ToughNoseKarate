import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface formsAttributes {
  id?: number;
  studentid: number;
  geichoHyungIlBu?: string;
  geichoHyungIlBuSahmGup?: string;
  geichoHyungYiBu?: string;
  geichoHyungYiBuSahmGup?: string;
  geichoHyungSahmBu?: string;
  pyongAnChoDan?: string;
  pyongAnYiDan?: string;
  pyongAnSahmDan?: string;
  pyongAnSaDan?: string;
  pyongAnOhDan?: string;
  bassai?: string;
}

@Table({ tableName: 'forms', timestamps: false })
export class forms
  extends Model<formsAttributes, formsAttributes>
  implements formsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id?: number;
  @Column({ type: DataType.INTEGER })
  studentid!: number;
  @Column({
    field: 'geicho_hyung_il_bu',
    allowNull: true,
    type: DataType.STRING(45),
  })
  geichoHyungIlBu?: string;
  @Column({
    field: 'geicho_hyung_il_bu_sahm_gup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  geichoHyungIlBuSahmGup?: string;
  @Column({
    field: 'geicho_hyung_yi_bu',
    allowNull: true,
    type: DataType.STRING(45),
  })
  geichoHyungYiBu?: string;
  @Column({
    field: 'geicho_hyung_yi_bu_sahm_gup',
    allowNull: true,
    type: DataType.STRING(45),
  })
  geichoHyungYiBuSahmGup?: string;
  @Column({
    field: 'geicho_hyung_sahm_bu',
    allowNull: true,
    type: DataType.STRING(45),
  })
  geichoHyungSahmBu?: string;
  @Column({
    field: 'pyong_an_cho_dan',
    allowNull: true,
    type: DataType.STRING(45),
  })
  pyongAnChoDan?: string;
  @Column({
    field: 'pyong_an_yi_dan',
    allowNull: true,
    type: DataType.STRING(45),
  })
  pyongAnYiDan?: string;
  @Column({
    field: 'pyong_an_sahm_dan',
    allowNull: true,
    type: DataType.STRING(45),
  })
  pyongAnSahmDan?: string;
  @Column({
    field: 'pyong_an_sa_dan',
    allowNull: true,
    type: DataType.STRING(45),
  })
  pyongAnSaDan?: string;
  @Column({
    field: 'pyong_an_oh_dan',
    allowNull: true,
    type: DataType.STRING(45),
  })
  pyongAnOhDan?: string;
  @Column({ allowNull: true, type: DataType.STRING(45) })
  bassai?: string;
}
