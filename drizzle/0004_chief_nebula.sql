CREATE TABLE IF NOT EXISTS "linkmmik_link_categories" (
	"linkId" integer,
	"categoryId" integer,
	CONSTRAINT "link_category_pk" PRIMARY KEY("linkId","categoryId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linkmmik_link_categories" ADD CONSTRAINT "linkmmik_link_categories_linkId_linkmmik_links_id_fk" FOREIGN KEY ("linkId") REFERENCES "public"."linkmmik_links"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linkmmik_link_categories" ADD CONSTRAINT "linkmmik_link_categories_categoryId_linkmmik_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."linkmmik_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
