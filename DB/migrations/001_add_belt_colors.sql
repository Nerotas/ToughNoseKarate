-- Migration to add color and text_color columns to belt_requirements table
-- Run date: 2025-08-01
ALTER TABLE
  belt_requirements
ADD
  COLUMN color VARCHAR(7) NULL COMMENT 'Hex color code for belt display (e.g. #FFFFFF)',
ADD
  COLUMN text_color VARCHAR(7) NULL COMMENT 'Hex color code for text on belt (e.g. #000000)';

-- Update existing records with appropriate colors
UPDATE
  belt_requirements
SET
  color = '#FFFFFF',
  text_color = '#000000'
WHERE
  belt_rank = 'White';

UPDATE
  belt_requirements
SET
  color = '#FFD700',
  text_color = '#000000'
WHERE
  belt_rank = 'Gold White';

UPDATE
  belt_requirements
SET
  color = '#FFD700',
  text_color = '#000000'
WHERE
  belt_rank = 'Gold';

UPDATE
  belt_requirements
SET
  color = '#DAA520',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Gold Black';

UPDATE
  belt_requirements
SET
  color = '#800080',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Purple White';

UPDATE
  belt_requirements
SET
  color = '#800080',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Purple';

UPDATE
  belt_requirements
SET
  color = '#FFA500',
  text_color = '#000000'
WHERE
  belt_rank = 'Orange White';

UPDATE
  belt_requirements
SET
  color = '#FFA500',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Orange';

UPDATE
  belt_requirements
SET
  color = '#ADD8E6',
  text_color = '#000000'
WHERE
  belt_rank = 'Blue White';

UPDATE
  belt_requirements
SET
  color = '#0000FF',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Blue';

UPDATE
  belt_requirements
SET
  color = '#191970',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Blue Black';

UPDATE
  belt_requirements
SET
  color = '#90EE90',
  text_color = '#000000'
WHERE
  belt_rank = 'Green White';

UPDATE
  belt_requirements
SET
  color = '#008000',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Green';

UPDATE
  belt_requirements
SET
  color = '#006400',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Green Black';

UPDATE
  belt_requirements
SET
  color = '#D2691E',
  text_color = '#000000'
WHERE
  belt_rank = 'Brown White';

UPDATE
  belt_requirements
SET
  color = '#8B4513',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Brown';

UPDATE
  belt_requirements
SET
  color = '#654321',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Brown Black';

UPDATE
  belt_requirements
SET
  color = '#FFB6C1',
  text_color = '#000000'
WHERE
  belt_rank = 'Red White';

UPDATE
  belt_requirements
SET
  color = '#FF0000',
  text_color = '#FFFFFF'
WHERE
  belt_rank = 'Red';