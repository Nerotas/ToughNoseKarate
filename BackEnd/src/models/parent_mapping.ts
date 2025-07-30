import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
        },
        studentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        ],
      },
    );
  }
}
