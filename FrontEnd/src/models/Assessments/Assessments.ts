// Student Assessment interfaces for frontend
export interface StudentAssessment {
  assessment_id: number;
  student_id: number;
  instructor_id?: number;
  assessment_date: string;
  target_belt_rank?: string;

  // Header Information
  certificate_name?: string;
  belt_size?: string;

  // Forms (Hyungs) - Score out of 10 for each
  geocho_hyung_il_bu?: number;
  geocho_hyung_il_bu_sahm_gup?: number;
  geocho_hyung_yi_bu?: number;
  geocho_hyung_yi_bu_sahm_gup?: number;
  geocho_hyung_sahm_bu?: number;
  pyong_an_cho_dan?: number;
  pyong_an_yi_dan?: number;
  pyong_an_sahm_dan?: number;
  pyong_an_sa_dan?: number;
  pyong_an_oh_dan?: number;
  bassai?: number;

  // Self Defense sections
  traditional_1?: number;
  traditional_2?: number;
  traditional_3?: number;
  traditional_4?: number;
  made_up_1?: number;
  made_up_2?: number;
  made_up_3?: number;
  made_up_4?: number;
  three_steps_1?: number;
  three_steps_2?: number;
  three_steps_3?: number;
  three_steps_4?: number;

  // Jump Kicks
  jump_kick_front?: number;
  jump_kick_round?: number;
  jump_kick_side?: number;
  jump_kick_back?: number;
  jump_kick_f_side?: number;
  jump_kick_crescent?: number;
  jump_kick_heel?: number;

  // Combinations
  combination_fighting?: number;
  combination_hands?: number;
  combination_basic?: number;

  // Stances
  stance_front?: number;
  stance_back?: number;
  stance_straddle?: number;
  stance_shifting?: number;

  // Falling
  falling_back?: number;
  falling_front?: number;
  falling_roll?: number;
  falling_breaking?: number;

  // Blocks
  high_block?: number;
  low_block?: number;
  knife_hand_block?: number;
  inside_block?: number;
  outside_block?: number;
  block_punch?: number;
  double_block?: number;
  double_block_punch?: number;

  // Punches
  center_punch?: number;
  reverse_punch?: number;
  jab?: number;

  // Kicks
  front_kick?: number;
  side_kick?: number;
  roundhouse_kick?: number;
  back_kick?: number;
  hook_kick?: number;

  // Advanced/Specialized Techniques
  upper_cut?: number;
  hook_punch?: number;
  spin_bottom_fist?: number;
  charging_punch?: number;
  slide_up_jab_punch?: number;
  chop_low?: number;
  chop_high?: number;
  spearhand?: number;
  stepping_kick?: number;
  slide_up_kick?: number;
  spin_back_kick?: number;
  inside_crescent_kick?: number;
  outside_crescent_kick?: number;
  spin_outside_crescent_kick?: number;
  jump_spin_outside_crescent?: number;
  spin_heel_kick?: number;
  studder_step_kick?: number;
  butterfly_kick?: number;

  // Overall Assessment
  overall_score?: number;
  passed?: boolean;
  examiner_notes?: string;

  // Status and metadata
  assessment_status: 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface StudentTestHistory {
  test_history_id: number;
  student_id: number;
  instructor_id?: number;
  test_date: string;
  belt_from: string;
  belt_to: string;

  // Header Information
  certificate_name?: string;
  belt_size?: string;

  // Forms (Hyungs) - Final scores
  geocho_hyung_il_bu?: number;
  geocho_hyung_il_bu_sahm_gup?: number;
  geocho_hyung_yi_bu?: number;
  geocho_hyung_yi_bu_sahm_gup?: number;
  geocho_hyung_sahm_bu?: number;
  pyong_an_cho_dan?: number;
  pyong_an_yi_dan?: number;
  pyong_an_sahm_dan?: number;
  pyong_an_sa_dan?: number;
  pyong_an_oh_dan?: number;
  bassai?: number;

  // Self Defense sections
  traditional_1?: number;
  traditional_2?: number;
  traditional_3?: number;
  traditional_4?: number;
  made_up_1?: number;
  made_up_2?: number;
  made_up_3?: number;
  made_up_4?: number;
  three_steps_1?: number;
  three_steps_2?: number;
  three_steps_3?: number;
  three_steps_4?: number;

  // Jump Kicks
  jump_kick_front?: number;
  jump_kick_round?: number;
  jump_kick_side?: number;
  jump_kick_back?: number;
  jump_kick_f_side?: number;
  jump_kick_crescent?: number;
  jump_kick_heel?: number;

  // Combinations
  combination_fighting?: number;
  combination_hands?: number;
  combination_basic?: number;

  // Stances
  stance_front?: number;
  stance_back?: number;
  stance_straddle?: number;
  stance_shifting?: number;

  // Falling
  falling_back?: number;
  falling_front?: number;
  falling_roll?: number;
  falling_breaking?: number;

  // Final Results
  overall_score: number;
  passed: boolean;
  examiner_name?: string;
  examiner_notes?: string;
  new_rank?: string;

  created_at: string;
}

export interface AssessmentOverview {
  assessment_id: number;
  student_id: number;
  student_name: string;
  current_belt: string;
  target_belt_rank?: string;
  assessment_date: string;
  overall_score?: number;
  passed?: boolean;
  assessment_status: 'in_progress' | 'completed' | 'cancelled';
  examiner_notes?: string;
  forms_completion_pct: number;
  avg_forms_score: number;
}

// Form data for creating/updating assessments
export interface AssessmentFormData {
  student_id: number;
  target_belt_rank: string;
  certificate_name?: string;
  belt_size?: string;

  // Forms scores
  forms: {
    geocho_hyung_il_bu?: number;
    geocho_hyung_il_bu_sahm_gup?: number;
    geocho_hyung_yi_bu?: number;
    geocho_hyung_yi_bu_sahm_gup?: number;
    geocho_hyung_sahm_bu?: number;
    pyong_an_cho_dan?: number;
    pyong_an_yi_dan?: number;
    pyong_an_sahm_dan?: number;
    pyong_an_sa_dan?: number;
    pyong_an_oh_dan?: number;
    bassai?: number;
  };

  // Self Defense scores
  selfDefense: {
    traditional_1?: number;
    traditional_2?: number;
    traditional_3?: number;
    traditional_4?: number;
    made_up_1?: number;
    made_up_2?: number;
    made_up_3?: number;
    made_up_4?: number;
    three_steps_1?: number;
    three_steps_2?: number;
    three_steps_3?: number;
    three_steps_4?: number;
  };

  // Jump Kicks scores
  jumpKicks: {
    front?: number;
    round?: number;
    side?: number;
    back?: number;
    f_side?: number;
    crescent?: number;
    heel?: number;
  };

  // Combinations scores
  combinations: {
    fighting?: number;
    hands?: number;
    basic?: number;
  };

  // Stances scores
  stances: {
    front?: number;
    back?: number;
    straddle?: number;
    shifting?: number;
  };

  // Falling scores
  falling: {
    back?: number;
    front?: number;
    roll?: number;
    breaking?: number;
  };

  examiner_notes?: string;
}

export interface AssessmentSummary {
  totalAssessments: number;
  completedAssessments: number;
  inProgressAssessments: number;
  averageScore: number;
  passRate: number;
  assessments: StudentAssessment[];
}

export interface CreateStudentAssessmentRequest {
  student_id: number;
  instructor_id?: number;
  assessment_date?: string;
  target_belt_rank?: string;
  certificate_name?: string;
  belt_size?: string;

  // Forms (Hyungs) - Score out of 10 for each
  geocho_hyung_il_bu?: number;
  geocho_hyung_il_bu_sahm_gup?: number;
  geocho_hyung_yi_bu?: number;
  geocho_hyung_yi_bu_sahm_gup?: number;
  geocho_hyung_sahm_bu?: number;
  pyong_an_cho_dan?: number;
  pyong_an_yi_dan?: number;
  pyong_an_sahm_dan?: number;
  pyong_an_sa_dan?: number;
  pyong_an_oh_dan?: number;
  bassai?: number;

  // Self Defense sections
  traditional_1?: number;
  traditional_2?: number;
  traditional_3?: number;
  traditional_4?: number;
  made_up_1?: number;
  made_up_2?: number;
  made_up_3?: number;
  made_up_4?: number;
  three_steps_1?: number;
  three_steps_2?: number;
  three_steps_3?: number;
  three_steps_4?: number;

  // Jump Kicks
  jump_kick_front?: number;
  jump_kick_round?: number;
  jump_kick_side?: number;
  jump_kick_back?: number;
  jump_kick_f_side?: number;
  jump_kick_crescent?: number;
  jump_kick_heel?: number;

  // Combinations
  combination_fighting?: number;
  combination_hands?: number;
  combination_basic?: number;

  // Stances
  stance_front?: number;
  stance_back?: number;
  stance_straddle?: number;
  stance_shifting?: number;

  // Falling
  falling_back?: number;
  falling_front?: number;
  falling_roll?: number;
  falling_breaking?: number;

  // Blocks
  high_block?: number;
  low_block?: number;
  knife_hand_block?: number;
  inside_block?: number;
  outside_block?: number;
  block_punch?: number;
  double_block?: number;
  double_block_punch?: number;

  // Punches
  center_punch?: number;
  reverse_punch?: number;
  jab?: number;

  // Kicks
  front_kick?: number;
  side_kick?: number;
  roundhouse_kick?: number;
  back_kick?: number;
  hook_kick?: number;

  // Advanced/Specialized Techniques
  upper_cut?: number;
  hook_punch?: number;
  spin_bottom_fist?: number;
  charging_punch?: number;
  slide_up_jab_punch?: number;
  chop_low?: number;
  chop_high?: number;
  spearhand?: number;
  stepping_kick?: number;
  slide_up_kick?: number;
  spin_back_kick?: number;
  inside_crescent_kick?: number;
  outside_crescent_kick?: number;
  spin_outside_crescent_kick?: number;
  jump_spin_outside_crescent?: number;
  spin_heel_kick?: number;
  studder_step_kick?: number;
  butterfly_kick?: number;

  // Overall Assessment
  overall_score?: number;
  passed?: boolean;
  examiner_notes?: string;
  assessment_status?: 'in_progress' | 'completed' | 'cancelled';
}

export interface UpdateStudentAssessmentRequest extends Partial<CreateStudentAssessmentRequest> {}
