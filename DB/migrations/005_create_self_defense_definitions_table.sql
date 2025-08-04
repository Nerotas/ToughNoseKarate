-- Migration: Create self_defense_definitions table
-- Description: Creates the self_defense_definitions table to store self-defense technique definitions
CREATE TABLE IF NOT EXISTS `self_defense_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `difficulty` varchar(50) NOT NULL,
  `scenario` text NOT NULL,
  `technique` text NOT NULL,
  `setup` json NOT NULL,
  `execution` json NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;