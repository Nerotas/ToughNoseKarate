-- Migration: 013_add_student_tests_and_belt_progression.sql
-- Description: Add essential tables for test tracking and belt progression
-- Date: 2025-08-04
-- Add belt ordering to belt_requirements table (if not exists)
-- Note: belt_order column already exists in the table, so we'll skip this step
-- ALTER TABLE
--   belt_requirements
-- ADD
--   COLUMN belt_order INT NOT NULL DEFAULT 1
-- AFTER
--   belt_rank,
-- ADD
--   INDEX idx_belt_order (belt_order);
-- Update belt orders (adjust these values based on your actual belt progression)
UPDATE
  belt_requirements
SET
  belt_order = 1
WHERE
  belt_rank = 'White';

UPDATE
  belt_requirements
SET
  belt_order = 2
WHERE
  belt_rank = 'Gold White';

UPDATE
  belt_requirements
SET
  belt_order = 3
WHERE
  belt_rank = 'Gold';

UPDATE
  belt_requirements
SET
  belt_order = 4
WHERE
  belt_rank = 'Gold Black';

UPDATE
  belt_requirements
SET
  belt_order = 5
WHERE
  belt_rank = 'Purple White';

UPDATE
  belt_requirements
SET
  belt_order = 6
WHERE
  belt_rank = 'Purple';

UPDATE
  belt_requirements
SET
  belt_order = 7
WHERE
  belt_rank = 'Orange White';

UPDATE
  belt_requirements
SET
  belt_order = 8
WHERE
  belt_rank = 'Orange';

UPDATE
  belt_requirements
SET
  belt_order = 9
WHERE
  belt_rank = 'Blue White';

UPDATE
  belt_requirements
SET
  belt_order = 10
WHERE
  belt_rank = 'Blue';

UPDATE
  belt_requirements
SET
  belt_order = 11
WHERE
  belt_rank = 'Blue Black';

UPDATE
  belt_requirements
SET
  belt_order = 12
WHERE
  belt_rank = 'Green White';

UPDATE
  belt_requirements
SET
  belt_order = 13
WHERE
  belt_rank = 'Green';

UPDATE
  belt_requirements
SET
  belt_order = 14
WHERE
  belt_rank = 'Green Black';

UPDATE
  belt_requirements
SET
  belt_order = 15
WHERE
  belt_rank = 'Brown White';

UPDATE
  belt_requirements
SET
  belt_order = 16
WHERE
  belt_rank = 'Brown';

UPDATE
  belt_requirements
SET
  belt_order = 17
WHERE
  belt_rank = 'Brown Black';

UPDATE
  belt_requirements
SET
  belt_order = 18
WHERE
  belt_rank = 'Red White';

UPDATE
  belt_requirements
SET
  belt_order = 19
WHERE
  belt_rank = 'Red';

UPDATE
  belt_requirements
SET
  belt_order = 6
WHERE
  beltRank = 'blue';

UPDATE
  belt_requirements
SET
  belt_order = 7
WHERE
  beltRank = 'brown';

UPDATE
  belt_requirements
SET
  belt_order = 8
WHERE
  beltRank = 'red';

UPDATE
  belt_requirements
SET
  belt_order = 9
WHERE
  beltRank = 'black';

-- Create student_tests table
CREATE TABLE student_tests (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Create test_results table for detailed technique scoring
CREATE TABLE test_results (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Create belt_progression table for complete promotion history
CREATE TABLE belt_progression (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Create trigger to ensure only one current belt per student
DELIMITER $ $ CREATE TRIGGER ensure_one_current_belt BEFORE
INSERT
  ON belt_progression FOR EACH ROW BEGIN IF NEW.is_current = 1 THEN
UPDATE
  belt_progression
SET
  is_current = 0
WHERE
  studentid = NEW.studentid
  AND is_current = 1;

END IF;

END $ $ DELIMITER;

-- Create trigger for updates too
DELIMITER $ $ CREATE TRIGGER ensure_one_current_belt_update BEFORE
UPDATE
  ON belt_progression FOR EACH ROW BEGIN IF NEW.is_current = 1
  AND OLD.is_current = 0 THEN
UPDATE
  belt_progression
SET
  is_current = 0
WHERE
  studentid = NEW.studentid
  AND is_current = 1
  AND progression_id != NEW.progression_id;

END IF;

END $ $ DELIMITER;

-- Migrate existing student belt data to belt_progression
INSERT INTO
  belt_progression (
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
    STR_TO_DATE(startDateUTC, '%Y-%m-%d')
  ) as promoted_date,
  1 as is_current,
  'Migrated from existing student data' as notes
FROM
  students
WHERE
  beltRank IS NOT NULL
  AND beltRank != '';

-- Add comments to tables
ALTER TABLE
  student_tests COMMENT = 'Records of all belt tests taken by students';

ALTER TABLE
  test_results COMMENT = 'Detailed scoring for individual techniques during tests';

ALTER TABLE
  belt_progression COMMENT = 'Complete history of belt promotions for each student';