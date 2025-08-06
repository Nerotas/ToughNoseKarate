import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { students } from './students';

// This interface represents the complete student progress data
export interface StudentProgressAttributes {
  // Student basic info
  studentid: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
  age?: number;
  beltRank?: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active?: number;
  child?: number;
  lastTestUTC?: string;
  eligibleForTesting?: number;

  // Blocks progress
  blocks?: {
    id?: number;
    low?: string;
    knifeHand?: string;
    high?: string;
    inside?: string;
    outside?: string;
    lowChop?: string;
    highChop?: string;
    doubleBlockPunch?: string;
    doubleBlock?: string;
  };

  // Combinations progress
  combinations?: {
    id?: number;
    kicking?: string;
    hands?: string;
    fighting?: string;
    basics?: string;
  };

  // Falling techniques progress
  falling?: {
    id?: number;
    back?: string;
    front?: string;
    roll?: string;
    forwardRoll?: string;
  };

  // Forms progress
  forms?: {
    id?: number;
    geichoHyungIlBu?: string;
    geichoHyungIlBuSahmGup?: string;
    geichoHyungYiBu?: string;
    geichoHyungYiBuSahmGup?: string;
    geichoHyungSahmBu?: string;
    pyongAnChoDan?: string;
    pyongAnYiDan?: string;
    pyongAnSahmDan?: string;
    pyongAnSaDan?: string;
    pyongAnOhDan?: string;
    bassai?: string;
  };

  // Kicks progress
  kicks?: {
    id?: number;
    front?: string;
    round?: string;
    side?: string;
    steppingKick?: string;
    slideUpKick?: string;
    doubleRound?: string;
    insideCrescent?: string;
    outsideCrescent?: string;
    spinBack?: string;
    stepBack?: string;
    spinOutsideCrescent?: string;
    hook?: string;
    heel?: string;
    jumpPhase_1?: string;
    jumpPhase_2?: string;
    jumpPhase_3?: string;
    jumpPhase_4?: string;
    jumpPhase_5?: string;
    jumpPhase_6?: string;
  };

  // One-steps progress
  oneSteps?: {
    id?: number;
    step_1Left?: string;
    step_1Right?: string;
    step_1Followup?: string;
    step_2Left?: string;
    step_2Right?: string;
    step_2Followup?: string;
    step_3Left?: string;
    step_3Right?: string;
    step_3Followup?: string;
    step_4Left?: string;
    step_4Right?: string;
    step_4Followup?: string;
  };

  // Punches progress
  punches?: {
    id?: number;
    center?: string;
    reverse?: string;
    jab?: string;
    side?: string;
    charging?: string;
    slideUpJab?: string;
    slideUpPunch?: string;
    spinBottomFist?: string;
  };

  // Stances progress
  stances?: {
    id?: number;
    front?: string;
    back?: string;
    straddle?: string;
    fighting?: string;
    junBi?: string;
    bowing?: string;
    shifting?: string;
    comments?: string;
  };
}

// This is a virtual model for aggregating data - it doesn't map to a physical table
@Table({ tableName: 'student_progress_view', timestamps: false })
export class StudentProgress
  extends Model<StudentProgressAttributes, StudentProgressAttributes>
  implements StudentProgressAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  studentid!: number;

  @Column({ type: DataType.STRING(45) })
  firstName!: string;

  @Column({ type: DataType.STRING(45) })
  lastName!: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  preferredName?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  age?: number;

  @Column({ type: DataType.STRING(45), defaultValue: 'white' })
  beltRank?: string;

  @Column({ field: 'startDateUTC', type: DataType.STRING(45) })
  startDateUTC!: string;

  @Column({ field: 'endDateUTC', allowNull: true, type: DataType.STRING(45) })
  endDateUTC?: string;

  @Column({ type: DataType.STRING(45) })
  email!: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  phone?: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  notes?: string;

  @Column({ type: DataType.TINYINT, defaultValue: '1' })
  active?: number;

  @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: '0' })
  child?: number;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  lastTestUTC?: string;

  @Column({ type: DataType.TINYINT, defaultValue: '0' })
  eligibleForTesting?: number;

  // Virtual fields for progress data
  blocks?: any;
  combinations?: any;
  falling?: any;
  forms?: any;
  kicks?: any;
  oneSteps?: any;
  punches?: any;
  stances?: any;
}
