import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { students } from '../models/students';
import { blocks } from '../models/blocks';
import { combinations } from '../models/combinations';
import { falling } from '../models/falling';
import { forms } from '../models/forms';
import { kicks } from '../models/kicks';
import { oneSteps } from '../models/oneSteps';
import { punches } from '../models/punches';
import { stances } from '../models/stances';
import { StudentProgressAttributes } from '../models/studentProgress';

@Injectable()
export class StudentProgressService {
  constructor(
    @InjectModel(students)
    private studentsModel: typeof students,
    @InjectModel(blocks)
    private blocksModel: typeof blocks,
    @InjectModel(combinations)
    private combinationsModel: typeof combinations,
    @InjectModel(falling)
    private fallingModel: typeof falling,
    @InjectModel(forms)
    private formsModel: typeof forms,
    @InjectModel(kicks)
    private kicksModel: typeof kicks,
    @InjectModel(oneSteps)
    private oneStepsModel: typeof oneSteps,
    @InjectModel(punches)
    private punchesModel: typeof punches,
    @InjectModel(stances)
    private stancesModel: typeof stances,
  ) {}

  /**
   * Get complete student progress data by student ID
   * Aggregates data from all martial arts categories
   */
  async getStudentProgressById(
    studentId: number,
  ): Promise<StudentProgressAttributes | null> {
    // Get the base student information
    const student = await this.studentsModel.findOne({
      where: { studentid: studentId },
    });

    if (!student) {
      return null;
    }

    // Get all progress data in parallel for better performance
    const [
      blocksData,
      combinationsData,
      fallingData,
      formsData,
      kicksData,
      oneStepsData,
      punchesData,
      stancesData,
    ] = await Promise.all([
      this.blocksModel.findOne({ where: { studentid: studentId } }),
      this.combinationsModel.findOne({ where: { studentid: studentId } }),
      this.fallingModel.findOne({ where: { studentid: studentId } }),
      this.formsModel.findOne({ where: { studentid: studentId } }),
      this.kicksModel.findOne({ where: { studentid: studentId } }),
      this.oneStepsModel.findOne({ where: { studentid: studentId } }),
      this.punchesModel.findOne({ where: { studentid: studentId } }),
      this.stancesModel.findOne({ where: { studentid: studentId } }),
    ]);

    // Combine all data into a single comprehensive object
    const studentProgress: StudentProgressAttributes = {
      // Student basic information
      studentid: student.studentid!,
      firstName: student.firstName,
      lastName: student.lastName,
      preferedName: student.preferedName,
      age: student.age,
      beltRank: student.beltRank,
      startDateUTC: student.startDateUTC,
      endDateUTC: student.endDateUTC,
      email: student.email,
      phone: student.phone,
      notes: student.notes,
      active: student.active,
      child: student.child,
      lastTestUTC: student.lastTestUTC,
      eligibleForTesting: student.eligibleForTesting,

      // Progress data for each category
      blocks: blocksData
        ? {
            id: blocksData.id,
            low: blocksData.low,
            knifeHand: blocksData.knifeHand,
            high: blocksData.high,
            inside: blocksData.inside,
            outside: blocksData.outside,
            lowChop: blocksData.lowChop,
            highChop: blocksData.highChop,
            doubleBlockPunch: blocksData.doubleBlockPunch,
            doubleBlock: blocksData.doubleBlock,
          }
        : null,

      combinations: combinationsData
        ? {
            id: combinationsData.id,
            kicking: combinationsData.kicking,
            hands: combinationsData.hands,
            fighting: combinationsData.fighting,
            basics: combinationsData.basics,
          }
        : null,

      falling: fallingData
        ? {
            id: fallingData.id,
            back: fallingData.back,
            front: fallingData.front,
            roll: fallingData.roll,
            forwardRoll: fallingData.forwardRoll,
          }
        : null,

      forms: formsData
        ? {
            id: formsData.id,
            geichoHyungIlBu: formsData.geichoHyungIlBu,
            geichoHyungIlBuSahmGup: formsData.geichoHyungIlBuSahmGup,
            geichoHyungYiBu: formsData.geichoHyungYiBu,
            geichoHyungYiBuSahmGup: formsData.geichoHyungYiBuSahmGup,
            geichoHyungSahmBu: formsData.geichoHyungSahmBu,
            pyongAnChoDan: formsData.pyongAnChoDan,
            pyongAnYiDan: formsData.pyongAnYiDan,
            pyongAnSahmDan: formsData.pyongAnSahmDan,
            pyongAnSaDan: formsData.pyongAnSaDan,
            pyongAnOhDan: formsData.pyongAnOhDan,
            bassai: formsData.bassai,
          }
        : null,

      kicks: kicksData
        ? {
            id: kicksData.id,
            front: kicksData.front,
            round: kicksData.round,
            side: kicksData.side,
            steppingKick: kicksData.steppingKick,
            slideUpKick: kicksData.slideUpKick,
            doubleRound: kicksData.doubleRound,
            insideCrescent: kicksData.insideCrescent,
            outsideCrescent: kicksData.outsideCrescent,
            spinBack: kicksData.spinBack,
            stepBack: kicksData.stepBack,
            spinOutsideCrescent: kicksData.spinOutsideCrescent,
            hook: kicksData.hook,
            heel: kicksData.heel,
            jumpPhase_1: kicksData.jumpPhase_1,
            jumpPhase_2: kicksData.jumpPhase_2,
            jumpPhase_3: kicksData.jumpPhase_3,
            jumpPhase_4: kicksData.jumpPhase_4,
            jumpPhase_5: kicksData.jumpPhase_5,
            jumpPhase_6: kicksData.jumpPhase_6,
          }
        : null,

      oneSteps: oneStepsData
        ? {
            id: oneStepsData.id,
            step_1Left: oneStepsData.step_1Left,
            step_1Right: oneStepsData.step_1Right,
            step_1Followup: oneStepsData.step_1Followup,
            step_2Left: oneStepsData.step_2Left,
            step_2Right: oneStepsData.step_2Right,
            step_2Followup: oneStepsData.step_2Followup,
            step_3Left: oneStepsData.step_3Left,
            step_3Right: oneStepsData.step_3Right,
            step_3Followup: oneStepsData.step_3Followup,
            step_4Left: oneStepsData.step_4Left,
            step_4Right: oneStepsData.step_4Right,
            step_4Followup: oneStepsData.step_4Followup,
          }
        : null,

      punches: punchesData
        ? {
            id: punchesData.id,
            center: punchesData.center,
            reverse: punchesData.reverse,
            jab: punchesData.jab,
            side: punchesData.side,
            charging: punchesData.charging,
            slideUpJab: punchesData.slideUpJab,
            slideUpPunch: punchesData.slideUpPunch,
            spinBottomFist: punchesData.spinBottomFist,
          }
        : null,

      stances: stancesData
        ? {
            id: stancesData.id,
            front: stancesData.front,
            back: stancesData.back,
            straddle: stancesData.straddle,
            fighting: stancesData.fighting,
            junBi: stancesData.junBi,
            bowing: stancesData.bowing,
            shifting: stancesData.shifting,
            comments: stancesData.comments,
          }
        : null,
    };

    return studentProgress;
  }

  /**
   * Get all students with their complete progress data
   * WARNING: This can be a heavy operation for large datasets
   */
  async getAllStudentsProgress(): Promise<StudentProgressAttributes[]> {
    const allStudents = await this.studentsModel.findAll();

    const studentsProgress = await Promise.all(
      allStudents.map(async (student) => {
        return await this.getStudentProgressById(student.studentid!);
      }),
    );

    return studentsProgress.filter(
      (progress) => progress !== null,
    ) as StudentProgressAttributes[];
  }

  /**
   * Get progress summary statistics for a student
   * Calculates completion percentages and progress indicators
   */
  async getStudentProgressSummary(studentId: number): Promise<{
    studentInfo: any;
    progressSummary: {
      totalCategories: number;
      categoriesWithData: number;
      completionPercentage: number;
      categories: {
        blocks: boolean;
        combinations: boolean;
        falling: boolean;
        forms: boolean;
        kicks: boolean;
        oneSteps: boolean;
        punches: boolean;
        stances: boolean;
      };
    };
  } | null> {
    const studentProgress = await this.getStudentProgressById(studentId);

    if (!studentProgress) {
      return null;
    }

    const categories = {
      blocks: !!studentProgress.blocks,
      combinations: !!studentProgress.combinations,
      falling: !!studentProgress.falling,
      forms: !!studentProgress.forms,
      kicks: !!studentProgress.kicks,
      oneSteps: !!studentProgress.oneSteps,
      punches: !!studentProgress.punches,
      stances: !!studentProgress.stances,
    };

    const totalCategories = Object.keys(categories).length;
    const categoriesWithData = Object.values(categories).filter(
      (hasData) => hasData,
    ).length;
    const completionPercentage = Math.round(
      (categoriesWithData / totalCategories) * 100,
    );

    return {
      studentInfo: {
        studentid: studentProgress.studentid,
        firstName: studentProgress.firstName,
        lastName: studentProgress.lastName,
        preferedName: studentProgress.preferedName,
        beltRank: studentProgress.beltRank,
        active: studentProgress.active,
        eligibleForTesting: studentProgress.eligibleForTesting,
      },
      progressSummary: {
        totalCategories,
        categoriesWithData,
        completionPercentage,
        categories,
      },
    };
  }
}
