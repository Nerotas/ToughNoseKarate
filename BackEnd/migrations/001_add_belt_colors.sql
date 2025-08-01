-- Migration to add color and text_color columns to belt_requirements table
-- Run date: 2025-08-01
ALTER TABLE
  belt_requirements
ADD
  COLUMN color VARCHAR(7) NULL COMMENT 'Hex color code for belt display (e.g. #FFFFFF)',
ADD
  COLUMN text_color VARCHAR(7) NULL COMMENT 'Hex color code for text on belt (e.g. #000000)';

-- Update existing records with appropriate colors using belt_order (primary key)
UPDATE
  belt_requirements
SET
  color = '#FFFFFF',
  text_color = '#000000'
WHERE
  belt_order = 1;

-- White
UPDATE
  belt_requirements
SET
  color = '#FFD700',
  text_color = '#000000'
WHERE
  belt_order = 2;

-- Gold White
UPDATE
  belt_requirements
SET
  color = '#FFD700',
  text_color = '#000000'
WHERE
  belt_order = 3;

-- Gold
UPDATE
  belt_requirements
SET
  color = '#DAA520',
  text_color = '#FFFFFF'
WHERE
  belt_order = 4;

-- Gold Black
UPDATE
  belt_requirements
SET
  color = '#800080',
  text_color = '#FFFFFF'
WHERE
  belt_order = 5;

-- Purple White
UPDATE
  belt_requirements
SET
  color = '#800080',
  text_color = '#FFFFFF'
WHERE
  belt_order = 6;

-- Purple
UPDATE
  belt_requirements
SET
  color = '#FFA500',
  text_color = '#000000'
WHERE
  belt_order = 7;

-- Orange White
UPDATE
  belt_requirements
SET
  color = '#FFA500',
  text_color = '#FFFFFF'
WHERE
  belt_order = 8;

-- Orange
UPDATE
  belt_requirements
SET
  color = '#ADD8E6',
  text_color = '#000000'
WHERE
  belt_order = 9;

-- Blue White
UPDATE
  belt_requirements
SET
  color = '#0000FF',
  text_color = '#FFFFFF'
WHERE
  belt_order = 10;

-- Blue
UPDATE
  belt_requirements
SET
  color = '#191970',
  text_color = '#FFFFFF'
WHERE
  belt_order = 11;

-- Blue Black
UPDATE
  belt_requirements
SET
  color = '#90EE90',
  text_color = '#000000'
WHERE
  belt_order = 12;

-- Green White
UPDATE
  belt_requirements
SET
  color = '#008000',
  text_color = '#FFFFFF'
WHERE
  belt_order = 13;

-- Green
UPDATE
  belt_requirements
SET
  color = '#006400',
  text_color = '#FFFFFF'
WHERE
  belt_order = 14;

-- Green Black
UPDATE
  belt_requirements
SET
  color = '#D2691E',
  text_color = '#000000'
WHERE
  belt_order = 15;

-- Brown White
UPDATE
  belt_requirements
SET
  color = '#8B4513',
  text_color = '#FFFFFF'
WHERE
  belt_order = 16;

-- Brown
UPDATE
  belt_requirements
SET
  color = '#654321',
  text_color = '#FFFFFF'
WHERE
  belt_order = 17;

-- Brown Black
UPDATE
  belt_requirements
SET
  color = '#FFB6C1',
  text_color = '#000000'
WHERE
  belt_order = 18;

-- Red White
UPDATE
  belt_requirements
SET
  color = '#FF0000',
  text_color = '#FFFFFF'
WHERE
  belt_order = 19;

-- Red