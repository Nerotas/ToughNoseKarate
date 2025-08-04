CREATE ALGORITHM = UNDEFINED DEFINER = `root` @`localhost` SQL SECURITY DEFINER VIEW `families` AS
SELECT
  `pm`.`parentid` AS `parentid`,
  `s`.`studentid` AS `studentid`,
  `s`.`firstName` AS `firstName`,
  `s`.`lastName` AS `lastName`,
  `s`.`preferedName` AS `preferedName`,
  `p`.`firstName` AS `parentFirstName`,
  `p`.`lastName` AS `parentLastName`,
  `s`.`age` AS `age`,
  `s`.`beltRank` AS `beltRank`,
  `s`.`startDateUTC` AS `startDate`,
  `s`.`endDateUTC` AS `endDate`,
  `s`.`lastTestUTC` AS `lastTest`,
  `s`.`email` AS `email`,
  `s`.`phone` AS `phone`,
  `s`.`notes` AS `notes`,
  `s`.`active` AS `active`,
  `s`.`eligibleForTesting` AS `eligibleForTesting`
FROM
  (
    (
      (
        SELECT
          `students`.`studentid` AS `studentid`,
          `students`.`firstName` AS `firstName`,
          `students`.`lastName` AS `lastName`,
          `students`.`preferedName` AS `preferedName`,
          `students`.`age` AS `age`,
          `students`.`beltRank` AS `beltRank`,
          `students`.`startDateUTC` AS `startDateUTC`,
          `students`.`endDateUTC` AS `endDateUTC`,
          `students`.`lastTestUTC` AS `lastTestUTC`,
          `students`.`email` AS `email`,
          `students`.`phone` AS `phone`,
          `students`.`notes` AS `notes`,
          `students`.`active` AS `active`,
          `students`.`child` AS `child`,
          `students`.`eligibleForTesting` AS `eligibleForTesting`
        FROM
          `students`
        WHERE
          (`students`.`child` = 1)
      ) `s`
      LEFT JOIN `parent_mapping` `pm` ON ((`pm`.`studentid` = `s`.`studentid`))
    )
    LEFT JOIN `parents` `p` ON ((`pm`.`parentid` = `p`.`parentid`))
  );