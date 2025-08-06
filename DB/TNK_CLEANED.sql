-- Cleaned ToughNose Karate Database Schema
-- Removed unused tables based on frontend API usage analysis
-- Database setup
CREATE DATABASE IF NOT EXISTS `toughnosekarate`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
;

USE `toughnosekarate`;

-- Core Tables (KEEP - Used by Frontend)
-- 1. Instructors (Authentication & User Management)
CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` enum('instructor', 'admin') DEFAULT 'instructor',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- 2. Students (Core student management)
CREATE TABLE `students` (
  `studentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `preferedName` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `beltRank` varchar(45) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `lastTest` date DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `notes` longtext,
  `active` tinyint(1) DEFAULT '1',
  `eligibleForTesting` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`studentid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- 3. Belt Requirements (Belt progression system)
CREATE TABLE `belt_requirements` (
  `belt_order` int NOT NULL,
  `belt_rank` varchar(45) NOT NULL,
  `forms` json NOT NULL,
  `stances` json NOT NULL,
  `blocks` json NOT NULL,
  `punches` json NOT NULL,
  `kicks` json NOT NULL,
  `jumps` json NOT NULL,
  `falling` json NOT NULL,
  `one_steps` json NOT NULL,
  `self_defense` json NOT NULL,
  `comments` mediumtext,
  `color` varchar(7) DEFAULT NULL COMMENT 'Hex color code for belt display (e.g. #FFFFFF)',
  `text_color` varchar(7) DEFAULT NULL COMMENT 'Hex color code for text on belt (e.g. #000000)',
  PRIMARY KEY (`belt_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- 4. Form Definitions (Teaching content for forms)
CREATE TABLE `form_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `form_name` varchar(100) NOT NULL,
  `korean_name` varchar(100) NOT NULL,
  `meaning` varchar(200) NOT NULL,
  `belt_rank` varchar(50) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `belt_text_color` varchar(7) NOT NULL DEFAULT '#000000',
  `difficulty_level` int NOT NULL,
  `description` text,
  `video_link` varchar(500) DEFAULT NULL,
  `key_points` text NOT NULL,
  `active_indicator` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_belt_rank` (`belt_rank`),
  KEY `idx_difficulty_level` (`difficulty_level`),
  KEY `idx_active_indicator` (`active_indicator`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- 5. Kicks Definitions (Teaching content for kicks)
CREATE TABLE `kicks_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `target` text NOT NULL,
  `execution` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- 6. Parent Management Tables (Family structure)
CREATE TABLE `parents` (
  `parentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `notes` longtext,
  PRIMARY KEY (`parentid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `parent_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parentid` int NOT NULL,
  `studentid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_mapping_ibfk_1` (`parentid`),
  KEY `parent_mapping_ibfk_2` (`studentid`),
  CONSTRAINT `parent_mapping_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `parents` (`parentid`),
  CONSTRAINT `parent_mapping_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Definition Tables (Teaching Content - All used by Frontend)
-- Note: These are referenced by frontend components for educational content
-- Punches Definitions
CREATE TABLE `punches_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `target` text NOT NULL,
  `execution` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Stance Definitions
CREATE TABLE `stance_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- One Step Definitions
CREATE TABLE `onestep_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `attack_type` varchar(100) NOT NULL,
  `defense_sequence` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Self Defense Definitions
CREATE TABLE `self_defense_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `attack_scenario` text NOT NULL,
  `defense_sequence` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Views (Keep if used)
-- Note: These may be used by backend services even if not directly called by frontend
-- Family view for parent-student relationships
CREATE VIEW `families` AS
SELECT
  pm.parentid,
  pm.studentid,
  s.firstName,
  s.lastName,
  s.preferedName,
  p.firstName AS parentFirstName,
  p.lastName AS parentLastName,
  s.age,
  s.beltRank,
  s.startDate,
  s.endDate,
  s.lastTest,
  s.email,
  s.phone,
  s.notes,
  s.active,
  s.eligibleForTesting
FROM
  parent_mapping pm
  JOIN students s ON pm.studentid = s.studentid
  JOIN parents p ON pm.parentid = p.parentid;

-- REMOVED TABLES (Not used by frontend):
-- ❌ blocks - No frontend API calls found
-- ❌ combinations - No frontend API calls found
-- ❌ falling - No frontend API calls found
-- ❌ forms - No frontend API calls found (uses form_definitions instead)
-- ❌ kicks - No frontend API calls found (uses kicks_definitions instead)
-- ❌ one_steps - No frontend API calls found (uses onestep_definitions instead)
-- ❌ punches - No frontend API calls found (uses punches_definitions instead)
-- ❌ stances - No frontend API calls found (uses stance_definitions instead)
-- ❌ student_tests - No frontend API calls found
-- ❌ test_results - No frontend API calls found
-- Insert existing data for belt requirements (keeping the essential data)
INSERT INTO
  `belt_requirements`
VALUES
  (
    1,
    'White',
    '[]',
    '[\"ready\", \"straddle\", \"front\", \"fighting\", \"bowing\"]',
    '[\"low\", \"knife_hand\"]',
    '[\"center\", \"reverse\", \"jab\"]',
    '[\"front\", \"round\", \"stepping_kick\", \"slide_up_kick\"]',
    '[]',
    '[\"backwards\"]',
    '[]',
    '[]',
    'Reasons for Kiai: More power, Not get air knocked out, Scare opponent, Clear mind, Draw attention',
    '#FFFFFF',
    '#000000'
  ),
  (
    2,
    'Gold White',
    '[]',
    '[\"back\"]',
    '[\"high\"]',
    '[]',
    '[\"side\"]',
    '[\"jump_phase_1\"]',
    '[\"forwards\"]',
    '[]',
    '[]',
    NULL,
    '#FFD700',
    '#000000'
  ),
  (
    3,
    'Gold',
    '[\"geicho_hyung_il_bu\"]',
    '[\"shifting\"]',
    '[\"inside\"]',
    '[]',
    '[]',
    '[]',
    '[\"forward_roll\"]',
    '[]',
    '[]',
    '1st half of Geicho Hyung Il Bu, Begin sparring',
    '#FFD700',
    '#000000'
  ),
  (
    4,
    'Gold Black',
    '[\"geicho_hyung_il_bu\"]',
    '[]',
    '[\"block_punch\"]',
    '[]',
    '[\"spin_back\"]',
    '[\"jump_phase_2\"]',
    '[]',
    '[]',
    '[]',
    'All of  Geicho Hyung Il Bu',
    '#DAA520',
    '#FFFFFF'
  ),
  (
    5,
    'Purple White',
    '[\"geicho_hyung_il_bu_sahm_gup\"]',
    '[]',
    '[\"outside\"]',
    '[]',
    '[\"back\"]',
    '[\"jump_phase_3\"]',
    '[]',
    '[\"step_1_left\"]',
    '[]',
    NULL,
    '#800080',
    '#FFFFFF'
  ),
  (
    6,
    'Purple',
    '[\"geicho_hyung_yi_bu\"]',
    '[]',
    '[]',
    '[\"side\", \"spin_bottom_fist\"]',
    '[]',
    '[]',
    '[]',
    '[\"step_1_right\"]',
    '[]',
    NULL,
    '#800080',
    '#FFFFFF'
  ),
  (
    7,
    'Orange White',
    '[\"geicho_hyung_yi_bu_sahm_gup\"]',
    '[]',
    '[]',
    '[\"charging\"]',
    '[\"double_round\", \"inside_crescent\", \"outside_crescent\"]',
    '[]',
    '[]',
    '[\"step_2_left\", \"step_2_right\"]',
    '[]',
    NULL,
    '#FFA500',
    '#000000'
  ),
  (
    8,
    'Orange',
    '[]',
    '[]',
    '[\"double_block\"]',
    '[\"hook\", \"upper_cut\"]',
    '[\"stepping_kick\"]',
    '[\"jump_spin_back_phase_1\"]',
    '[]',
    '[\"step_3_left\", \"step_3_right\"]',
    '[]',
    'Simple Double Blocks',
    '#FFA500',
    '#FFFFFF'
  ),
  (
    9,
    'Blue White',
    '[\"geicho_hyung_sahm_bu\"]',
    '[]',
    '[\"chop_low\", \"chop_high\"]',
    '[\"slide_up_jab_punch\"]',
    '[\"spin_outside_crescent\"]',
    '[\"jump_phase_4\"]',
    '[]',
    '[\"step_4_left\", \"step_4_right\", \"step_1_followup\", \"step_2_followup\", \"step_3_followup\"]',
    '[]',
    'Complex Double Blocks',
    '#ADD8E6',
    '#000000'
  ),
  (
    10,
    'Blue',
    '[]',
    '[]',
    '[\"double_block_punch\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"step_1_followup\", \"step_2_followup\"]',
    '[]',
    NULL,
    '#0000FF',
    '#FFFFFF'
  ),
  (
    11,
    'Blue Black',
    '[\"pyong_an_cho_dan\"]',
    '[]',
    '[]',
    '[]',
    '[\"jump_spin_outside_crescent\", \"studder_step\"]',
    '[]',
    '[]',
    '[\"step_3_followup\", \"step_4_followup\"]',
    '[]',
    NULL,
    '#191970',
    '#FFFFFF'
  ),
  (
    12,
    'Green White',
    '[\"pyong_an_yi_dan\"]',
    '[\"cat\"]',
    '[\"reinforced_outside\"]',
    '[\"spearhand\"]',
    '[]',
    '[\"phase_5\", \"phase_6\"]',
    '[]',
    '[\"traditional_done_at_random\"]',
    '[\"release_front_grab\", \"release_rear_grab\", \"release_arm_bar\", \"apply_rear_choke\"]',
    'Moving backwards and turning with basics',
    '#90EE90',
    '#000000'
  ),
  (
    13,
    'Green',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"hook\", \"spin_heel\"]',
    '[]',
    '[]',
    '[\"made_up_1_right\"]',
    '[\"bulldog\", \"cross_face\", \"arm_lock\", \"headlock_escape\", \"wristlocks\"]',
    NULL,
    '#008000',
    '#FFFFFF'
  ),
  (
    14,
    'Green Black',
    '[\"pyong_an_sahm_dan\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"made_up_2_left\"]',
    '[\"figure_4\"]',
    NULL,
    '#006400',
    '#FFFFFF'
  ),
  (
    15,
    'Brown White',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"butterfly_kick\"]',
    '[]',
    '[\"made_up_3_right\"]',
    '[\"bear_hug_front\", \"bear_hug_back\", \"americana\", \"kimura\", \"arm_bar_guard\", \"arm_bar_mount\", \"escape_guard\"]',
    'Head contact while sparring allowed',
    '#D2691E',
    '#000000'
  ),
  (
    16,
    'Brown',
    '[\"pyong_an_sa_dan\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"made_up_4_left\"]',
    '[]',
    'At least 2 ground techniques',
    '#8B4513',
    '#FFFFFF'
  ),
  (
    17,
    'Brown Black',
    '[\"pyong_an_oh_dan\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"three_steps_1_right\"]',
    '[]',
    'At least 3 ground techniques',
    '#654321',
    '#FFFFFF'
  ),
  (
    18,
    'Red White',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"three_steps_2_left\"]',
    '[]',
    'All ground techniques',
    '#FFB6C1',
    '#000000'
  ),
  (
    19,
    'Red',
    '[\"bassai\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[\"three_steps_3_right\"]',
    '[]',
    NULL,
    '#FF0000',
    '#FFFFFF'
  ),
  (
    20,
    'Red Black',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    'Improvement of all techniques',
    '#FF0000',
    '#FFFFFF'
  ),
  (
    21,
    '1st Black',
    '[\"National Tang Soo Do Congress Black Belt Form #1\"]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    '[]',
    'Mastery of all basic techniques',
    '#000000',
    '#FFFFFF'
  );

-- Insert existing form definitions data
INSERT INTO
  `form_definitions`
VALUES
  (
    1,
    'Geicho Hyung Il Bu',
    '기초형 일부',
    'Basic Form #1',
    'Gold',
    '#FFD700',
    '#000000',
    1,
    'The first form taught in Tang Soo Do, focusing on basic stances, blocks, and punches. First half learned at Gold belt, complete form at Gold Black.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Maintain proper front stance throughout\", \"Sharp, decisive movements\", \"Proper chamber and extension\", \"Eye contact in direction of technique\", \"Correct low block execution\", \"Blocks with turns\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    2,
    'Geicho Hyung Il Bu Sahm Gup',
    '기초형 일부 삼급',
    'Basic Form #1 Third Level',
    'Purple White',
    '#800080',
    '#FFFFFF',
    2,
    'Advanced version of the first basic form with additional front kicks.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Front kick and punch combinations\", \"Fluid transitions between techniques\", \"Precise timing and rhythm\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    3,
    'Geicho Hyung Yi Bu',
    '기초형 이부',
    'Basic Form #2',
    'Purple',
    '#800080',
    '#FFFFFF',
    3,
    'Second basic form introducing multiple block techniques.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Proper inside, high, and outside block technique\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    4,
    'Geicho Hyung Yi Bu Sahm Gup',
    '기초형 이부 삼급',
    'Basic Form #2 Third Level',
    'Orange White',
    '#FFA500',
    '#000000',
    4,
    'Advanced version of the second basic form with punches at nose and front kicks.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Block punch techniques\", \"Proper back stance execution\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    5,
    'Geicho Hyung Sahm Bu',
    '기초형 삼부',
    'Basic Form #3',
    'Blue White',
    '#ADD8E6',
    '#000000',
    5,
    'Third basic form featuring complex blocks and advanced techniques.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Side punch and spin bottom fist techniques\", \"Emphasize proper back and staddle stances\", \"Proper stance transitions\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    6,
    'Pyong An Cho Dan',
    '평안 초단',
    'Intermediate Form #1',
    'Blue Black',
    '#191970',
    '#FFFFFF',
    6,
    'First of the classical Pyong An forms, introducing traditional techniques.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Proper chops position and direction\", \"First complex footwork patterns\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:09:24'
  ),
  (
    7,
    'Pyong An Yi Dan',
    '평안 이단',
    'Intermediate Form #2',
    'Green White',
    '#90EE90',
    '#000000',
    7,
    'Second Pyong An form introducing cat stance and reinforced blocks.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Proper cat stance balance\", \"Reinforced blocking techniques\", \"Traditional combat applications\", \"Advanced jumping coordination\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:08:57'
  ),
  (
    8,
    'Pyong An Sahm Dan',
    '평안 삼단',
    'Intermediate Form #3',
    'Green Black',
    '#006400',
    '#FFFFFF',
    8,
    'Third Pyong An form with advanced techniques and applications.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Advanced balance techniques\", \"Traditional form applications\", \"Complex movement patterns\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:08:57'
  ),
  (
    9,
    'Pyong An Sa Dan',
    '평안 사단',
    'Intermediate Form #4',
    'Brown',
    '#8B4513',
    '#FFFFFF',
    9,
    'Fourth Pyong An form with advanced techniques.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Advanced combat applications\", \"Multiple opponent awareness\", \"Advanced breathing techniques\", \"Timing and distance management\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:08:57'
  ),
  (
    10,
    'Pyong An Oh Dan',
    '평안 오단',
    'Intermediate Form #5',
    'Brown Black',
    '#654321',
    '#FFFFFF',
    10,
    'Fifth and most advanced Pyong An form with complex techniques and applications.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Advanced level technique execution\", \"Complex jumping combinations\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:08:57'
  ),
  (
    11,
    'Bassai',
    '바사이',
    'Form of the rock',
    'Red',
    '#FF0000',
    '#FFFFFF',
    11,
    'Advanced classical form representing the penetration of a fortress. Requires mastery of all basic techniques.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Advanced level technique execution required\", \"Advanced power generation\", \"Complex timing and rhythm\", \"Traditional martial arts principles\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:08:57'
  ),
  (
    12,
    'National Tang Soo Do Congress Black Belt Form #1',
    '',
    '',
    'Red Black',
    '#FF0000',
    '#FFFFFF',
    12,
    'Official black belt form representing mastery of all basic Tang Soo Do techniques and principles.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '[\"Mastery of all basic techniques\", \"Advanced combat applications\", \"Traditional martial arts principles\", \"Complete physical and mental integration\"]',
    1,
    '2025-08-04 16:08:20',
    '2025-08-04 16:30:03'
  );

-- Insert existing kicks definitions data
INSERT INTO
  `kicks_definitions`
VALUES
  (
    1,
    'Front Kick',
    'Ahp Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A straight, linear kick using the ball of the foot or heel to strike forward.',
    'Solar plexus, Ribs, Knee, Groin',
    '[\"Chamber knee to chest level\", \"Extend leg straight forward\", \"Strike with ball of foot\", \"Snap leg back after impact\"]',
    '[\"Chamber knee to chest level\", \"Keep supporting leg slightly bent\", \"Strike with ball of foot\", \"Snap leg back after impact\", \"Maintain balance throughout\"]',
    '[\"Not chambering knee high enough\", \"Kicking with toes instead of ball of foot\", \"Leaning back during kick\", \"Not snapping leg back\", \"Poor balance on supporting leg\"]',
    '[\"Distance keeping\", \"Solar plexus attack\", \"Knee strike\"]',
    NULL,
    NULL
  ),
  (
    2,
    'Roundhouse Kick',
    'Dol Lyeo Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A circular kick using the top of the foot or shin to strike the side of the target.',
    'Ribs, Liver, Head, Thigh',
    '[\"Chamber knee to side\", \"Rotate hips completely\", \"Whip leg in circular motion\", \"Strike with top of foot\"]',
    '[\"Chamber knee to side\", \"Rotate hips completely\", \"Strike with top of foot\", \"Keep supporting leg stable\", \"Follow through with hip rotation\"]',
    '[\"Not rotating hips enough\", \"Kicking in straight line instead of arc\", \"Poor chamber position\", \"Striking with shin instead of foot\", \"Losing balance on pivot foot\"]',
    '[\"Side attack\", \"Liver shot\", \"Head kick\"]',
    NULL,
    NULL
  ),
  (
    3,
    'Stepping Kick',
    'Ddim Bal Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A kick performed while stepping forward to close distance and add momentum.',
    'Solar plexus, Ribs, Thigh',
    '[\"Step forward with supporting leg\", \"Execute kick with rear leg\", \"Use stepping momentum for power\", \"Chamber kick properly after step\"]',
    '[\"Step with supporting leg first\", \"Maintain balance during transition\", \"Use stepping momentum for power\", \"Chamber kick properly after step\", \"Follow through completely\"]',
    '[\"Stepping and kicking simultaneously\", \"Poor balance during step\", \"Not using stepping momentum\", \"Telegraphing the kick\", \"Incomplete follow through\"]',
    '[\"Distance closing\", \"Surprise attack\", \"Combination starter\"]',
    NULL,
    NULL
  ),
  (
    4,
    'Slide Up Kick',
    'Miluh Ol Li Gi Cha Gi',
    'White Belt',
    '#FFFFFF',
    'A quick sliding motion followed by a kick to surprise the opponent.',
    'Solar plexus, Ribs, Thigh',
    '[\"Slide rear foot forward\", \"Execute quick kick\", \"Maintain low profile during slide\", \"Explosive kick after positioning\"]',
    '[\"Smooth sliding motion\", \"Quick execution after slide\", \"Maintain low profile during slide\", \"Explosive kick after positioning\", \"Return to ready stance\"]',
    '[\"Telegraphing slide motion\", \"Poor timing between slide and kick\", \"Rising too high during slide\", \"Weak kick execution\", \"Poor recovery\"]',
    '[\"Surprise attack\", \"Distance closing\", \"Counter attack\"]',
    NULL,
    NULL
  ),
  (
    5,
    'Side Kick',
    'Yuhp Cha Gi',
    'Orange Belt',
    '#FFA500',
    'A powerful lateral kick using the edge of the foot to strike to the side.',
    'Ribs, Knee, Head',
    '[\"Chamber knee high to side\", \"Pivot on supporting foot\", \"Extend leg sideways\", \"Strike with edge of foot\"]',
    '[\"Chamber knee high to side\", \"Pivot supporting foot completely\", \"Strike with edge of foot\", \"Keep body sideways\", \"Maintain balance throughout\"]',
    '[\"Not chambering high enough\", \"Poor pivot on supporting foot\", \"Striking with flat of foot\", \"Body facing forward\", \"Poor balance\"]',
    '[\"Powerful side attack\", \"Breaking through guard\", \"Distance control\"]',
    NULL,
    NULL
  ),
  (
    6,
    'Inside Crescent Kick',
    'An Dahl Li Gi Cha Gi',
    'Green Belt',
    '#90EE90',
    'A sweeping kick that moves from outside to inside in a crescent motion.',
    'Head, Ribs, Arms',
    '[\"Raise leg to outside\", \"Sweep leg in crescent motion inward\", \"Strike with inside edge of foot\", \"Follow through across body\"]',
    '[\"Start kick from outside position\", \"Keep leg straight during sweep\", \"Strike with inside edge of foot\", \"Maintain balance on supporting leg\", \"Control the sweep motion\"]',
    '[\"Bending knee during sweep\", \"Poor starting position\", \"Striking with wrong part of foot\", \"Losing balance\", \"Incomplete sweep motion\"]',
    '[\"Weapon disarming\", \"Head attack\", \"Arm strike\"]',
    NULL,
    NULL
  );

-- Insert admin instructor
INSERT INTO
  `instructors`
VALUES
  (
    1,
    'admin@toughnosekarate.com',
    '$2b$10$/40tmBY8gJUlbEL7zO5dNeYkMPU9s8iClaD8mt0CfziCYyNC9SPjq',
    'Admin',
    'User',
    'admin',
    1,
    '2025-08-06 20:30:10',
    '2025-08-06 04:45:18',
    '2025-08-06 04:45:18'
  );