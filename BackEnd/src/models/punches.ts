import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface punchesAttributes {
  id: number;
  studentid: number;
  center?: string;
  reverse?: string;
  jab?: string;
  side?: string;
  charging?: string;
  slide_up_jab?: string;
  slide_up_punch?: string;
  spin_bottom_fist?: string;
}

export type punchesPk = 'id';
export type punchesId = punches[punchesPk];
export type punchesOptionalAttributes =
  | 'id'
  | 'center'
  | 'reverse'
  | 'jab'
  | 'side'
  | 'charging'
  | 'slide_up_jab'
  | 'slide_up_punch'
  | 'spin_bottom_fist';
export type punchesCreationAttributes = Optional<
  punchesAttributes,
  punchesOptionalAttributes
>;

export class punches
  extends Model<punchesAttributes, punchesCreationAttributes>
  implements punchesAttributes
{
  id!: number;
  studentid!: number;
  center?: string;
  reverse?: string;
  jab?: string;
  side?: string;
  charging?: string;
  slide_up_jab?: string;
  slide_up_punch?: string;
  spin_bottom_fist?: string;

  // punches belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof punches {
    return punches.init(
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
        center: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        reverse: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jab: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        side: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        charging: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_jab: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_bottom_fist: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'punches',
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
