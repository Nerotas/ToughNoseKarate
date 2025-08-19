CREATE
OR REPLACE VIEW families AS
SELECT
  pm.parentid AS parentid,
  s.studentid AS studentid,
  s."firstname" AS "firstName",
  s."lastname" AS "lastName",
  s."preferredname" AS "preferredName",
  p."first_name" AS "parentFirstName",
  p."last_name" AS "parentLastName",
  s.age AS age,
  s."beltrank" AS "beltRank",
  s."startdateutc" AS "startDate",
  s.email AS email,
  s.phone AS phone,
  s.notes AS notes,
  s.active AS active,
  s."eligiblefortesting" AS "eligibleForTesting"
FROM
  students s
  LEFT JOIN parent_mapping pm ON pm.studentid = s.studentid
  LEFT JOIN parents p ON pm.parentid = p.parentid
WHERE
  s.child = true;