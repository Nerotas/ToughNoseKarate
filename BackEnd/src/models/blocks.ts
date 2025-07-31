import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface blocksAttributes {
  id: number;
  studentid: number;
  low?: string;
  knife_hand?: string;
  high?: string;
  inside?: string;
  outside?: string;
  low_chop?: string;
  high_chop?: string;
  double_block_punch?: string;
  double_block?: string;
}

export type blocksPk = 'id';
export type blocksId = blocks[blocksPk];
export type blocksOptionalAttributes =
  | 'id'
  | 'low'
  | 'knife_hand'
  | 'high'
  | 'inside'
  | 'outside'
  | 'low_chop'
  | 'high_chop'
  | 'double_block_punch'
  | 'double_block';
export type blocksCreationAttributes = Optional<
  blocksAttributes,
  blocksOptionalAttributes
>;

export class blocks
  extends Model<blocksAttributes, blocksCreationAttributes>
  implements blocksAttributes
{
  id!: number;
  studentid!: number;
  low?: string;
  knife_hand?: string;
  high?: string;
  inside?: string;
  outside?: string;
  low_chop?: string;
  high_chop?: string;
  double_block_punch?: string;
  double_block?: string;

  // blocks belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof blocks {
    return blocks.init(
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
        low: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        knife_hand: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        high: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        inside: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        outside: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        low_chop: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        high_chop: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_block_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'blocks',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
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
