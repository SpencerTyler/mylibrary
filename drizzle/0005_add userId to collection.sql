ALTER TABLE "collectionEntries" DROP CONSTRAINT "collectionEntries_googleId_unique";--> statement-breakpoint
ALTER TABLE "collectionEntries" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "collectionEntries" ADD CONSTRAINT "collectionEntries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collectionEntries" ADD CONSTRAINT "collectionEntries_googleId_userId_unique" UNIQUE("googleId","userId");