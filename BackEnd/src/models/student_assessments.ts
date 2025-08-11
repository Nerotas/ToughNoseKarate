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
  declare assessment_id: number;

  @ForeignKey(() => students)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare student_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare instructor_id?: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare assessment_date: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare target_belt_rank?: string;

  // Header Information
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare certificate_name?: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare belt_size?: string;

  // Forms (Hyungs) - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare geocho_hyung_il_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare geocho_hyung_il_bu_sahm_gup?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare geocho_hyung_yi_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare geocho_hyung_yi_bu_sahm_gup?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare geocho_hyung_sahm_bu?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare pyong_an_cho_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare pyong_an_yi_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare pyong_an_sahm_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare pyong_an_sa_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare pyong_an_oh_dan?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare bassai?: number;

  // Self Defense sections
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare traditional_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare traditional_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare traditional_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare traditional_4?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare made_up_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare made_up_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare made_up_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare made_up_4?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare three_steps_1?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare three_steps_2?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare three_steps_3?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare three_steps_4?: number;

  // Jump Kicks
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_round?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_side?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_f_side?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_crescent?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_kick_heel?: number;

  // Combinations
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare combination_fighting?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare combination_hands?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare combination_basic?: number;

  // Stances
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare stance_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare stance_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare stance_straddle?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare stance_shifting?: number;

  // Falling
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare falling_back?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare falling_front?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare falling_roll?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare falling_breaking?: number;

  // Blocks - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare high_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare low_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare knife_hand_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare inside_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare outside_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare block_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare double_block?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare double_block_punch?: number;

  // Punches - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare center_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare reverse_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jab?: number;

  // Kicks - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare front_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare side_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare roundhouse_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare back_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare hook_kick?: number;

  // Advanced/Specialized Techniques - Score out of 10 for each
  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare upper_cut?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare hook_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare spin_bottom_fist?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare charging_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare slide_up_jab_punch?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare chop_low?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare chop_high?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare spearhand?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare stepping_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare slide_up_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare spin_back_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare inside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare outside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare spin_outside_crescent_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare jump_spin_outside_crescent?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare spin_heel_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare studder_step_kick?: number;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: true,
  })
  declare butterfly_kick?: number;

  // Overall Assessment
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  declare overall_score?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare passed?: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare examiner_notes?: string;

  // Status and metadata
  @Column({
    type: DataType.ENUM('in_progress', 'completed', 'cancelled'),
    defaultValue: 'in_progress',
  })
  declare assessment_status: 'in_progress' | 'completed' | 'cancelled';

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Associations
  @BelongsTo(() => students)
  declare student: students;
}
