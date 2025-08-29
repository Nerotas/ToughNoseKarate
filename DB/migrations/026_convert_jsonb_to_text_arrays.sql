-- Migration: 026_convert_jsonb_to_text_arrays.sql
-- Description: Convert jsonb columns to text arrays to match Sequelize model
-- This fixes the "invalid input syntax for type json" error
BEGIN;

-- Step 1: Add temporary text array columns
ALTER TABLE
  public.one_steps_definitions
ADD
  COLUMN defense_temp _text DEFAULT '{}',
ADD
  COLUMN key_points_temp _text DEFAULT '{}',
ADD
  COLUMN common_mistakes_temp _text DEFAULT '{}';

-- Step 2: Convert existing jsonb data to text arrays
UPDATE
  public.one_steps_definitions
SET
  defense_temp = CASE
    WHEN defense IS NOT NULL
    AND jsonb_typeof(defense) = 'array' THEN ARRAY(
      SELECT
        jsonb_array_elements_text(defense)
    )
    ELSE '{}' :: text []
  END,
  key_points_temp = CASE
    WHEN key_points IS NOT NULL
    AND jsonb_typeof(key_points) = 'array' THEN ARRAY(
      SELECT
        jsonb_array_elements_text(key_points)
    )
    ELSE '{}' :: text []
  END,
  common_mistakes_temp = CASE
    WHEN common_mistakes IS NOT NULL
    AND jsonb_typeof(common_mistakes) = 'array' THEN ARRAY(
      SELECT
        jsonb_array_elements_text(common_mistakes)
    )
    ELSE '{}' :: text []
  END;

-- Step 3: Drop old jsonb columns
ALTER TABLE
  public.one_steps_definitions DROP COLUMN defense,
  DROP COLUMN key_points,
  DROP COLUMN common_mistakes;

-- Step 4: Rename temp columns to original names
ALTER TABLE
  public.one_steps_definitions RENAME COLUMN defense_temp TO defense;

ALTER TABLE
  public.one_steps_definitions RENAME COLUMN key_points_temp TO key_points;

ALTER TABLE
  public.one_steps_definitions RENAME COLUMN common_mistakes_temp TO common_mistakes;

-- Step 5: Add NOT NULL constraints with defaults
ALTER TABLE
  public.one_steps_definitions
ALTER COLUMN
  defense
SET
  NOT NULL,
ALTER COLUMN
  defense
SET
  DEFAULT '{}',
ALTER COLUMN
  key_points
SET
  NOT NULL,
ALTER COLUMN
  key_points
SET
  DEFAULT '{}',
ALTER COLUMN
  common_mistakes
SET
  NOT NULL,
ALTER COLUMN
  common_mistakes
SET
  DEFAULT '{}',
ALTER COLUMN
  first_follow_up
SET
  NOT NULL,
ALTER COLUMN
  first_follow_up
SET
  DEFAULT '{}',
ALTER COLUMN
  second_follow_up
SET
  NOT NULL,
ALTER COLUMN
  second_follow_up
SET
  DEFAULT '{}';

COMMIT;