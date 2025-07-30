import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type {
  combinations,
  combinationsCreationAttributes,
  combinationsId,
} from './combinations';
import type { falling, fallingCreationAttributes, fallingId } from './falling';
import type { forms, formsCreationAttributes, formsId } from './forms';
import type {
  one_steps,
  one_stepsCreationAttributes,
  one_stepsId,
} from './one_steps';
import type { stances, stancesCreationAttributes, stancesId } from './stances';

export interface studentsAttributes {
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

export type studentsPk = 'studentid';
export type studentsId = students[studentsPk];
export type studentsOptionalAttributes =
  | 'studentid'
  | 'preferedName'
  | 'age'
  | 'rank'
  | 'endDateUTC'
  | 'phone'
  | 'notes'
  | 'active'
  | 'child';
export type studentsCreationAttributes = Optional<
  studentsAttributes,
  studentsOptionalAttributes
>;

export class students
  extends Model<studentsAttributes, studentsCreationAttributes>
  implements studentsAttributes
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

  // students hasOne combinations via studentid
  combination!: combinations;
  getCombination!: Sequelize.HasOneGetAssociationMixin<combinations>;
  setCombination!: Sequelize.HasOneSetAssociationMixin<
    combinations,
    combinationsId
  >;
  createCombination!: Sequelize.HasOneCreateAssociationMixin<combinations>;
  // students hasOne falling via studentid
  falling!: falling;
  getFalling!: Sequelize.HasOneGetAssociationMixin<falling>;
  setFalling!: Sequelize.HasOneSetAssociationMixin<falling, fallingId>;
  createFalling!: Sequelize.HasOneCreateAssociationMixin<falling>;
  // students hasOne forms via studentid
  form!: forms;
  getForm!: Sequelize.HasOneGetAssociationMixin<forms>;
  setForm!: Sequelize.HasOneSetAssociationMixin<forms, formsId>;
  createForm!: Sequelize.HasOneCreateAssociationMixin<forms>;
  // students hasOne one_steps via studentid
  one_step!: one_steps;
  getOne_step!: Sequelize.HasOneGetAssociationMixin<one_steps>;
  setOne_step!: Sequelize.HasOneSetAssociationMixin<one_steps, one_stepsId>;
  createOne_step!: Sequelize.HasOneCreateAssociationMixin<one_steps>;
  // students hasOne stances via studentid
  stance!: stances;
  getStance!: Sequelize.HasOneGetAssociationMixin<stances>;
  setStance!: Sequelize.HasOneSetAssociationMixin<stances, stancesId>;
  createStance!: Sequelize.HasOneCreateAssociationMixin<stances>;

  static initModel(sequelize: Sequelize.Sequelize): typeof students {
    return students.init(
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
        tableName: 'students',
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
