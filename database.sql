CREATE TABLE "todo" (
	"id" serial primary key,
	"completed" boolean,
	"task" varchar(100) not null
);

INSERT INTO "todo" ("completed", "task")
VALUES (false, 'Do some grocery shopping'),
(false, 'Meal prep lunch'),
(true, 'Watch a Korean drama');

SELECT * FROM "todo";

UPDATE "todo" SET "completed" = 'true' WHERE "id"=1;

DELETE FROM "todo" WHERE "id"=1;