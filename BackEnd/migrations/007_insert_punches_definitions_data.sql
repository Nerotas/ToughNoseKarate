-- Insert punches definitions data
-- Description: Populate punches_definitions table with Tang Soo Do punch techniques
INSERT INTO
  `punches_definitions` (
    `name`,
    `korean`,
    `belt`,
    `belt_color`,
    `description`,
    `target`,
    `execution`,
    `key_points`,
    `common_mistakes`,
    `applications`
  )
VALUES
  (
    'Center Punch',
    'Ga Un De Ji Ru Gi',
    'White Belt',
    '#FFFFFF',
    'A direct, linear punch thrown to the center of the target, forming the foundation of Tang Soo Do striking techniques.',
    'Solar plexus, Ribs, Chest',
    JSON_ARRAY(
      'Rotate fist 180 degrees during extension',
      'Drive from legs through core',
      'Strike with first two knuckles',
      'Pull opposite hand to hip chamber'
    ),
    JSON_ARRAY(
      'Strike with first two knuckles only',
      'Keep wrist straight and strong',
      'Rotate fist 180 degrees during extension',
      'Pull opposite hand to hip chamber',
      'Generate power from legs and core rotation'
    ),
    JSON_ARRAY(
      'Dropping punching hand before striking',
      'Leaving opposite hand extended',
      'Punching with wrong knuckles',
      'Poor wrist alignment causing injury',
      'Not rotating fist during punch'
    ),
    JSON_ARRAY(
      'Direct attack',
      'Counter attack',
      'Combination starter'
    )
  ),
  (
    'Reverse Punch',
    'Ban Dae Ji Ru Gi',
    'White Belt',
    '#FFFFFF',
    'A powerful punch thrown with the rear hand, utilizing full body rotation for maximum power generation.',
    'Solar plexus, Chest, Face',
    JSON_ARRAY(
      'Full hip and shoulder rotation',
      'Drive power from back leg',
      'Chamber opposite hand strongly',
      'Snap punch at full extension'
    ),
    JSON_ARRAY(
      'Maximum hip and shoulder rotation',
      'Drive power from back leg',
      'Chamber opposite hand strongly',
      'Snap punch at full extension',
      'Maintain proper stance throughout'
    ),
    JSON_ARRAY(
      'Insufficient hip rotation',
      'Leaning forward during punch',
      'Not chambering opposite hand',
      'Telegraphing the punch',
      'Poor timing with footwork'
    ),
    JSON_ARRAY(
      'Power strike',
      'Finishing technique',
      'Breaking'
    )
  ),
  (
    'Jab Punch',
    'Jab Ji Ru Gi',
    'White Belt',
    '#FFFFFF',
    'A quick, snapping punch with the lead hand used for timing, distance, and setting up combinations.',
    'Face, Nose, Solar plexus',
    JSON_ARRAY(
      'Quick extension from chamber',
      'Minimal body movement',
      'Fast retraction after impact',
      'Keep rear hand in guard position'
    ),
    JSON_ARRAY(
      'Speed over power',
      'Minimal telegraphing',
      'Quick retraction after impact',
      'Use for timing and distance',
      'Keep rear hand in guard position'
    ),
    JSON_ARRAY(
      'Using too much power, losing speed',
      'Dropping guard after punch',
      'Overextending the arm',
      'Poor timing and distance',
      'Not retracting quickly enough'
    ),
    JSON_ARRAY(
      'Timing tool',
      'Distance measurement',
      'Combination setup'
    )
  ),
  (
    'Side Punch',
    'Yup Ji Ru Gi',
    'Purple Belt',
    '#800080',
    'A punch delivered to the side while in a side stance, using the knuckles to strike lateral targets.',
    'Ribs, Kidneys, Side targets',
    JSON_ARRAY(
      'Maintain side stance throughout',
      'Full body rotation for power',
      'Strike with first two knuckles',
      'Follow through completely'
    ),
    JSON_ARRAY(
      'Maintain side stance throughout',
      'Full body rotation for power',
      'Strike with first two knuckles',
      'Follow through completely',
      'Keep opposite hand chambered'
    ),
    JSON_ARRAY(
      'Losing side stance position',
      'Insufficient body rotation',
      'Poor targeting',
      'Weak follow through',
      'Dropping guard hand'
    ),
    JSON_ARRAY(
      'Side attack',
      'Lateral striking',
      'Close range combat'
    )
  ),
  (
    'Hook Punch',
    'Hook Ji Ru Gi',
    'Blue Belt',
    '#0000FF',
    'A circular punch that travels in a horizontal arc to strike targets from the side.',
    'Head, Ribs, Liver',
    JSON_ARRAY(
      'Circular arm motion',
      'Rotate from core',
      'Strike with knuckles',
      'Follow circular path'
    ),
    JSON_ARRAY(
      'Maintain circular motion',
      'Generate power from core rotation',
      'Keep elbow at proper angle',
      'Follow through completely',
      'Maintain balance throughout'
    ),
    JSON_ARRAY(
      'Making motion too wide',
      'Poor core rotation',
      'Wrong elbow angle',
      'Telegraphing the punch',
      'Losing balance'
    ),
    JSON_ARRAY(
      'Side attack',
      'Combination technique',
      'Close range striking'
    )
  ),
  (
    'Uppercut',
    'Uppercut Ji Ru Gi',
    'Blue Belt',
    '#0000FF',
    'An upward traveling punch that strikes targets from below using an ascending motion.',
    'Chin, Solar plexus, Body',
    JSON_ARRAY(
      'Upward striking motion',
      'Drive from legs',
      'Strike with knuckles upward',
      'Short compact motion'
    ),
    JSON_ARRAY(
      'Drive power from legs upward',
      'Keep motion short and compact',
      'Strike with proper knuckles',
      'Maintain balance throughout',
      'Quick recovery to guard'
    ),
    JSON_ARRAY(
      'Making motion too wide',
      'Poor leg drive',
      'Overextending upward',
      'Losing balance',
      'Slow recovery'
    ),
    JSON_ARRAY(
      'Close range striking',
      'Body attack',
      'Combination finishing'
    )
  );