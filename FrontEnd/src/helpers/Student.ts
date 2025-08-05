import { StudentAssessment } from 'models/Assessments/Assessments';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import * as Yup from 'yup';

// Convert assessment to form values
export const getInitialValues = (assessment: StudentAssessment | null) => {
  if (!assessment) {
    return {
      assessment_date: new Date().toISOString().split('T')[0],
      target_belt_rank: '',
      geocho_hyung_il_bu: null,
      geocho_hyung_il_bu_sahm_gup: null,
      geocho_hyung_yi_bu: null,
      geocho_hyung_yi_bu_sahm_gup: null,
      geocho_hyung_sahm_bu: null,
      pyong_an_cho_dan: null,
      pyong_an_yi_dan: null,
      pyong_an_sahm_dan: null,
      pyong_an_sa_dan: null,
      pyong_an_oh_dan: null,
      bassai: null,
      traditional_1: null,
      traditional_2: null,
      traditional_3: null,
      traditional_4: null,
      made_up_1: null,
      made_up_2: null,
      made_up_3: null,
      made_up_4: null,
      three_steps_1: null,
      three_steps_2: null,
      three_steps_3: null,
      three_steps_4: null,
      front_kick: null,
      side_kick: null,
      roundhouse_kick: null,
      back_kick: null,
      hook_kick: null,
      upper_cut: null,
      hook_punch: null,
      spin_bottom_fist: null,
      charging_punch: null,
      slide_up_jab_punch: null,
      chop_low: null,
      chop_high: null,
      spearhand: null,
      stepping_kick: null,
      slide_up_kick: null,
      spin_back_kick: null,
      inside_crescent_kick: null,
      outside_crescent_kick: null,
      spin_outside_crescent_kick: null,
      jump_spin_outside_crescent: null,
      spin_heel_kick: null,
      studder_step_kick: null,
      butterfly_kick: null,
      stance_front: null,
      stance_back: null,
      stance_straddle: null,
      stance_shifting: null,
      low_block: null,
      knife_hand_block: null,
      high_block: null,
      inside_block: null,
      outside_block: null,
      block_punch: null,
      double_block: null,
      double_block_punch: null,
      center_punch: null,
      reverse_punch: null,
      jab: null,
      overall_score: null,
      examiner_notes: '',
    };
  }

  return {
    assessment_date: new Date(assessment.assessment_date).toISOString().split('T')[0],
    target_belt_rank: assessment.target_belt_rank || '',
    geocho_hyung_il_bu: assessment.geocho_hyung_il_bu || null,
    geocho_hyung_il_bu_sahm_gup: assessment.geocho_hyung_il_bu_sahm_gup || null,
    geocho_hyung_yi_bu: assessment.geocho_hyung_yi_bu || null,
    geocho_hyung_yi_bu_sahm_gup: assessment.geocho_hyung_yi_bu_sahm_gup || null,
    geocho_hyung_sahm_bu: assessment.geocho_hyung_sahm_bu || null,
    pyong_an_cho_dan: assessment.pyong_an_cho_dan || null,
    pyong_an_yi_dan: assessment.pyong_an_yi_dan || null,
    pyong_an_sahm_dan: assessment.pyong_an_sahm_dan || null,
    pyong_an_sa_dan: assessment.pyong_an_sa_dan || null,
    pyong_an_oh_dan: assessment.pyong_an_oh_dan || null,
    bassai: assessment.bassai || null,
    traditional_1: assessment.traditional_1 || null,
    traditional_2: assessment.traditional_2 || null,
    traditional_3: assessment.traditional_3 || null,
    traditional_4: assessment.traditional_4 || null,
    made_up_1: assessment.made_up_1 || null,
    made_up_2: assessment.made_up_2 || null,
    made_up_3: assessment.made_up_3 || null,
    made_up_4: assessment.made_up_4 || null,
    three_steps_1: assessment.three_steps_1 || null,
    three_steps_2: assessment.three_steps_2 || null,
    three_steps_3: assessment.three_steps_3 || null,
    three_steps_4: assessment.three_steps_4 || null,
    front_kick: assessment.front_kick || null,
    side_kick: assessment.side_kick || null,
    roundhouse_kick: assessment.roundhouse_kick || null,
    back_kick: assessment.back_kick || null,
    hook_kick: assessment.hook_kick || null,
    upper_cut: assessment.upper_cut || null,
    hook_punch: assessment.hook_punch || null,
    spin_bottom_fist: assessment.spin_bottom_fist || null,
    charging_punch: assessment.charging_punch || null,
    slide_up_jab_punch: assessment.slide_up_jab_punch || null,
    chop_low: assessment.chop_low || null,
    chop_high: assessment.chop_high || null,
    spearhand: assessment.spearhand || null,
    stepping_kick: assessment.stepping_kick || null,
    slide_up_kick: assessment.slide_up_kick || null,
    spin_back_kick: assessment.spin_back_kick || null,
    inside_crescent_kick: assessment.inside_crescent_kick || null,
    outside_crescent_kick: assessment.outside_crescent_kick || null,
    spin_outside_crescent_kick: assessment.spin_outside_crescent_kick || null,
    jump_spin_outside_crescent: assessment.jump_spin_outside_crescent || null,
    spin_heel_kick: assessment.spin_heel_kick || null,
    studder_step_kick: assessment.studder_step_kick || null,
    butterfly_kick: assessment.butterfly_kick || null,
    stance_front: assessment.stance_front || null,
    stance_back: assessment.stance_back || null,
    stance_straddle: assessment.stance_straddle || null,
    stance_shifting: assessment.stance_shifting || null,
    low_block: assessment.low_block || null,
    knife_hand_block: assessment.knife_hand_block || null,
    high_block: assessment.high_block || null,
    inside_block: assessment.inside_block || null,
    outside_block: assessment.outside_block || null,
    block_punch: assessment.block_punch || null,
    double_block: assessment.double_block || null,
    double_block_punch: assessment.double_block_punch || null,
    center_punch: assessment.center_punch || null,
    reverse_punch: assessment.reverse_punch || null,
    jab: assessment.jab || null,
    overall_score: assessment.overall_score || null,
    examiner_notes: assessment.examiner_notes || '',
  };
};

// Get relevant belt requirements for the target belt
export const getTargetBeltRequirements = (
  targetBeltRank: string,
  beltRequirements: BeltRequirements[]
): BeltRequirements | null => {
  return (
    beltRequirements.find((belt) => belt.beltRank.toLowerCase() === targetBeltRank.toLowerCase()) ||
    null
  );
};

// Yup validation schema for assessment form

export const assessmentValidationSchema = Yup.object().shape({
  assessment_date: Yup.date().required('Assessment date is required'),
  target_belt_rank: Yup.string().required('Target belt rank is required'),

  // Forms (optional numeric scores 0-10)
  geocho_hyung_il_bu: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  geocho_hyung_il_bu_sahm_gup: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  geocho_hyung_yi_bu: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  geocho_hyung_yi_bu_sahm_gup: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  geocho_hyung_sahm_bu: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  pyong_an_cho_dan: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  pyong_an_yi_dan: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  pyong_an_sahm_dan: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  pyong_an_sa_dan: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  pyong_an_oh_dan: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  bassai: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // One Steps
  traditional_1: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  traditional_2: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  traditional_3: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  traditional_4: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  made_up_1: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  made_up_2: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  made_up_3: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  made_up_4: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  three_steps_1: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  three_steps_2: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  three_steps_3: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  three_steps_4: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // Kicks and techniques
  front_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  side_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  roundhouse_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  back_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  hook_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  upper_cut: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  hook_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  spin_bottom_fist: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  charging_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  slide_up_jab_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  chop_low: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  chop_high: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  spearhand: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  stepping_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  slide_up_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  spin_back_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  inside_crescent_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  outside_crescent_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  spin_outside_crescent_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  jump_spin_outside_crescent: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  spin_heel_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  studder_step_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  butterfly_kick: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // Stances
  stance_front: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  stance_back: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  stance_straddle: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  stance_shifting: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // Blocks
  low_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  knife_hand_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  high_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  inside_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  outside_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  block_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  double_block: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  double_block_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // Punches
  center_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  reverse_punch: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),
  jab: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(10, 'Score must be 10 or lower'),

  // Overall assessment
  overall_score: Yup.number()
    .nullable()
    .min(0, 'Score must be 0 or higher')
    .max(100, 'Score must be 100 or lower'),
  examiner_notes: Yup.string().max(1000, 'Notes must be less than 1000 characters'),
});
