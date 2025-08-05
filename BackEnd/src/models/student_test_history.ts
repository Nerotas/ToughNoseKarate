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
  test_history_id!: number;

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
    allowNull: false,
  })
  test_date!: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  belt_from!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  belt_to!: string;

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

  // Forms (Hyungs) - Final scores
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

  // Final Results
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  overall_score!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  passed!: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  examiner_name?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  examiner_notes?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  new_rank?: string;

  @CreatedAt
  created_at!: Date;

  // Associations
  @BelongsTo(() => students)
  student!: students;
}
