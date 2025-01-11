CREATE TABLE IF NOT EXISTS "linkmmik_categories" (
	"id" serial NOT NULL,
	"userId" varchar(255),
	"name" varchar(100),
	"color" integer
);
--> statement-breakpoint
ALTER TABLE "linkmmik_links" ADD COLUMN "favicon" varchar(255);