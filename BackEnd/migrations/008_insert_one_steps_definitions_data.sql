-- Insert one_steps definitions data
-- Description: Populate one_steps_definitions table with Tang Soo Do one-step sparring techniques
INSERT INTO
  `one_steps_definitions` (
    `name`,
    `korean`,
    `belt`,
    `belt_color`,
    `description`,
    `attack`,
    `defense`,
    `key_points`,
    `common_mistakes`,
    `applications`
  )
VALUES
  (
    'Step 1 (Left)',
    'Il Su Sik',
    'Purple White',
    '#800080',
    'First basic one-step sequence for Purple White belt students.',
    'Right straight punch to chest',
    JSON_ARRAY(
      'Left outside block',
      'Right reverse punch counter',
      'Return to ready position'
    ),
    JSON_ARRAY(
      'Proper outside block technique',
      'Immediate counter after block',
      'Maintain balance throughout',
      'Strong chamber position'
    ),
    JSON_ARRAY(
      'Weak blocking technique',
      'Delayed counter attack',
      'Poor stance during block',
      'Not returning to ready'
    ),
    JSON_ARRAY(
      'Basic self-defense',
      'Timing development',
      'Block-counter combination'
    )
  ),
  (
    'Step 1 (Right)',
    'Il Su Sik',
    'Purple',
    '#800080',
    'First basic one-step sequence for Purple belt students (right side).',
    'Left straight punch to chest',
    JSON_ARRAY(
      'Right outside block',
      'Left reverse punch counter',
      'Return to ready position'
    ),
    JSON_ARRAY(
      'Mirror technique of step 1 left',
      'Strong right outside block',
      'Quick left counter punch',
      'Balanced execution'
    ),
    JSON_ARRAY(
      'Confusion with left/right sides',
      'Inconsistent block strength',
      'Poor counter timing',
      'Unbalanced stance'
    ),
    JSON_ARRAY(
      'Ambidextrous training',
      'Basic defense',
      'Coordination development'
    )
  ),
  (
    'Step 2 (Left)',
    'I Su Sik',
    'Orange White',
    '#FFA500',
    'Second one-step sequence for Orange White belt students (left side).',
    'Right straight punch to face',
    JSON_ARRAY(
      'Left inside block',
      'Right punch to ribs counter',
      'Left front kick follow-up',
      'Return to fighting stance'
    ),
    JSON_ARRAY(
      'Strong inside block deflection',
      'Immediate punch counter',
      'Smooth transition to kick',
      'Maintain forward pressure'
    ),
    JSON_ARRAY(
      'Weak inside block',
      'Pausing between techniques',
      'Poor kick timing',
      'Loss of balance'
    ),
    JSON_ARRAY(
      'Multiple counter attacks',
      'Close range combat',
      'Flow training'
    )
  ),
  (
    'Step 2 (Right)',
    'I Su Sik',
    'Orange White',
    '#FFA500',
    'Second one-step sequence for Orange White belt students (right side).',
    'Left straight punch to face',
    JSON_ARRAY(
      'Right inside block',
      'Left punch to ribs counter',
      'Right front kick follow-up',
      'Return to fighting stance'
    ),
    JSON_ARRAY(
      'Mirror technique of step 2 left',
      'Strong right inside block',
      'Quick left counter',
      'Smooth kick transition'
    ),
    JSON_ARRAY(
      'Confusion with mirror sides',
      'Weak inside block',
      'Poor combination flow',
      'Balance issues'
    ),
    JSON_ARRAY(
      'Ambidextrous combinations',
      'Defense training',
      'Multiple attack sequences'
    )
  ),
  (
    'Step 3 (Left)',
    'Sam Su Sik',
    'Orange',
    '#FFA500',
    'Third one-step sequence for Orange belt students (left side).',
    'Right straight punch to solar plexus',
    JSON_ARRAY(
      'Left low block',
      'Right uppercut counter',
      'Left roundhouse kick',
      'Return to ready stance'
    ),
    JSON_ARRAY(
      'Strong low block technique',
      'Powerful uppercut counter',
      'Quick kick transition',
      'Maintain aggressive pressure'
    ),
    JSON_ARRAY(
      'Weak low block',
      'Poor uppercut form',
      'Slow kick execution',
      'Loss of momentum'
    ),
    JSON_ARRAY(
      'Body attack defense',
      'Close range striking',
      'Advanced combinations'
    )
  ),
  (
    'Step 4 (Left)',
    'Sa Su Sik',
    'Green White',
    '#90EE90',
    'Fourth one-step sequence for Green White belt students (left side).',
    'Right straight punch to chest',
    JSON_ARRAY(
      'Left knife-hand block',
      'Right spear-hand strike',
      'Left side kick',
      'Return to fighting stance'
    ),
    JSON_ARRAY(
      'Precise knife-hand block',
      'Accurate spear-hand target',
      'Strong side kick execution',
      'Fluid technique transitions'
    ),
    JSON_ARRAY(
      'Sloppy knife-hand technique',
      'Poor spear-hand targeting',
      'Weak side kick',
      'Choppy movement flow'
    ),
    JSON_ARRAY(
      'Advanced blocking',
      'Precision striking',
      'Lateral attacks'
    )
  );