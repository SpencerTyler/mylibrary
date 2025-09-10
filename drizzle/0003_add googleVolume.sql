CREATE TABLE "googleVolumes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"authors" text[] NOT NULL,
	"thumbnail" text,
	"pageCount" integer NOT NULL,
	"publisher" text NOT NULL,
	"publishedDate" date,
	"description" text NOT NULL,
	"categories" text[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collectionEntries" ALTER COLUMN "googleId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "collectionEntries" ADD CONSTRAINT "collectionEntries_googleId_googleVolumes_id_fk" FOREIGN KEY ("googleId") REFERENCES "public"."googleVolumes"("id") ON DELETE no action ON UPDATE no action;