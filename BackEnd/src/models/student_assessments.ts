import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { students } from './students';

@Table({
  tableName: 'student_assessments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class StudentAssessments extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  assessment_id!: number;

  @ForeignKey(() => students)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  instructor_id?: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  assessment_date!: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  target_belt_rank?: string;

  // Header Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  certificate_name?: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  belt_size?: string;

  // Forms (Hyungs) - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  geocho_hyung_il_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  geocho_hyung_il_bu_sahm_gup?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  geocho_hyung_yi_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  geocho_hyung_yi_bu_sahm_gup?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  geocho_hyung_sahm_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  pyong_an_cho_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  pyong_an_yi_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  pyong_an_sahm_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  pyong_an_sa_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  pyong_an_oh_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  bassai?: number;

  // Self Defense sections
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  traditional_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  traditional_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  traditional_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  traditional_4?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  made_up_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  made_up_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  made_up_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  made_up_4?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  three_steps_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  three_steps_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  three_steps_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  three_steps_4?: number;

  // Jump Kicks
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_round?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_side?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_f_side?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_crescent?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_kick_heel?: number;

  // Combinations
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  combination_fighting?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  combination_hands?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  combination_basic?: number;

  // Stances
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  stance_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  stance_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  stance_straddle?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  stance_shifting?: number;

  // Falling
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  falling_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  falling_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  falling_roll?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  falling_breaking?: number;

  // Blocks - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  high_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  low_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  knife_hand_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  inside_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  outside_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  block_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  double_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  double_block_punch?: number;

  // Punches - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  center_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  reverse_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jab?: number;

  // Kicks - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  front_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  side_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  roundhouse_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  back_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  hook_kick?: number;

  // Advanced/Specialized Techniques - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  upper_cut?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  hook_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  spin_bottom_fist?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  charging_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  slide_up_jab_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  chop_low?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  chop_high?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  spearhand?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  stepping_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  slide_up_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  spin_back_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  inside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  outside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  spin_outside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  jump_spin_outside_crescent?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  spin_heel_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  studder_step_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  butterfly_kick?: number;

  // Overall Assessment
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  overall_score?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  passed?: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  examiner_notes?: string;

  // Status and metadata
  @Column({
    type: DataType.ENUM('in_progress', 'completed', 'cancelled'),
    defaultValue: 'in_progress',
  })
  assessment_status!: 'in_progress' | 'completed' | 'cancelled';

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @BelongsTo(() => students)
  student!: students;
}
