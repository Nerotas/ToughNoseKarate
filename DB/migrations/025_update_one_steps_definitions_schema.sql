-- Migration: 025_update_one_steps_definitions_schema.sql
-- Description: Update one_steps_definitions table to match frontend interface
-- Removes: attack, applications columns
-- Adds: follow_up_belt_rank, follow_up_belt_color, first_follow_up, second_follow_up, comment columns
BEGIN;

-- Add new columns
ALTER TABLE
  public.one_steps_definitions
ADD
  COLUMN follow_up_belt_rank VARCHAR(45),
ADD
  COLUMN follow_up_belt_color VARCHAR(7),
ADD
  COLUMN first_follow_up _text DEFAULT '{}',
ADD
  COLUMN second_follow_up _text DEFAULT '{}',
ADD
  COLUMN comment TEXT;

-- Remove old columns (commented out for safety - uncomment if you want to drop them)
-- ALTER TABLE public.one_steps_definitions
-- DROP COLUMN korean,
-- DROP COLUMN attack,
-- DROP COLUMN applications;
-- Convert existing jsonb arrays to _text arrays for consistency
-- Note: This assumes your existing data is in jsonb format
-- If you want to convert existing data, you can use:
-- UPDATE public.one_steps_definitions SET
--   defense = ARRAY(SELECT jsonb_array_elements_text(defense)),
--   key_points = ARRAY(SELECT jsonb_array_elements_text(key_points)),
--   common_mistakes = ARRAY(SELECT jsonb_array_elements_text(common_mistakes))
-- WHERE defense IS NOT NULL;
COMMIT;

-- Updated table definition for reference:
/*
 CREATE TABLE public.one_steps_definitions (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 belt_rank VARCHAR(45) NOT NULL,
 belt_color VARCHAR(7) NOT NULL,
 description TEXT NOT NULL,
 follow_up_belt_rank VARCHAR(45),
 follow_up_belt_color VARCHAR(7),
 defense _text NOT NULL DEFAULT '{}',
 key_points _text NOT NULL DEFAULT '{}',
 common_mistakes _text NOT NULL DEFAULT '{}',
 first_follow_up _text NOT NULL DEFAULT '{}',
 second_follow_up _text NOT NULL DEFAULT '{}',
 comment TEXT,
 created_at TIMESTAMP NULL,
 updated_at TIMESTAMP NULL
 );
 */