CREATE DATABASE IF NOT EXISTS `toughnosekarate`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;

USE `toughnosekarate`;

-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: toughnosekarate2
-- ------------------------------------------------------
-- Server version	8.0.43
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `belt_requirements`
--
DROP TABLE IF EXISTS `belt_requirements`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
  PRIMARY KEY (`belt_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `blocks`
--
DROP TABLE IF EXISTS `blocks`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `combinations`
--
DROP TABLE IF EXISTS `combinations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `falling`
--
DROP TABLE IF EXISTS `falling`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Temporary view structure for view `families`
--
DROP TABLE IF EXISTS `families`;

/*!50001 DROP VIEW IF EXISTS `families`*/
;

SET
  @saved_cs_client = @ @character_set_client;

/*!50503 SET character_set_client = utf8mb4 */
;

/*!50001 CREATE VIEW `families` AS SELECT
 1 AS `parentid`,
 1 AS `studentid`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `preferedName`,
 1 AS `parentFirstName`,
 1 AS `parentLastName`,
 1 AS `age`,
 1 AS `rank`,
 1 AS `startDateUTC`,
 1 AS `endDateUTC`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `notes`,
 1 AS `active`*/
;

SET
  character_set_client = @saved_cs_client;

--
-- Table structure for table `forms`
--
DROP TABLE IF EXISTS `forms`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `kicks`
--
DROP TABLE IF EXISTS `kicks`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `one_steps`
--
DROP TABLE IF EXISTS `one_steps`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `parent_mapping`
--
DROP TABLE IF EXISTS `parent_mapping`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `parent_mapping` (
  `idparent_mapping` int NOT NULL AUTO_INCREMENT,
  `parentid` int NOT NULL,
  `studentid` int NOT NULL,
  PRIMARY KEY (`idparent_mapping`),
  KEY `parentid` (`parentid`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `parent_mapping_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `parents` (`parentid`),
  CONSTRAINT `parent_mapping_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `students` (`studentid`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `parents`
--
DROP TABLE IF EXISTS `parents`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `parents` (
  `parentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`parentid`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `punches`
--
DROP TABLE IF EXISTS `punches`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `stances`
--
DROP TABLE IF EXISTS `stances`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `students`
--
DROP TABLE IF EXISTS `students`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `students` (
  `studentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `preferedName` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `rank` varchar(45) NOT NULL DEFAULT 'white',
  `startDateUTC` varchar(45) NOT NULL,
  `endDateUTC` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `notes` mediumtext,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `child` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`studentid`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `stance_definitions`
--
DROP TABLE IF EXISTS `stance_definitions`;

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
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`),
  KEY `idx_belt` (`belt`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Final view structure for view `families`
--
/*!50001 DROP VIEW IF EXISTS `families`*/
;

/*!50001 SET @saved_cs_client          = @@character_set_client */
;

/*!50001 SET @saved_cs_results         = @@character_set_results */
;

/*!50001 SET @saved_col_connection     = @@collation_connection */
;

/*!50001 SET character_set_client      = utf8mb4 */
;

/*!50001 SET character_set_results     = utf8mb4 */
;

/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */
;

/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `families` AS select `pm`.`parentid` AS `parentid`,`s`.`studentid` AS `studentid`,`s`.`firstName` AS `firstName`,`s`.`lastName` AS `lastName`,`s`.`preferedName` AS `preferedName`,`p`.`firstName` AS `parentFirstName`,`p`.`lastName` AS `parentLastName`,`s`.`age` AS `age`,`s`.`rank` AS `rank`,`s`.`startDateUTC` AS `startDateUTC`,`s`.`endDateUTC` AS `endDateUTC`,`s`.`email` AS `email`,`s`.`phone` AS `phone`,`s`.`notes` AS `notes`,`s`.`active` AS `active` from (((select `students`.`studentid` AS `studentid`,`students`.`firstName` AS `firstName`,`students`.`lastName` AS `lastName`,`students`.`preferedName` AS `preferedName`,`students`.`age` AS `age`,`students`.`rank` AS `rank`,`students`.`startDateUTC` AS `startDateUTC`,`students`.`endDateUTC` AS `endDateUTC`,`students`.`email` AS `email`,`students`.`phone` AS `phone`,`students`.`notes` AS `notes`,`students`.`active` AS `active`,`students`.`child` AS `child` from `students` where (`students`.`child` = 1)) `s` left join `parent_mapping` `pm` on((`pm`.`studentid` = `s`.`studentid`))) left join `parents` `p` on((`pm`.`parentid` = `p`.`parentid`))) */
;

/*!50001 SET character_set_client      = @saved_cs_client */
;

/*!50001 SET character_set_results     = @saved_cs_results */
;

/*!50001 SET collation_connection      = @saved_col_connection */
;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-07-30 13:49:51