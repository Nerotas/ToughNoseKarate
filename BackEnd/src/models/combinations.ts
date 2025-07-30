import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { students, studentsId } from './students';

export interface combinationsAttributes {
  block_to_back_stance_with_shift_punch?: string;
  center_punch?: string;
  charging_punch?: string;
  chop_low?: string;
  double_block_low_knife?: string;
  double_block_punch_variety?: string;
  double_block_variety?: string;
  high_block?: string;
  high_double_block?: string;
  inside_block?: string;
  jab_punch?: string;
  jump_back_kick_phase_2?: string;
  jump_back_kick_phase_3?: string;
  jump_front_kick_phase_1?: string;
  jump_front_kick_phase_2?: string;
  jump_phase_3_front?: string;
  jump_phase_3_round?: string;
  jump_phase_3_side?: string;
  jump_phase_4?: string;
  jump_round_kick_phase_1?: string;
  jump_round_kick_phase_2?: string;
  jump_spin_back_kick_phase_1?: string;
  jump_spin_outside_crescent_kick?: string;
  knife_hand_block?: string;
  low_block?: string;
  outside_block?: string;
  reverse_punch?: string;
  side_punch?: string;
  slide_up_front_kick?: string;
  slide_up_jab?: string;
  slide_up_outside_crescent_kick?: string;
  slide_up_punch?: string;
  slide_up_round_kick?: string;
  slide_up_side_kick?: string;
  spin_back_kick?: string;
  spin_bottom_fist?: string;
  spin_outside_crescent_kick?: string;
  step_double_round_kick?: string;
  step_front_kick?: string;
  step_inside_crescent_kick?: string;
  step_outside_crescent_kick?: string;
  step_side_kick?: string;
  stepping_back_kick?: string;
  stepping_round_kick?: string;
  studentid: number;
}

export type combinationsPk = 'studentid';
export type combinationsId = combinations[combinationsPk];
export type combinationsOptionalAttributes =
  | 'center_punch'
  | 'reverse_punch'
  | 'jab_punch'
  | 'side_punch'
  | 'spin_bottom_fist'
  | 'charging_punch'
  | 'slide_up_jab'
  | 'slide_up_punch'
  | 'low_block'
  | 'knife_hand_block'
  | 'high_block'
  | 'inside_block'
  | 'outside_block'
  | 'double_block_low_knife'
  | 'double_block_variety'
  | 'double_block_punch_variety'
  | 'block_to_back_stance_with_shift_punch'
  | 'chop_low'
  | 'high_double_block'
  | 'step_front_kick'
  | 'slide_up_front_kick'
  | 'slide_up_round_kick'
  | 'stepping_round_kick'
  | 'slide_up_side_kick'
  | 'step_side_kick'
  | 'spin_back_kick'
  | 'stepping_back_kick'
  | 'step_double_round_kick'
  | 'step_inside_crescent_kick'
  | 'slide_up_outside_crescent_kick'
  | 'step_outside_crescent_kick'
  | 'spin_outside_crescent_kick'
  | 'jump_front_kick_phase_1'
  | 'jump_front_kick_phase_2'
  | 'jump_round_kick_phase_1'
  | 'jump_round_kick_phase_2'
  | 'jump_phase_3_front'
  | 'jump_phase_3_round'
  | 'jump_phase_3_side'
  | 'jump_spin_back_kick_phase_1'
  | 'jump_phase_4'
  | 'jump_back_kick_phase_2'
  | 'jump_back_kick_phase_3'
  | 'jump_spin_outside_crescent_kick';
export type combinationsCreationAttributes = Optional<
  combinationsAttributes,
  combinationsOptionalAttributes
>;

export class combinations
  extends Model<combinationsAttributes, combinationsCreationAttributes>
  implements combinationsAttributes
{
  studentid!: number;
  center_punch?: string;
  reverse_punch?: string;
  jab_punch?: string;
  side_punch?: string;
  spin_bottom_fist?: string;
  charging_punch?: string;
  slide_up_jab?: string;
  slide_up_punch?: string;
  low_block?: string;
  knife_hand_block?: string;
  high_block?: string;
  inside_block?: string;
  outside_block?: string;
  double_block_low_knife?: string;
  double_block_variety?: string;
  double_block_punch_variety?: string;
  block_to_back_stance_with_shift_punch?: string;
  chop_low?: string;
  high_double_block?: string;
  step_front_kick?: string;
  slide_up_front_kick?: string;
  slide_up_round_kick?: string;
  stepping_round_kick?: string;
  slide_up_side_kick?: string;
  step_side_kick?: string;
  spin_back_kick?: string;
  stepping_back_kick?: string;
  step_double_round_kick?: string;
  step_inside_crescent_kick?: string;
  slide_up_outside_crescent_kick?: string;
  step_outside_crescent_kick?: string;
  spin_outside_crescent_kick?: string;
  jump_front_kick_phase_1?: string;
  jump_front_kick_phase_2?: string;
  jump_round_kick_phase_1?: string;
  jump_round_kick_phase_2?: string;
  jump_phase_3_front?: string;
  jump_phase_3_round?: string;
  jump_phase_3_side?: string;
  jump_spin_back_kick_phase_1?: string;
  jump_phase_4?: string;
  jump_back_kick_phase_2?: string;
  jump_back_kick_phase_3?: string;
  jump_spin_outside_crescent_kick?: string;

  // combinations belongsTo students via studentid
  student!: students;
  getStudent!: Sequelize.BelongsToGetAssociationMixin<students>;
  setStudent!: Sequelize.BelongsToSetAssociationMixin<students, studentsId>;
  createStudent!: Sequelize.BelongsToCreateAssociationMixin<students>;

  static initModel(sequelize: Sequelize.Sequelize): typeof combinations {
    return combinations.init(
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
        center_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        reverse_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jab_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        side_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_bottom_fist: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        charging_punch: {
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
        low_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        knife_hand_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        high_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        inside_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        outside_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_block_low_knife: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_block_variety: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        double_block_punch_variety: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        block_to_back_stance_with_shift_punch: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        chop_low: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        high_double_block: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_front_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_front_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_round_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        stepping_round_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_side_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_side_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_back_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        stepping_back_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_double_round_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_inside_crescent_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        slide_up_outside_crescent_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        step_outside_crescent_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        spin_outside_crescent_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_front_kick_phase_1: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_front_kick_phase_2: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_round_kick_phase_1: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_round_kick_phase_2: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_3_front: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_3_round: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_3_side: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_spin_back_kick_phase_1: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_phase_4: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_back_kick_phase_2: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_back_kick_phase_3: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        jump_spin_outside_crescent_kick: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'combinations',
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
