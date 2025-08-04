-- Create form_definitions table
CREATE TABLE form_definitions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_name VARCHAR(100) NOT NULL,
  korean_name VARCHAR(100),
  meaning VARCHAR(200),
  belt_rank VARCHAR(50) NOT NULL,
  belt_color VARCHAR(7) NOT NULL,
  belt_text_color VARCHAR(7) NOT NULL,
  difficulty_level INT NOT NULL,
  description TEXT,
  key_points JSON
);

-- Insert form definitions with curriculum-accurate data
INSERT INTO
  form_definitions (
    form_name,
    korean_name,
    meaning,
    belt_rank,
    belt_color,
    belt_text_color,
    difficulty_level,
    description,
    key_points
  )
VALUES
  (
    'Geicho Hyung Il Bu',
    '기초형 일부',
    'Basic Form #1',
    'Gold',
    '#FFD700',
    '#000000',
    1,
    'The first form taught in Tang Soo Do, focusing on basic stances, blocks, and punches. First half learned at Gold belt, complete form at Gold Black.',
    '["Maintain proper front stance throughout", "Sharp, decisive movements", "Proper chamber and extension", "Eye contact in direction of technique", "Correct low block execution", "Blocks with turns"]'
  ),
  (
    'Geicho Hyung Il Bu Sahm Gup',
    '기초형 일부 삼급',
    'Basic Form #1 Third Level',
    'Purple White',
    '#800080',
    '#FFFFFF',
    2,
    'Advanced version of the first basic form with additional front kicks.',
    '["Front kick and punch combinations", "Fluid transitions between techniques", "Precise timing and rhythm"]'
  ),
  (
    'Geicho Hyung Yi Bu',
    '기초형 이부',
    'Basic Form #2',
    'Purple',
    '#800080',
    '#FFFFFF',
    3,
    'Second basic form introducing multiple block techniques.',
    '["Proper inside, high, and outside block technique"]'
  ),
  (
    'Geicho Hyung Yi Bu Sahm Gup',
    '기초형 이부 삼급',
    'Basic Form #2 Third Level',
    'Orange White',
    '#FFA500',
    '#000000',
    4,
    'Advanced version of the second basic form with punches at nose and front kicks.',
    '["Block punch techniques", "Proper back stance execution"]'
  ),
  (
    'Geicho Hyung Sahm Bu',
    '기초형 삼부',
    'Basic Form #3',
    'Blue White',
    '#ADD8E6',
    '#000000',
    5,
    'Third basic form featuring complex blocks and advanced techniques.',
    '["Side punch and spin bottom fist techniques", "Emphasize proper back and staddle stances", "Proper stance transitions"]'
  ),
  (
    'Pyong An Cho Dan',
    '평안 초단',
    'Intermediate Form #1',
    'Blue Black',
    '#191970',
    '#FFFFFF',
    6,
    'First of the classical Pyong An forms, introducing traditional techniques.',
    '["Proper chops position and direction", "First complex footwork patterns"]'
  ),
  (
    'Pyong An Yi Dan',
    '평안 이단',
    'Intermediate Form #2',
    'Green White',
    '#90EE90',
    '#000000',
    7,
    'Second Pyong An form introducing cat stance and reinforced blocks.',
    '["Proper cat stance balance", "Reinforced blocking techniques", "Traditional combat applications", "Advanced jumping coordination"]'
  ),
  (
    'Pyong An Sahm Dan',
    '평안 삼단',
    'Intermediate Form #3',
    'Green Black',
    '#006400',
    '#FFFFFF',
    8,
    'Third Pyong An form with advanced techniques and applications.',
    '["Advanced balance techniques", "Traditional form applications", "Complex movement patterns"]'
  ),
  (
    'Pyong An Sa Dan',
    '평안 사단',
    'Intermediate Form #4',
    'Brown',
    '#8B4513',
    '#FFFFFF',
    9,
    'Fourth Pyong An form with advanced techniques.',
    '["Advanced combat applications", "Multiple opponent awareness", "Advanced breathing techniques", "Timing and distance management"]'
  ),
  (
    'Pyong An Oh Dan',
    '평안 오단',
    'Intermediate Form #5',
    'Brown Black',
    '#654321',
    '#FFFFFF',
    10,
    'Fifth and most advanced Pyong An form with complex techniques and applications.',
    '["Advanced level technique execution", "Complex jumping combinations"]'
  ),
  (
    'Bassai',
    '바사이',
    'Form of the rock',
    'Red',
    '#FF0000',
    '#FFFFFF',
    11,
    'Advanced classical form representing the penetration of a fortress. Requires mastery of all basic techniques.',
    '["Advanced level technique execution required", "Advanced power generation", "Complex timing and rhythm", "Traditional martial arts principles"]'
  ),
  (
    'National Tang Soo Do Congress Black Belt Form #1',
    '',
    '',
    '1st Black',
    '#000000',
    '#FFFFFF',
    12,
    'Official black belt form representing mastery of all basic Tang Soo Do techniques and principles.',
    '["Mastery of all basic techniques", "Advanced combat applications", "Traditional martial arts principles", "Complete physical and mental integration"]'
  );