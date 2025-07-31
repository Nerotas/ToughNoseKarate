import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { parents, parentsId } from './parents';
import type { students, studentsId } from './students';

export interface parent_mappingAttributes {
  idparent_mapping: number;
  parentid: number;
  studentid: number;
}

export type parent_mappingPk = 'idparent_mapping';
export type parent_mappingId = parent_mapping[parent_mappingPk];
export type parent_mappingOptionalAttributes = 'idparent_mapping';
export type parent_mappingCreationAttributes = Optional<
  parent_mappingAttributes,
  parent_mappingOptionalAttributes
>;

export class parent_mapping
  extends Model<parent_mappingAttributes, parent_mappingCreationAttributes>
  implements parent_mappingAttributes
{
  idparent_mapping!: number;
  parentid!: number;
  studentid!: number;

  // parent_mapping belongsTo parents via parentid
  parent!: parents;
  getParent!: Sequelize.BelongsToGetAssociationMixin<parents>;
  setParent!: Sequelize.BelongsToSetAssociationMixin<parents, parentsId>;
  createParent!: Sequelize.BelongsToCreateAssociationMixin<parents>;
  // parent_mapping belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof parent_mapping {
    return parent_mapping.init(
      {
        idparent_mapping: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        parentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'parents',
            key: 'parentid',
          },
        },
        studentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'students',
            key: 'studentid',
          },
        },
      },
      {
        sequelize,
        tableName: 'parent_mapping',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'idparent_mapping' }],
          },
          {
            name: 'parentid',
            using: 'BTREE',
            fields: [{ name: 'parentid' }],
          },
          {
            name: 'studentid',
            using: 'BTREE',
            fields: [{ name: 'studentid' }],
          },
        ],
      },
    );
  }
}
