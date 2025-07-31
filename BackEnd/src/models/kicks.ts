import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface kicksAttributes {
  id: number;
  studentid: number;
  front?: string;
  round?: string;
  side?: string;
  stepping_kick?: string;
  slide_up_kick?: string;
  double_round?: string;
  inside_crescent?: string;
  outside_crescent?: string;
  spin_back?: string;
  step_back?: string;
  spin_outside_crescent?: string;
  hook?: string;
  heel?: string;
  jump_phase_1?: string;
  jump_phase_2?: string;
  jump_phase_3?: string;
  jump_phase_4?: string;
  jump_phase_5?: string;
  jump_phase_6?: string;
}

export type kicksPk = 'id';
export type kicksId = kicks[kicksPk];
export type kicksOptionalAttributes =
  | 'id'
  | 'front'
  | 'round'
  | 'side'
  | 'stepping_kick'
  | 'slide_up_kick'
  | 'double_round'
  | 'inside_crescent'
  | 'outside_crescent'
  | 'spin_back'
  | 'step_back'
  | 'spin_outside_crescent'
  | 'hook'
  | 'heel'
  | 'jump_phase_1'
  | 'jump_phase_2'
  | 'jump_phase_3'
  | 'jump_phase_4'
  | 'jump_phase_5'
  | 'jump_phase_6';
export type kicksCreationAttributes = Optional<
  kicksAttributes,
  kicksOptionalAttributes
>;

export class kicks
  extends Model<kicksAttributes, kicksCreationAttributes>
  implements kicksAttributes
{
  id!: number;
  studentid!: number;
  front?: string;
  round?: string;
  side?: string;
  stepping_kick?: string;
  slide_up_kick?: string;
  double_round?: string;
  inside_crescent?: string;
  outside_crescent?: string;
  spin_back?: string;
  step_back?: string;
  spin_outside_crescent?: string;
  hook?: string;
  heel?: string;
  jump_phase_1?: string;
  jump_phase_2?: string;
  jump_phase_3?: string;
  jump_phase_4?: string;
  jump_phase_5?: string;
  jump_phase_6?: string;

  // kicks belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof kicks {
    return kicks.init(
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
        front: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        round: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        side: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        stepping_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_round: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        inside_crescent: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        outside_crescent: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_back: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_back: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_outside_crescent: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        hook: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        heel: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_1: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_2: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_3: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_4: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_5: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_6: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'kicks',
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
