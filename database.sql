CREATE TABLE "todo" (
	"id" serial primary key,
	"task" varchar(100) not null,
	"completed" boolean
);