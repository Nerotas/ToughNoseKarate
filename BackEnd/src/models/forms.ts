import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface formsAttributes {
  id: number;
  studentid: number;
  geicho_hyung_il_bu?: string;
  geicho_hyung_il_bu_sahm_gup?: string;
  geicho_hyung_yi_bu?: string;
  geicho_hyung_yi_bu_sahm_gup?: string;
  geicho_hyung_sahm_bu?: string;
  pyong_an_cho_dan?: string;
  pyong_an_yi_dan?: string;
  pyong_an_sahm_dan?: string;
  pyong_an_sa_dan?: string;
  pyong_an_oh_dan?: string;
  bassai?: string;
}

export type formsPk = 'id';
export type formsId = forms[formsPk];
export type formsOptionalAttributes =
  | 'id'
  | 'geicho_hyung_il_bu'
  | 'geicho_hyung_il_bu_sahm_gup'
  | 'geicho_hyung_yi_bu'
  | 'geicho_hyung_yi_bu_sahm_gup'
  | 'geicho_hyung_sahm_bu'
  | 'pyong_an_cho_dan'
  | 'pyong_an_yi_dan'
  | 'pyong_an_sahm_dan'
  | 'pyong_an_sa_dan'
  | 'pyong_an_oh_dan'
  | 'bassai';
export type formsCreationAttributes = Optional<
  formsAttributes,
  formsOptionalAttributes
>;

export class forms
  extends Model<formsAttributes, formsCreationAttributes>
  implements formsAttributes
{
  id!: number;
  studentid!: number;
  geicho_hyung_il_bu?: string;
  geicho_hyung_il_bu_sahm_gup?: string;
  geicho_hyung_yi_bu?: string;
  geicho_hyung_yi_bu_sahm_gup?: string;
  geicho_hyung_sahm_bu?: string;
  pyong_an_cho_dan?: string;
  pyong_an_yi_dan?: string;
  pyong_an_sahm_dan?: string;
  pyong_an_sa_dan?: string;
  pyong_an_oh_dan?: string;
  bassai?: string;

  // forms belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof forms {
    return forms.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        studentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'students',
            key: 'studentid',
          },
        },
        geicho_hyung_il_bu: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        geicho_hyung_il_bu_sahm_gup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        geicho_hyung_yi_bu: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        geicho_hyung_yi_bu_sahm_gup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        geicho_hyung_sahm_bu: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        pyong_an_cho_dan: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        pyong_an_yi_dan: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        pyong_an_sahm_dan: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        pyong_an_sa_dan: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        pyong_an_oh_dan: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        bassai: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'forms',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'forms_ibfk_1',
            using: 'BTREE',
            fields: [{ name: 'studentid' }],
          },
        ],
      },
    );
  }
}
