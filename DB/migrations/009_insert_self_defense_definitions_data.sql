-- Insert self_defense definitions data
-- Description: Populate self_defense_definitions table with Tang Soo Do self-defense techniques
INSERT INTO
  `self_defense_definitions` (
    `name`,
    `korean`,
    `belt`,
    `belt_color`,
    `description`,
    `category`,
    `difficulty`,
    `scenario`,
    `technique`,
    `setup`,
    `execution`,
    `key_points`,
    `common_mistakes`,
    `applications`
  )
VALUES
  (
    'Release Front Grab (Basic)',
    'Ap Jab Gi Hae Je',
    'Green White',
    '#90EE90',
    'Basic technique to escape from a front lapel or shirt grab.',
    'Releases',
    'Beginner',
    'Opponent grabs your shirt or lapel from the front',
    'Simple circular hand motion to break grip',
    JSON_ARRAY(
      'Opponent grabs your shirt with one hand',
      'Maintain balance and stay calm',
      'Assess the situation quickly'
    ),
    JSON_ARRAY(
      'Raise both arms up and to the sides',
      'Bring arms down in circular motion',
      'Strike through opponent\'s thumbs (weakest point)',
      'Step back to create distance',
      'Prepare counter-attack if needed'
    ),
    JSON_ARRAY(
      'Strike at the thumbs, not the strong grip',
      'Use circular motion, not straight pull',
      'Immediate movement after release',
      'Basic footwork for distance'
    ),
    JSON_ARRAY(
      'Pulling straight back against strong grip',
      'Not moving through the thumbs',
      'Standing still after release',
      'Panic instead of technique'
    ),
    JSON_ARRAY(
      'Basic street self-defense',
      'De-escalation situations',
      'Introduction to releases'
    )
  ),
  (
    'Release Rear Grab (Basic)',
    'Dwi Jab Gi Hae Je',
    'Green White',
    '#90EE90',
    'Basic technique to escape from someone grabbing from behind.',
    'Releases',
    'Beginner',
    'Opponent grabs your shirt or arms from behind',
    'Simple turn and break technique',
    JSON_ARRAY(
      'Opponent grabs from behind',
      'Feel the direction of the grab',
      'Maintain balance and composure'
    ),
    JSON_ARRAY(
      'Drop your weight slightly',
      'Turn quickly to the outside',
      'Raise arms and break at weak point',
      'Face the attacker',
      'Create distance immediately'
    ),
    JSON_ARRAY(
      'Turn into the technique, not away',
      'Use body weight to assist break',
      'Quick decisive movement',
      'Always face the threat after escape'
    ),
    JSON_ARRAY(
      'Turning the wrong direction',
      'Not dropping weight first',
      'Slow or hesitant movement',
      'Not creating distance after escape'
    ),
    JSON_ARRAY(
      'Rear attack defense',
      'Grab escape fundamentals',
      'Basic positioning'
    )
  ),
  (
    'Basic Wrist Control',
    'Gi Bon Son Mok Control',
    'Green White',
    '#90EE90',
    'Fundamental technique for controlling and redirecting an opponent\'s wrist grab.',
    'Wrist Control',
    'Beginner',
    'Opponent grabs your wrist with one hand',
    'Basic leverage and rotation to control wrist',
    JSON_ARRAY(
      'Opponent grabs your wrist',
      'Remain calm and assess grip',
      'Position for leverage'
    ),
    JSON_ARRAY(
      'Rotate wrist toward opponent\'s thumb',
      'Apply leverage with other hand',
      'Step to create better angle',
      'Control opponent\'s balance',
      'Create distance or counter'
    ),
    JSON_ARRAY(
      'Attack the grip weakness (thumb side)',
      'Use both hands for leverage',
      'Step for better positioning',
      'Control opponent\'s movement'
    ),
    JSON_ARRAY(
      'Fighting against the strong grip',
      'Using only one hand',
      'Poor foot positioning',
      'Not following through'
    ),
    JSON_ARRAY(
      'Grip escape basics',
      'Control techniques',
      'Fundamental leverage'
    )
  ),
  (
    'Bear Hug Escape (Basic)',
    'Gom Po Ong Tal Chul',
    'Green Belt',
    '#008000',
    'Escape technique for when grabbed in a bear hug from behind.',
    'Escapes',
    'Intermediate',
    'Opponent wraps arms around you from behind in bear hug',
    'Multi-step escape using body mechanics and strikes',
    JSON_ARRAY(
      'Opponent applies bear hug from behind',
      'Lower center of gravity',
      'Assess arm position (over or under arms)'
    ),
    JSON_ARRAY(
      'Drop weight and widen stance',
      'Grab opponent\'s hands or forearms',
      'Step wide to one side',
      'Turn into opponent',
      'Strike with elbow or hand',
      'Create distance'
    ),
    JSON_ARRAY(
      'Drop weight immediately',
      'Grab opponent\'s limbs for control',
      'Step wide for leverage',
      'Turn aggressively',
      'Strike decisively'
    ),
    JSON_ARRAY(
      'Standing too tall',
      'Not controlling opponent\'s arms',
      'Small steps instead of wide',
      'Weak turn',
      'Hesitant striking'
    ),
    JSON_ARRAY(
      'Close contact defense',
      'Multiple attacker preparation',
      'Advanced escape sequences'
    )
  ),
  (
    'Punch Counter (Basic)',
    'Gi Bon Ji Ru Gi Bang Eo',
    'Green Belt',
    '#008000',
    'Basic defensive technique against incoming punches.',
    'Counters',
    'Intermediate',
    'Opponent throws straight punch at you',
    'Block and immediate counter-attack sequence',
    JSON_ARRAY(
      'Opponent chambers for punch',
      'Read attack timing',
      'Prepare defensive stance'
    ),
    JSON_ARRAY(
      'Execute appropriate block (inside/outside)',
      'Immediately counter with punch or strike',
      'Move off centerline',
      'Follow through with combination',
      'Create distance or control'
    ),
    JSON_ARRAY(
      'Quick block execution',
      'Immediate counter-attack',
      'Move off attack line',
      'Strong follow-through',
      'Distance management'
    ),
    JSON_ARRAY(
      'Slow block timing',
      'Delayed counter',
      'Standing in attack line',
      'Weak follow-through',
      'Poor distance control'
    ),
    JSON_ARRAY(
      'Basic fighting skills',
      'Counter-attack timing',
      'Block-strike combinations'
    )
  ),
  (
    'Ground Escape (Advanced)',
    'Ddang Wi Tal Chul',
    'Green Black',
    '#006400',
    'Advanced technique for escaping when taken to the ground.',
    'Ground Defense',
    'Advanced',
    'Opponent has taken you to the ground and is on top',
    'Multi-phase escape using leverage, positioning, and striking',
    JSON_ARRAY(
      'Assess position on ground',
      'Protect vital areas',
      'Control opponent\'s posture',
      'Look for escape opportunities'
    ),
    JSON_ARRAY(
      'Secure opponent\'s arms or clothing',
      'Bridge hip to create space',
      'Turn to escape mount/side control',
      'Use knees and elbows for strikes',
      'Get to feet safely',
      'Create distance'
    ),
    JSON_ARRAY(
      'Control opponent\'s posture first',
      'Use bridge and turn technique',
      'Strike to create opportunities',
      'Priority is getting to feet',
      'Always create distance after escape'
    ),
    JSON_ARRAY(
      'Panic instead of technique',
      'Not controlling opponent',
      'Poor bridging technique',
      'Staying on ground too long',
      'Not creating distance'
    ),
    JSON_ARRAY(
      'Ground fighting basics',
      'Multiple position escapes',
      'Real-world defense scenarios'
    )
  );