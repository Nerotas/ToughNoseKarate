-- Migration: 015_normalize_student_techniques_optional.sql
-- Description: OPTIONAL - Normalize technique progress into single table
-- Date: 2025-08-04
-- WARNING: This is a major restructure. Test thoroughly before running in production.
-- Create the normalized student_technique_progress table
CREATE TABLE student_technique_progress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  studentid INT NOT NULL,
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
  proficiency ENUM(
    'not_started',
    'learning',
    'proficient',
    'mastered'
  ) DEFAULT 'not_started',
  proficiency_score DECIMAL(5, 2),
  -- Numeric score if available
  last_updated DATE,
  instructor_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Indexes
  INDEX idx_studentid (studentid),
  INDEX idx_category (category),
  INDEX idx_technique_name (technique_name),
  INDEX idx_proficiency (proficiency),
  INDEX idx_last_updated (last_updated),
  -- Unique constraint to prevent duplicates
  UNIQUE KEY unique_student_technique (studentid, category, technique_name),
  -- Foreign key
  FOREIGN KEY (studentid) REFERENCES students(studentid) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Migration function to convert text proficiency to enum
DELIMITER $ $ CREATE FUNCTION convert_proficiency_to_enum(proficiency_text VARCHAR(45)) RETURNS ENUM(
  'not_started',
  'learning',
  'proficient',
  'mastered'
) DETERMINISTIC READS SQL DATA BEGIN DECLARE result ENUM(
  'not_started',
  'learning',
  'proficient',
  'mastered'
);

IF proficiency_text IS NULL
OR proficiency_text = '' THEN
SET
  result = 'not_started';

ELSEIF LOWER(proficiency_text) LIKE '%master%' THEN
SET
  result = 'mastered';

ELSEIF LOWER(proficiency_text) LIKE '%proficient%'
OR LOWER(proficiency_text) LIKE '%good%' THEN
SET
  result = 'proficient';

ELSEIF LOWER(proficiency_text) LIKE '%learn%'
OR LOWER(proficiency_text) LIKE '%practice%' THEN
SET
  result = 'learning';

ELSE
SET
  result = 'not_started';

END IF;

RETURN result;

END $ $ DELIMITER;

-- Migrate data from blocks table
INSERT INTO
  student_technique_progress (
    studentid,
    category,
    technique_name,
    proficiency,
    last_updated
  )
SELECT
  studentid,
  'blocks' as category,
  'Low Block' as technique_name,
  convert_proficiency_to_enum(low) as proficiency,
  CURDATE() as last_updated
FROM
  blocks
WHERE
  low IS NOT NULL
  AND low != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Knife Hand Block',
  convert_proficiency_to_enum(knifeHand),
  CURDATE()
FROM
  blocks
WHERE
  knifeHand IS NOT NULL
  AND knifeHand != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'High Block',
  convert_proficiency_to_enum(high),
  CURDATE()
FROM
  blocks
WHERE
  high IS NOT NULL
  AND high != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Inside Block',
  convert_proficiency_to_enum(inside),
  CURDATE()
FROM
  blocks
WHERE
  inside IS NOT NULL
  AND inside != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Outside Block',
  convert_proficiency_to_enum(outside),
  CURDATE()
FROM
  blocks
WHERE
  outside IS NOT NULL
  AND outside != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Low Chop',
  convert_proficiency_to_enum(lowChop),
  CURDATE()
FROM
  blocks
WHERE
  lowChop IS NOT NULL
  AND lowChop != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'High Chop',
  convert_proficiency_to_enum(highChop),
  CURDATE()
FROM
  blocks
WHERE
  highChop IS NOT NULL
  AND highChop != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Double Block Punch',
  convert_proficiency_to_enum(doubleBlockPunch),
  CURDATE()
FROM
  blocks
WHERE
  doubleBlockPunch IS NOT NULL
  AND doubleBlockPunch != ''
UNION
ALL
SELECT
  studentid,
  'blocks',
  'Double Block',
  convert_proficiency_to_enum(doubleBlock),
  CURDATE()
FROM
  blocks
WHERE
  doubleBlock IS NOT NULL
  AND doubleBlock != '';

-- Migrate data from combinations table
INSERT INTO
  student_technique_progress (
    studentid,
    category,
    technique_name,
    proficiency,
    last_updated
  )
SELECT
  studentid,
  'combinations',
  'Kicking Combinations',
  convert_proficiency_to_enum(kicking),
  CURDATE()
FROM
  combinations
WHERE
  kicking IS NOT NULL
  AND kicking != ''
UNION
ALL
SELECT
  studentid,
  'combinations',
  'Hand Combinations',
  convert_proficiency_to_enum(hands),
  CURDATE()
FROM
  combinations
WHERE
  hands IS NOT NULL
  AND hands != ''
UNION
ALL
SELECT
  studentid,
  'combinations',
  'Fighting Combinations',
  convert_proficiency_to_enum(fighting),
  CURDATE()
FROM
  combinations
WHERE
  fighting IS NOT NULL
  AND fighting != ''
UNION
ALL
SELECT
  studentid,
  'combinations',
  'Basic Combinations',
  convert_proficiency_to_enum(basics),
  CURDATE()
FROM
  combinations
WHERE
  basics IS NOT NULL
  AND basics != '';

-- Migrate data from falling table
INSERT INTO
  student_technique_progress (
    studentid,
    category,
    technique_name,
    proficiency,
    last_updated
  )
SELECT
  studentid,
  'falling',
  'Back Fall',
  convert_proficiency_to_enum(back),
  CURDATE()
FROM
  falling
WHERE
  back IS NOT NULL
  AND back != ''
UNION
ALL
SELECT
  studentid,
  'falling',
  'Front Fall',
  convert_proficiency_to_enum(front),
  CURDATE()
FROM
  falling
WHERE
  front IS NOT NULL
  AND front != ''
UNION
ALL
SELECT
  studentid,
  'falling',
  'Side Roll',
  convert_proficiency_to_enum(roll),
  CURDATE()
FROM
  falling
WHERE
  roll IS NOT NULL
  AND roll != ''
UNION
ALL
SELECT
  studentid,
  'falling',
  'Forward Roll',
  convert_proficiency_to_enum(forwardRoll),
  CURDATE()
FROM
  falling
WHERE
  forwardRoll IS NOT NULL
  AND forwardRoll != '';

-- Continue with other tables... (forms, kicks, one_steps, punches, stances)
-- Note: This would be a very long migration. For production, you might want to split this
-- into separate scripts or create a stored procedure to handle the migration.
-- Create a view that mimics the old structure for backward compatibility
CREATE
OR REPLACE VIEW blocks_view AS
SELECT
  studentid,
  MAX(
    CASE
      WHEN technique_name = 'Low Block' THEN proficiency
    END
  ) as low,
  MAX(
    CASE
      WHEN technique_name = 'Knife Hand Block' THEN proficiency
    END
  ) as knifeHand,
  MAX(
    CASE
      WHEN technique_name = 'High Block' THEN proficiency
    END
  ) as high,
  MAX(
    CASE
      WHEN technique_name = 'Inside Block' THEN proficiency
    END
  ) as inside,
  MAX(
    CASE
      WHEN technique_name = 'Outside Block' THEN proficiency
    END
  ) as outside,
  MAX(
    CASE
      WHEN technique_name = 'Low Chop' THEN proficiency
    END
  ) as lowChop,
  MAX(
    CASE
      WHEN technique_name = 'High Chop' THEN proficiency
    END
  ) as highChop,
  MAX(
    CASE
      WHEN technique_name = 'Double Block Punch' THEN proficiency
    END
  ) as doubleBlockPunch,
  MAX(
    CASE
      WHEN technique_name = 'Double Block' THEN proficiency
    END
  ) as doubleBlock
FROM
  student_technique_progress
WHERE
  category = 'blocks'
GROUP BY
  studentid;

-- Add comment
ALTER TABLE
  student_technique_progress COMMENT = 'Normalized table for all student technique progress across all martial arts categories';

-- Clean up function
DROP FUNCTION IF EXISTS convert_proficiency_to_enum;

-- Instructions for completing the migration:
-- 1. Test this migration on a copy of your database first
-- 2. Complete the migration for forms, kicks, one_steps, punches, and stances tables
-- 3. Create backward compatibility views for all old tables
-- 4. Update your application code to use the new structure
-- 5. Once confident, drop the old individual tables
-- 6. Update your models to use the new normalized structure