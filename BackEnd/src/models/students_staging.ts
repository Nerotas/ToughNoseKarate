import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface students_stagingAttributes {
  studentid: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
  age?: number;
  rank: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active: number;
  child?: number;
}

export type students_stagingPk = 'studentid';
export type students_stagingId = students_staging[students_stagingPk];
export type students_stagingOptionalAttributes =
  | 'studentid'
  | 'preferedName'
  | 'age'
  | 'rank'
  | 'endDateUTC'
  | 'phone'
  | 'notes'
  | 'active'
  | 'child';
export type students_stagingCreationAttributes = Optional<
  students_stagingAttributes,
  students_stagingOptionalAttributes
>;

export class students_staging
  extends Model<students_stagingAttributes, students_stagingCreationAttributes>
  implements students_stagingAttributes
{
  studentid!: number;
  firstName!: string;
  lastName!: string;
  preferedName?: string;
  age?: number;
  rank!: string;
  startDateUTC!: string;
  endDateUTC?: string;
  email!: string;
  phone?: string;
  notes?: string;
  active!: number;
  child?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof students_staging {
    return students_staging.init(
      {
        studentid: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        preferedName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        rank: {
          type: DataTypes.STRING(45),
          allowNull: false,
          defaultValue: 'white',
        },
        startDateUTC: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        endDateUTC: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
        child: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'students_staging',
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
