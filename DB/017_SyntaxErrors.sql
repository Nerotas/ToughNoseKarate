-- Create trigger to automatically calculate age from date of birth
DELIMITER $ $ CREATE TRIGGER update_age_from_dob BEFORE
UPDATE
  ON students FOR EACH ROW BEGIN IF NEW.date_of_birth IS NOT NULL
  AND NEW.date_of_birth != OLD.date_of_birth THEN
SET
  NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());

END IF;

END $ $ DELIMITER;

-- Create trigger for insert too
DELIMITER $ $ CREATE TRIGGER set_age_from_dob_insert BEFORE
INSERT
  ON students FOR EACH ROW BEGIN IF NEW.date_of_birth IS NOT NULL THEN
SET
  NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());

END IF;

END $ $ DELIMITER;

-- =============================================================================
-- SECTION 6: SAFETY AND EMERGENCY VIEWS
-- =============================================================================
-- Create view for quick emergency contact lookup
CREATE
OR REPLACE VIEW student_emergency_contacts AS
SELECT
  s.studentid,
  s.firstName,
  s.lastName,
  s.preferedName,
  s.age,
  s.beltRank,
  s.emergency_contact_name,
  s.emergency_contact_phone,
  s.emergency_contact_relationship,
  s.medical_conditions,
  s.allergies,
  s.medications,
  p.firstName as parent_firstName,
  p.lastName as parent_lastName,
  p.email as parent_email,
  p.phone as parent_phone,
  p.relationship as parent_relationship,
  p.is_emergency_contact,
  p.can_pickup
FROM
  students s
  LEFT JOIN parent_mapping pm ON s.studentid = pm.studentid
  LEFT JOIN parents p ON pm.parentid = p.parentid
WHERE
  s.child = 1
  OR s.emergency_contact_name IS NOT NULL;

-- Create view for students with medical alerts
CREATE
OR REPLACE VIEW student_medical_alerts AS
SELECT
  studentid,
  firstName,
  lastName,
  preferedName,
  age,
  beltRank,
  medical_conditions,
  allergies,
  medications,
  emergency_contact_name,
  emergency_contact_phone,
  emergency_contact_relationship
FROM
  students
WHERE
  medical_conditions IS NOT NULL
  OR allergies IS NOT NULL
  OR medications IS NOT NULL;

-- =============================================================================
-- SECTION 7: DATA MIGRATION
-- =============================================================================
-- Migrate existing student belt data to belt_progression (if not already done)
INSERT
  IGNORE INTO belt_progression (
    studentid,
    belt_rank,
    promoted_date,
    is_current,
    notes
  )
SELECT
  studentid,
  beltRank,
  COALESCE(
    STR_TO_DATE(lastTestUTC, '%Y-%m-%d'),
    STR_TO_DATE(startDateUTC, '%Y-%m-%d'),
    CURDATE()
  ) as promoted_date,
  1 as is_current,
  'Migrated from existing student data' as notes
FROM
  students
WHERE
  beltRank IS NOT NULL
  AND beltRank != ''
  AND studentid NOT IN (
    SELECT
      DISTINCT studentid
    FROM
      belt_progression
  );

-- =============================================================================
-- SECTION 8: STUDENT PROGRESS AGGREGATION MODEL
-- =============================================================================
-- Create a model for aggregated student progress (virtual table for API)
-- This will be handled in the backend service, but we'll create a view for reference
CREATE
OR REPLACE VIEW student_progress_summary AS
SELECT
  s.studentid,
  s.firstName,
  s.lastName,
  s.preferedName,
  s.beltRank,
  s.eligibleForTesting,
  s.lastTestUTC,
  -- Belt progression info
  bp.promoted_date as current_belt_date,
  bp.promoted_by as promoted_by,
  -- Test history counts
  (
    SELECT
      COUNT(*)
    FROM
      student_tests st
    WHERE
      st.studentid = s.studentid
  ) as total_tests,
  (
    SELECT
      COUNT(*)
    FROM
      student_tests st
    WHERE
      st.studentid = s.studentid
      AND st.passed = 1
  ) as passed_tests,
  (
    SELECT
      AVG(st.overall_score)
    FROM
      student_tests st
    WHERE
      st.studentid = s.studentid
      AND st.passed = 1
  ) as avg_test_score,
  -- Safety info
  s.waiver_signed,
  s.waiver_date,
  s.emergency_contact_name,
  s.medical_conditions,
  s.allergies,
  -- Last test info
  (
    SELECT
      st.test_date
    FROM
      student_tests st
    WHERE
      st.studentid = s.studentid
    ORDER BY
      st.test_date DESC
    LIMIT
      1
  ) as last_test_date,
  (
    SELECT
      st.overall_score
    FROM
      student_tests st
    WHERE
      st.studentid = s.studentid
    ORDER BY
      st.test_date DESC
    LIMIT
      1
  ) as last_test_score
FROM
  students s
  LEFT JOIN belt_progression bp ON s.studentid = bp.studentid
  AND bp.is_current = 1
WHERE
  s.active = 1;

-- =============================================================================
-- SECTION 9: FINALIZATION
-- =============================================================================
-- Update any existing data that needs normalization
UPDATE
  students
SET
  waiver_signed = 0
WHERE
  waiver_signed IS NULL;

UPDATE
  parents
SET
  is_primary_contact = 0,
  is_emergency_contact = 0,
  can_pickup = 0
WHERE
  is_primary_contact IS NULL
  OR is_emergency_contact IS NULL
  OR can_pickup IS NULL;

-- Add comments to enhanced tables
ALTER TABLE
  students COMMENT = 'Student records with comprehensive safety and contact information';

ALTER TABLE
  parents COMMENT = 'Parent/guardian records with relationship details and contact preferences';

-- =============================================================================
-- VERIFICATION QUERIES (commented out - uncomment to verify after migration)
-- =============================================================================
/*
 -- Verify new tables exist
 SHOW TABLES LIKE '%test%';
 SHOW TABLES LIKE '%progression%';
 
 -- Verify new columns exist
 DESCRIBE students;
 DESCRIBE parents;
 
 -- Verify views were created
 SHOW FULL TABLES WHERE Table_type = 'VIEW';
 
 -- Verify data migration worked
 SELECT COUNT(*) as student_count FROM students;
 SELECT COUNT(*) as progression_count FROM belt_progression;
 SELECT COUNT(*) as emergency_contacts FROM student_emergency_contacts;
 
 -- Check for students missing safety info
 SELECT
 studentid,
 firstName,
 lastName,
 waiver_signed,
 emergency_contact_name
 FROM students
 WHERE waiver_signed = 0 OR emergency_contact_name IS NULL;
 */
-- Migration completed successfully
SELECT
  'Migration 017_syntax_errors_fixed completed successfully' as status;