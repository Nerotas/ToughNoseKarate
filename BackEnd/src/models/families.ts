import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface familiesAttributes {
  parentid?: number;
  studentid: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
  parentFirstName?: string;
  parentLastName?: string;
  age?: number;
  rank: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active: number;
}

export type familiesOptionalAttributes =
  | 'parentid'
  | 'studentid'
  | 'preferedName'
  | 'parentFirstName'
  | 'parentLastName'
  | 'age'
  | 'rank'
  | 'endDateUTC'
  | 'phone'
  | 'notes'
  | 'active';
export type familiesCreationAttributes = Optional<
  familiesAttributes,
  familiesOptionalAttributes
>;

export class families
  extends Model<familiesAttributes, familiesCreationAttributes>
  implements familiesAttributes
{
  parentid?: number;
  studentid!: number;
  firstName!: string;
  lastName!: string;
  preferedName?: string;
  parentFirstName?: string;
  parentLastName?: string;
  age?: number;
  rank!: string;
  startDateUTC!: string;
  endDateUTC?: string;
  email!: string;
  phone?: string;
  notes?: string;
  active!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof families {
    return families.init(
      {
        parentid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        studentid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
        parentFirstName: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        parentLastName: {
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
      },
      {
        sequelize,
        tableName: 'families',
        timestamps: false,
      },
    );
  }
}
