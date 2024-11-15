CREATE TABLE IF NOT EXISTS "linkmmik_links" (
	"id" serial NOT NULL,
	"userId" varchar(255),
	"shortUrl" varchar(255),
	"longUrl" varchar(255),
	"title" varchar(255),
	"description" varchar(255),
	"imageUrl" varchar(255)
);
