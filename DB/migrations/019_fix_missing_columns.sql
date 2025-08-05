-- Add missing columns to student_assessments table
-- This will sync the database with the Sequelize model

ALTER TABLE student_assessments 
ADD COLUMN upper_cut DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN hook_punch DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN spin_bottom_fist DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN charging_punch DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN slide_up_jab_punch DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN chop_low DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN chop_high DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN spearhand DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN block_punch_combo DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN double_block_punch_combo DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN stepping_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN slide_up_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN spin_back_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN inside_crescent_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN outside_crescent_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN spin_outside_crescent_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN jump_spin_outside_crescent DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN spin_heel_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN studder_step_kick DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN butterfly_kick DECIMAL(3,1) DEFAULT NULL;
