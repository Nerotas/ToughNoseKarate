-- Database Cleanup Script
-- Removes unused tables that have no frontend integration
-- Run this script after backing up your database
USE toughnosekarate;

-- Disable foreign key checks temporarily
SET
  FOREIGN_KEY_CHECKS = 0;

-- Remove unused technique tracking tables (replaced by _definitions tables)
DROP TABLE IF EXISTS `blocks`;

DROP TABLE IF EXISTS `combinations`;

DROP TABLE IF EXISTS `falling`;

DROP TABLE IF EXISTS `forms`;

DROP TABLE IF EXISTS `kicks`;

DROP TABLE IF EXISTS `one_steps`;

DROP TABLE IF EXISTS `punches`;

DROP TABLE IF EXISTS `stances`;

-- Note: Keeping student_tests for now - may be used for test history
-- Note: test_results table not found in current schema
-- Re-enable foreign key checks
SET
  FOREIGN_KEY_CHECKS = 1;

-- Verify tables removed
SHOW TABLES;

-- Optional: Clean up any orphaned data in remaining tables
-- UPDATE students SET ... WHERE needed;
-- Database cleanup completed
SELECT
  'Database cleanup completed - unused technique tables removed' AS Status;