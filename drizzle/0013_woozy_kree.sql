CREATE TABLE IF NOT EXISTS "linkmmik_tags" (
	"id" serial NOT NULL,
	"linkId" integer,
	"tagId" integer,
	"userId" varchar(255)
);
