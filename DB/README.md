# Database Migration Guide

This directory contains SQL migration files to enhance the Tang Soo Do martial arts management system database.

## Migration Files

### 013_add_student_tests_and_belt_progression.sql ⭐ **ESSENTIAL**

**Purpose**: Adds comprehensive test tracking and belt progression history

**New Tables**:

- `student_tests` - Records all belt tests with scores and results
- `test_results` - Detailed technique scoring during tests
- `belt_progression` - Complete belt promotion history

**Enhancements**:

- Adds `belt_order` to `belt_requirements` for proper progression logic
- Migrates existing student belt data to progression history
- Includes triggers to ensure data integrity

### 014_enhance_student_safety_and_contacts.sql ⭐ **HIGH PRIORITY**

**Purpose**: Adds critical safety information and emergency contacts

**Student Table Enhancements**:

- `date_of_birth` - Proper age calculation
- `emergency_contact_name/phone/relationship` - Emergency contact info
- `medical_conditions/allergies/medications` - Health information
- `waiver_signed/waiver_date` - Legal compliance
- `insurance_provider/policy_number` - Insurance information

**Parent Table Enhancements**:

- `relationship` - Mother, father, guardian, etc.
- `is_primary_contact/is_emergency_contact` - Contact preferences
- `can_pickup` - Pickup authorization
- `preferred_contact_method` - Communication preferences

**New Views**:

- `student_emergency_contacts` - Quick emergency lookup
- `student_medical_alerts` - Students requiring medical attention

### 015_normalize_student_techniques_optional.sql ⚠️ **OPTIONAL**

**Purpose**: Normalizes technique progress into a single table (major restructure)

**Benefits**:

- Single table instead of 8 separate tables
- Easier to add new techniques
- Better data consistency
- Simplified queries

**Warning**: This is a major change requiring application code updates.

## Running Migrations

### Prerequisites

1. **Backup your database** before running any migrations
2. Test on a development/staging environment first
3. Ensure you have administrative privileges on the database

### Execution Order

Run migrations in numerical order:

```bash
# 1. Essential test tracking (REQUIRED)
mysql -u your_username -p your_database < 013_add_student_tests_and_belt_progression.sql

# 2. Safety and contacts (RECOMMENDED)
mysql -u your_username -p your_database < 014_enhance_student_safety_and_contacts.sql

# 3. Technique normalization (OPTIONAL - major change)
mysql -u your_username -p your_database < 015_normalize_student_techniques_optional.sql
```

### Verification

After each migration, verify:

```sql
-- Check new tables exist
SHOW TABLES;

-- Check data migration worked
SELECT COUNT(*) FROM student_tests;
SELECT COUNT(*) FROM belt_progression;

-- Verify views were created
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

## Application Code Changes Required

### For Migration 013 (Student Tests)

Update your TypeScript models by adding:

- `studentTests.ts`
- `testResults.ts`

Register new models in `app.module.ts`:

```typescript
SequelizeModule.forFeature([
  // ... existing models
  studentTests,
  testResults,
]);
```

### For Migration 014 (Safety & Contacts)

Update the `students` interface to include new fields:

```typescript
interface Student {
  // ... existing fields
  date_of_birth?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  medical_conditions?: string;
  allergies?: string;
  medications?: string;
  waiver_signed?: number;
  waiver_date?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
}
```

Update the `parents` interface:

```typescript
interface Parent {
  // ... existing fields
  relationship?:
    | "mother"
    | "father"
    | "guardian"
    | "stepparent"
    | "grandparent"
    | "other";
  is_primary_contact?: number;
  is_emergency_contact?: number;
  can_pickup?: number;
  preferred_contact_method?: "email" | "phone" | "text" | "app";
  contact_notes?: string;
}
```

## New API Endpoints to Implement

### Student Tests

```typescript
// GET /v1/students/{id}/tests - Get all tests for a student
// POST /v1/students/{id}/tests - Record a new test
// GET /v1/tests/{testId}/results - Get detailed test results
// POST /v1/tests/{testId}/results - Add technique scores
```

### Belt Progression

```typescript
// GET /v1/students/{id}/belt-progression - Get promotion history
// POST /v1/students/{id}/promote - Record belt promotion
```

### Emergency Contacts

```typescript
// GET /v1/students/{id}/emergency-contacts - Get emergency info
// GET /v1/emergency-contacts - Get all students with medical alerts
```

## Benefits After Migration

### Immediate Benefits

1. **Complete Test History** - Track all belt tests with detailed scoring
2. **Belt Progression Timeline** - Visual promotion history
3. **Emergency Information** - Quick access to medical and contact info
4. **Safety Compliance** - Waiver and insurance tracking

### Frontend Enhancements Enabled

1. **Test History Timeline** - Show student's testing journey
2. **Progress Analytics** - Detailed technique scoring trends
3. **Emergency Alerts** - Medical condition notifications
4. **Parent Communication** - Preferred contact methods
5. **Safety Dashboard** - Missing waivers, expired insurance

### Reporting Capabilities

1. **Student Progress Reports** - Comprehensive testing history
2. **Belt Promotion Ceremonies** - Who's ready for promotion
3. **Emergency Contact Lists** - Critical safety information
4. **Medical Alerts** - Students requiring special attention

## Rollback Instructions

If you need to rollback migrations:

### Rollback Migration 015 (Optional Normalization)

```sql
DROP TABLE IF EXISTS student_technique_progress;
DROP VIEW IF EXISTS blocks_view;
-- Original tables remain intact
```

### Rollback Migration 014 (Safety & Contacts)

```sql
-- Remove new columns from students table
ALTER TABLE students
DROP COLUMN date_of_birth,
DROP COLUMN emergency_contact_name,
DROP COLUMN emergency_contact_phone,
DROP COLUMN emergency_contact_relationship,
DROP COLUMN medical_conditions,
DROP COLUMN allergies,
DROP COLUMN medications,
DROP COLUMN waiver_signed,
DROP COLUMN waiver_date,
DROP COLUMN insurance_provider,
DROP COLUMN insurance_policy_number;

-- Remove new columns from parents table
ALTER TABLE parents
DROP COLUMN relationship,
DROP COLUMN is_primary_contact,
DROP COLUMN is_emergency_contact,
DROP COLUMN can_pickup,
DROP COLUMN preferred_contact_method,
DROP COLUMN contact_notes;

-- Drop views
DROP VIEW IF EXISTS student_emergency_contacts;
DROP VIEW IF EXISTS student_medical_alerts;

-- Drop triggers
DROP TRIGGER IF EXISTS update_age_from_dob;
DROP TRIGGER IF EXISTS set_age_from_dob_insert;
```

### Rollback Migration 013 (Tests & Progression)

```sql
-- Drop new tables
DROP TABLE IF EXISTS test_results;
DROP TABLE IF EXISTS student_tests;
DROP TABLE IF EXISTS belt_progression;

-- Remove belt_order from belt_requirements
ALTER TABLE belt_requirements DROP COLUMN belt_order;

-- Drop triggers
DROP TRIGGER IF EXISTS ensure_one_current_belt;
DROP TRIGGER IF EXISTS ensure_one_current_belt_update;
```

## Support

If you encounter issues:

1. Check the MySQL error log
2. Verify all foreign key constraints
3. Ensure you have proper database permissions
4. Test on a small dataset first

Remember: **Always backup before migrating!**
