import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { parent_mapping, parent_mappingId } from './parent_mapping';

export interface parentsAttributes {
  parentid: number;
  firstName?: string;
  lastName?: string;
}

export type parentsPk = 'parentid';
export type parentsId = parents[parentsPk];
export type parentsOptionalAttributes = 'parentid' | 'firstName' | 'lastName';
export type parentsCreationAttributes = Optional<
  parentsAttributes,
  parentsOptionalAttributes
>;

export class parents
  extends Model<parentsAttributes, parentsCreationAttributes>
  implements parentsAttributes
{
  parentid!: number;
  firstName?: string;
  lastName?: string;

  // parents hasMany parent_mapping via parentid
  parent_mappings!: parent_mapping[];
  getParent_mappings!: Sequelize.HasManyGetAssociationsMixin<parent_mapping>;
  setParent_mappings!: Sequelize.HasManySetAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  addParent_mapping!: Sequelize.HasManyAddAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  addParent_mappings!: Sequelize.HasManyAddAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  createParent_mapping!: Sequelize.HasManyCreateAssociationMixin<parent_mapping>;
  removeParent_mapping!: Sequelize.HasManyRemoveAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  removeParent_mappings!: Sequelize.HasManyRemoveAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  hasParent_mapping!: Sequelize.HasManyHasAssociationMixin<
    parent_mapping,
    parent_mappingId
  >;
  hasParent_mappings!: Sequelize.HasManyHasAssociationsMixin<
    parent_mapping,
    parent_mappingId
  >;
  countParent_mappings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof parents {
    return parents.init(
      {
        parentid: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'parents',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'parentid' }],
          },
        ],
      },
    );
  }
}
