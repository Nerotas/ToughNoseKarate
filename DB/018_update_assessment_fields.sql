-- Migration 018: Update Student Assessment Fields
-- This migration adds missing block fields, new form fields, and removes deprecated combo fields
-- Date: 2025-08-05
USE tnk;

-- Add missing block fields
ALTER TABLE
  student_assessments
ADD
  COLUMN inside_block DECIMAL(3, 1) NULL COMMENT 'Inside Block score (0-10)',
ADD
  COLUMN outside_block DECIMAL(3, 1) NULL COMMENT 'Outside Block score (0-10)',
ADD
  COLUMN block_punch DECIMAL(3, 1) NULL COMMENT 'Block Punch score (0-10)',
ADD
  COLUMN double_block_punch DECIMAL(3, 1) NULL COMMENT 'Double Block Punch score (0-10)';

-- Add new form fields
ALTER TABLE
  student_assessments
ADD
  COLUMN geocho_hyung_il_bu_sahm_gup DECIMAL(3, 1) NULL COMMENT 'Geocho Hyung Il Bu (Sahm Gup) score (0-10)',
ADD
  COLUMN geocho_hyung_yi_bu_sahm_gup DECIMAL(3, 1) NULL COMMENT 'Geocho Hyung Yi Bu (Sahm Gup) score (0-10)';

-- Remove deprecated combo fields and middle_block
ALTER TABLE
  student_assessments DROP COLUMN IF EXISTS block_punch_combo,
  DROP COLUMN IF EXISTS double_block_punch_combo,
  DROP COLUMN IF EXISTS middle_block;

-- Update any existing data that might reference the old fields (if needed)
-- Note: This assumes any existing data in combo fields should be preserved in the new fields
-- You may need to adjust this based on your specific data migration needs
-- Add indexes for performance on commonly queried fields
CREATE INDEX idx_student_assessments_target_belt ON student_assessments(target_belt_rank);

CREATE INDEX idx_student_assessments_status ON student_assessments(assessment_status);

CREATE INDEX idx_student_assessments_date ON student_assessments(assessment_date);

-- Verify the changes
SELECT
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_COMMENT
FROM
  INFORMATION_SCHEMA.COLUMNS
WHERE
  TABLE_SCHEMA = 'tnk'
  AND TABLE_NAME = 'student_assessments'
  AND COLUMN_NAME IN (
    'inside_block',
    'outside_block',
    'block_punch',
    'double_block_punch',
    'geocho_hyung_il_bu_sahm_gup',
    'geocho_hyung_yi_bu_sahm_gup'
  )
ORDER BY
  COLUMN_NAME;

-- Verify removed columns are gone
SELECT
  COLUMN_NAME
FROM
  INFORMATION_SCHEMA.COLUMNS
WHERE
  TABLE_SCHEMA = 'tnk'
  AND TABLE_NAME = 'student_assessments'
  AND COLUMN_NAME IN (
    'block_punch_combo',
    'double_block_punch_combo',
    'middle_block'
  );

-- This should return 0 rows if the migration was successful
COMMIT;