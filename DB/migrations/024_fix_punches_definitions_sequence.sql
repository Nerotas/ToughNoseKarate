-- Migration: 024_fix_punches_definitions_sequence.sql
-- Purpose: Ensure punches_definitions.id has a Postgres sequence default and is synced to existing data
\ n + BEGIN;

-- Create sequence if it doesn't exist
DO $ $ BEGIN IF NOT EXISTS (
  SELECT
    1
  FROM
    pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE
    c.relkind = 'S'
    AND c.relname = 'punches_definitions_id_seq'
) THEN CREATE SEQUENCE punches_definitions_id_seq;

END IF;

END $ $;

-- Make the sequence owned by the table's id column
ALTER SEQUENCE punches_definitions_id_seq OWNED BY punches_definitions.id;

-- Set the sequence to at least the current max(id)
SELECT
  setval(
    'punches_definitions_id_seq',
    COALESCE(
      (
        SELECT
          MAX(id)
        FROM
          punches_definitions
      ),
      0
    )
  );

-- Ensure the id column uses the sequence as its default value
ALTER TABLE
  punches_definitions
ALTER COLUMN
  id
SET
  DEFAULT nextval('punches_definitions_id_seq');

COMMIT;

-- Notes:
-- This migration only ensures the id column receives values from a Postgres sequence.
-- If other columns (execution, key_points, etc.) are still JSON from older MySQL-style migrations
-- you may want to add a follow-up migration to convert those columns to Postgres arrays (_text)
-- or jsonb as appropriate for the application. That is intentionally deferred to avoid data loss.