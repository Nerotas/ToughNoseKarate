-- Migration: 014_enhance_student_safety_and_contacts.sql
-- Description: Add emergency contact info and enhance parent relationships
-- Date: 2025-08-04
-- Add critical safety and contact fields to students table
ALTER TABLE
  students
ADD
  COLUMN date_of_birth DATE
AFTER
  age,
ADD
  COLUMN emergency_contact_name VARCHAR(100)
AFTER
  phone,
ADD
  COLUMN emergency_contact_phone VARCHAR(20)
AFTER
  emergency_contact_name,
ADD
  COLUMN emergency_contact_relationship VARCHAR(50)
AFTER
  emergency_contact_phone,
ADD
  COLUMN medical_conditions TEXT
AFTER
  emergency_contact_relationship,
ADD
  COLUMN allergies TEXT
AFTER
  medical_conditions,
ADD
  COLUMN medications TEXT
AFTER
  allergies,
ADD
  COLUMN waiver_signed TINYINT(1) DEFAULT 0
AFTER
  medications,
ADD
  COLUMN waiver_date DATE
AFTER
  waiver_signed,
ADD
  COLUMN insurance_provider VARCHAR(100)
AFTER
  waiver_date,
ADD
  COLUMN insurance_policy_number VARCHAR(50)
AFTER
  insurance_provider;

-- Add indexes for new fields
ALTER TABLE
  students
ADD
  INDEX idx_date_of_birth (date_of_birth),
ADD
  INDEX idx_emergency_contact_phone (emergency_contact_phone),
ADD
  INDEX idx_waiver_signed (waiver_signed);

-- Enhance parents table with relationship and contact preferences
ALTER TABLE
  parents
ADD
  COLUMN relationship ENUM(
    'mother',
    'father',
    'guardian',
    'stepparent',
    'grandparent',
    'other'
  ) DEFAULT 'parent'
AFTER
  lastName,
ADD
  COLUMN is_primary_contact TINYINT(1) DEFAULT 0
AFTER
  relationship,
ADD
  COLUMN is_emergency_contact TINYINT(1) DEFAULT 1
AFTER
  is_primary_contact,
ADD
  COLUMN can_pickup TINYINT(1) DEFAULT 1
AFTER
  is_emergency_contact,
ADD
  COLUMN preferred_contact_method ENUM('email', 'phone', 'text', 'app') DEFAULT 'email'
AFTER
  can_pickup,
ADD
  COLUMN contact_notes TEXT
AFTER
  preferred_contact_method;

-- Add indexes for parent enhancements
ALTER TABLE
  parents
ADD
  INDEX idx_relationship (relationship),
ADD
  INDEX idx_is_primary_contact (is_primary_contact),
ADD
  INDEX idx_is_emergency_contact (is_emergency_contact),
ADD
  INDEX idx_can_pickup (can_pickup);

-- Create a view for easy emergency contact lookup
CREATE
OR REPLACE VIEW student_emergency_contacts AS
SELECT
  s.studentid,
  s.firstName as student_first_name,
  s.lastName as student_last_name,
  s.emergency_contact_name,
  s.emergency_contact_phone,
  s.emergency_contact_relationship,
  s.medical_conditions,
  s.allergies,
  s.medications,
  p.firstName as parent_first_name,
  p.lastName as parent_last_name,
  p.email as parent_email,
  p.phone as parent_phone,
  p.relationship as parent_relationship,
  p.is_emergency_contact,
  p.can_pickup
FROM
  students s
  LEFT JOIN parent_mapping pm ON s.studentid = pm.studentid
  LEFT JOIN parents p ON pm.parentid = p.parentid
  AND p.is_emergency_contact = 1
WHERE
  s.active = 1;

-- Create a view for student medical alerts
CREATE
OR REPLACE VIEW student_medical_alerts AS
SELECT
  studentid,
  firstName,
  lastName,
  preferedName,
  age,
  date_of_birth,
  medical_conditions,
  allergies,
  medications,
  emergency_contact_name,
  emergency_contact_phone,
  emergency_contact_relationship
FROM
  students
WHERE
  active = 1
  AND (
    medical_conditions IS NOT NULL
    AND medical_conditions != ''
    OR allergies IS NOT NULL
    AND allergies != ''
    OR medications IS NOT NULL
    AND medications != ''
  );

-- Update students table to calculate age from date_of_birth if available
-- Note: This is a one-time update, you might want to use a trigger for ongoing updates
UPDATE
  students
SET
  age = TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE())
WHERE
  date_of_birth IS NOT NULL;

-- Create trigger to auto-update age when date_of_birth changes
DELIMITER $ $ CREATE TRIGGER update_age_from_dob BEFORE
UPDATE
  ON students FOR EACH ROW BEGIN IF NEW.date_of_birth IS NOT NULL
  AND NEW.date_of_birth != OLD.date_of_birth THEN
SET
  NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());

END IF;

END $ $ DELIMITER;

-- Create trigger to auto-update age on insert
DELIMITER $ $ CREATE TRIGGER set_age_from_dob_insert BEFORE
INSERT
  ON students FOR EACH ROW BEGIN IF NEW.date_of_birth IS NOT NULL THEN
SET
  NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());

END IF;

END $ $ DELIMITER;

-- Add comments to new views
ALTER VIEW student_emergency_contacts COMMENT = 'Quick lookup for student emergency contact information';

ALTER VIEW student_medical_alerts COMMENT = 'Students with medical conditions, allergies, or medications that require attention';