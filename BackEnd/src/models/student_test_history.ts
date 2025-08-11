import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { students } from './students';

@Table({
  tableName: 'student_test_history',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export class StudentTestHistory extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare test_history_id: number;

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
    allowNull: false,
  })
  declare test_date: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare belt_from: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare belt_to: string;

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

  // Forms (Hyungs) - Final scores
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

  // Final Results
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  declare overall_score: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare passed: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare examiner_name?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare examiner_notes?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare new_rank?: string;

  @CreatedAt
  declare created_at: Date;

  // Associations
  @BelongsTo(() => students)
  declare student: students;
}
