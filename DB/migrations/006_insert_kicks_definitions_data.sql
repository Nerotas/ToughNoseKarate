-- Insert kicks definitions data
-- Description: Populate kicks_definitions table with Tang Soo Do kick techniques
INSERT INTO
  `kicks_definitions` (
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
    'Front Kick',
    'Ahp Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A straight, linear kick using the ball of the foot or heel to strike forward.',
    'Solar plexus, Ribs, Knee, Groin',
    JSON_ARRAY(
      'Chamber knee to chest level',
      'Extend leg straight forward',
      'Strike with ball of foot',
      'Snap leg back after impact'
    ),
    JSON_ARRAY(
      'Chamber knee to chest level',
      'Keep supporting leg slightly bent',
      'Strike with ball of foot',
      'Snap leg back after impact',
      'Maintain balance throughout'
    ),
    JSON_ARRAY(
      'Not chambering knee high enough',
      'Kicking with toes instead of ball of foot',
      'Leaning back during kick',
      'Not snapping leg back',
      'Poor balance on supporting leg'
    ),
    JSON_ARRAY(
      'Distance keeping',
      'Solar plexus attack',
      'Knee strike'
    )
  ),
  (
    'Roundhouse Kick',
    'Dol Lyeo Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A circular kick using the top of the foot or shin to strike the side of the target.',
    'Ribs, Liver, Head, Thigh',
    JSON_ARRAY(
      'Chamber knee to side',
      'Rotate hips completely',
      'Whip leg in circular motion',
      'Strike with top of foot'
    ),
    JSON_ARRAY(
      'Chamber knee to side',
      'Rotate hips completely',
      'Strike with top of foot',
      'Keep supporting leg stable',
      'Follow through with hip rotation'
    ),
    JSON_ARRAY(
      'Not rotating hips enough',
      'Kicking in straight line instead of arc',
      'Poor chamber position',
      'Striking with shin instead of foot',
      'Losing balance on pivot foot'
    ),
    JSON_ARRAY('Side attack', 'Liver shot', 'Head kick')
  ),
  (
    'Stepping Kick',
    'Ddim Bal Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A kick performed while stepping forward to close distance and add momentum.',
    'Solar plexus, Ribs, Thigh',
    JSON_ARRAY(
      'Step forward with supporting leg',
      'Execute kick with rear leg',
      'Use stepping momentum for power',
      'Chamber kick properly after step'
    ),
    JSON_ARRAY(
      'Step with supporting leg first',
      'Maintain balance during transition',
      'Use stepping momentum for power',
      'Chamber kick properly after step',
      'Follow through completely'
    ),
    JSON_ARRAY(
      'Stepping and kicking simultaneously',
      'Poor balance during step',
      'Not using stepping momentum',
      'Telegraphing the kick',
      'Incomplete follow through'
    ),
    JSON_ARRAY(
      'Distance closing',
      'Surprise attack',
      'Combination starter'
    )
  ),
  (
    'Slide Up Kick',
    'Miluh Ol Li Gi Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A quick sliding motion followed by a kick to surprise the opponent.',
    'Solar plexus, Ribs, Thigh',
    JSON_ARRAY(
      'Slide rear foot forward',
      'Execute quick kick',
      'Maintain low profile during slide',
      'Explosive kick after positioning'
    ),
    JSON_ARRAY(
      'Smooth sliding motion',
      'Quick execution after slide',
      'Maintain low profile during slide',
      'Explosive kick after positioning',
      'Return to ready stance'
    ),
    JSON_ARRAY(
      'Telegraphing slide motion',
      'Poor timing between slide and kick',
      'Rising too high during slide',
      'Weak kick execution',
      'Poor recovery'
    ),
    JSON_ARRAY(
      'Surprise attack',
      'Distance closing',
      'Counter attack'
    )
  ),
  (
    'Side Kick',
    'Yuhp Cha Gi',
    'Orange Belt',
    '#FFA500',
    'A powerful lateral kick using the edge of the foot to strike to the side.',
    'Ribs, Knee, Head',
    JSON_ARRAY(
      'Chamber knee high to side',
      'Pivot on supporting foot',
      'Extend leg sideways',
      'Strike with edge of foot'
    ),
    JSON_ARRAY(
      'Chamber knee high to side',
      'Pivot supporting foot completely',
      'Strike with edge of foot',
      'Keep body sideways',
      'Maintain balance throughout'
    ),
    JSON_ARRAY(
      'Not chambering high enough',
      'Poor pivot on supporting foot',
      'Striking with flat of foot',
      'Body facing forward',
      'Poor balance'
    ),
    JSON_ARRAY(
      'Powerful side attack',
      'Breaking through guard',
      'Distance control'
    )
  ),
  (
    'Inside Crescent Kick',
    'An Dahl Li Gi Cha Gi',
    'Green Belt',
    '#90EE90',
    'A sweeping kick that moves from outside to inside in a crescent motion.',
    'Head, Ribs, Arms',
    JSON_ARRAY(
      'Raise leg to outside',
      'Sweep leg in crescent motion inward',
      'Strike with inside edge of foot',
      'Follow through across body'
    ),
    JSON_ARRAY(
      'Start kick from outside position',
      'Keep leg straight during sweep',
      'Strike with inside edge of foot',
      'Maintain balance on supporting leg',
      'Control the sweep motion'
    ),
    JSON_ARRAY(
      'Bending knee during sweep',
      'Poor starting position',
      'Striking with wrong part of foot',
      'Losing balance',
      'Incomplete sweep motion'
    ),
    JSON_ARRAY('Weapon disarming', 'Head attack', 'Arm strike')
  );