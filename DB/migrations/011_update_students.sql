CREATE TABLE `students` (
  `studentid` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `preferredName` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `beltRank` varchar(45) NOT NULL DEFAULT 'white',
  `startDateUTC` varchar(45) NOT NULL,
  `endDateUTC` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `notes` mediumtext,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `child` tinyint(1) NOT NULL DEFAULT '0',
  `lastTestUTC` varchar(45) DEFAULT NULL,
  `eligibleForTesting` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`studentid`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;