-- This SQL script builds a database to keep track of turtles and turtle sightings in the Calvin Ecopreserve
-- and populates the database with sample data
--
-- @author Shell Squad
-- @version October 30, 2019
--
DROP TABLE IF EXISTS turtle, sighting;
DROP TYPE IF EXISTS turtle_sex;

CREATE TYPE turtle_sex AS ENUM('male', 'female');
CREATE TABLE turtle (
	id integer PRIMARY KEY,
	mark varchar(10),
	sex turtle_sex 
);
CREATE TABLE sighting (
	id integer PRIMARY KEY,
	turtle_id integer,
	time_seen timestamp,
	latitude float8,
	longitude float8,
	carapace_length integer,
	notes text
);

INSERT INTO turtle VALUES (0, '3R', 'male');
INSERT INTO turtle VALUES (1, '2L', 'female');
INSERT INTO turtle VALUES (2, '1L', 'male');

INSERT INTO sighting VALUES (0, 0, '2019-10-26T02:15:31Z', 42.9313086715985, -85.58243000000002, 29, 'A sample sighting for turtle 0');
INSERT INTO sighting VALUES (1, 0, '2019-10-26T03:18:09Z', 42.9320937253728, -85.58218392028273, 30, 'A second sample sighting for turtle 0');
INSERT INTO sighting VALUES (2, 1, '2019-10-26T05:42:26Z', 42.9360273262836, -85.57836352739273, 25, 'A sample sighting for turtle 1');
INSERT INTO sighting VALUES (3, 2, '2019-10-26T07:36:53Z', 42.9342562436253, -85.58038363535263, 28, 'A sample sighting for turtle 2');


-- some example queries

-- retrieve list of all turtles (TurtleList component)
SELECT * 
FROM turtle;

-- retrieve the coordinates of all the sightings of a given turtle (MapView component in Turtle Profile)
SELECT sighting.latitude, sighting.longitude
FROM turtle, sighting
WHERE turtle.id = sighting.turtle_id
AND turtle.id = 0;

-- retrieve the coordinates of all the most recent turtle sightings of all turtles (Points on MapView component)
SELECT DISTINCT turtle.id, s1.latitude, s1.longitude
FROM sighting s1, turtle, sighting s2
WHERE turtle.ID = s1.turtle_id
AND s1.time_seen > s2.time_seen;

-- retrieve the IDs for male turtles with carapace lengths greater than 28 cm (Searching and/or filtering the TurtleList)
SELECT DISTINCT turtle.ID 
FROM turtle, sighting
WHERE turtle.ID = sighting.turtle_id
AND sighting.carapace_length > 28
AND turtle.sex = 'male';