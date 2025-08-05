-- Migration 018: Student Assessment Tables
-- Create tables for current assessments and historical test data based on TNK Testing Application form
-- Table for current student assessments (ongoing evaluation)
DROP TABLE IF EXISTS student_assessments;

CREATE TABLE IF NOT EXISTS student_assessments (
  assessment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  instructor_id INT,
  assessment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  target_belt_rank VARCHAR(50),
  -- Header Information (from form)
  certificate_name VARCHAR(255),
  belt_size VARCHAR(10),
  -- Forms (Hyungs) - Score out of 10 for each
  geocho_hyung_il_bu DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_il_bu_sahm_gup DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_yi_bu DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_yi_bu_sahm_gup DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_sahm_bu DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_cho_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_yi_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_sahm_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_sa_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_oh_dan DECIMAL(3, 1) DEFAULT NULL,
  bassai DECIMAL(3, 1) DEFAULT NULL,
  -- Self Defense sections
  traditional_1 DECIMAL(3, 1) DEFAULT NULL,
  traditional_2 DECIMAL(3, 1) DEFAULT NULL,
  traditional_3 DECIMAL(3, 1) DEFAULT NULL,
  traditional_4 DECIMAL(3, 1) DEFAULT NULL,
  made_up_1 DECIMAL(3, 1) DEFAULT NULL,
  made_up_2 DECIMAL(3, 1) DEFAULT NULL,
  made_up_3 DECIMAL(3, 1) DEFAULT NULL,
  made_up_4 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_1 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_2 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_3 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_4 DECIMAL(3, 1) DEFAULT NULL,
  -- Jump Kicks
  jump_kick_front DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_round DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_side DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_back DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_f_side DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_crescent DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_heel DECIMAL(3, 1) DEFAULT NULL,
  -- Combinations
  combination_fighting DECIMAL(3, 1) DEFAULT NULL,
  combination_hands DECIMAL(3, 1) DEFAULT NULL,
  combination_basic DECIMAL(3, 1) DEFAULT NULL,
  -- Stances
  stance_front DECIMAL(3, 1) DEFAULT NULL,
  stance_back DECIMAL(3, 1) DEFAULT NULL,
  stance_straddle DECIMAL(3, 1) DEFAULT NULL,
  stance_shifting DECIMAL(3, 1) DEFAULT NULL,
  -- Falling
  falling_back DECIMAL(3, 1) DEFAULT NULL,
  falling_front DECIMAL(3, 1) DEFAULT NULL,
  falling_roll DECIMAL(3, 1) DEFAULT NULL,
  falling_breaking DECIMAL(3, 1) DEFAULT NULL,
  -- Blocks
  high_block DECIMAL(3, 1) DEFAULT NULL,
  middle_block DECIMAL(3, 1) DEFAULT NULL,
  low_block DECIMAL(3, 1) DEFAULT NULL,
  knife_hand_block DECIMAL(3, 1) DEFAULT NULL,
  double_block DECIMAL(3, 1) DEFAULT NULL,
  -- Punches
  high_punch DECIMAL(3, 1) DEFAULT NULL,
  middle_punch DECIMAL(3, 1) DEFAULT NULL,
  low_punch DECIMAL(3, 1) DEFAULT NULL,
  reverse_punch DECIMAL(3, 1) DEFAULT NULL,
  jab DECIMAL(3, 1) DEFAULT NULL,
  -- Kicks
  front_kick DECIMAL(3, 1) DEFAULT NULL,
  side_kick DECIMAL(3, 1) DEFAULT NULL,
  roundhouse_kick DECIMAL(3, 1) DEFAULT NULL,
  back_kick DECIMAL(3, 1) DEFAULT NULL,
  hook_kick DECIMAL(3, 1) DEFAULT NULL,
  -- Advanced/Specialized Techniques
  upper_cut DECIMAL(3, 1) DEFAULT NULL,
  hook_punch DECIMAL(3, 1) DEFAULT NULL,
  spin_bottom_fist DECIMAL(3, 1) DEFAULT NULL,
  charging_punch DECIMAL(3, 1) DEFAULT NULL,
  slide_up_jab_punch DECIMAL(3, 1) DEFAULT NULL,
  chop_low DECIMAL(3, 1) DEFAULT NULL,
  chop_high DECIMAL(3, 1) DEFAULT NULL,
  spearhand DECIMAL(3, 1) DEFAULT NULL,
  block_punch_combo DECIMAL(3, 1) DEFAULT NULL,
  double_block_punch_combo DECIMAL(3, 1) DEFAULT NULL,
  stepping_kick DECIMAL(3, 1) DEFAULT NULL,
  slide_up_kick DECIMAL(3, 1) DEFAULT NULL,
  spin_back_kick DECIMAL(3, 1) DEFAULT NULL,
  inside_crescent_kick DECIMAL(3, 1) DEFAULT NULL,
  outside_crescent_kick DECIMAL(3, 1) DEFAULT NULL,
  spin_outside_crescent_kick DECIMAL(3, 1) DEFAULT NULL,
  jump_spin_outside_crescent DECIMAL(3, 1) DEFAULT NULL,
  spin_heel_kick DECIMAL(3, 1) DEFAULT NULL,
  studder_step_kick DECIMAL(3, 1) DEFAULT NULL,
  butterfly_kick DECIMAL(3, 1) DEFAULT NULL,
  -- Overall Assessment
  overall_score DECIMAL(5, 2) DEFAULT NULL,
  passed BOOLEAN DEFAULT NULL,
  examiner_notes TEXT,
  -- Status and metadata
  assessment_status ENUM('in_progress', 'completed', 'cancelled') DEFAULT 'in_progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Foreign key constraints
  FOREIGN KEY (student_id) REFERENCES students(studentid) ON DELETE CASCADE,
  -- Indexes for performance
  INDEX idx_student_assessments_student_id (student_id),
  INDEX idx_student_assessments_date (assessment_date),
  INDEX idx_student_assessments_status (assessment_status)
);

-- Table for historical test data (completed tests)
DROP TABLE IF EXISTS student_test_history;

CREATE TABLE IF NOT EXISTS student_test_history (
  test_history_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  instructor_id INT,
  test_date DATETIME NOT NULL,
  belt_from VARCHAR(50) NOT NULL,
  belt_to VARCHAR(50) NOT NULL,
  -- Header Information (from form)
  certificate_name VARCHAR(255),
  belt_size VARCHAR(10),
  -- Forms (Hyungs) - Final scores
  geocho_hyung_il_bu DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_il_bu_sahm_gup DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_yi_bu DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_yi_bu_sahm_gup DECIMAL(3, 1) DEFAULT NULL,
  geocho_hyung_sahm_bu DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_cho_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_yi_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_sahm_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_sa_dan DECIMAL(3, 1) DEFAULT NULL,
  pyong_an_oh_dan DECIMAL(3, 1) DEFAULT NULL,
  bassai DECIMAL(3, 1) DEFAULT NULL,
  -- Self Defense sections
  traditional_1 DECIMAL(3, 1) DEFAULT NULL,
  traditional_2 DECIMAL(3, 1) DEFAULT NULL,
  traditional_3 DECIMAL(3, 1) DEFAULT NULL,
  traditional_4 DECIMAL(3, 1) DEFAULT NULL,
  made_up_1 DECIMAL(3, 1) DEFAULT NULL,
  made_up_2 DECIMAL(3, 1) DEFAULT NULL,
  made_up_3 DECIMAL(3, 1) DEFAULT NULL,
  made_up_4 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_1 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_2 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_3 DECIMAL(3, 1) DEFAULT NULL,
  three_steps_4 DECIMAL(3, 1) DEFAULT NULL,
  -- Jump Kicks
  jump_kick_front DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_round DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_side DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_back DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_f_side DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_crescent DECIMAL(3, 1) DEFAULT NULL,
  jump_kick_heel DECIMAL(3, 1) DEFAULT NULL,
  -- Combinations
  combination_fighting DECIMAL(3, 1) DEFAULT NULL,
  combination_hands DECIMAL(3, 1) DEFAULT NULL,
  combination_basic DECIMAL(3, 1) DEFAULT NULL,
  -- Stances
  stance_front DECIMAL(3, 1) DEFAULT NULL,
  stance_back DECIMAL(3, 1) DEFAULT NULL,
  stance_straddle DECIMAL(3, 1) DEFAULT NULL,
  stance_shifting DECIMAL(3, 1) DEFAULT NULL,
  -- Falling
  falling_back DECIMAL(3, 1) DEFAULT NULL,
  falling_front DECIMAL(3, 1) DEFAULT NULL,
  falling_roll DECIMAL(3, 1) DEFAULT NULL,
  falling_breaking DECIMAL(3, 1) DEFAULT NULL,
  -- Final Results
  overall_score DECIMAL(5, 2) NOT NULL,
  passed BOOLEAN NOT NULL,
  examiner_name VARCHAR(255),
  examiner_notes TEXT,
  new_rank VARCHAR(50),
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Foreign key constraints
  FOREIGN KEY (student_id) REFERENCES students(studentid) ON DELETE CASCADE,
  -- Indexes for performance
  INDEX idx_test_history_student_id (student_id),
  INDEX idx_test_history_date (test_date),
  INDEX idx_test_history_belt_from (belt_from),
  INDEX idx_test_history_belt_to (belt_to),
  INDEX idx_test_history_passed (passed)
);

-- Note: Trigger removed due to MySQL syntax complexities
-- Instead, application logic will handle moving completed assessments to history
-- and updating student belt ranks when assessments are completed.
-- Uncomment and modify the following trigger if needed in the future:
/*
 DELIMITER $$
 
 CREATE TRIGGER after_assessment_completed
 AFTER UPDATE ON student_assessments
 FOR EACH ROW
 BEGIN
 IF NEW.assessment_status = 'completed'
 AND NEW.passed IS NOT NULL
 AND OLD.passed IS NULL THEN
 
 INSERT INTO student_test_history (
 student_id, instructor_id, test_date, belt_from, belt_to,
 certificate_name, belt_size,
 geocho_hyung_il_bu, geocho_hyung_il_bu_sahm_gup, geocho_hyung_yi_bu,
 geocho_hyung_yi_bu_sahm_gup, geocho_hyung_sahm_bu, pyong_an_cho_dan,
 pyong_an_yi_dan, pyong_an_sahm_dan, pyong_an_sa_dan, pyong_an_oh_dan,
 bassai, traditional_1, traditional_2, traditional_3, traditional_4,
 made_up_1, made_up_2, made_up_3, made_up_4, three_steps_1, three_steps_2,
 three_steps_3, three_steps_4, jump_kick_front, jump_kick_round,
 jump_kick_side, jump_kick_back, jump_kick_f_side, jump_kick_crescent,
 jump_kick_heel, combination_fighting, combination_hands, combination_basic,
 stance_front, stance_back, stance_straddle, stance_shifting,
 falling_back, falling_front, falling_roll, falling_breaking,
 overall_score, passed, examiner_notes, new_rank
 ) VALUES (
 NEW.student_id, NEW.instructor_id, NEW.assessment_date,
 (SELECT beltRank FROM students WHERE studentid = NEW.student_id),
 NEW.target_belt_rank, NEW.certificate_name, NEW.belt_size,
 NEW.geocho_hyung_il_bu, NEW.geocho_hyung_il_bu_sahm_gup, NEW.geocho_hyung_yi_bu,
 NEW.geocho_hyung_yi_bu_sahm_gup, NEW.geocho_hyung_sahm_bu, NEW.pyong_an_cho_dan,
 NEW.pyong_an_yi_dan, NEW.pyong_an_sahm_dan, NEW.pyong_an_sa_dan, NEW.pyong_an_oh_dan,
 NEW.bassai, NEW.traditional_1, NEW.traditional_2, NEW.traditional_3, NEW.traditional_4,
 NEW.made_up_1, NEW.made_up_2, NEW.made_up_3, NEW.made_up_4, NEW.three_steps_1, NEW.three_steps_2,
 NEW.three_steps_3, NEW.three_steps_4, NEW.jump_kick_front, NEW.jump_kick_round,
 NEW.jump_kick_side, NEW.jump_kick_back, NEW.jump_kick_f_side, NEW.jump_kick_crescent,
 NEW.jump_kick_heel, NEW.combination_fighting, NEW.combination_hands, NEW.combination_basic,
 NEW.stance_front, NEW.stance_back, NEW.stance_straddle, NEW.stance_shifting,
 NEW.falling_back, NEW.falling_front, NEW.falling_roll, NEW.falling_breaking,
 NEW.overall_score, NEW.passed, NEW.examiner_notes,
 CASE WHEN NEW.passed = 1 THEN NEW.target_belt_rank ELSE NULL END
 );
 
 IF NEW.passed = 1 THEN
 UPDATE students
 SET beltRank = NEW.target_belt_rank, lastTestUTC = NEW.assessment_date
 WHERE studentid = NEW.student_id;
 END IF;
 
 END IF;
 END$$
 
 DELIMITER ;
 */
-- Create a view for easy assessment overview
CREATE
OR REPLACE VIEW assessment_overview AS
SELECT
  sa.assessment_id,
  sa.student_id,
  CONCAT(s.firstName, ' ', s.lastName) as student_name,
  s.beltRank as current_belt,
  sa.target_belt_rank,
  sa.assessment_date,
  sa.overall_score,
  sa.passed,
  sa.assessment_status,
  sa.examiner_notes,
  -- Calculate completion percentage
  ROUND(
    (
      (COALESCE(sa.geocho_hyung_il_bu, 0) > 0) + (COALESCE(sa.geocho_hyung_il_bu_sahm_gup, 0) > 0) + (COALESCE(sa.geocho_hyung_yi_bu, 0) > 0) + (COALESCE(sa.geocho_hyung_yi_bu_sahm_gup, 0) > 0) + (COALESCE(sa.geocho_hyung_sahm_bu, 0) > 0) + (COALESCE(sa.pyong_an_cho_dan, 0) > 0) + (COALESCE(sa.pyong_an_yi_dan, 0) > 0) + (COALESCE(sa.pyong_an_sahm_dan, 0) > 0) + (COALESCE(sa.pyong_an_sa_dan, 0) > 0) + (COALESCE(sa.pyong_an_oh_dan, 0) > 0) + (COALESCE(sa.bassai, 0) > 0)
    ) * 100.0 / 11,
    1
  ) as forms_completion_pct,
  -- Calculate average form score
  ROUND(
    (
      COALESCE(sa.geocho_hyung_il_bu, 0) + COALESCE(sa.geocho_hyung_il_bu_sahm_gup, 0) + COALESCE(sa.geocho_hyung_yi_bu, 0) + COALESCE(sa.geocho_hyung_yi_bu_sahm_gup, 0) + COALESCE(sa.geocho_hyung_sahm_bu, 0) + COALESCE(sa.pyong_an_cho_dan, 0) + COALESCE(sa.pyong_an_yi_dan, 0) + COALESCE(sa.pyong_an_sahm_dan, 0) + COALESCE(sa.pyong_an_sa_dan, 0) + COALESCE(sa.pyong_an_oh_dan, 0) + COALESCE(sa.bassai, 0)
    ) / GREATEST(
      1,
      (COALESCE(sa.geocho_hyung_il_bu, 0) > 0) + (COALESCE(sa.geocho_hyung_il_bu_sahm_gup, 0) > 0) + (COALESCE(sa.geocho_hyung_yi_bu, 0) > 0) + (COALESCE(sa.geocho_hyung_yi_bu_sahm_gup, 0) > 0) + (COALESCE(sa.geocho_hyung_sahm_bu, 0) > 0) + (COALESCE(sa.pyong_an_cho_dan, 0) > 0) + (COALESCE(sa.pyong_an_yi_dan, 0) > 0) + (COALESCE(sa.pyong_an_sahm_dan, 0) > 0) + (COALESCE(sa.pyong_an_sa_dan, 0) > 0) + (COALESCE(sa.pyong_an_oh_dan, 0) > 0) + (COALESCE(sa.bassai, 0) > 0)
    ),
    1
  ) as avg_forms_score
FROM
  student_assessments sa
  JOIN students s ON sa.student_id = s.studentid
ORDER BY
  sa.assessment_date DESC;

-- Comments for documentation
-- This migration creates two main tables:
-- 1. student_assessments: For ongoing assessments and grading (current work)
-- 2. student_test_history: For completed tests that become historical records
--
-- The trigger automatically moves completed assessments to history and updates student records
-- The view provides an easy way to see assessment progress and completion rates
--
-- Scoring system: Each technique/form is scored out of 10.0 points
-- Overall score is calculated as a percentage based on applicable techniques for the belt level