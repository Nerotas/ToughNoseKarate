import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface one_stepsAttributes {
  studentid: number;
  step_1_left?: string;
  step_1_right?: string;
  step_1_followup?: string;
  step_2_left?: string;
  step_2_right?: string;
  step_2_followup?: string;
  step_3_left?: string;
  step_3_right?: string;
  step_3_followup?: string;
  step_4_left?: string;
  step_4_right?: string;
  step_4_followup?: string;
}

export type one_stepsPk = 'studentid';
export type one_stepsId = one_steps[one_stepsPk];
export type one_stepsOptionalAttributes =
  | 'step_1_left'
  | 'step_1_right'
  | 'step_1_followup'
  | 'step_2_left'
  | 'step_2_right'
  | 'step_2_followup'
  | 'step_3_left'
  | 'step_3_right'
  | 'step_3_followup'
  | 'step_4_left'
  | 'step_4_right'
  | 'step_4_followup';
export type one_stepsCreationAttributes = Optional<
  one_stepsAttributes,
  one_stepsOptionalAttributes
>;

export class one_steps
  extends Model<one_stepsAttributes, one_stepsCreationAttributes>
  implements one_stepsAttributes
{
  studentid!: number;
  step_1_left?: string;
  step_1_right?: string;
  step_1_followup?: string;
  step_2_left?: string;
  step_2_right?: string;
  step_2_followup?: string;
  step_3_left?: string;
  step_3_right?: string;
  step_3_followup?: string;
  step_4_left?: string;
  step_4_right?: string;
  step_4_followup?: string;

  // one_steps belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof one_steps {
    return one_steps.init(
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
        step_1_left: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_1_right: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_1_followup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_2_left: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_2_right: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_2_followup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_3_left: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_3_right: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_3_followup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_4_left: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_4_right: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_4_followup: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'one_steps',
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
