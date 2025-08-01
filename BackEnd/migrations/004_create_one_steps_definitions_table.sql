-- Migration: Create one_steps_definitions table
-- Description: Creates the one_steps_definitions table to store one-step sparring definitions
CREATE TABLE IF NOT EXISTS `one_steps_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `attack` text NOT NULL,
  `defense` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;