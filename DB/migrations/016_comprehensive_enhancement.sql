-- Migration: 016_comprehensive_enhancement.sql
-- Description: Comprehensive enhancement of Tang Soo Do database
-- Date: 2025-08-04
-- WARNING: This migration consolidates multiple enhancements. Test thoroughly before running in production.
-- =============================================================================
-- SECTION 1: STUDENT TESTS AND BELT PROGRESSION TABLES
-- =============================================================================
-- Create student_tests table for tracking all belt tests
CREATE TABLE IF NOT EXISTS student_tests (
  testid INT PRIMARY KEY AUTO_INCREMENT,
  studentid INT NOT NULL,
  test_date DATE NOT NULL,
  belt_from VARCHAR(45) NOT NULL,
  belt_to VARCHAR(45) NOT NULL,
  overall_score DECIMAL(5, 2),
  -- e.g., 85.50
  passed TINYINT(1) DEFAULT 0,
  instructor_name VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Indexes
  INDEX idx_studentid (studentid),
  INDEX idx_test_date (test_date),
  INDEX idx_belt_from (belt_from),
  INDEX idx_belt_to (belt_to),
  -- Foreign key
  FOREIGN KEY (studentid) REFERENCES students(studentid) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Records of all belt tests taken by students';

-- Create test_results table for detailed technique scoring
CREATE TABLE IF NOT EXISTS test_results (
  result_id INT PRIMARY KEY AUTO_INCREMENT,
  testid INT NOT NULL,
  category ENUM(
    'blocks',
    'kicks',
    'punches',
    'forms',
    'stances',
    'combinations',
    'falling',
    'one_steps'
  ) NOT NULL,
  technique_name VARCHAR(100) NOT NULL,
  score DECIMAL(5, 2),
  -- Individual technique score
  passed TINYINT(1) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Indexes
  INDEX idx_testid (testid),
  INDEX idx_category (category),
  INDEX idx_technique_name (technique_name),
  -- Foreign key
  FOREIGN KEY (testid) REFERENCES student_tests(testid) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Detailed scoring for individual techniques during tests';

-- Create belt_progression table for complete promotion history
CREATE TABLE IF NOT EXISTS belt_progression (
  progression_id INT PRIMARY KEY AUTO_INCREMENT,
  studentid INT NOT NULL,
  belt_rank VARCHAR(45) NOT NULL,
  promoted_date DATE NOT NULL,
  promoted_by VARCHAR(100),
  -- Instructor name
  testid INT,
  -- Link to the test that earned this promotion
  is_current TINYINT(1) DEFAULT 1,
  ceremony_date DATE,
  belt_certificate_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Indexes
  INDEX idx_studentid (studentid),
  INDEX idx_belt_rank (belt_rank),
  INDEX idx_promoted_date (promoted_date),
  INDEX idx_is_current (is_current),
  INDEX idx_testid (testid),
  -- Foreign keys
  FOREIGN KEY (studentid) REFERENCES students(studentid) ON DELETE CASCADE,
  FOREIGN KEY (testid) REFERENCES student_tests(testid) ON DELETE
  SET
    NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Complete history of belt promotions for each student';

-- =============================================================================
-- SECTION 2: BELT PROGRESSION TRIGGERS (SIMPLIFIED)
-- =============================================================================
-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS ensure_one_current_belt;

DROP TRIGGER IF EXISTS ensure_one_current_belt_update;

DROP TRIGGER IF EXISTS belt_progression_after_insert;

DROP TRIGGER IF EXISTS belt_progression_after_update;

-- Create AFTER INSERT trigger to ensure only one current belt per student
DELIMITER $ $ CREATE TRIGGER belt_progression_after_insert
AFTER
INSERT
  ON belt_progression FOR EACH ROW BEGIN -- If the new record is marked as current, unmark all others for this student
  IF NEW.is_current = 1 THEN
UPDATE
  belt_progression
SET
  is_current = 0
WHERE
  studentid = NEW.studentid
  AND progression_id != NEW.progression_id
  AND is_current = 1;

END IF;

END $ $ DELIMITER;

-- Create AFTER UPDATE trigger for updates too
DELIMITER $ $ CREATE TRIGGER belt_progression_after_update
AFTER
UPDATE
  ON belt_progression FOR EACH ROW BEGIN -- If this record was changed to current, unmark all others for this student
  IF NEW.is_current = 1
  AND OLD.is_current = 0 THEN
UPDATE
  belt_progression
SET
  is_current = 0
WHERE
  studentid = NEW.studentid
  AND progression_id != NEW.progression_id
  AND is_current = 1;

END IF;

END $ $ DELIMITER;

-- =============================================================================
-- SECTION 3: STUDENT TABLE ENHANCEMENTS (SAFETY & CONTACT INFO)
-- =============================================================================
-- Add critical safety and contact fields to students table
-- Check and add columns one by one to avoid syntax errors
-- Add date_of_birth column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'date_of_birth'
    ) = 0,
    'ALTER TABLE students ADD COLUMN date_of_birth DATE AFTER age',
    'SELECT "Column date_of_birth already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add emergency_contact_name column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'emergency_contact_name'
    ) = 0,
    'ALTER TABLE students ADD COLUMN emergency_contact_name VARCHAR(100) AFTER phone',
    'SELECT "Column emergency_contact_name already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add emergency_contact_phone column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'emergency_contact_phone'
    ) = 0,
    'ALTER TABLE students ADD COLUMN emergency_contact_phone VARCHAR(20) AFTER emergency_contact_name',
    'SELECT "Column emergency_contact_phone already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add emergency_contact_relationship column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'emergency_contact_relationship'
    ) = 0,
    'ALTER TABLE students ADD COLUMN emergency_contact_relationship VARCHAR(50) AFTER emergency_contact_phone',
    'SELECT "Column emergency_contact_relationship already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add medical_conditions column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'medical_conditions'
    ) = 0,
    'ALTER TABLE students ADD COLUMN medical_conditions TEXT AFTER emergency_contact_relationship',
    'SELECT "Column medical_conditions already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add allergies column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'allergies'
    ) = 0,
    'ALTER TABLE students ADD COLUMN allergies TEXT AFTER medical_conditions',
    'SELECT "Column allergies already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add medications column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'medications'
    ) = 0,
    'ALTER TABLE students ADD COLUMN medications TEXT AFTER allergies',
    'SELECT "Column medications already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add waiver_signed column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'waiver_signed'
    ) = 0,
    'ALTER TABLE students ADD COLUMN waiver_signed TINYINT(1) DEFAULT 0 AFTER medications',
    'SELECT "Column waiver_signed already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add waiver_date column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'waiver_date'
    ) = 0,
    'ALTER TABLE students ADD COLUMN waiver_date DATE AFTER waiver_signed',
    'SELECT "Column waiver_date already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add insurance_provider column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'insurance_provider'
    ) = 0,
    'ALTER TABLE students ADD COLUMN insurance_provider VARCHAR(100) AFTER waiver_date',
    'SELECT "Column insurance_provider already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add insurance_policy_number column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND COLUMN_NAME = 'insurance_policy_number'
    ) = 0,
    'ALTER TABLE students ADD COLUMN insurance_policy_number VARCHAR(50) AFTER insurance_provider',
    'SELECT "Column insurance_policy_number already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add indexes for new fields (only if they don't exist)
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND INDEX_NAME = 'idx_date_of_birth'
    ) = 0,
    'ALTER TABLE students ADD INDEX idx_date_of_birth (date_of_birth)',
    'SELECT "Index idx_date_of_birth already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND INDEX_NAME = 'idx_waiver_signed'
    ) = 0,
    'ALTER TABLE students ADD INDEX idx_waiver_signed (waiver_signed)',
    'SELECT "Index idx_waiver_signed already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'students'
        AND INDEX_NAME = 'idx_emergency_contact_name'
    ) = 0,
    'ALTER TABLE students ADD INDEX idx_emergency_contact_name (emergency_contact_name)',
    'SELECT "Index idx_emergency_contact_name already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- =============================================================================
-- SECTION 4: PARENTS TABLE ENHANCEMENTS
-- =============================================================================
-- Enhance parents table with relationship and contact preferences
-- Check and add columns one by one to avoid syntax errors
-- Add email column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'email'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN email VARCHAR(100) AFTER lastName',
    'SELECT "Column email already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add phone column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'phone'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN phone VARCHAR(20) AFTER email',
    'SELECT "Column phone already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add relationship column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'relationship'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN relationship ENUM(''mother'', ''father'', ''guardian'', ''stepparent'', ''grandparent'', ''other'') DEFAULT ''guardian'' AFTER phone',
    'SELECT "Column relationship already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add is_primary_contact column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'is_primary_contact'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN is_primary_contact TINYINT(1) DEFAULT 0 AFTER relationship',
    'SELECT "Column is_primary_contact already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add is_emergency_contact column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'is_emergency_contact'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN is_emergency_contact TINYINT(1) DEFAULT 0 AFTER is_primary_contact',
    'SELECT "Column is_emergency_contact already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add can_pickup column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'can_pickup'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN can_pickup TINYINT(1) DEFAULT 0 AFTER is_emergency_contact',
    'SELECT "Column can_pickup already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add preferred_contact_method column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'preferred_contact_method'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN preferred_contact_method ENUM(''email'', ''phone'', ''text'', ''app'') DEFAULT ''email'' AFTER can_pickup',
    'SELECT "Column preferred_contact_method already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add contact_notes column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'contact_notes'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN contact_notes TEXT AFTER preferred_contact_method',
    'SELECT "Column contact_notes already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add created_at column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'created_at'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER contact_notes',
    'SELECT "Column created_at already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add updated_at column
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND COLUMN_NAME = 'updated_at'
    ) = 0,
    'ALTER TABLE parents ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at',
    'SELECT "Column updated_at already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Add indexes for parents table (only if they don't exist)
SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND INDEX_NAME = 'idx_email'
    ) = 0,
    'ALTER TABLE parents ADD INDEX idx_email (email)',
    'SELECT "Index idx_email already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND INDEX_NAME = 'idx_phone'
    ) = 0,
    'ALTER TABLE parents ADD INDEX idx_phone (phone)',
    'SELECT "Index idx_phone already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND INDEX_NAME = 'idx_relationship'
    ) = 0,
    'ALTER TABLE parents ADD INDEX idx_relationship (relationship)',
    'SELECT "Index idx_relationship already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND INDEX_NAME = 'idx_primary_contact'
    ) = 0,
    'ALTER TABLE parents ADD INDEX idx_primary_contact (is_primary_contact)',
    'SELECT "Index idx_primary_contact already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SET
  @sql = IF(
    (
      SELECT
        COUNT(*)
      FROM
        INFORMATION_SCHEMA.STATISTICS
      WHERE
        TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'parents'
        AND INDEX_NAME = 'idx_emergency_contact'
    ) = 0,
    'ALTER TABLE parents ADD INDEX idx_emergency_contact (is_emergency_contact)',
    'SELECT "Index idx_emergency_contact already exists" as message'
  );

PREPARE stmt
FROM
  @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- =============================================================================
-- SECTION 5: STUDENT AGE AUTO-CALCULATION TRIGGERS
-- =============================================================================
-- Drop existing age calculation triggers if they exist
DROP TRIGGER IF EXISTS update_age_from_dob;

DROP TRIGGER IF EXISTS set_age_from_dob_insert;

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
  s.preferredName,
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
  preferredName,
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
  s.preferredName,
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
  'Migration 016_comprehensive_enhancement completed successfully' as status;