import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface stancesAttributes {
  studentid: number;
  front?: string;
  back?: string;
  straddle?: string;
  fighting?: string;
  ready?: string;
  jun_bi?: string;
  bowing?: string;
  shifting?: string;
  comments?: string;
}

export type stancesPk = 'studentid';
export type stancesId = stances[stancesPk];
export type stancesOptionalAttributes =
  | 'front'
  | 'back'
  | 'straddle'
  | 'fighting'
  | 'ready'
  | 'jun_bi'
  | 'bowing'
  | 'shifting'
  | 'comments';
export type stancesCreationAttributes = Optional<
  stancesAttributes,
  stancesOptionalAttributes
>;

export class stances
  extends Model<stancesAttributes, stancesCreationAttributes>
  implements stancesAttributes
{
  studentid!: number;
  front?: string;
  back?: string;
  straddle?: string;
  fighting?: string;
  ready?: string;
  jun_bi?: string;
  bowing?: string;
  shifting?: string;
  comments?: string;

  // stances belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof stances {
    return stances.init(
      {
        studentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'students',
            key: 'studentid',
          },
        },
        front: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        back: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        straddle: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        fighting: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        ready: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jun_bi: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        bowing: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        shifting: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        comments: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'stances',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'studentid' }],
          },
        ],
      },
    );
  }
}
