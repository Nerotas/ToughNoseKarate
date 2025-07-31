import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface fallingAttributes {
  id: number;
  studentid: number;
  back?: string;
  front?: string;
  roll?: string;
  forward_roll?: string;
}

export type fallingPk = 'id';
export type fallingId = falling[fallingPk];
export type fallingOptionalAttributes =
  | 'id'
  | 'back'
  | 'front'
  | 'roll'
  | 'forward_roll';
export type fallingCreationAttributes = Optional<
  fallingAttributes,
  fallingOptionalAttributes
>;

export class falling
  extends Model<fallingAttributes, fallingCreationAttributes>
  implements fallingAttributes
{
  id!: number;
  studentid!: number;
  back?: string;
  front?: string;
  roll?: string;
  forward_roll?: string;

  // falling belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof falling {
    return falling.init(
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
        back: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        front: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        roll: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        forward_roll: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'falling',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'falling_ibfk_1',
            using: 'BTREE',
            fields: [{ name: 'studentid' }],
          },
        ],
      },
    );
  }
}
