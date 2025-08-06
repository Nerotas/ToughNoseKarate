CREATE DATABASE  IF NOT EXISTS `toughnosekarate` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `toughnosekarate`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: toughnosekarate
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `assessment_overview`
--

DROP TABLE IF EXISTS `assessment_overview`;
/*!50001 DROP VIEW IF EXISTS `assessment_overview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `assessment_overview` AS SELECT 
 1 AS `assessment_id`,
 1 AS `student_id`,
 1 AS `student_name`,
 1 AS `current_belt`,
 1 AS `target_belt_rank`,
 1 AS `assessment_date`,
 1 AS `overall_score`,
 1 AS `passed`,
 1 AS `assessment_status`,
 1 AS `examiner_notes`,
 1 AS `forms_completion_pct`,
 1 AS `avg_forms_score`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `belt_requirements`
--

DROP TABLE IF EXISTS `belt_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belt_requirements`
--

LOCK TABLES `belt_requirements` WRITE;
/*!40000 ALTER TABLE `belt_requirements` DISABLE KEYS */;
INSERT INTO `belt_requirements` VALUES (1,'White','[]','[\"ready\", \"straddle\", \"front\", \"fighting\", \"bowing\"]','[\"low\", \"knife_hand\"]','[\"center\", \"reverse\", \"jab\"]','[\"front\", \"round\", \"stepping_kick\", \"slide_up_kick\"]','[]','[\"backwards\"]','[]','[]','Reasons for Kiai: More power, Not get air knocked out, Scare opponent, Clear mind, Draw attentio]','#FFFFFF','#000000'),(2,'Gold White','[]','[\"back\"]','[\"high\"]','[]','[\"side\"]','[\"jump_phase_1\"]','[\"forwards\"]','[]','[]',NULL,'#FFD700','#000000'),(3,'Gold','[\"geicho_hyung_il_bu\"]','[\"shifting\"]','[\"inside\"]','[]','[]','[]','[\"forward_roll\"]','[]','[]','1st half of Geicho Hyung Il Bu, Begin sparring','#FFD700','#000000'),(4,'Gold Black','[\"geicho_hyung_il_bu\"]','[]','[\"block_punch\"]','[]','[\"spin_back\"]','[\"jump_phase_2\"]','[]','[]','[]','All of  Geicho Hyung Il Bu','#DAA520','#FFFFFF'),(5,'Purple White','[\"geicho_hyung_il_bu_sahm_gup\"]','[]','[\"outside\"]','[]','[\"back\"]','[\"jump_phase_3\"]','[]','[\"step_1_left\"]','[]',NULL,'#800080','#FFFFFF'),(6,'Purple','[\"geicho_hyung_yi_bu\"]','[]','[]','[\"side\", \"spin_bottom_fist\"]','[]','[]','[]','[\"step_1_right\"]','[]',NULL,'#800080','#FFFFFF'),(7,'Orange White','[\"geicho_hyung_yi_bu_sahm_gup\"]','[]','[]','[\"charging\"]','[\"double_round\", \"inside_crescent\", \"outside_crescent\"]','[]','[]','[\"step_2_left\", \"step_2_right\"]','[]',NULL,'#FFA500','#000000'),(8,'Orange','[]','[]','[\"double_block\"]','[\"hook\", \"upper_cut\"]','[\"stepping_kick\"]','[\"jump_spin_back_phase_1\"]','[]','[\"step_3_left\", \"step_3_right\"]','[]','Simple Double Blocks','#FFA500','#FFFFFF'),(9,'Blue White','[\"geicho_hyung_sahm_bu\"]','[]','[\"chop_low\", \"chop_high\"]','[\"slide_up_jab_punch\"]','[\"spin_outside_crescent\"]','[\"jump_phase_4\"]','[]','[\"step_4_left\", \"step_4_right\", \"step_1_followup\", \"step_2_followup\", \"step_3_followup\"]','[]','Complex Double Blocks','#ADD8E6','#000000'),(10,'Blue','[]','[]','[\"double_block_punch\"]','[]','[]','[]','[]','[\"step_1_followup\", \"step_2_followup\"]','[]',NULL,'#0000FF','#FFFFFF'),(11,'Blue Black','[\"pyong_an_cho_dan\"]','[]','[]','[]','[\"jump_spin_outside_crescent\", \"studder_step\"]','[]','[]','[\"step_3_followup\", \"step_4_followup\"]','[]',NULL,'#191970','#FFFFFF'),(12,'Green White','[\"pyong_an_yi_dan\"]','[\"cat\"]','[\"reinforced_outside\"]','[\"spearhand\"]','[]','[\"phase_5\", \"phase_6\"]','[]','[\"traditional_done_at_random\"]','[\"release_front_grab\", \"release_rear_grab\", \"release_arm_bar\", \"apply_rear_choke\"]','Moving backwards and turning with basics','#90EE90','#000000'),(13,'Green','[]','[]','[]','[]','[\"hook\", \"spin_heel\"]','[]','[]','[\"made_up_1_right\"]','[\"bulldog\", \"cross_face\", \"arm_lock\", \"headlock_escape\", \"wristlocks\"]',NULL,'#008000','#FFFFFF'),(14,'Green Black','[\"pyong_an_sahm_dan\"]','[]','[]','[]','[]','[]','[]','[\"made_up_2_left\"]','[\"figure_4\"]',NULL,'#006400','#FFFFFF'),(15,'Brown White','[]','[]','[]','[]','[]','[\"butterfly_kick\"]','[]','[\"made_up_3_right\"]','[\"bear_hug_front\", \"bear_hug_back\", \"americana\", \"kimura\", \"arm_bar_guard\", \"arm_bar_mount\", \"escape_guard\"]','Head contanct while sparring allowed','#D2691E','#000000'),(16,'Brown','[\"pyong_an_sa_dan\"]','[]','[]','[]','[]','[]','[]','[\"made_up_4_left\"]','[]','At least 2 ground techniques','#8B4513','#FFFFFF'),(17,'Brown Black','[\"pyong_an_oh_dan\"]','[]','[]','[]','[]','[]','[]','[\"three_steps_1_right\"]','[]','At least 3 ground techniques','#654321','#FFFFFF'),(18,'Red White','[]','[]','[]','[]','[]','[]','[]','[\"three_steps_2_left\"]','[]','All ground techniques','#FFB6C1','#000000'),(19,'Red','[\"bassai\"]','[]','[]','[]','[]','[]','[]','[\"three_steps_3_right\"]','[]',NULL,'#FF0000','#FFFFFF'),(20,'Red Black','[]','[]','[]','[]','[]','[]','[]','[]','[]','Improvment of all techniques','#FF0000','#FFFFFF'),(21,'1st Black','[\"National Tang Soo Do Congress Black Belt Form #1\"]','[]','[]','[]','[]','[]','[]','[]','[]','Mastery of all basic techniques','#000000','#FFFFFF');
/*!40000 ALTER TABLE `belt_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `low` varchar(45) DEFAULT NULL,
  `knife_hand` varchar(45) DEFAULT NULL,
  `high` varchar(45) DEFAULT NULL,
  `inside` varchar(45) DEFAULT NULL,
  `outside` varchar(45) DEFAULT NULL,
  `low_chop` varchar(45) DEFAULT NULL,
  `high_chop` varchar(45) DEFAULT NULL,
  `double_block_punch` varchar(45) DEFAULT NULL,
  `double_block` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocks`
--

LOCK TABLES `blocks` WRITE;
/*!40000 ALTER TABLE `blocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combinations`
--

DROP TABLE IF EXISTS `combinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `kicking` varchar(45) DEFAULT NULL,
  `hands` varchar(45) DEFAULT NULL,
  `fighting` varchar(45) DEFAULT NULL,
  `basics` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `combinations_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combinations`
--

LOCK TABLES `combinations` WRITE;
/*!40000 ALTER TABLE `combinations` DISABLE KEYS */;
/*!40000 ALTER TABLE `combinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `falling`
--

DROP TABLE IF EXISTS `falling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `falling` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `back` varchar(45) DEFAULT NULL,
  `front` varchar(45) DEFAULT NULL,
  `roll` varchar(45) DEFAULT NULL,
  `forward_roll` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `falling_ibfk_1` (`studentid`),
  CONSTRAINT `falling_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `falling`
--

LOCK TABLES `falling` WRITE;
/*!40000 ALTER TABLE `falling` DISABLE KEYS */;
/*!40000 ALTER TABLE `falling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `families`
--

DROP TABLE IF EXISTS `families`;
/*!50001 DROP VIEW IF EXISTS `families`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `families` AS SELECT 
 1 AS `parentid`,
 1 AS `studentid`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `preferedName`,
 1 AS `parentFirstName`,
 1 AS `parentLastName`,
 1 AS `age`,
 1 AS `beltRank`,
 1 AS `startDate`,
 1 AS `endDate`,
 1 AS `lastTest`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `notes`,
 1 AS `active`,
 1 AS `eligibleForTesting`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `form_definitions`
--

DROP TABLE IF EXISTS `form_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_definitions`
--

LOCK TABLES `form_definitions` WRITE;
/*!40000 ALTER TABLE `form_definitions` DISABLE KEYS */;
INSERT INTO `form_definitions` VALUES (1,'Geicho Hyung Il Bu','기초형 일부','Basic Form #1','Gold','#FFD700','#000000',1,'The first form taught in Tang Soo Do, focusing on basic stances, blocks, and punches. First half learned at Gold belt, complete form at Gold Black.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Maintain proper front stance throughout\", \"Sharp, decisive movements\", \"Proper chamber and extension\", \"Eye contact in direction of technique\", \"Correct low block execution\", \"Blocks with turns\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(2,'Geicho Hyung Il Bu Sahm Gup','기초형 일부 삼급','Basic Form #1 Third Level','Purple White','#800080','#FFFFFF',2,'Advanced version of the first basic form with additional front kicks.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Front kick and punch combinations\", \"Fluid transitions between techniques\", \"Precise timing and rhythm\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(3,'Geicho Hyung Yi Bu','기초형 이부','Basic Form #2','Purple','#800080','#FFFFFF',3,'Second basic form introducing multiple block techniques.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Proper inside, high, and outside block technique\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(4,'Geicho Hyung Yi Bu Sahm Gup','기초형 이부 삼급','Basic Form #2 Third Level','Orange White','#FFA500','#000000',4,'Advanced version of the second basic form with punches at nose and front kicks.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Block punch techniques\", \"Proper back stance execution\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(5,'Geicho Hyung Sahm Bu','기초형 삼부','Basic Form #3','Blue White','#ADD8E6','#000000',5,'Third basic form featuring complex blocks and advanced techniques.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Side punch and spin bottom fist techniques\", \"Emphasize proper back and staddle stances\", \"Proper stance transitions\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(6,'Pyong An Cho Dan','평안 초단','Intermediate Form #1','Blue Black','#191970','#FFFFFF',6,'First of the classical Pyong An forms, introducing traditional techniques.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Proper chops position and direction\", \"First complex footwork patterns\"]',1,'2025-08-04 16:08:20','2025-08-04 16:09:24'),(7,'Pyong An Yi Dan','평안 이단','Intermediate Form #2','Green White','#90EE90','#000000',7,'Second Pyong An form introducing cat stance and reinforced blocks.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Proper cat stance balance\", \"Reinforced blocking techniques\", \"Traditional combat applications\", \"Advanced jumping coordination\"]',1,'2025-08-04 16:08:20','2025-08-04 16:08:57'),(8,'Pyong An Sahm Dan','평안 삼단','Intermediate Form #3','Green Black','#006400','#FFFFFF',8,'Third Pyong An form with advanced techniques and applications.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Advanced balance techniques\", \"Traditional form applications\", \"Complex movement patterns\"]',1,'2025-08-04 16:08:20','2025-08-04 16:08:57'),(9,'Pyong An Sa Dan','평안 사단','Intermediate Form #4','Brown','#8B4513','#FFFFFF',9,'Fourth Pyong An form with advanced techniques.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Advanced combat applications\", \"Multiple opponent awareness\", \"Advanced breathing techniques\", \"Timing and distance management\"]',1,'2025-08-04 16:08:20','2025-08-04 16:08:57'),(10,'Pyong An Oh Dan','평안 오단','Intermediate Form #5','Brown Black','#654321','#FFFFFF',10,'Fifth and most advanced Pyong An form with complex techniques and applications.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Advanced level technique execution\", \"Complex jumping combinations\"]',1,'2025-08-04 16:08:20','2025-08-04 16:08:57'),(11,'Bassai','바사이','Form of the rock','Red','#FF0000','#FFFFFF',11,'Advanced classical form representing the penetration of a fortress. Requires mastery of all basic techniques.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Advanced level technique execution required\", \"Advanced power generation\", \"Complex timing and rhythm\", \"Traditional martial arts principles\"]',1,'2025-08-04 16:08:20','2025-08-04 16:08:57'),(12,'National Tang Soo Do Congress Black Belt Form #1','','','Red Black','#FF0000','#FFFFFF',12,'Official black belt form representing mastery of all basic Tang Soo Do techniques and principles.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','[\"Mastery of all basic techniques\", \"Advanced combat applications\", \"Traditional martial arts principles\", \"Complete physical and mental integration\"]',1,'2025-08-04 16:08:20','2025-08-04 16:30:03');
/*!40000 ALTER TABLE `form_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `geicho_hyung_il_bu` varchar(45) DEFAULT NULL,
  `geicho_hyung_il_bu_sahm_gup` varchar(45) DEFAULT NULL,
  `geicho_hyung_yi_bu` varchar(45) DEFAULT NULL,
  `geicho_hyung_yi_bu_sahm_gup` varchar(45) DEFAULT NULL,
  `geicho_hyung_sahm_bu` varchar(45) DEFAULT NULL,
  `pyong_an_cho_dan` varchar(45) DEFAULT NULL,
  `pyong_an_yi_dan` varchar(45) DEFAULT NULL,
  `pyong_an_sahm_dan` varchar(45) DEFAULT NULL,
  `pyong_an_sa_dan` varchar(45) DEFAULT NULL,
  `pyong_an_oh_dan` varchar(45) DEFAULT NULL,
  `bassai` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `forms_ibfk_1` (`studentid`),
  CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` enum('instructor','admin') DEFAULT 'instructor',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (1,'toughnosekarate@gmail.com','$2b$10$/40tmBY8gJUlbEL7zO5dNeYkMPU9s8iClaD8mt0CfziCYyNC9SPjq','Admin','User','admin',1,'2025-08-05 20:30:10','2025-08-05 20:30:10',NULL),(4,'test@toughnosekarate.com','$2b$10$hpVCiwSvgI0snXPSRWhfCuK/aPLvcajhYOjqMEeqvHOVg17WVXh6O','Test','Instructor','instructor',1,'2025-08-05 21:40:43','2025-08-06 00:55:09','2025-08-06 00:55:09');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kicks`
--

DROP TABLE IF EXISTS `kicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kicks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `front` varchar(45) DEFAULT NULL,
  `round` varchar(45) DEFAULT NULL,
  `side` varchar(45) DEFAULT NULL,
  `stepping_kick` varchar(45) DEFAULT NULL,
  `slide_up_kick` varchar(45) DEFAULT NULL,
  `double_round` varchar(45) DEFAULT NULL,
  `inside_crescent` varchar(45) DEFAULT NULL,
  `outside_crescent` varchar(45) DEFAULT NULL,
  `spin_back` varchar(45) DEFAULT NULL,
  `step_back` varchar(45) DEFAULT NULL,
  `spin_outside_crescent` varchar(45) DEFAULT NULL,
  `hook` varchar(45) DEFAULT NULL,
  `heel` varchar(45) DEFAULT NULL,
  `jump_phase_1` varchar(45) DEFAULT NULL,
  `jump_phase_2` varchar(45) DEFAULT NULL,
  `jump_phase_3` varchar(45) DEFAULT NULL,
  `jump_phase_4` varchar(45) DEFAULT NULL,
  `jump_phase_5` varchar(45) DEFAULT NULL,
  `jump_phase_6` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `kicks_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kicks`
--

LOCK TABLES `kicks` WRITE;
/*!40000 ALTER TABLE `kicks` DISABLE KEYS */;
/*!40000 ALTER TABLE `kicks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kicks_definitions`
--

DROP TABLE IF EXISTS `kicks_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kicks_definitions`
--

LOCK TABLES `kicks_definitions` WRITE;
/*!40000 ALTER TABLE `kicks_definitions` DISABLE KEYS */;
INSERT INTO `kicks_definitions` VALUES (1,'Front Kick','Ahp Cha Gi','White Belt','#FFFFFF','A straight, linear kick using the ball of the foot or heel to strike forward.','Solar plexus, Ribs, Knee, Groin','[\"Chamber knee to chest level\", \"Extend leg straight forward\", \"Strike with ball of foot\", \"Snap leg back after impact\"]','[\"Chamber knee to chest level\", \"Keep supporting leg slightly bent\", \"Strike with ball of foot\", \"Snap leg back after impact\", \"Maintain balance throughout\"]','[\"Not chambering knee high enough\", \"Kicking with toes instead of ball of foot\", \"Leaning back during kick\", \"Not snapping leg back\", \"Poor balance on supporting leg\"]','[\"Distance keeping\", \"Solar plexus attack\", \"Knee strike\"]',NULL,NULL),(2,'Roundhouse Kick','Dol Lyeo Cha Gi','White Belt','#FFFFFF','A circular kick using the top of the foot or shin to strike the side of the target.','Ribs, Liver, Head, Thigh','[\"Chamber knee to side\", \"Rotate hips completely\", \"Whip leg in circular motion\", \"Strike with top of foot\"]','[\"Chamber knee to side\", \"Rotate hips completely\", \"Strike with top of foot\", \"Keep supporting leg stable\", \"Follow through with hip rotation\"]','[\"Not rotating hips enough\", \"Kicking in straight line instead of arc\", \"Poor chamber position\", \"Striking with shin instead of foot\", \"Losing balance on pivot foot\"]','[\"Side attack\", \"Liver shot\", \"Head kick\"]',NULL,NULL),(3,'Stepping Kick','Ddim Bal Cha Gi','White Belt','#FFFFFF','A kick performed while stepping forward to close distance and add momentum.','Solar plexus, Ribs, Thigh','[\"Step forward with supporting leg\", \"Execute kick with rear leg\", \"Use stepping momentum for power\", \"Chamber kick properly after step\"]','[\"Step with supporting leg first\", \"Maintain balance during transition\", \"Use stepping momentum for power\", \"Chamber kick properly after step\", \"Follow through completely\"]','[\"Stepping and kicking simultaneously\", \"Poor balance during step\", \"Not using stepping momentum\", \"Telegraphing the kick\", \"Incomplete follow through\"]','[\"Distance closing\", \"Surprise attack\", \"Combination starter\"]',NULL,NULL),(4,'Slide Up Kick','Miluh Ol Li Gi Cha Gi','White Belt','#FFFFFF','A quick sliding motion followed by a kick to surprise the opponent.','Solar plexus, Ribs, Thigh','[\"Slide rear foot forward\", \"Execute quick kick\", \"Maintain low profile during slide\", \"Explosive kick after positioning\"]','[\"Smooth sliding motion\", \"Quick execution after slide\", \"Maintain low profile during slide\", \"Explosive kick after positioning\", \"Return to ready stance\"]','[\"Telegraphing slide motion\", \"Poor timing between slide and kick\", \"Rising too high during slide\", \"Weak kick execution\", \"Poor recovery\"]','[\"Surprise attack\", \"Distance closing\", \"Counter attack\"]',NULL,NULL),(5,'Side Kick','Yuhp Cha Gi','Orange Belt','#FFA500','A powerful lateral kick using the edge of the foot to strike to the side.','Ribs, Knee, Head','[\"Chamber knee high to side\", \"Pivot on supporting foot\", \"Extend leg sideways\", \"Strike with edge of foot\"]','[\"Chamber knee high to side\", \"Pivot supporting foot completely\", \"Strike with edge of foot\", \"Keep body sideways\", \"Maintain balance throughout\"]','[\"Not chambering high enough\", \"Poor pivot on supporting foot\", \"Striking with flat of foot\", \"Body facing forward\", \"Poor balance\"]','[\"Powerful side attack\", \"Breaking through guard\", \"Distance control\"]',NULL,NULL),(6,'Inside Crescent Kick','An Dahl Li Gi Cha Gi','Green Belt','#90EE90','A sweeping kick that moves from outside to inside in a crescent motion.','Head, Ribs, Arms','[\"Raise leg to outside\", \"Sweep leg in crescent motion inward\", \"Strike with inside edge of foot\", \"Follow through across body\"]','[\"Start kick from outside position\", \"Keep leg straight during sweep\", \"Strike with inside edge of foot\", \"Maintain balance on supporting leg\", \"Control the sweep motion\"]','[\"Bending knee during sweep\", \"Poor starting position\", \"Striking with wrong part of foot\", \"Losing balance\", \"Incomplete sweep motion\"]','[\"Weapon disarming\", \"Head attack\", \"Arm strike\"]',NULL,NULL);
/*!40000 ALTER TABLE `kicks_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `one_steps`
--

DROP TABLE IF EXISTS `one_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `one_steps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `step_1_left` varchar(45) DEFAULT NULL,
  `step_1_right` varchar(45) DEFAULT NULL,
  `step_1_followup` varchar(45) DEFAULT NULL,
  `step_2_left` varchar(45) DEFAULT NULL,
  `step_2_right` varchar(45) DEFAULT NULL,
  `step_2_followup` varchar(45) DEFAULT NULL,
  `step_3_left` varchar(45) DEFAULT NULL,
  `step_3_right` varchar(45) DEFAULT NULL,
  `step_3_followup` varchar(45) DEFAULT NULL,
  `step_4_left` varchar(45) DEFAULT NULL,
  `step_4_right` varchar(45) DEFAULT NULL,
  `step_4_followup` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `one_steps_ibfk_1` (`studentid`),
  CONSTRAINT `one_steps_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `one_steps`
--

LOCK TABLES `one_steps` WRITE;
/*!40000 ALTER TABLE `one_steps` DISABLE KEYS */;
/*!40000 ALTER TABLE `one_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `one_steps_definitions`
--

DROP TABLE IF EXISTS `one_steps_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `one_steps_definitions` (
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `one_steps_definitions`
--

LOCK TABLES `one_steps_definitions` WRITE;
/*!40000 ALTER TABLE `one_steps_definitions` DISABLE KEYS */;
INSERT INTO `one_steps_definitions` VALUES (1,'Step 1 (Left)','Il Su Sik','Purple White','#800080','First basic one-step sequence for Purple White belt students.','Right straight punch to chest','[\"Left outside block\", \"Right reverse punch counter\", \"Return to ready position\"]','[\"Proper outside block technique\", \"Immediate counter after block\", \"Maintain balance throughout\", \"Strong chamber position\"]','[\"Weak blocking technique\", \"Delayed counter attack\", \"Poor stance during block\", \"Not returning to ready\"]','[\"Basic self-defense\", \"Timing development\", \"Block-counter combination\"]',NULL,NULL),(2,'Step 1 (Right)','Il Su Sik','Purple','#800080','First basic one-step sequence for Purple belt students (right side).','Left straight punch to chest','[\"Right outside block\", \"Left reverse punch counter\", \"Return to ready position\"]','[\"Mirror technique of step 1 left\", \"Strong right outside block\", \"Quick left counter punch\", \"Balanced execution\"]','[\"Confusion with left/right sides\", \"Inconsistent block strength\", \"Poor counter timing\", \"Unbalanced stance\"]','[\"Ambidextrous training\", \"Basic defense\", \"Coordination development\"]',NULL,NULL),(3,'Step 2 (Left)','I Su Sik','Orange White','#FFA500','Second one-step sequence for Orange White belt students (left side).','Right straight punch to face','[\"Left inside block\", \"Right punch to ribs counter\", \"Left front kick follow-up\", \"Return to fighting stance\"]','[\"Strong inside block deflection\", \"Immediate punch counter\", \"Smooth transition to kick\", \"Maintain forward pressure\"]','[\"Weak inside block\", \"Pausing between techniques\", \"Poor kick timing\", \"Loss of balance\"]','[\"Multiple counter attacks\", \"Close range combat\", \"Flow training\"]',NULL,NULL),(4,'Step 2 (Right)','I Su Sik','Orange White','#FFA500','Second one-step sequence for Orange White belt students (right side).','Left straight punch to face','[\"Right inside block\", \"Left punch to ribs counter\", \"Right front kick follow-up\", \"Return to fighting stance\"]','[\"Mirror technique of step 2 left\", \"Strong right inside block\", \"Quick left counter\", \"Smooth kick transition\"]','[\"Confusion with mirror sides\", \"Weak inside block\", \"Poor combination flow\", \"Balance issues\"]','[\"Ambidextrous combinations\", \"Defense training\", \"Multiple attack sequences\"]',NULL,NULL),(5,'Step 3 (Left)','Sam Su Sik','Orange','#FFA500','Third one-step sequence for Orange belt students (left side).','Right straight punch to solar plexus','[\"Left low block\", \"Right uppercut counter\", \"Left roundhouse kick\", \"Return to ready stance\"]','[\"Strong low block technique\", \"Powerful uppercut counter\", \"Quick kick transition\", \"Maintain aggressive pressure\"]','[\"Weak low block\", \"Poor uppercut form\", \"Slow kick execution\", \"Loss of momentum\"]','[\"Body attack defense\", \"Close range striking\", \"Advanced combinations\"]',NULL,NULL),(6,'Step 4 (Left)','Sa Su Sik','Green White','#90EE90','Fourth one-step sequence for Green White belt students (left side).','Right straight punch to chest','[\"Left knife-hand block\", \"Right spear-hand strike\", \"Left side kick\", \"Return to fighting stance\"]','[\"Precise knife-hand block\", \"Accurate spear-hand target\", \"Strong side kick execution\", \"Fluid technique transitions\"]','[\"Sloppy knife-hand technique\", \"Poor spear-hand targeting\", \"Weak side kick\", \"Choppy movement flow\"]','[\"Advanced blocking\", \"Precision striking\", \"Lateral attacks\"]',NULL,NULL);
/*!40000 ALTER TABLE `one_steps_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_mapping`
--

DROP TABLE IF EXISTS `parent_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_mapping` (
  `idparent_mapping` int NOT NULL AUTO_INCREMENT,
  `parentid` int NOT NULL,
  `studentid` int NOT NULL,
  PRIMARY KEY (`idparent_mapping`),
  KEY `parentid` (`parentid`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `parent_mapping_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `parents` (`parentid`),
  CONSTRAINT `parent_mapping_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_mapping`
--

LOCK TABLES `parent_mapping` WRITE;
/*!40000 ALTER TABLE `parent_mapping` DISABLE KEYS */;
INSERT INTO `parent_mapping` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `parent_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parents` (
  `parentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `relationship` enum('mother','father','guardian','stepparent','grandparent','other') DEFAULT 'guardian',
  `is_primary_contact` tinyint(1) DEFAULT '0',
  `is_emergency_contact` tinyint(1) DEFAULT '0',
  `can_pickup` tinyint(1) DEFAULT '0',
  `preferred_contact_method` enum('email','phone','text','app') DEFAULT 'email',
  `contact_notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`parentid`),
  KEY `idx_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_relationship` (`relationship`),
  KEY `idx_primary_contact` (`is_primary_contact`),
  KEY `idx_emergency_contact` (`is_emergency_contact`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Parent/guardian records with relationship details and contact preferences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
INSERT INTO `parents` VALUES (1,'Raffi','Erotas',NULL,NULL,'guardian',0,0,0,'email',NULL,'2025-08-04 23:09:25','2025-08-04 23:09:25');
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punches`
--

DROP TABLE IF EXISTS `punches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `punches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `center` varchar(45) DEFAULT NULL,
  `reverse` varchar(45) DEFAULT NULL,
  `jab` varchar(45) DEFAULT NULL,
  `side` varchar(45) DEFAULT NULL,
  `charging` varchar(45) DEFAULT NULL,
  `slide_up_jab` varchar(45) DEFAULT NULL,
  `slide_up_punch` varchar(45) DEFAULT NULL,
  `spin_bottom_fist` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `punches_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punches`
--

LOCK TABLES `punches` WRITE;
/*!40000 ALTER TABLE `punches` DISABLE KEYS */;
/*!40000 ALTER TABLE `punches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punches_definitions`
--

DROP TABLE IF EXISTS `punches_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punches_definitions`
--

LOCK TABLES `punches_definitions` WRITE;
/*!40000 ALTER TABLE `punches_definitions` DISABLE KEYS */;
INSERT INTO `punches_definitions` VALUES (1,'Center Punch','Ga Un De Ji Ru Gi','White Belt','#FFFFFF','A direct, linear punch thrown to the center of the target, forming the foundation of Tang Soo Do striking techniques.','Solar plexus, Ribs, Chest','[\"Rotate fist 180 degrees during extension\", \"Drive from legs through core\", \"Strike with first two knuckles\", \"Pull opposite hand to hip chamber\"]','[\"Strike with first two knuckles only\", \"Keep wrist straight and strong\", \"Rotate fist 180 degrees during extension\", \"Pull opposite hand to hip chamber\", \"Generate power from legs and core rotation\"]','[\"Dropping punching hand before striking\", \"Leaving opposite hand extended\", \"Punching with wrong knuckles\", \"Poor wrist alignment causing injury\", \"Not rotating fist during punch\"]','[\"Direct attack\", \"Counter attack\", \"Combination starter\"]',NULL,NULL),(2,'Reverse Punch','Ban Dae Ji Ru Gi','White Belt','#FFFFFF','A powerful punch thrown with the rear hand, utilizing full body rotation for maximum power generation.','Solar plexus, Chest, Face','[\"Full hip and shoulder rotation\", \"Drive power from back leg\", \"Chamber opposite hand strongly\", \"Snap punch at full extension\"]','[\"Maximum hip and shoulder rotation\", \"Drive power from back leg\", \"Chamber opposite hand strongly\", \"Snap punch at full extension\", \"Maintain proper stance throughout\"]','[\"Insufficient hip rotation\", \"Leaning forward during punch\", \"Not chambering opposite hand\", \"Telegraphing the punch\", \"Poor timing with footwork\"]','[\"Power strike\", \"Finishing technique\", \"Breaking\"]',NULL,NULL),(3,'Jab Punch','Jab Ji Ru Gi','White Belt','#FFFFFF','A quick, snapping punch with the lead hand used for timing, distance, and setting up combinations.','Face, Nose, Solar plexus','[\"Quick extension from chamber\", \"Minimal body movement\", \"Fast retraction after impact\", \"Keep rear hand in guard position\"]','[\"Speed over power\", \"Minimal telegraphing\", \"Quick retraction after impact\", \"Use for timing and distance\", \"Keep rear hand in guard position\"]','[\"Using too much power, losing speed\", \"Dropping guard after punch\", \"Overextending the arm\", \"Poor timing and distance\", \"Not retracting quickly enough\"]','[\"Timing tool\", \"Distance measurement\", \"Combination setup\"]',NULL,NULL),(4,'Side Punch','Yup Ji Ru Gi','Purple Belt','#800080','A punch delivered to the side while in a side stance, using the knuckles to strike lateral targets.','Ribs, Kidneys, Side targets','[\"Maintain side stance throughout\", \"Full body rotation for power\", \"Strike with first two knuckles\", \"Follow through completely\"]','[\"Maintain side stance throughout\", \"Full body rotation for power\", \"Strike with first two knuckles\", \"Follow through completely\", \"Keep opposite hand chambered\"]','[\"Losing side stance position\", \"Insufficient body rotation\", \"Poor targeting\", \"Weak follow through\", \"Dropping guard hand\"]','[\"Side attack\", \"Lateral striking\", \"Close range combat\"]',NULL,NULL),(5,'Hook Punch','Hook Ji Ru Gi','Blue Belt','#0000FF','A circular punch that travels in a horizontal arc to strike targets from the side.','Head, Ribs, Liver','[\"Circular arm motion\", \"Rotate from core\", \"Strike with knuckles\", \"Follow circular path\"]','[\"Maintain circular motion\", \"Generate power from core rotation\", \"Keep elbow at proper angle\", \"Follow through completely\", \"Maintain balance throughout\"]','[\"Making motion too wide\", \"Poor core rotation\", \"Wrong elbow angle\", \"Telegraphing the punch\", \"Losing balance\"]','[\"Side attack\", \"Combination technique\", \"Close range striking\"]',NULL,NULL),(6,'Uppercut','Uppercut Ji Ru Gi','Blue Belt','#0000FF','An upward traveling punch that strikes targets from below using an ascending motion.','Chin, Solar plexus, Body','[\"Upward striking motion\", \"Drive from legs\", \"Strike with knuckles upward\", \"Short compact motion\"]','[\"Drive power from legs upward\", \"Keep motion short and compact\", \"Strike with proper knuckles\", \"Maintain balance throughout\", \"Quick recovery to guard\"]','[\"Making motion too wide\", \"Poor leg drive\", \"Overextending upward\", \"Losing balance\", \"Slow recovery\"]','[\"Close range striking\", \"Body attack\", \"Combination finishing\"]',NULL,NULL);
/*!40000 ALTER TABLE `punches_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `self_defense_definitions`
--

DROP TABLE IF EXISTS `self_defense_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `self_defense_definitions` (
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `self_defense_definitions`
--

LOCK TABLES `self_defense_definitions` WRITE;
/*!40000 ALTER TABLE `self_defense_definitions` DISABLE KEYS */;
INSERT INTO `self_defense_definitions` VALUES (1,'Release Front Grab (Basic)','Ap Jab Gi Hae Je','Green White','#90EE90','Basic technique to escape from a front lapel or shirt grab.','Releases','Beginner','Opponent grabs your shirt or lapel from the front','Simple circular hand motion to break grip','[\"Opponent grabs your shirt with one hand\", \"Maintain balance and stay calm\", \"Assess the situation quickly\"]','[\"Raise both arms up and to the sides\", \"Bring arms down in circular motion\", \"Strike through opponent\'s thumbs (weakest point)\", \"Step back to create distance\", \"Prepare counter-attack if needed\"]','[\"Strike at the thumbs, not the strong grip\", \"Use circular motion, not straight pull\", \"Immediate movement after release\", \"Basic footwork for distance\"]','[\"Pulling straight back against strong grip\", \"Not moving through the thumbs\", \"Standing still after release\", \"Panic instead of technique\"]','[\"Basic street self-defense\", \"De-escalation situations\", \"Introduction to releases\"]',NULL,NULL),(2,'Release Rear Grab (Basic)','Dwi Jab Gi Hae Je','Green White','#90EE90','Basic technique to escape from someone grabbing from behind.','Releases','Beginner','Opponent grabs your shirt or arms from behind','Simple turn and break technique','[\"Opponent grabs from behind\", \"Feel the direction of the grab\", \"Maintain balance and composure\"]','[\"Drop your weight slightly\", \"Turn quickly to the outside\", \"Raise arms and break at weak point\", \"Face the attacker\", \"Create distance immediately\"]','[\"Turn into the technique, not away\", \"Use body weight to assist break\", \"Quick decisive movement\", \"Always face the threat after escape\"]','[\"Turning the wrong direction\", \"Not dropping weight first\", \"Slow or hesitant movement\", \"Not creating distance after escape\"]','[\"Rear attack defense\", \"Grab escape fundamentals\", \"Basic positioning\"]',NULL,NULL),(3,'Basic Wrist Control','Gi Bon Son Mok Control','Green White','#90EE90','Fundamental technique for controlling and redirecting an opponent\'s wrist grab.','Wrist Control','Beginner','Opponent grabs your wrist with one hand','Basic leverage and rotation to control wrist','[\"Opponent grabs your wrist\", \"Remain calm and assess grip\", \"Position for leverage\"]','[\"Rotate wrist toward opponent\'s thumb\", \"Apply leverage with other hand\", \"Step to create better angle\", \"Control opponent\'s balance\", \"Create distance or counter\"]','[\"Attack the grip weakness (thumb side)\", \"Use both hands for leverage\", \"Step for better positioning\", \"Control opponent\'s movement\"]','[\"Fighting against the strong grip\", \"Using only one hand\", \"Poor foot positioning\", \"Not following through\"]','[\"Grip escape basics\", \"Control techniques\", \"Fundamental leverage\"]',NULL,NULL),(4,'Bear Hug Escape (Basic)','Gom Po Ong Tal Chul','Green Belt','#008000','Escape technique for when grabbed in a bear hug from behind.','Escapes','Intermediate','Opponent wraps arms around you from behind in bear hug','Multi-step escape using body mechanics and strikes','[\"Opponent applies bear hug from behind\", \"Lower center of gravity\", \"Assess arm position (over or under arms)\"]','[\"Drop weight and widen stance\", \"Grab opponent\'s hands or forearms\", \"Step wide to one side\", \"Turn into opponent\", \"Strike with elbow or hand\", \"Create distance\"]','[\"Drop weight immediately\", \"Grab opponent\'s limbs for control\", \"Step wide for leverage\", \"Turn aggressively\", \"Strike decisively\"]','[\"Standing too tall\", \"Not controlling opponent\'s arms\", \"Small steps instead of wide\", \"Weak turn\", \"Hesitant striking\"]','[\"Close contact defense\", \"Multiple attacker preparation\", \"Advanced escape sequences\"]',NULL,NULL),(5,'Punch Counter (Basic)','Gi Bon Ji Ru Gi Bang Eo','Green Belt','#008000','Basic defensive technique against incoming punches.','Counters','Intermediate','Opponent throws straight punch at you','Block and immediate counter-attack sequence','[\"Opponent chambers for punch\", \"Read attack timing\", \"Prepare defensive stance\"]','[\"Execute appropriate block (inside/outside)\", \"Immediately counter with punch or strike\", \"Move off centerline\", \"Follow through with combination\", \"Create distance or control\"]','[\"Quick block execution\", \"Immediate counter-attack\", \"Move off attack line\", \"Strong follow-through\", \"Distance management\"]','[\"Slow block timing\", \"Delayed counter\", \"Standing in attack line\", \"Weak follow-through\", \"Poor distance control\"]','[\"Basic fighting skills\", \"Counter-attack timing\", \"Block-strike combinations\"]',NULL,NULL),(6,'Ground Escape (Advanced)','Ddang Wi Tal Chul','Green Black','#006400','Advanced technique for escaping when taken to the ground.','Ground Defense','Advanced','Opponent has taken you to the ground and is on top','Multi-phase escape using leverage, positioning, and striking','[\"Assess position on ground\", \"Protect vital areas\", \"Control opponent\'s posture\", \"Look for escape opportunities\"]','[\"Secure opponent\'s arms or clothing\", \"Bridge hip to create space\", \"Turn to escape mount/side control\", \"Use knees and elbows for strikes\", \"Get to feet safely\", \"Create distance\"]','[\"Control opponent\'s posture first\", \"Use bridge and turn technique\", \"Strike to create opportunities\", \"Priority is getting to feet\", \"Always create distance after escape\"]','[\"Panic instead of technique\", \"Not controlling opponent\", \"Poor bridging technique\", \"Staying on ground too long\", \"Not creating distance\"]','[\"Ground fighting basics\", \"Multiple position escapes\", \"Real-world defense scenarios\"]',NULL,NULL);
/*!40000 ALTER TABLE `self_defense_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stance_definitions`
--

DROP TABLE IF EXISTS `stance_definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stance_definitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `korean` varchar(100) NOT NULL,
  `belt` varchar(45) NOT NULL,
  `belt_color` varchar(7) NOT NULL,
  `description` text NOT NULL,
  `position` text NOT NULL,
  `body_position` text NOT NULL,
  `key_points` json NOT NULL,
  `common_mistakes` json NOT NULL,
  `applications` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`),
  KEY `idx_belt` (`belt`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stance_definitions`
--

LOCK TABLES `stance_definitions` WRITE;
/*!40000 ALTER TABLE `stance_definitions` DISABLE KEYS */;
INSERT INTO `stance_definitions` VALUES (1,'Ready Stance','Joon Bi Sogi','White Belt','#FFFFFF','The preparatory stance used before beginning techniques or forms.','Feet shoulder-width apart, toes pointing forward','Hands in fists at belt level, elbows slightly bent','[\"Feet parallel, shoulder-width apart\", \"Slight bend in knees\", \"Fists at waist level\", \"Elbows close to body\", \"Balanced weight distribution\"]','[\"Feet too wide or narrow\", \"Hands too high or low\", \"Locking knees\", \"Leaning forward or back\"]','[\"Starting position for techniques\", \"Forms preparation\"]','2025-07-31 04:35:50','2025-07-31 04:35:50'),(2,'At Attention','Charyot Sogi','White Belt','#FFFFFF','The formal attention stance used at the beginning and end of class.','Feet together, heels touching, toes pointed outward at 45 degrees','Stand straight, shoulders back, arms at sides, hands in fists','[\"Heels together, toes apart\", \"Weight evenly distributed\", \"Straight posture\", \"Eyes forward\", \"Relaxed but alert\", \"Move Left Foot to Right Foot\"]','[\"Feet too far apart\", \"Slouching shoulders\", \"Looking down\", \"Tense muscles\", \"Moving wrong foot\"]','[\"Formal greeting\", \"Beginning/end of forms\", \"Showing respect\"]','2025-07-31 04:35:50','2025-07-31 04:35:50'),(3,'Horse Stance','Kima Sogi','White Belt','#FFFFFF','A strong, stable stance that builds leg strength and balance.','Feet wide apart (2-3 shoulder widths), toes pointing forward','Squat down with thighs parallel to ground, back straight','[\"Wide stance for stability\", \"Thighs parallel to floor\", \"Knees over toes\", \"Straight back\", \"Even weight distribution\"]','[\"Knees caving inward\", \"Leaning forward\", \"Not squatting low enough\", \"Toes pointing outward\"]','[\"Strength training\", \"Blocking techniques\", \"Stable striking platform\"]','2025-07-31 04:35:50','2025-07-31 04:35:50'),(4,'Front Stance','Ap Koobi','White Belt','#FFFFFF','An offensive stance that provides forward momentum and power.','One leg forward, one leg back, both feet pointing forward','70% weight on front leg, 30% on back leg, knee over ankle','[\"Long stance (2-3 foot lengths)\", \"Both feet pointing forward\", \"Front knee bent, back leg straight\", \"Weight mostly on front leg\", \"Hip square to front\"]','[\"Stance too short or long\", \"Back foot turned out\", \"Weight evenly distributed\", \"Hip turned sideways\"]','[\"Punching techniques\", \"Forward attacks\", \"Advancing movements\"]','2025-07-31 04:35:50','2025-07-31 04:35:50'),(5,'Back Stance','Dwit Koobi','Yellow Belt','#FFD700','A defensive stance that allows quick retreating and counter-attacks.','One leg forward, one leg back at 90-degree angle','30% weight on front leg, 70% on back leg','[\"L-shaped foot position\", \"Weight mostly on back leg\", \"Front leg light and mobile\", \"Both knees bent\", \"Side-facing body position\"]','[\"Too much weight on front leg\", \"Feet not at 90 degrees\", \"Standing too upright\", \"Back leg too straight\"]','[\"Blocking techniques\", \"Defensive movements\", \"Quick counter-attacks\"]','2025-07-31 04:35:50','2025-07-31 04:35:50'),(6,'Cat Stance','Beom Sogi','Green Belt','#008000','A mobile stance with most weight on the back leg, allowing quick front leg techniques.','Front foot barely touching ground, all weight on back leg','Back leg deeply bent, front foot on ball of foot only','[\"90-95% weight on back leg\", \"Front foot touching lightly\", \"Low center of gravity\", \"Ready to kick with front leg\", \"Balanced and mobile\"]','[\"Too much weight on front foot\", \"Not low enough\", \"Front foot flat on ground\", \"Back leg not bent enough\"]','[\"Quick front kicks\", \"Evasive movements\", \"Defensive positioning\"]','2025-07-31 04:35:50','2025-07-31 04:35:50');
/*!40000 ALTER TABLE `stance_definitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stances`
--

DROP TABLE IF EXISTS `stances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `front` varchar(45) DEFAULT NULL,
  `back` varchar(45) DEFAULT NULL,
  `straddle` varchar(45) DEFAULT NULL,
  `fighting` varchar(45) DEFAULT NULL,
  `jun_bi` varchar(45) DEFAULT NULL,
  `bowing` varchar(45) DEFAULT NULL,
  `shifting` varchar(45) DEFAULT NULL,
  `comments` mediumtext,
  PRIMARY KEY (`id`),
  KEY `stances_ibfk_1` (`studentid`),
  CONSTRAINT `stances_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stances`
--

LOCK TABLES `stances` WRITE;
/*!40000 ALTER TABLE `stances` DISABLE KEYS */;
/*!40000 ALTER TABLE `stances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_assessments`
--

DROP TABLE IF EXISTS `student_assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_assessments` (
  `assessment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `instructor_id` int DEFAULT NULL,
  `assessment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `target_belt_rank` varchar(50) DEFAULT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `belt_size` varchar(10) DEFAULT NULL,
  `geocho_hyung_il_bu` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_il_bu_sahm_gup` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_yi_bu` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_yi_bu_sahm_gup` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_sahm_bu` decimal(3,1) DEFAULT NULL,
  `pyong_an_cho_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_yi_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_sahm_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_sa_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_oh_dan` decimal(3,1) DEFAULT NULL,
  `bassai` decimal(3,1) DEFAULT NULL,
  `traditional_1` decimal(3,1) DEFAULT NULL,
  `traditional_2` decimal(3,1) DEFAULT NULL,
  `traditional_3` decimal(3,1) DEFAULT NULL,
  `traditional_4` decimal(3,1) DEFAULT NULL,
  `made_up_1` decimal(3,1) DEFAULT NULL,
  `made_up_2` decimal(3,1) DEFAULT NULL,
  `made_up_3` decimal(3,1) DEFAULT NULL,
  `made_up_4` decimal(3,1) DEFAULT NULL,
  `three_steps_1` decimal(3,1) DEFAULT NULL,
  `three_steps_2` decimal(3,1) DEFAULT NULL,
  `three_steps_3` decimal(3,1) DEFAULT NULL,
  `three_steps_4` decimal(3,1) DEFAULT NULL,
  `jump_kick_front` decimal(3,1) DEFAULT NULL,
  `jump_kick_round` decimal(3,1) DEFAULT NULL,
  `jump_kick_side` decimal(3,1) DEFAULT NULL,
  `jump_kick_back` decimal(3,1) DEFAULT NULL,
  `jump_kick_f_side` decimal(3,1) DEFAULT NULL,
  `jump_kick_crescent` decimal(3,1) DEFAULT NULL,
  `jump_kick_heel` decimal(3,1) DEFAULT NULL,
  `combination_fighting` decimal(3,1) DEFAULT NULL,
  `combination_hands` decimal(3,1) DEFAULT NULL,
  `combination_basic` decimal(3,1) DEFAULT NULL,
  `stance_front` decimal(3,1) DEFAULT NULL,
  `stance_back` decimal(3,1) DEFAULT NULL,
  `stance_straddle` decimal(3,1) DEFAULT NULL,
  `stance_shifting` decimal(3,1) DEFAULT NULL,
  `falling_back` decimal(3,1) DEFAULT NULL,
  `falling_front` decimal(3,1) DEFAULT NULL,
  `falling_roll` decimal(3,1) DEFAULT NULL,
  `falling_breaking` decimal(3,1) DEFAULT NULL,
  `high_block` decimal(3,1) DEFAULT NULL,
  `low_block` decimal(3,1) DEFAULT NULL,
  `knife_hand_block` decimal(3,1) DEFAULT NULL,
  `double_block` decimal(3,1) DEFAULT NULL,
  `center_punch` decimal(3,1) DEFAULT NULL,
  `reverse_punch` decimal(3,1) DEFAULT NULL,
  `jab` decimal(3,1) DEFAULT NULL,
  `front_kick` decimal(3,1) DEFAULT NULL,
  `side_kick` decimal(3,1) DEFAULT NULL,
  `roundhouse_kick` decimal(3,1) DEFAULT NULL,
  `back_kick` decimal(3,1) DEFAULT NULL,
  `hook_kick` decimal(3,1) DEFAULT NULL,
  `overall_score` decimal(5,2) DEFAULT NULL,
  `passed` tinyint(1) DEFAULT NULL,
  `examiner_notes` text,
  `assessment_status` enum('in_progress','completed','cancelled') DEFAULT 'in_progress',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `upper_cut` decimal(3,1) DEFAULT NULL,
  `hook_punch` decimal(3,1) DEFAULT NULL,
  `spin_bottom_fist` decimal(3,1) DEFAULT NULL,
  `charging_punch` decimal(3,1) DEFAULT NULL,
  `slide_up_jab_punch` decimal(3,1) DEFAULT NULL,
  `chop_low` decimal(3,1) DEFAULT NULL,
  `chop_high` decimal(3,1) DEFAULT NULL,
  `spearhand` decimal(3,1) DEFAULT NULL,
  `stepping_kick` decimal(3,1) DEFAULT NULL,
  `slide_up_kick` decimal(3,1) DEFAULT NULL,
  `spin_back_kick` decimal(3,1) DEFAULT NULL,
  `inside_crescent_kick` decimal(3,1) DEFAULT NULL,
  `outside_crescent_kick` decimal(3,1) DEFAULT NULL,
  `spin_outside_crescent_kick` decimal(3,1) DEFAULT NULL,
  `jump_spin_outside_crescent` decimal(3,1) DEFAULT NULL,
  `spin_heel_kick` decimal(3,1) DEFAULT NULL,
  `studder_step_kick` decimal(3,1) DEFAULT NULL,
  `butterfly_kick` decimal(3,1) DEFAULT NULL,
  `inside_block` decimal(3,1) DEFAULT NULL COMMENT 'Inside Block score (0-10)',
  `outside_block` decimal(3,1) DEFAULT NULL COMMENT 'Outside Block score (0-10)',
  `block_punch` decimal(3,1) DEFAULT NULL COMMENT 'Block Punch score (0-10)',
  `double_block_punch` decimal(3,1) DEFAULT NULL COMMENT 'Double Block Punch score (0-10)',
  PRIMARY KEY (`assessment_id`),
  KEY `idx_student_assessments_student_id` (`student_id`),
  KEY `idx_student_assessments_date` (`assessment_date`),
  KEY `idx_student_assessments_status` (`assessment_status`),
  KEY `idx_student_assessments_target_belt` (`target_belt_rank`),
  CONSTRAINT `student_assessments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`studentid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_assessments`
--

LOCK TABLES `student_assessments` WRITE;
/*!40000 ALTER TABLE `student_assessments` DISABLE KEYS */;
INSERT INTO `student_assessments` VALUES (1,1,1,'2025-08-05 00:00:00','Green Black',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','in_progress','2025-08-05 16:17:52','2025-08-05 16:30:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,NULL,'2025-08-05 00:00:00','Green Black',NULL,NULL,8.0,8.0,8.0,8.0,8.0,8.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','in_progress','2025-08-05 16:20:37','2025-08-05 17:34:48',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `student_assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `student_emergency_contacts`
--

DROP TABLE IF EXISTS `student_emergency_contacts`;
/*!50001 DROP VIEW IF EXISTS `student_emergency_contacts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_emergency_contacts` AS SELECT 
 1 AS `studentid`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `preferedName`,
 1 AS `age`,
 1 AS `beltRank`,
 1 AS `emergency_contact_name`,
 1 AS `emergency_contact_phone`,
 1 AS `emergency_contact_relationship`,
 1 AS `medical_conditions`,
 1 AS `allergies`,
 1 AS `medications`,
 1 AS `parent_firstName`,
 1 AS `parent_lastName`,
 1 AS `parent_email`,
 1 AS `parent_phone`,
 1 AS `parent_relationship`,
 1 AS `is_emergency_contact`,
 1 AS `can_pickup`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `student_medical_alerts`
--

DROP TABLE IF EXISTS `student_medical_alerts`;
/*!50001 DROP VIEW IF EXISTS `student_medical_alerts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_medical_alerts` AS SELECT 
 1 AS `studentid`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `preferedName`,
 1 AS `age`,
 1 AS `beltRank`,
 1 AS `medical_conditions`,
 1 AS `allergies`,
 1 AS `medications`,
 1 AS `emergency_contact_name`,
 1 AS `emergency_contact_phone`,
 1 AS `emergency_contact_relationship`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `student_test_history`
--

DROP TABLE IF EXISTS `student_test_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_test_history` (
  `test_history_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `instructor_id` int DEFAULT NULL,
  `test_date` datetime NOT NULL,
  `belt_from` varchar(50) NOT NULL,
  `belt_to` varchar(50) NOT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `belt_size` varchar(10) DEFAULT NULL,
  `geocho_hyung_il_bu` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_il_bu_sahm_gup` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_yi_bu` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_yi_bu_sahm_gup` decimal(3,1) DEFAULT NULL,
  `geocho_hyung_sahm_bu` decimal(3,1) DEFAULT NULL,
  `pyong_an_cho_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_yi_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_sahm_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_sa_dan` decimal(3,1) DEFAULT NULL,
  `pyong_an_oh_dan` decimal(3,1) DEFAULT NULL,
  `bassai` decimal(3,1) DEFAULT NULL,
  `traditional_1` decimal(3,1) DEFAULT NULL,
  `traditional_2` decimal(3,1) DEFAULT NULL,
  `traditional_3` decimal(3,1) DEFAULT NULL,
  `traditional_4` decimal(3,1) DEFAULT NULL,
  `made_up_1` decimal(3,1) DEFAULT NULL,
  `made_up_2` decimal(3,1) DEFAULT NULL,
  `made_up_3` decimal(3,1) DEFAULT NULL,
  `made_up_4` decimal(3,1) DEFAULT NULL,
  `three_steps_1` decimal(3,1) DEFAULT NULL,
  `three_steps_2` decimal(3,1) DEFAULT NULL,
  `three_steps_3` decimal(3,1) DEFAULT NULL,
  `three_steps_4` decimal(3,1) DEFAULT NULL,
  `jump_kick_front` decimal(3,1) DEFAULT NULL,
  `jump_kick_round` decimal(3,1) DEFAULT NULL,
  `jump_kick_side` decimal(3,1) DEFAULT NULL,
  `jump_kick_back` decimal(3,1) DEFAULT NULL,
  `jump_kick_f_side` decimal(3,1) DEFAULT NULL,
  `jump_kick_crescent` decimal(3,1) DEFAULT NULL,
  `jump_kick_heel` decimal(3,1) DEFAULT NULL,
  `combination_fighting` decimal(3,1) DEFAULT NULL,
  `combination_hands` decimal(3,1) DEFAULT NULL,
  `combination_basic` decimal(3,1) DEFAULT NULL,
  `stance_front` decimal(3,1) DEFAULT NULL,
  `stance_back` decimal(3,1) DEFAULT NULL,
  `stance_straddle` decimal(3,1) DEFAULT NULL,
  `stance_shifting` decimal(3,1) DEFAULT NULL,
  `falling_back` decimal(3,1) DEFAULT NULL,
  `falling_front` decimal(3,1) DEFAULT NULL,
  `falling_roll` decimal(3,1) DEFAULT NULL,
  `falling_breaking` decimal(3,1) DEFAULT NULL,
  `overall_score` decimal(5,2) NOT NULL,
  `passed` tinyint(1) NOT NULL,
  `examiner_name` varchar(255) DEFAULT NULL,
  `examiner_notes` text,
  `new_rank` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`test_history_id`),
  KEY `idx_test_history_student_id` (`student_id`),
  KEY `idx_test_history_date` (`test_date`),
  KEY `idx_test_history_belt_from` (`belt_from`),
  KEY `idx_test_history_belt_to` (`belt_to`),
  KEY `idx_test_history_passed` (`passed`),
  CONSTRAINT `student_test_history_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`studentid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_test_history`
--

LOCK TABLES `student_test_history` WRITE;
/*!40000 ALTER TABLE `student_test_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_test_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_tests`
--

DROP TABLE IF EXISTS `student_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_tests` (
  `testid` int NOT NULL AUTO_INCREMENT,
  `studentid` int NOT NULL,
  `test_date` date NOT NULL,
  `belt_from` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `belt_to` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `overall_score` decimal(5,2) DEFAULT NULL,
  `passed` tinyint(1) DEFAULT '0',
  `instructor_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`testid`),
  KEY `idx_studentid` (`studentid`),
  KEY `idx_test_date` (`test_date`),
  KEY `idx_belt_from` (`belt_from`),
  KEY `idx_belt_to` (`belt_to`),
  CONSTRAINT `student_tests_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Records of all belt tests taken by students';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_tests`
--

LOCK TABLES `student_tests` WRITE;
/*!40000 ALTER TABLE `student_tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `studentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `preferedName` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `beltRank` varchar(45) NOT NULL DEFAULT 'white',
  `startDateUTC` varchar(45) NOT NULL,
  `endDateUTC` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `emergency_contact_name` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(20) DEFAULT NULL,
  `emergency_contact_relationship` varchar(50) DEFAULT NULL,
  `medical_conditions` text,
  `allergies` text,
  `medications` text,
  `waiver_signed` tinyint(1) DEFAULT '0',
  `waiver_date` date DEFAULT NULL,
  `insurance_provider` varchar(100) DEFAULT NULL,
  `insurance_policy_number` varchar(50) DEFAULT NULL,
  `notes` mediumtext,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `child` tinyint(1) NOT NULL DEFAULT '0',
  `lastTestUTC` varchar(45) DEFAULT NULL,
  `eligibleForTesting` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`studentid`),
  KEY `idx_date_of_birth` (`date_of_birth`),
  KEY `idx_waiver_signed` (`waiver_signed`),
  KEY `idx_emergency_contact_name` (`emergency_contact_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Student records with comprehensive safety and contact information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Jacob','Erotas','Kovi',10,NULL,'Green','2025-07-30 12:00:00',NULL,'nerotas7@gmail.com','661-305-9259',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'',1,1,'2025-07-13T00:00:00.000Z',0),(2,'Joseph','Erotas','Yossi',8,NULL,'Blue Black','2025-07-30 12:00:00',NULL,'nerotas7@gmail.com','661-305-9259',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'',1,1,'2025-01-21T00:00:00.000Z',1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_results`
--

DROP TABLE IF EXISTS `test_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_results` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `testid` int NOT NULL,
  `category` enum('blocks','kicks','punches','forms','stances','combinations','falling','one_steps') COLLATE utf8mb4_unicode_ci NOT NULL,
  `technique_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `passed` tinyint(1) DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`result_id`),
  KEY `idx_testid` (`testid`),
  KEY `idx_category` (`category`),
  KEY `idx_technique_name` (`technique_name`),
  CONSTRAINT `test_results_ibfk_1` FOREIGN KEY (`testid`) REFERENCES `student_tests` (`testid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detailed scoring for individual techniques during tests';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_results`
--

LOCK TABLES `test_results` WRITE;
/*!40000 ALTER TABLE `test_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `assessment_overview`
--

/*!50001 DROP VIEW IF EXISTS `assessment_overview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `assessment_overview` AS select `sa`.`assessment_id` AS `assessment_id`,`sa`.`student_id` AS `student_id`,concat(`s`.`firstName`,' ',`s`.`lastName`) AS `student_name`,`s`.`beltRank` AS `current_belt`,`sa`.`target_belt_rank` AS `target_belt_rank`,`sa`.`assessment_date` AS `assessment_date`,`sa`.`overall_score` AS `overall_score`,`sa`.`passed` AS `passed`,`sa`.`assessment_status` AS `assessment_status`,`sa`.`examiner_notes` AS `examiner_notes`,round((((((((((((((coalesce(`sa`.`geocho_hyung_il_bu`,0) > 0) + (coalesce(`sa`.`geocho_hyung_il_bu_sahm_gup`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_yi_bu`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_yi_bu_sahm_gup`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_sahm_bu`,0) > 0)) + (coalesce(`sa`.`pyong_an_cho_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_yi_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_sahm_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_sa_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_oh_dan`,0) > 0)) + (coalesce(`sa`.`bassai`,0) > 0)) * 100.0) / 11),1) AS `forms_completion_pct`,round((((((((((((coalesce(`sa`.`geocho_hyung_il_bu`,0) + coalesce(`sa`.`geocho_hyung_il_bu_sahm_gup`,0)) + coalesce(`sa`.`geocho_hyung_yi_bu`,0)) + coalesce(`sa`.`geocho_hyung_yi_bu_sahm_gup`,0)) + coalesce(`sa`.`geocho_hyung_sahm_bu`,0)) + coalesce(`sa`.`pyong_an_cho_dan`,0)) + coalesce(`sa`.`pyong_an_yi_dan`,0)) + coalesce(`sa`.`pyong_an_sahm_dan`,0)) + coalesce(`sa`.`pyong_an_sa_dan`,0)) + coalesce(`sa`.`pyong_an_oh_dan`,0)) + coalesce(`sa`.`bassai`,0)) / greatest(1,(((((((((((coalesce(`sa`.`geocho_hyung_il_bu`,0) > 0) + (coalesce(`sa`.`geocho_hyung_il_bu_sahm_gup`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_yi_bu`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_yi_bu_sahm_gup`,0) > 0)) + (coalesce(`sa`.`geocho_hyung_sahm_bu`,0) > 0)) + (coalesce(`sa`.`pyong_an_cho_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_yi_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_sahm_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_sa_dan`,0) > 0)) + (coalesce(`sa`.`pyong_an_oh_dan`,0) > 0)) + (coalesce(`sa`.`bassai`,0) > 0)))),1) AS `avg_forms_score` from (`student_assessments` `sa` join `students` `s` on((`sa`.`student_id` = `s`.`studentid`))) order by `sa`.`assessment_date` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `families`
--

/*!50001 DROP VIEW IF EXISTS `families`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `families` AS select `pm`.`parentid` AS `parentid`,`s`.`studentid` AS `studentid`,`s`.`firstName` AS `firstName`,`s`.`lastName` AS `lastName`,`s`.`preferedName` AS `preferedName`,`p`.`firstName` AS `parentFirstName`,`p`.`lastName` AS `parentLastName`,`s`.`age` AS `age`,`s`.`beltRank` AS `beltRank`,`s`.`startDateUTC` AS `startDate`,`s`.`endDateUTC` AS `endDate`,`s`.`lastTestUTC` AS `lastTest`,`s`.`email` AS `email`,`s`.`phone` AS `phone`,`s`.`notes` AS `notes`,`s`.`active` AS `active`,`s`.`eligibleForTesting` AS `eligibleForTesting` from (((select `students`.`studentid` AS `studentid`,`students`.`firstName` AS `firstName`,`students`.`lastName` AS `lastName`,`students`.`preferedName` AS `preferedName`,`students`.`age` AS `age`,`students`.`beltRank` AS `beltRank`,`students`.`startDateUTC` AS `startDateUTC`,`students`.`endDateUTC` AS `endDateUTC`,`students`.`lastTestUTC` AS `lastTestUTC`,`students`.`email` AS `email`,`students`.`phone` AS `phone`,`students`.`notes` AS `notes`,`students`.`active` AS `active`,`students`.`child` AS `child`,`students`.`eligibleForTesting` AS `eligibleForTesting` from `students` where (`students`.`child` = 1)) `s` left join `parent_mapping` `pm` on((`pm`.`studentid` = `s`.`studentid`))) left join `parents` `p` on((`pm`.`parentid` = `p`.`parentid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_emergency_contacts`
--

/*!50001 DROP VIEW IF EXISTS `student_emergency_contacts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_emergency_contacts` AS select `s`.`studentid` AS `studentid`,`s`.`firstName` AS `firstName`,`s`.`lastName` AS `lastName`,`s`.`preferedName` AS `preferedName`,`s`.`age` AS `age`,`s`.`beltRank` AS `beltRank`,`s`.`emergency_contact_name` AS `emergency_contact_name`,`s`.`emergency_contact_phone` AS `emergency_contact_phone`,`s`.`emergency_contact_relationship` AS `emergency_contact_relationship`,`s`.`medical_conditions` AS `medical_conditions`,`s`.`allergies` AS `allergies`,`s`.`medications` AS `medications`,`p`.`firstName` AS `parent_firstName`,`p`.`lastName` AS `parent_lastName`,`p`.`email` AS `parent_email`,`p`.`phone` AS `parent_phone`,`p`.`relationship` AS `parent_relationship`,`p`.`is_emergency_contact` AS `is_emergency_contact`,`p`.`can_pickup` AS `can_pickup` from ((`students` `s` left join `parent_mapping` `pm` on((`s`.`studentid` = `pm`.`studentid`))) left join `parents` `p` on((`pm`.`parentid` = `p`.`parentid`))) where ((`s`.`child` = 1) or (`s`.`emergency_contact_name` is not null)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_medical_alerts`
--

/*!50001 DROP VIEW IF EXISTS `student_medical_alerts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_medical_alerts` AS select `students`.`studentid` AS `studentid`,`students`.`firstName` AS `firstName`,`students`.`lastName` AS `lastName`,`students`.`preferedName` AS `preferedName`,`students`.`age` AS `age`,`students`.`beltRank` AS `beltRank`,`students`.`medical_conditions` AS `medical_conditions`,`students`.`allergies` AS `allergies`,`students`.`medications` AS `medications`,`students`.`emergency_contact_name` AS `emergency_contact_name`,`students`.`emergency_contact_phone` AS `emergency_contact_phone`,`students`.`emergency_contact_relationship` AS `emergency_contact_relationship` from `students` where ((`students`.`medical_conditions` is not null) or (`students`.`allergies` is not null) or (`students`.`medications` is not null)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-05 20:54:24
