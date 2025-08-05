import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { IconClipboardData, IconPlus, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StudentAssessment } from '../../../../models/Assessments/Assessments';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import { studentAssessmentsService } from '../../../../services/studentAssessmentsService';

interface StudentAssessmentFormProps {
  currentAssessment: StudentAssessment | null;
  beltRequirements: BeltRequirements[];
  assessmentLoading: boolean;
  assessmentError: any;
  savingAssessment: boolean;
  handleCreateAssessment: () => Promise<void>;
  handleCompleteAssessment: (passed: boolean, overallScore?: number) => Promise<void>;
  handleEditAssessment: (assessment: StudentAssessment) => void;
  handleCancelAssessment: () => Promise<void>;
  getBeltColor: (beltRank: string, beltRequirements: BeltRequirements[]) => string;
  getBeltTextColor: (beltRank: string, beltRequirements: BeltRequirements[]) => string;
  onAssessmentUpdate?: (assessment: StudentAssessment) => Promise<void>;
}

// Yup validation schema for assessment form
const assessmentValidationSchema = Yup.object().shape({
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

const StudentAssessmentForm: React.FC<StudentAssessmentFormProps> = ({
  currentAssessment,
  beltRequirements,
  assessmentLoading,
  assessmentError,
  savingAssessment,
  handleCreateAssessment,
  handleCompleteAssessment,
  handleEditAssessment,
  handleCancelAssessment,
  getBeltColor,
  getBeltTextColor,
  onAssessmentUpdate,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<StudentAssessment | null>(null);

  const openEditDialog = (assessment: StudentAssessment) => {
    setEditingAssessment(assessment);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingAssessment(null);
  };

  // Convert assessment to form values
  const getInitialValues = (assessment: StudentAssessment | null) => {
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
  const getTargetBeltRequirements = (targetBeltRank: string): BeltRequirements | null => {
    return (
      beltRequirements.find(
        (belt) => belt.beltRank.toLowerCase() === targetBeltRank.toLowerCase()
      ) || null
    );
  };

  // Check if a field is relevant for the target belt
  const isFieldRelevant = (fieldName: string, targetBelt: BeltRequirements | null): boolean => {
    if (!targetBelt) return false;

    // Form field mappings
    const formMappings: { [key: string]: string[] } = {
      geocho_hyung_il_bu: ['geocho hyung il bu', 'geocho 1'],
      geocho_hyung_yi_bu: ['geocho hyung yi bu', 'geocho 2'],
      geocho_hyung_sahm_bu: ['geocho hyung sahm bu', 'geocho 3'],
      pyong_an_cho_dan: ['pyong an cho dan', 'pyong an 1'],
      pyong_an_yi_dan: ['pyong an yi dan', 'pyong an 2'],
      pyong_an_sahm_dan: ['pyong an sahm dan', 'pyong an 3'],
      pyong_an_sa_dan: ['pyong an sa dan', 'pyong an 4'],
      pyong_an_oh_dan: ['pyong an oh dan', 'pyong an 5'],
      bassai: ['bassai'],
    };

    // Stance field mappings
    const stanceMappings: { [key: string]: string[] } = {
      stance_front: ['front stance', 'forward stance'],
      stance_back: ['back stance', 'rear stance'],
      stance_straddle: ['straddle stance', 'horse stance'],
      stance_shifting: ['shifting stance', 'cat stance'],
    };

    // Block field mappings
    const blockMappings: { [key: string]: string[] } = {
      high_block: ['high block', 'upper block'],
      middle_block: ['middle block', 'mid block'],
      low_block: ['low block', 'lower block'],
      knife_hand_block: ['knife hand block', 'knife-hand block'],
      double_block: ['double block', 'twin block'],
    };

    // Punch field mappings
    const punchMappings: { [key: string]: string[] } = {
      center_punch: ['center punch', 'middle punch', 'mid punch'],
      reverse_punch: ['reverse punch'],
      jab: ['jab', 'jab punch'],
    };

    // Kick field mappings
    const kickMappings: { [key: string]: string[] } = {
      front_kick: ['front kick'],
      side_kick: ['side kick'],
      roundhouse_kick: ['roundhouse kick', 'round kick'],
      back_kick: ['back kick'],
      hook_kick: ['hook kick'],
      upper_cut: ['upper cut', 'uppercut'],
      hook_punch: ['hook punch'],
      spin_bottom_fist: ['spin bottom fist'],
      charging_punch: ['charging punch'],
      slide_up_jab_punch: ['slide up jab'],
      chop_low: ['chop low', 'low chop'],
      chop_high: ['chop high', 'high chop'],
      spearhand: ['spear hand'],
      block_punch_combo: ['block punch combo'],
      double_block_punch_combo: ['double block punch combo'],
      stepping_kick: ['stepping kick'],
      slide_up_kick: ['slide up kick'],
      spin_back_kick: ['spin back kick'],
      inside_crescent_kick: ['inside crescent kick'],
      outside_crescent_kick: ['outside crescent kick'],
      spin_outside_crescent_kick: ['spin outside crescent kick'],
      jump_spin_outside_crescent: ['jump spin outside crescent'],
      spin_heel_kick: ['spin heel kick'],
      studder_step_kick: ['studder step kick'],
      butterfly_kick: ['butterfly kick'],
    }; // One Steps mappings (simplified for now)
    const oneStepsMappings: { [key: string]: string[] } = {
      traditional_1: ['traditional', 'one steps'],
      traditional_2: ['traditional', 'one steps'],
      traditional_3: ['traditional', 'one steps'],
      traditional_4: ['traditional', 'one steps'],
      made_up_1: ['made up', 'free style'],
      made_up_2: ['made up', 'free style'],
      made_up_3: ['made up', 'free style'],
      made_up_4: ['made up', 'free style'],
      three_steps_1: ['three step', 'one step'],
      three_steps_2: ['three step', 'one step'],
      three_steps_3: ['three step', 'one step'],
      three_steps_4: ['three step', 'one step'],
    };

    // Check each category
    const checkInArray = (
      mappings: { [key: string]: string[] },
      categoryArray: string[]
    ): boolean => {
      const fieldMappings = mappings[fieldName];
      if (!fieldMappings) return false;

      return fieldMappings.some((mapping) =>
        categoryArray.some(
          (item) =>
            item.toLowerCase().includes(mapping.toLowerCase()) ||
            mapping.toLowerCase().includes(item.toLowerCase())
        )
      );
    };

    // Check forms
    if (formMappings[fieldName] && targetBelt.forms.length > 0) {
      return checkInArray(formMappings, targetBelt.forms);
    }

    // Check stances
    if (stanceMappings[fieldName] && targetBelt.stances.length > 0) {
      return checkInArray(stanceMappings, targetBelt.stances);
    }

    // Check blocks
    if (blockMappings[fieldName] && targetBelt.blocks.length > 0) {
      return checkInArray(blockMappings, targetBelt.blocks);
    }

    // Check punches
    if (punchMappings[fieldName] && targetBelt.punches.length > 0) {
      return checkInArray(punchMappings, targetBelt.punches);
    }

    // Check kicks
    if (kickMappings[fieldName] && targetBelt.kicks.length > 0) {
      return checkInArray(kickMappings, targetBelt.kicks);
    }

    // Check one steps (check both selfDefense and oneSteps arrays)
    if (oneStepsMappings[fieldName]) {
      const hasInSelfDefense =
        targetBelt.selfDefense.length > 0 && checkInArray(oneStepsMappings, targetBelt.selfDefense);
      const hasInOneSteps =
        targetBelt.oneSteps.length > 0 && checkInArray(oneStepsMappings, targetBelt.oneSteps);
      return hasInSelfDefense || hasInOneSteps;
    }

    return false;
  };

  return (
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
              <IconClipboardData size={20} />
              <Box sx={{ ml: 1 }}>Current Assessment</Box>
            </Typography>
            {!currentAssessment && (
              <Button
                variant='contained'
                size='small'
                startIcon={<IconPlus />}
                onClick={handleCreateAssessment}
                disabled={savingAssessment}
              >
                Start New Assessment
              </Button>
            )}
          </Box>
          <Divider sx={{ mb: 2 }} />

          {assessmentError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              Failed to load assessment data
            </Alert>
          )}

          {assessmentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : currentAssessment ? (
            <Box>
              {/* Assessment Status */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Assessment Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Assessment Date
                      </Typography>
                      <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                        {new Date(currentAssessment.assessment_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Target Belt
                      </Typography>
                      {currentAssessment.target_belt_rank ? (
                        <Chip
                          label={currentAssessment.target_belt_rank}
                          size='small'
                          sx={{
                            backgroundColor: getBeltColor(
                              currentAssessment.target_belt_rank,
                              beltRequirements || []
                            ),
                            color: getBeltTextColor(
                              currentAssessment.target_belt_rank,
                              beltRequirements || []
                            ),
                            fontWeight: 'bold',
                            mt: 0.5,
                          }}
                        />
                      ) : (
                        <Typography variant='body1' color='text.secondary'>
                          Not specified
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Status
                      </Typography>
                      <Chip
                        label={currentAssessment.assessment_status?.replace('_', ' ') || 'Unknown'}
                        color={
                          currentAssessment.assessment_status === 'completed'
                            ? 'success'
                            : currentAssessment.assessment_status === 'in_progress'
                              ? 'warning'
                              : currentAssessment.assessment_status === 'cancelled'
                                ? 'error'
                                : 'default'
                        }
                        size='small'
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        Overall Score
                      </Typography>
                      {currentAssessment.overall_score !== null &&
                      currentAssessment.overall_score !== undefined ? (
                        <Typography
                          variant='h6'
                          color={
                            currentAssessment.overall_score >= 70 ? 'success.main' : 'error.main'
                          }
                          sx={{ fontWeight: 'bold' }}
                        >
                          {currentAssessment.overall_score.toFixed(1)}%
                        </Typography>
                      ) : (
                        <Typography variant='body1' color='text.secondary'>
                          Not scored
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                {/* Result */}
                {currentAssessment.passed !== null && currentAssessment.passed !== undefined && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      Result
                    </Typography>
                    <Chip
                      label={currentAssessment.passed ? 'PASSED' : 'FAILED'}
                      color={currentAssessment.passed ? 'success' : 'error'}
                      variant='filled'
                      sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                    />
                  </Box>
                )}

                {/* Examiner Notes */}
                {currentAssessment.examiner_notes && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      Examiner Notes
                    </Typography>
                    <Typography variant='body1'>{currentAssessment.examiner_notes}</Typography>
                  </Box>
                )}
              </Box>

              {/* Assessment Actions */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant='outlined'
                  startIcon={<IconEdit />}
                  onClick={() => openEditDialog(currentAssessment)}
                  disabled={savingAssessment || currentAssessment.assessment_status === 'completed'}
                >
                  Edit Assessment
                </Button>

                {currentAssessment.assessment_status === 'in_progress' && (
                  <>
                    <Button
                      variant='contained'
                      color='success'
                      startIcon={<IconCheck />}
                      onClick={() => handleCompleteAssessment(true)}
                      disabled={savingAssessment}
                    >
                      Mark as Passed
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      startIcon={<IconX />}
                      onClick={() => handleCompleteAssessment(false)}
                      disabled={savingAssessment}
                    >
                      Mark as Failed
                    </Button>
                    <Button
                      variant='outlined'
                      color='warning'
                      startIcon={<IconX />}
                      onClick={handleCancelAssessment}
                      disabled={savingAssessment}
                    >
                      Cancel Assessment
                    </Button>
                  </>
                )}
              </Box>

              {/* Show detailed assessment categories when in progress */}

              {currentAssessment.assessment_status === 'in_progress' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                    Assessment Progress
                  </Typography>
                  <Alert severity='info' sx={{ mb: 2 }}>
                    Use the "Edit Assessment" button to input scores for different categories
                    (Forms, One Steps, Kicks, etc.)
                  </Alert>

                  {/* Quick scoring summary */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Forms Score
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.pyong_an_cho_dan || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          One Steps
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.traditional_1 || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Kicks
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.front_kick || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Stances
                        </Typography>
                        <Typography variant='h6'>
                          {currentAssessment.stance_front || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant='h6' color='text.secondary' sx={{ mb: 1 }}>
                No Active Assessment
              </Typography>
              <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                Start a new assessment to track this student's progress toward their next belt rank.
              </Typography>
              <Button
                variant='contained'
                size='large'
                startIcon={<IconPlus />}
                onClick={handleCreateAssessment}
                disabled={savingAssessment}
              >
                Start New Assessment
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Assessment Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog} maxWidth='md' fullWidth>
        <DialogTitle>
          <Typography variant='h5'>Edit Assessment</Typography>
        </DialogTitle>

        <Formik
          initialValues={getInitialValues(editingAssessment)}
          validationSchema={assessmentValidationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              if (!editingAssessment) return;

              // Prepare form data for submission
              const updateData = {
                ...values,
                assessment_date: new Date(values.assessment_date).toISOString(),
                // Convert null values to undefined to match the API interface
                geocho_hyung_il_bu: values.geocho_hyung_il_bu || undefined,
                geocho_hyung_il_bu_sahm_gup: values.geocho_hyung_il_bu_sahm_gup || undefined,
                geocho_hyung_yi_bu: values.geocho_hyung_yi_bu || undefined,
                geocho_hyung_yi_bu_sahm_gup: values.geocho_hyung_yi_bu_sahm_gup || undefined,
                geocho_hyung_sahm_bu: values.geocho_hyung_sahm_bu || undefined,
                pyong_an_cho_dan: values.pyong_an_cho_dan || undefined,
                pyong_an_yi_dan: values.pyong_an_yi_dan || undefined,
                pyong_an_sahm_dan: values.pyong_an_sahm_dan || undefined,
                pyong_an_sa_dan: values.pyong_an_sa_dan || undefined,
                pyong_an_oh_dan: values.pyong_an_oh_dan || undefined,
                bassai: values.bassai || undefined,
                traditional_1: values.traditional_1 || undefined,
                traditional_2: values.traditional_2 || undefined,
                traditional_3: values.traditional_3 || undefined,
                traditional_4: values.traditional_4 || undefined,
                made_up_1: values.made_up_1 || undefined,
                made_up_2: values.made_up_2 || undefined,
                made_up_3: values.made_up_3 || undefined,
                made_up_4: values.made_up_4 || undefined,
                three_steps_1: values.three_steps_1 || undefined,
                three_steps_2: values.three_steps_2 || undefined,
                three_steps_3: values.three_steps_3 || undefined,
                three_steps_4: values.three_steps_4 || undefined,
                front_kick: values.front_kick || undefined,
                side_kick: values.side_kick || undefined,
                roundhouse_kick: values.roundhouse_kick || undefined,
                back_kick: values.back_kick || undefined,
                hook_kick: values.hook_kick || undefined,
                upper_cut: values.upper_cut || undefined,
                hook_punch: values.hook_punch || undefined,
                spin_bottom_fist: values.spin_bottom_fist || undefined,
                charging_punch: values.charging_punch || undefined,
                slide_up_jab_punch: values.slide_up_jab_punch || undefined,
                chop_low: values.chop_low || undefined,
                chop_high: values.chop_high || undefined,
                spearhand: values.spearhand || undefined,
                stepping_kick: values.stepping_kick || undefined,
                slide_up_kick: values.slide_up_kick || undefined,
                spin_back_kick: values.spin_back_kick || undefined,
                inside_crescent_kick: values.inside_crescent_kick || undefined,
                outside_crescent_kick: values.outside_crescent_kick || undefined,
                spin_outside_crescent_kick: values.spin_outside_crescent_kick || undefined,
                jump_spin_outside_crescent: values.jump_spin_outside_crescent || undefined,
                spin_heel_kick: values.spin_heel_kick || undefined,
                studder_step_kick: values.studder_step_kick || undefined,
                butterfly_kick: values.butterfly_kick || undefined,
                stance_front: values.stance_front || undefined,
                stance_back: values.stance_back || undefined,
                stance_straddle: values.stance_straddle || undefined,
                stance_shifting: values.stance_shifting || undefined,
                low_block: values.low_block || undefined,
                knife_hand_block: values.knife_hand_block || undefined,
                high_block: values.high_block || undefined,
                inside_block: values.inside_block || undefined,
                outside_block: values.outside_block || undefined,
                block_punch: values.block_punch || undefined,
                double_block: values.double_block || undefined,
                double_block_punch: values.double_block_punch || undefined,
                center_punch: values.center_punch || undefined,
                reverse_punch: values.reverse_punch || undefined,
                jab: values.jab || undefined,
                overall_score: values.overall_score || undefined,
              };

              // Update the assessment
              await studentAssessmentsService.updateAssessment(
                editingAssessment.assessment_id,
                updateData
              );

              // Call the onUpdate callback if provided
              if (onAssessmentUpdate && editingAssessment) {
                const updatedAssessment: StudentAssessment = {
                  ...editingAssessment,
                  ...updateData,
                  // Convert back to the expected types
                  geocho_hyung_il_bu: updateData.geocho_hyung_il_bu || undefined,
                  geocho_hyung_il_bu_sahm_gup: updateData.geocho_hyung_il_bu_sahm_gup || undefined,
                  geocho_hyung_yi_bu: updateData.geocho_hyung_yi_bu || undefined,
                  geocho_hyung_yi_bu_sahm_gup: updateData.geocho_hyung_yi_bu_sahm_gup || undefined,
                  geocho_hyung_sahm_bu: updateData.geocho_hyung_sahm_bu || undefined,
                  pyong_an_cho_dan: updateData.pyong_an_cho_dan || undefined,
                  pyong_an_yi_dan: updateData.pyong_an_yi_dan || undefined,
                  pyong_an_sahm_dan: updateData.pyong_an_sahm_dan || undefined,
                  pyong_an_sa_dan: updateData.pyong_an_sa_dan || undefined,
                  pyong_an_oh_dan: updateData.pyong_an_oh_dan || undefined,
                  bassai: updateData.bassai || undefined,
                  traditional_1: updateData.traditional_1 || undefined,
                  traditional_2: updateData.traditional_2 || undefined,
                  traditional_3: updateData.traditional_3 || undefined,
                  traditional_4: updateData.traditional_4 || undefined,
                  made_up_1: updateData.made_up_1 || undefined,
                  made_up_2: updateData.made_up_2 || undefined,
                  made_up_3: updateData.made_up_3 || undefined,
                  made_up_4: updateData.made_up_4 || undefined,
                  three_steps_1: updateData.three_steps_1 || undefined,
                  three_steps_2: updateData.three_steps_2 || undefined,
                  three_steps_3: updateData.three_steps_3 || undefined,
                  three_steps_4: updateData.three_steps_4 || undefined,
                  front_kick: updateData.front_kick || undefined,
                  side_kick: updateData.side_kick || undefined,
                  roundhouse_kick: updateData.roundhouse_kick || undefined,
                  back_kick: updateData.back_kick || undefined,
                  hook_kick: updateData.hook_kick || undefined,
                  upper_cut: updateData.upper_cut || undefined,
                  hook_punch: updateData.hook_punch || undefined,
                  spin_bottom_fist: updateData.spin_bottom_fist || undefined,
                  charging_punch: updateData.charging_punch || undefined,
                  slide_up_jab_punch: updateData.slide_up_jab_punch || undefined,
                  chop_low: updateData.chop_low || undefined,
                  chop_high: updateData.chop_high || undefined,
                  spearhand: updateData.spearhand || undefined,
                  stepping_kick: updateData.stepping_kick || undefined,
                  slide_up_kick: updateData.slide_up_kick || undefined,
                  spin_back_kick: updateData.spin_back_kick || undefined,
                  inside_crescent_kick: updateData.inside_crescent_kick || undefined,
                  outside_crescent_kick: updateData.outside_crescent_kick || undefined,
                  spin_outside_crescent_kick: updateData.spin_outside_crescent_kick || undefined,
                  jump_spin_outside_crescent: updateData.jump_spin_outside_crescent || undefined,
                  spin_heel_kick: updateData.spin_heel_kick || undefined,
                  studder_step_kick: updateData.studder_step_kick || undefined,
                  butterfly_kick: updateData.butterfly_kick || undefined,
                  stance_front: updateData.stance_front || undefined,
                  stance_back: updateData.stance_back || undefined,
                  stance_straddle: updateData.stance_straddle || undefined,
                  stance_shifting: updateData.stance_shifting || undefined,
                  low_block: updateData.low_block || undefined,
                  knife_hand_block: updateData.knife_hand_block || undefined,
                  high_block: updateData.high_block || undefined,
                  inside_block: updateData.inside_block || undefined,
                  outside_block: updateData.outside_block || undefined,
                  block_punch: updateData.block_punch || undefined,
                  double_block: updateData.double_block || undefined,
                  double_block_punch: updateData.double_block_punch || undefined,
                  center_punch: updateData.center_punch || undefined,
                  reverse_punch: updateData.reverse_punch || undefined,
                  jab: updateData.jab || undefined,
                  overall_score: updateData.overall_score || undefined,
                };
                await onAssessmentUpdate(updatedAssessment);
              }

              setStatus({ success: true });
              closeEditDialog();
            } catch (error) {
              console.error('Error updating assessment:', error);
              setStatus({ error: 'Failed to update assessment. Please try again.' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            status,
            setFieldValue,
          }) => {
            // Get target belt requirements for filtering fields
            const targetBelt = getTargetBeltRequirements(values.target_belt_rank);

            return (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  {status?.error && (
                    <Alert severity='error' sx={{ mb: 2 }}>
                      {status.error}
                    </Alert>
                  )}

                  <Grid container spacing={3}>
                    {/* Basic Assessment Info */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary'>
                        Assessment Information
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Assessment Date'
                        name='assessment_date'
                        type='date'
                        value={values.assessment_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.assessment_date && Boolean(errors.assessment_date)}
                        helperText={touched.assessment_date && errors.assessment_date}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl
                        fullWidth
                        error={touched.target_belt_rank && Boolean(errors.target_belt_rank)}
                      >
                        <InputLabel>Target Belt Rank</InputLabel>
                        <Select
                          name='target_belt_rank'
                          value={values.target_belt_rank}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label='Target Belt Rank'
                        >
                          {beltRequirements
                            .sort((a, b) => a.beltOrder - b.beltOrder)
                            .map((belt) => (
                              <MenuItem key={belt.beltRank} value={belt.beltRank}>
                                {belt.beltRank} Belt
                              </MenuItem>
                            ))}
                        </Select>
                        {touched.target_belt_rank && errors.target_belt_rank && (
                          <Typography variant='caption' color='error' sx={{ mt: 0.5, ml: 2 }}>
                            {errors.target_belt_rank}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Show belt requirements summary */}
                    {targetBelt && (
                      <Grid size={12}>
                        <Alert severity='info' sx={{ mt: 2 }}>
                          <Typography variant='subtitle2' sx={{ mb: 1 }}>
                            Requirements for {targetBelt.beltRank} Belt:
                          </Typography>
                          <Typography variant='body2'>
                            Forms: {targetBelt.forms.join(', ') || 'None'} • Stances:{' '}
                            {targetBelt.stances.join(', ') || 'None'} • Blocks:{' '}
                            {targetBelt.blocks.join(', ') || 'None'} • Punches:{' '}
                            {targetBelt.punches.join(', ') || 'None'} • Kicks:{' '}
                            {targetBelt.kicks.join(', ') || 'None'} • One Steps:{' '}
                            {[...targetBelt.selfDefense, ...targetBelt.oneSteps].join(', ') ||
                              'None'}
                          </Typography>
                        </Alert>
                      </Grid>
                    )}

                    {/* Forms Section - Show all forms */}
                    <>
                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          Forms (Hyungs) - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'geocho_hyung_il_bu', label: 'Geocho Hyung Il Bu' },
                        {
                          name: 'geocho_hyung_il_bu_sahm_gup',
                          label: 'Geocho Hyung Il Bu (Sahm Gup)',
                        },
                        { name: 'geocho_hyung_yi_bu', label: 'Geocho Hyung Yi Bu' },
                        {
                          name: 'geocho_hyung_yi_bu_sahm_gup',
                          label: 'Geocho Hyung Yi Bu (Sahm Gup)',
                        },
                        { name: 'geocho_hyung_sahm_bu', label: 'Geocho Hyung Sahm Bu' },
                        { name: 'pyong_an_cho_dan', label: 'Pyong An Cho Dan' },
                        { name: 'pyong_an_yi_dan', label: 'Pyong An Yi Dan' },
                        { name: 'pyong_an_sahm_dan', label: 'Pyong An Sahm Dan' },
                        { name: 'pyong_an_sa_dan', label: 'Pyong An Sa Dan' },
                        { name: 'pyong_an_oh_dan', label: 'Pyong An Oh Dan' },
                        { name: 'bassai', label: 'Bassai' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}
                    </>

                    {/* One Steps Section - Show all one steps fields */}
                    <>
                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          One Steps - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'traditional_1', label: 'Traditional 1' },
                        { name: 'traditional_2', label: 'Traditional 2' },
                        { name: 'traditional_3', label: 'Traditional 3' },
                        { name: 'traditional_4', label: 'Traditional 4' },
                        { name: 'made_up_1', label: 'Made Up 1' },
                        { name: 'made_up_2', label: 'Made Up 2' },
                        { name: 'made_up_3', label: 'Made Up 3' },
                        { name: 'made_up_4', label: 'Made Up 4' },
                        { name: 'three_steps_1', label: 'Three Steps 1' },
                        { name: 'three_steps_2', label: 'Three Steps 2' },
                        { name: 'three_steps_3', label: 'Three Steps 3' },
                        { name: 'three_steps_4', label: 'Three Steps 4' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}
                    </>

                    {/* Techniques Section - Show all available techniques */}
                    <>
                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          Kicks - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'front_kick', label: 'Front Kick' },
                        { name: 'side_kick', label: 'Side Kick' },
                        { name: 'roundhouse_kick', label: 'Roundhouse Kick' },
                        { name: 'back_kick', label: 'Back Kick' },
                        { name: 'hook_kick', label: 'Hook Kick' },
                        { name: 'upper_cut', label: 'Upper Cut' },
                        { name: 'stepping_kick', label: 'Stepping Kick' },
                        { name: 'slide_up_kick', label: 'Slide Up Kick' },
                        { name: 'spin_back_kick', label: 'Spin Back Kick' },
                        { name: 'inside_crescent_kick', label: 'Inside Crescent Kick' },
                        { name: 'outside_crescent_kick', label: 'Outside Crescent Kick' },
                        { name: 'spin_outside_crescent_kick', label: 'Spin Outside Crescent Kick' },
                        { name: 'jump_spin_outside_crescent', label: 'Jump Spin Outside Crescent' },
                        { name: 'spin_heel_kick', label: 'Spin Heel Kick' },
                        { name: 'studder_step_kick', label: 'Studder Step Kick' },
                        { name: 'butterfly_kick', label: 'Butterfly Kick' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}

                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          Stances - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'stance_front', label: 'Front Stance' },
                        { name: 'stance_back', label: 'Back Stance' },
                        { name: 'stance_straddle', label: 'Straddle Stance' },
                        { name: 'stance_shifting', label: 'Shifting Stance' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}

                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          Blocks - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'low_block', label: 'Low Block' },
                        { name: 'knife_hand_block', label: 'Knife Hand Block' },
                        { name: 'high_block', label: 'High Block' },
                        { name: 'inside_block', label: 'Inside Block' },
                        { name: 'outside_block', label: 'Outside Block' },
                        { name: 'block_punch', label: 'Block Punch' },
                        { name: 'double_block', label: 'Double Block' },
                        { name: 'double_block_punch', label: 'Double Block Punch' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}

                      <Grid size={12}>
                        <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                          Punches - Score 0-10
                        </Typography>
                      </Grid>

                      {[
                        { name: 'center_punch', label: 'Center Punch' },
                        { name: 'reverse_punch', label: 'Reverse Punch' },
                        { name: 'jab', label: 'Jab' },
                        { name: 'hook_punch', label: 'Hook Punch' },
                        { name: 'spin_bottom_fist', label: 'Spin Bottom Fist' },
                        { name: 'charging_punch', label: 'Charging Punch' },
                        { name: 'slide_up_jab_punch', label: 'Slide Up Jab Punch' },
                        { name: 'chop_low', label: 'Chop Low' },
                        { name: 'chop_high', label: 'Chop High' },
                        { name: 'spearhand', label: 'Spearhand' },
                        { name: 'block_punch_combo', label: 'Block Punch Combo' },
                        { name: 'double_block_punch_combo', label: 'Double Block Punch Combo' },
                      ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type='number'
                            value={values[field.name as keyof typeof values] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched[field.name as keyof typeof touched] &&
                              Boolean(errors[field.name as keyof typeof errors])
                            }
                            helperText={
                              touched[field.name as keyof typeof touched] &&
                              errors[field.name as keyof typeof errors]
                            }
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                          />
                        </Grid>
                      ))}
                    </>

                    {/* Overall Assessment */}
                    <Grid size={12}>
                      <Typography variant='h6' gutterBottom color='primary' sx={{ mt: 2 }}>
                        Overall Assessment
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Overall Score (0-100%)'
                        name='overall_score'
                        type='number'
                        value={values.overall_score || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.overall_score && Boolean(errors.overall_score)}
                        helperText={touched.overall_score && errors.overall_score}
                        inputProps={{ min: 0, max: 100, step: 0.1 }}
                      />
                    </Grid>

                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label='Examiner Notes'
                        name='examiner_notes'
                        multiline
                        rows={3}
                        value={values.examiner_notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.examiner_notes && Boolean(errors.examiner_notes)}
                        helperText={touched.examiner_notes && errors.examiner_notes}
                        placeholder='Additional notes about the assessment...'
                      />
                    </Grid>
                  </Grid>
                </DialogContent>

                <DialogActions>
                  <Button onClick={closeEditDialog} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Assessment'}
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
    </Grid>
  );
};

export default StudentAssessmentForm;
