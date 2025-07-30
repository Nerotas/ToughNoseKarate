import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
