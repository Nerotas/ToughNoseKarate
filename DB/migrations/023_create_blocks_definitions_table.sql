-- Migration: 023_create_blocks_definitions_table.sql
-- Description: Create blocks_definitions table for storing block technique details
CREATE TABLE IF NOT EXISTS blocks_definitions (
  id SERIAL PRIMARY KEY,
  block_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  technique VARCHAR(200) NOT NULL,
  stance VARCHAR(100) NOT NULL,
  execution _text NOT NULL DEFAULT '{}',
  key_points _text NOT NULL DEFAULT '{}',
  common_mistakes _text NOT NULL DEFAULT '{}',
  applications _text NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on block_name for faster lookups
CREATE INDEX IF NOT EXISTS idx_blocks_definitions_block_name ON blocks_definitions(block_name);

-- Insert initial block definitions based on belt requirements
INSERT INTO
  blocks_definitions (
    block_name,
    description,
    technique,
    stance,
    execution,
    key_points,
    common_mistakes,
    applications
  )
VALUES
  (
    'low',
    'Low block - downward blocking motion',
    'Downward sweeping block',
    'front',
    ARRAY ['Start with blocking arm across body', 'Sweep downward to protect lower body', 'End with forearm parallel to thigh'],
    ARRAY ['Keep elbow bent at 90 degrees', 'Block with forearm, not wrist', 'Maintain proper stance'],
    ARRAY ['Dropping elbow too low', 'Using wrist instead of forearm', 'Poor stance foundation'],
    ARRAY ['Block low kicks', 'Deflect downward strikes', 'Counter-attack preparation']
  ),
  (
    'knife_hand',
    'Knife hand block - using edge of hand',
    'Blocking with knife hand position',
    'front',
    ARRAY ['Form knife hand with fingers together', 'Strike with outside edge of hand', 'Follow through with blocking motion'],
    ARRAY ['Keep fingers tight together', 'Use edge of hand for contact', 'Maintain wrist alignment'],
    ARRAY ['Loose fingers', 'Wrong contact area', 'Weak wrist position'],
    ARRAY ['Block strikes to neck area', 'Counter-strike preparation', 'Close-range defense']
  ),
  (
    'high',
    'High block - upward blocking motion',
    'Upward blocking technique',
    'front',
    ARRAY ['Raise blocking arm overhead', 'Protect head and upper body', 'Maintain defensive posture'],
    ARRAY ['Block with forearm', 'Keep elbow at proper angle', 'Protect head area'],
    ARRAY ['Blocking too high', 'Weak arm position', 'Poor timing'],
    ARRAY ['Block overhead strikes', 'Defend against high attacks', 'Create opening for counter']
  ),
  (
    'inside',
    'Inside block - inward blocking motion',
    'Blocking from outside to inside',
    'front',
    ARRAY ['Start with arm extended outward', 'Sweep inward across body', 'End in protective position'],
    ARRAY ['Use forearm for blocking surface', 'Maintain elbow position', 'Control distance'],
    ARRAY ['Over-blocking', 'Wrong arm position', 'Poor follow-through'],
    ARRAY ['Deflect straight punches', 'Redirect incoming strikes', 'Set up counter-attacks']
  ),
  (
    'outside',
    'Outside block - outward blocking motion',
    'Blocking from inside to outside',
    'front',
    ARRAY ['Start with arm across body', 'Sweep outward', 'End with arm extended'],
    ARRAY ['Block with outer forearm', 'Keep proper distance', 'Maintain balance'],
    ARRAY ['Over-extending', 'Wrong blocking surface', 'Loss of balance'],
    ARRAY ['Deflect cross punches', 'Open opponent guard', 'Create counter opportunities']
  ),
  (
    'block_punch',
    'Block and punch combination',
    'Simultaneous block and counter-punch',
    'front',
    ARRAY ['Execute block with one arm', 'Simultaneously punch with other arm', 'Coordinate both movements'],
    ARRAY ['Time both techniques together', 'Maintain proper stance', 'Use opposite arms'],
    ARRAY ['Poor timing', 'Uncoordinated movements', 'Weak techniques'],
    ARRAY ['Simultaneous defense and offense', 'Counter-attack while blocking', 'Advanced technique application']
  ),
  (
    'double_block',
    'Double block technique',
    'Using both arms to block',
    'front',
    ARRAY ['Position both arms for blocking', 'Execute simultaneous blocking motion', 'Create strong defensive wall'],
    ARRAY ['Coordinate both arms', 'Maintain proper spacing', 'Keep balanced stance'],
    ARRAY ['Uneven arm positions', 'Poor coordination', 'Weak defensive structure'],
    ARRAY ['Block powerful attacks', 'Defend against multiple strikes', 'Strengthen defense']
  ),
  (
    'chop_low',
    'Low chop block',
    'Downward chopping block motion',
    'front',
    ARRAY ['Use knife hand position', 'Execute downward chopping motion', 'Target lower attacks'],
    ARRAY ['Sharp chopping action', 'Proper knife hand form', 'Good timing'],
    ARRAY ['Weak chopping motion', 'Poor hand position', 'Incorrect targeting'],
    ARRAY ['Counter low attacks', 'Aggressive blocking', 'Strike while blocking']
  ),
  (
    'chop_high',
    'High chop block',
    'Upward chopping block motion',
    'front',
    ARRAY ['Form proper knife hand', 'Execute upward chopping motion', 'Protect upper body'],
    ARRAY ['Strong chopping action', 'Proper hand formation', 'Good defensive position'],
    ARRAY ['Weak technique', 'Poor hand form', 'Inadequate protection'],
    ARRAY ['Block high attacks', 'Aggressive defense', 'Counter-strike preparation']
  ),
  (
    'double_block_punch',
    'Double block with punch',
    'Complex blocking and striking combination',
    'front',
    ARRAY ['Execute double block first', 'Follow with punch technique', 'Coordinate all movements'],
    ARRAY ['Smooth transition', 'Proper timing', 'Maintain balance throughout'],
    ARRAY ['Jerky movements', 'Poor timing', 'Loss of balance'],
    ARRAY ['Advanced defense-offense combo', 'Multiple opponent scenarios', 'Complex technique application']
  ),
  (
    'reinforced_outside',
    'Reinforced outside block',
    'Outside block with reinforcing arm',
    'front',
    ARRAY ['Execute outside block with primary arm', 'Support with other arm', 'Create stronger blocking structure'],
    ARRAY ['Both arms work together', 'Maintain proper angles', 'Strong defensive position'],
    ARRAY ['Poor arm coordination', 'Weak reinforcement', 'Incorrect angles'],
    ARRAY ['Block powerful strikes', 'Defend against strong opponents', 'Enhanced blocking power']
  );

-- Update the updated_at timestamp when records are modified
CREATE
OR REPLACE FUNCTION update_blocks_definitions_updated_at() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;

RETURN NEW;

END;

$ $ language 'plpgsql';

CREATE TRIGGER update_blocks_definitions_updated_at BEFORE
UPDATE
  ON blocks_definitions FOR EACH ROW EXECUTE FUNCTION update_blocks_definitions_updated_at();